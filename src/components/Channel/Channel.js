import React, { useState } from "react";
import "./Channel.css";
import arrow from "../../assets/images/arrow.svg";
import channelIcon from "../../assets/images/channel.svg";
import Input from "../../shared/input/Input";
import ButtonGroup from "../../shared/ButtonGroup/ButtonGroup";
import Dropdown from "../../shared/Dropdown/dropdown";
import BudgetBreakdown from "./BudgetBreakdown";
import { Frequency, BudgetAllocation } from "../../context/BudgetContext";
import { useBudget, useUpdateBudget } from "../../context/BudgetContext";
import { useChannels } from "../../context/ChannelsContext";

const Channel = ({ channel }) => {
  const { toggleChannel } = useChannels();

  const budget = useBudget();
  const updateBudget = useUpdateBudget();

  const onHeaderClick = () => {
    toggleChannel(channel.id);
  };

  const onAllocationChange = (button) => {
    updateBudget({ ...budget, allocation: button.value });
  };

  const onFrequencyChange = (frequencyOptions) => {
    updateBudget({ ...budget, frequency: frequencyOptions.value });
  };

  const onBaselineChange = (event) => {
    updateBudget({ ...budget, baseline: parseFloat(event.target.value) });
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
              label={`Baseline ${budget.frequency.name} Budget`}
              infoText="This is info text"
              onChange={onBaselineChange}
              disabled={budget.allocation === BudgetAllocation.Manual}
              type="number"
              value={budget.baseline}
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
          <BudgetBreakdown />
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
