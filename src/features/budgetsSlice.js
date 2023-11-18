import { createSlice, current } from "@reduxjs/toolkit";

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
// Step 1: Import dependencies and functions from channelsSlice.js
export const generateBudget = ({ frequency, allocation, baseline }) => {
  return {
    frequency: frequency,
    allocation: allocation,
    baseline: parseFloat(baseline),
  };
};

// Step 2: Create initial state for budgets slice
const initialState = {
  budgets: [],
};

// Step 3: Define budgets reducer function
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

    updateChannelBudgetAllocation: (state, action) => {
      const { channelId, allocation } = action.payload;
      const budget = state.budgets.find(
        (budget) => budget.channelId === channelId
      );
      budget.allocation = allocation;
    },

    updateChannelBudgetFrequency: (state, action) => {
      const { channelId, frequency } = action.payload;
      const budget = state.budgets.find(
        (budget) => budget.channelId === channelId
      );
      budget.frequency = frequency;
    },

    updateChannelBudgetBaseline: (state, action) => {
      const { channelId, baseline } = action.payload;

      const budget = state.budgets.find(
        (budget) => budget.channelId === channelId
      );
      budget.baseline = baseline;
    },
  },
});

// Step 4: Export budgets slice
export const {
  createNewBudget,
  updateChannelBudgetAllocation,
  updateChannelBudgetFrequency,
  updateChannelBudgetBaseline,
} = budgetsSlice.actions;
export default budgetsSlice.reducer;
