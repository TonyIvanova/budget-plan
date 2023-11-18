import React, { useEffect, useState } from "react";
import "./BudgetPage.css";
import Button from "../../shared/button/Button.js";
import plus from "../../assets/images/plus.svg";
import Tabs from "../../components/Tabs/Tabs.js";
import { useDispatch, useSelector } from "react-redux";
import { addChannelAndCreateBudgetAndDistribution } from "../../features/channelsSlice";
import { createNewBudget } from "../../features/budgetsSlice";
import { createNewDistribution } from "../../features/budgetDistributionsSlice";
import { nanoid } from "@reduxjs/toolkit";

const BudgetPage = () => {
  // const channels = useSelector((state) => state.channels);
  const dispatch = useDispatch();
  useEffect(() => {
    onAddChannel();
  }, []);

  const onAddChannel = () => {
    const newChannel = {
      name: "New Channel",
      id: nanoid(),
      isOpen: true,
      budgetId: nanoid(),
    };
    // we don't need a distribution id, because one budget has one distribution
    dispatch(addChannelAndCreateBudgetAndDistribution(newChannel));
  };

  return (
    <section className="budget-page">
      <h1>Build your budget plan</h1>
      <h2>Setup channels</h2>
      <div className="container">
        <p className="info-text">
          Setup your added channels by adding baseline budgets out of your total
          budget. See the forecast impact with the help of tips and insights.
        </p>
        <Button label="Add Channel" icon={plus} onClick={onAddChannel} />
      </div>

      <Tabs />
    </section>
  );
};

export default BudgetPage;
