import React, { useState, useContext } from "react";

const BudgetContext = React.createContext();
const UpdateBudgetContext = React.createContext();
const UpdateDistributionContext = React.createContext();

export const useBudget = () => {
  return useContext(BudgetContext);
};

export const useUpdateBudget = () => {
  return useContext(UpdateBudgetContext);
};

export const useUpdateDistribution = () => {
  return useContext(UpdateDistributionContext);
};

export const BudgetProvider = ({ children }) => {
  const generateBudget = ({ frequency, allocation, baseline }) => {
    let baseValue;
    let distribution;

    if (frequency === Frequency.Annually) {
      baseValue = (baseline / frequency.options.length).toFixed(2);
    } else {
      baseValue = baseline;
    }

    distribution = frequency.options.map((timePeriod) => {
      return {
        timePeriod: timePeriod,
        value: parseFloat(baseValue),
      };
    });

    return {
      frequency: frequency,
      allocation: allocation,
      baseline: parseFloat(baseline),
      distribution: distribution,
    };
  };

  const [budget, setBudget] = useState(
    generateBudget({
      frequency: Frequency.Annually,
      allocation: BudgetAllocation.Equal,
      baseline: 12000,
    })
  );

  const updateBudget = ({ frequency, allocation, baseline }) => {
    const budget = generateBudget({ frequency, allocation, baseline });
    setBudget(budget);
  };

  const updateDistribution = (newDistribution) => {
    let newBaseline = 0;
    newDistribution.forEach((item) => {
      newBaseline += parseFloat(item.value);
    });

    setBudget({
      ...budget,
      baseline: newBaseline,
      distribution: [...newDistribution],
    });
  };

  return (
    <BudgetContext.Provider value={budget}>
      <UpdateDistributionContext.Provider value={updateDistribution}>
        <UpdateBudgetContext.Provider value={updateBudget}>
          {children}
        </UpdateBudgetContext.Provider>
      </UpdateDistributionContext.Provider>
    </BudgetContext.Provider>
  );
};

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

// export const BudgetContext = createContext({
//   budget: generateBudget(Frequency.Annually, BudgetAllocation.Equal, 12000),
//   setBudget: (budget) => {},
// });
