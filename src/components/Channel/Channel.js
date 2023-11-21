import React, { useCallback, useEffect, useState } from "react";
import _debounce from "lodash.debounce";
import "./Channel.css";
import arrow from "../../assets/images/arrow.svg";
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
import { toggleChannel } from "../../features/channelsSlice";

const Channel = ({ channel, setChannelBudget }) => {
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
    dispatch(toggleChannel(channel.id));
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

  return (
    <section className="channel">
      <div className="channel-header" onClick={onHeaderClick}>
        <img
          className={channel.isOpen ? "arrow open" : "arrow"}
          src={arrow}
          alt="open"
        />
        <img className="channel-icon" src={channelIcon} alt="channel" />
        <p>{channel.name}</p>
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
