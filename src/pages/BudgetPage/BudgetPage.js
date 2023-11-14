import React, { useState } from "react";
import "./BudgetPage.css";
import Button from "../../shared/button/Button.js";
import plus from "../../assets/images/plus.svg";
import Tabs from "../../components/Tabs/Tabs.js";

const BudgetPage = () => {
  return (
    <section className="budget-page">
      <h1>Build your budget plan</h1>
      <h2>Setup channels</h2>
      <div className="container">
        <p className="info-text">
          Setup your added channels by adding baseline budgets out of your total
          budget. See the forecast impact with the help of tips and insights.
        </p>
        <Button label="Add Channel" icon={plus} />
      </div>
      <Tabs />
    </section>
  );
};

export default BudgetPage;
