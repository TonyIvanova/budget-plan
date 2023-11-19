import React, { useCallback } from "react";
import "./BudgetBrakdown.css";
import Input from "../../shared/input/Input";
import { useDispatch, useSelector } from "react-redux";
import { updateBudgetDistribution } from "../../features/budgetDistributionsSlice";
import BudgetAllocation from "../../features/budgetsSlice";
import _debounce from "lodash.debounce";

const BudgetBreakdown = ({ budgetId }) => {
  const budgets = useSelector((state) => state.budgetsReducer.budgets);
  const budget = budgets?.find((budget) => budget.id === budgetId);

  const distributions = useSelector(
    (state) => state.budgetDistributionsReducer.budgetDistributions
  );

  const distribution = distributions.find(
    (distribution) => distribution.budgetId === budgetId
  );
  const dispatch = useDispatch();

  const debounceUpdateDistribution = useCallback(
    _debounce((value, index) => updateDistribution(value, index), 800),
    []
  );

  const updateDistribution = (value, index) => {
    const newDistribution = distribution.distribution.map((item, i) => {
      if (i === index) {
        return {
          timePeriod: item.timePeriod,
          value: parseFloat(value),
        };
      }
      return item;
    });
    dispatch(
      updateBudgetDistribution({
        budgetId: distribution.budgetId,
        newDistribution,
      })
    );
  };
  const inputsTable = distribution.distribution?.map((item, i) => {
    const inputValue = item.value ? item.value : 0;
    return (
      <Input
        label={item.timePeriod}
        key={i}
        value={inputValue}
        type="number"
        disabled={budget.allocation === "equal" ? "disabled" : ""}
        onChange={(event) => debounceUpdateDistribution(event, i)}
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
