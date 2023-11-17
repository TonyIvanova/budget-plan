// import { createContext } from "react";

// export const generateBudget = ({ frequency, allocation, baseline }) => {
//   let baseValue = baseline / frequency.options.length;

//   let distribution = frequency.options.map((timePeriod) => {
//     return {
//       timePeriod: timePeriod,
//       value: baseValue,
//     };
//   });

//   return {
//     frequency: frequency,
//     allocation: allocation,
//     baseline: baseline,
//     distribution: distribution,
//   };
// };

// export const BudgetContext = createContext({
//   budget: generateBudget(Frequency.Annually, BudgetAllocation.Equal, 12000),
//   setBudget: (budget) => {},
// });
