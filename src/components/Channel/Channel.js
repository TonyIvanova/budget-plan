import React, { useCallback, useEffect, useState } from "react";
import _debounce from "lodash.debounce";
import "./Channel.css";
import arrow from "../../assets/images/arrow.svg";
import dots from "../../assets/images/dots.svg";
import channelIcon from "../../assets/images/channel.svg";
import Input from "../../shared/input/Input";
import ButtonGroup from "../../shared/ButtonGroup/ButtonGroup";
import Dropdown from "../../shared/Dropdown/dropdown";
import BudgetBreakdown from "./BudgetBreakdown";
import { Frequency, BudgetAllocation } from "../../features/budgetsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  updateChannelBudgetAllocation,
  updateChannelBudgetBaseline,
  updateChannelBudgetFrequency,
} from "../../features/budgetsSlice";
import {
  removeChannel,
  toggleChannel,
  updateChannelName,
} from "../../features/channelsSlice";
import ClickOutsideDetector from "../../shared/ClickOutsideDetector/ClickOutsideDetector";

const Channel = ({ channel, setChannelBudget }) => {
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();
  const budget = useSelector((state) =>
    state.budgetsReducer.budgets.find(
      (budget) => budget.channelId === channel.id
    )
  );
  useEffect(() => {
    setBudgetBaseline(budget?.baseline);
  }, [budget]);

  const [budgetBaseline, setBudgetBaseline] = useState(budget?.baseline);

  const debounceBudgetBaselineChange = useCallback(
    _debounce((value) => updateBudgetBaseline(value), 300),
    []
  );

  const onHeaderClick = () => {
    if (!isEditing) dispatch(toggleChannel(channel.id));
  };

  const onDotsClick = (e) => {
    e.stopPropagation();
    setShowEditMenu(!showEditMenu);
  };

  const onAllocationChange = (button) => {
    dispatch(
      updateChannelBudgetAllocation({
        channelId: channel.id,
        allocation: button.value,
      })
    );
  };

  const onFrequencyChange = (frequencyOptions) => {
    dispatch(
      updateChannelBudgetFrequency({
        channelId: channel.id,
        frequency: frequencyOptions.value,
      })
    );
  };

  const onBaselineChange = (value) => {
    setBudgetBaseline(value);
    debounceBudgetBaselineChange(value);
  };

  const updateBudgetBaseline = (value) => {
    dispatch(
      updateChannelBudgetBaseline({
        channelId: channel.id,
        baseline: parseFloat(value),
      })
    );
  };
  const handleClickOutside = () => {
    setShowEditMenu(false);
  };

  const onRemove = (channelId) => {
    dispatch(removeChannel(channelId));
  };

  const onEdit = (channelId) => {
    setIsEditing(true);
  };

  const onChannelNameChange = (channelId, newName) => {
    dispatch(updateChannelName({ channelId, newName }));
  };

  return (
    <section className="channel">
      <div className="channel-header" onClick={onHeaderClick}>
        <img
          className={channel.isOpen ? "arrow open" : "arrow"}
          src={arrow}
          alt="open"
        />
        <img className="channel-icon" src={channelIcon} alt="channel" />
        {isEditing ? (
          <ClickOutsideDetector onClickOutside={() => setIsEditing(false)}>
            <Input
              value={channel.name}
              onChange={(value) => onChannelNameChange(channel.id, value)}
              type="text"
            />
          </ClickOutsideDetector>
        ) : (
          <p>{channel.name}</p>
        )}
        <ClickOutsideDetector onClickOutside={handleClickOutside}>
          <div className="edit-dots-wrapper" onClick={onDotsClick}>
            <img src={dots} alt="edit" className="dots" />
            {showEditMenu && (
              <div className="edit-channel-menu">
                <button
                  className="edit-button"
                  onClick={() => onEdit(channel.id)}
                >
                  Edit
                </button>
                <button
                  className="remove-button"
                  onClick={() => onRemove(channel.id)}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </ClickOutsideDetector>
      </div>
      {channel.isOpen ? (
        <div className="channel-content">
          <div className="budget-options">
            <Dropdown
              options={dropdownOptions}
              onSelect={onFrequencyChange}
              label="Budget Frequency"
              infoText="Some info text"
            />
            <Input
              label={`Baseline ${budget?.frequency?.name} Budget`}
              infoText="This is info text"
              onChange={onBaselineChange}
              disabled={budget?.allocation === BudgetAllocation.Manual}
              type="number"
              value={budgetBaseline}
            />
            <ButtonGroup
              buttons={[
                { label: "Equal", value: BudgetAllocation.Equal },
                { label: "Manual", value: BudgetAllocation.Manual },
              ]}
              label="Budget Allocation"
              infoText="Some info text"
              onClick={onAllocationChange}
            />
          </div>
          <BudgetBreakdown budgetId={channel.budgetId} />
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default Channel;

const dropdownOptions = [
  {
    label: "Annually",
    value: Frequency.Annually,
  },
  {
    label: "Monthly",
    value: Frequency.Monthly,
  },
  {
    label: "Quorterly",
    value: Frequency.Quarterly,
  },
];
