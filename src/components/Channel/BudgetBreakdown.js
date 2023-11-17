import React from "react";
import "./BudgetBrakdown.css";
import Input from "../../shared/input/Input";
import {
  BudgetAllocation,
  useBudget,
  useUpdateDistribution,
} from "../../context/BudgetContext";

const BudgetBreakdown = () => {
  const budget = useBudget();
  const updateDistribution = useUpdateDistribution();

  const onValueChange = (value, index) => {
    const newDistribution = budget.distribution;
    newDistribution[index].value = parseFloat(value);
    updateDistribution(newDistribution);
  };

  const inputsTable = budget.distribution.map((item, i) => {
    return (
      <Input
        label={item.timePeriod}
        key={i}
        value={item.value}
        type="number"
        disabled={
          budget.allocation === BudgetAllocation.Equal ? "disabled" : ""
        }
        onChange={(event) => onValueChange(event.target.value, i)}
      />
    );
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
