import { createSlice } from "@reduxjs/toolkit";
import { Frequency } from "./budgetsSlice";

const generateDistribution = ({ frequency, baseline }) => {
  let baseValue;

  if (frequency === Frequency.Annually) {
    baseValue = (baseline / frequency.options.length).toFixed(2);
  } else {
    baseValue = baseline;
  }

  return frequency.options.map((option) => {
    return {
      label: option.timeFrame,
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
    updateBudgetDistribution: (state, action) => {
      const { budgetId, newDistribution } = action.payload;
      const distribution = state.budgetDistributions.find(
        (distribution) => distribution.budgetId === budgetId
      );
      distribution.distribution = newDistribution;
    },
  },
});

export const { updateBudgetDistribution, createNewDistribution } =
  budgetDistributionsSlice.actions;

export default budgetDistributionsSlice.reducer;
