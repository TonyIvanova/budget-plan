import React from "react";
import "./BudgetBrakdown.css";
import Input from "../../shared/input/Input";
const BudgetBreakdown = ({ frequency, baseline, allocation }) => {
  const values = [
    {
      date: "May 21",
      value: "",
    },
    {
      date: "May 21",
      value: "",
    },
    {
      date: "May 21",
      value: "",
    },
    {
      date: "May 21",
      value: "",
    },
    {
      date: "May 21",
      value: "",
    },
    {
      date: "May 21",
      value: "",
    },
    {
      date: "May 21",
      value: "",
    },
  ];

  const inputsTable = values.map((value) => {
    return <Input label={value.date} />;
  });

  return (
    <div className="budget-breakdown">
      <h2>Budget Breakdown</h2>
      <p>
        By default, your budget will be equally divided throughout the year. You
        can manually change the budget allocation, either now or later.
      </p>
      <div className="budget-table">{inputsTable}</div>
    </div>
  );
};

export default BudgetBreakdown;
