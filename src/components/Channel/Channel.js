import React, { useState } from "react";
import "./Channel.css";
import arrow from "../../assets/images/arrow.svg";
import channel from "../../assets/images/channel.svg";
import Input from "../../shared/input/Input";
import ButtonGroup from "../../shared/ButtonGroup/ButtonGroup";
import Dropdown from "../../shared/Dropdown/dropdown";
import BudgetBreakdown from "./BudgetBreakdown";

const Channel = () => {
  const dropdownOptions = [
    {
      label: "Annually",
    },
    {
      label: "Monthly",
    },
    {
      label: "Quorterly",
    },
  ];

  const [isOpen, setIsOpen] = useState(true);

  const onHeaderClick = () => {
    setIsOpen(!isOpen);
  };

  const onButtonGroupClick = (index) => {
    console.log("Button Clicked " + index);
  };

  const onSelect = () => {
    console.info("Select");
  };

  return (
    <section className="channel">
      <div className="channel-header" onClick={onHeaderClick}>
        <img
          className={isOpen ? "arrow open" : "arrow"}
          src={arrow}
          alt="open"
        />
        <img className="channel-icon" src={channel} alt="channel" />
        <p>Paid reviews</p>
      </div>
      {isOpen ? (
        <div className="channel-content">
          <div className="budget-options">
            <Input
              label="Baseline [Annual] Budget"
              infoText="This is info text"
            />
            <ButtonGroup
              buttons={[{ label: "Equal" }, { label: "Manual" }]}
              label="Button group"
              infoText="Some info text"
              onClick={onButtonGroupClick}
            />
            <Dropdown
              options={dropdownOptions}
              onSelect={onSelect}
              label="Button group"
              infoText="Some info text"
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
