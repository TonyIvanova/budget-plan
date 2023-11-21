import { createSlice, current } from "@reduxjs/toolkit";
import { Frequency } from "./budgetsSlice";
import { updateChannelBudgetBaselineValue } from "./budgetsSlice";

export const generateDistribution = ({ frequency, baseline }) => {
  let baseValue;

  if (frequency === Frequency.Annually) {
    baseValue = (parseFloat(baseline) / frequency.options.length).toFixed(2);
  } else {
    baseValue = parseFloat(baseline);
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
    updateBudgetDistributionValueByIndex: (state, action) => {
      const { budgetId, index, value } = action.payload;
      const distribution = state.budgetDistributions.find(
        (distribution) => distribution.budgetId === budgetId
      );
      distribution.distribution[index].value = value;
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

export const updateBudgetDistributionByIndex = ({ budgetId, index, value }) => {
  return (dispatch, getState) => {
    dispatch(updateBudgetDistributionValueByIndex({ budgetId, index, value }));

    const budget = getState().budgetsReducer.budgets.find(
      (budget) => budget.id === budgetId
    );
    const distribution =
      getState().budgetDistributionsReducer.budgetDistributions.find(
        (distribution) => distribution.budgetId === budgetId
      ).distribution;

    const sum = distribution.reduce((acc, item) => {
      return acc + parseFloat(item.value);
    }, 0);

    let newBudgetBaseline;
    if (budget.frequency === Frequency.Annually) {
      newBudgetBaseline = sum;
    } else {
      newBudgetBaseline = (sum / budget.frequency.options.length).toFixed(2);
    }

    dispatch(
      updateChannelBudgetBaselineValue({
        channelId: budget.channelId,
        baseline: newBudgetBaseline,
      })
    );
  };
};

export const {
  updateBudgetDistributionValues,
  createNewDistribution,
  updateBudgetDistributionValueByIndex,
} = budgetDistributionsSlice.actions;

export default budgetDistributionsSlice.reducer;
