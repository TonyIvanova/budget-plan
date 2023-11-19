import { createSlice } from "@reduxjs/toolkit";
import { Frequency } from "./budgetsSlice";
import { updateChannelBudgetBaselineValue } from "./budgetsSlice";

export const generateDistribution = ({ frequency, baseline }) => {
  let baseValue;

  if (frequency === Frequency.Annually) {
    baseValue = (baseline / frequency.options.length).toFixed(2);
  } else {
    baseValue = baseline;
  }

  return frequency.options.map((option) => {
    return {
      label: option,
      value: baseValue,
    };
  });
};

const initialState = {
  budgetDistributions: [],
};

const budgetDistributionsSlice = createSlice({
  name: "budgetDistribution",
  initialState,
  reducers: {
    createNewDistribution: (state, action) => {
      state.budgetDistributions.push({
        budgetId: action.payload.budgetId,
        distribution: generateDistribution({
          frequency: Frequency.Annually,
          baseline: 12000,
        }),
      });
    },
    updateBudgetDistributionValues: (state, action) => {
      const { budgetId, newDistribution } = action.payload;
      const distribution = state.budgetDistributions.find(
        (distribution) => distribution.budgetId === budgetId
      );
      distribution.distribution = newDistribution;
    },
  },
});

export const updateBudgetDistribution = ({ budgetId, newDistribution }) => {
  return (dispatch, getState) => {
    dispatch(updateBudgetDistributionValues({ budgetId, newDistribution }));

    const budget = getState().budgetsReducer.budgets.find(
      (budget) => budget.id === budgetId
    );

    const newBudgetBaseline = newDistribution.reduce((acc, item) => {
      return acc + parseFloat(item.value);
    }, 0);

    dispatch(
      updateChannelBudgetBaselineValue({
        channelId: budget.channelId,
        baseline: newBudgetBaseline,
      })
    );
  };
};

export const { updateBudgetDistributionValues, createNewDistribution } =
  budgetDistributionsSlice.actions;

export default budgetDistributionsSlice.reducer;
