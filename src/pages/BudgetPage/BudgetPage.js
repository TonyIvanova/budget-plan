import React, { useEffect } from "react";
import "./BudgetPage.css";
import Button from "../../shared/button/Button.js";
import plus from "../../assets/images/plus.svg";
import Tabs from "../../components/Tabs/Tabs.js";
import { useDispatch } from "react-redux";
import { addChannelAndCreateBudgetAndDistribution } from "../../features/channelsSlice";
import { nanoid } from "@reduxjs/toolkit";

const BudgetPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // Rows should be closed by default, so first row is closed.
    const newChannel = {
      name: "Paid reviews",
      id: nanoid(),
      isOpen: false,
      budgetId: nanoid(),
    };
    dispatch(addChannelAndCreateBudgetAndDistribution(newChannel));
  }, []);

  const onAddChannel = () => {
    const newChannel = {
      name: "New Channel",
      id: nanoid(),
      isOpen: true,
      budgetId: nanoid(),
    };
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
