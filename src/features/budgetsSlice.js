import { createSlice } from "@reduxjs/toolkit";
import {
  generateDistribution,
  updateBudgetDistributionValues,
} from "./budgetDistributionsSlice";

export const months = [
  "Jan 23",
  "Feb 23",
  "Mar 23",
  "Apr 23",
  "May 23",
  "Jun 23",
  "Jul 23",
  "Aug 23",
  "Sep 23",
  "Oct 23",
  "Nov 23",
  "Dec 23",
];

export const quorters = ["Q1", "Q2", "Q3", "Q4"];

export const Frequency = {
  Annually: { name: "Annual", options: months, isEqual: true },
  Monthly: { name: "Monthly", options: months, isEqual: false },
  Quarterly: { name: "Quarterly", options: quorters, isEqual: false },
};

export const BudgetAllocation = {
  Equal: "equal",
  Manual: "manual",
};

export const generateBudget = ({ frequency, allocation, baseline }) => {
  return {
    frequency: frequency,
    allocation: allocation,
    baseline: parseFloat(baseline),
  };
};

const initialState = {
  budgets: [],
};

const budgetsSlice = createSlice({
  name: "budgets",
  initialState,
  reducers: {
    createNewBudget: (state, action) => {
      state.budgets.push({
        id: action.payload.budgetId,
        channelId: action.payload.channelId,
        baseline: 12000,
        allocation: BudgetAllocation.Equal,
        frequency: Frequency.Annually,
      });
    },

    updateChannelBudgetDistribution: (state, action) => {
      const { channelId, newDistribution } = action.payload;
      let newBaseline = 0;
      newDistribution.forEach((item) => {
        newBaseline += parseFloat(item.value);
      });

      const budget = state.budgets.find(
        (budget) => budget.channelId === channelId
      );
      budget.baseline = newBaseline;
      budget.distribution = newDistribution;
    },

    updateChannelBudgetAllocationValue: (state, action) => {
      const { channelId, allocation } = action.payload;
      const budget = state.budgets.find(
        (budget) => budget.channelId === channelId
      );
      budget.allocation = allocation;
    },

    updateChannelBudgetFrequencyValue: (state, action) => {
      const { channelId, frequency } = action.payload;
      const budget = state.budgets.find(
        (budget) => budget.channelId === channelId
      );
      budget.frequency = frequency;
    },

    updateChannelBudgetBaselineValue: (state, action) => {
      const { channelId, baseline } = action.payload;

      const budget = state.budgets.find(
        (budget) => budget.channelId === channelId
      );
      budget.baseline = baseline;
    },
  },
});

/* ---------- Complex Actions -------- */

export const updateChannelBudgetFrequency = ({ channelId, frequency }) => {
  return (dispatch, getState) => {
    dispatch(updateChannelBudgetFrequencyValue({ channelId, frequency }));

    const budget = getState().budgetsReducer.budgets.find(
      (budget) => budget.channelId === channelId
    );

    dispatch(
      updateBudgetDistributionValues({
        budgetId: budget.id,
        newDistribution: generateDistribution({
          frequency,
          baseline: budget.baseline,
        }),
      })
    );
  };
};

export const updateChannelBudgetAllocation = ({ channelId, allocation }) => {
  return (dispatch, getState) => {
    dispatch(updateChannelBudgetAllocationValue({ channelId, allocation }));

    if (allocation === "manual") return;

    const budget = getState().budgetsReducer.budgets.find(
      (budget) => budget.channelId === channelId
    );

    dispatch(
      updateBudgetDistributionValues({
        budgetId: budget.id,
        newDistribution: generateDistribution({
          frequency: budget.frequency,
          baseline: budget.baseline,
        }),
      })
    );
  };
};

export const updateChannelBudgetBaseline = ({ channelId, baseline }) => {
  return (dispatch, getState) => {
    dispatch(updateChannelBudgetBaselineValue({ channelId, baseline }));

    const budget = getState().budgetsReducer.budgets.find(
      (budget) => budget.channelId === channelId
    );

    dispatch(
      updateBudgetDistributionValues({
        budgetId: budget.id,
        newDistribution: generateDistribution({
          frequency: budget.frequency,
          baseline: budget.baseline,
        }),
      })
    );
  };
};

export const {
  createNewBudget,
  updateChannelBudgetAllocationValue,
  updateChannelBudgetFrequencyValue,
  updateChannelBudgetBaselineValue,
} = budgetsSlice.actions;
export default budgetsSlice.reducer;
