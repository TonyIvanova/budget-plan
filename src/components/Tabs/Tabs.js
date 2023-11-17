import React, { useState } from "react";
import FirstTab from "../FirstTab/FirstTab";
import SecondTab from "../SecondTab/SecondTab";
import "./Tabs.css";

const Tabs = () => {
  const [selected, setSelected] = useState(1);

  const onTabClick = (id) => {
    return () => setSelected(id);
  };

  return (
    <div className="tabs">
      <button
        className={selected === 1 ? "active tab" : "tab"}
        onClick={onTabClick(1)}
      >
        Tab 1
      </button>
      <button
        className={selected === 2 ? "active tab" : "tab"}
        onClick={onTabClick(2)}
      >
        Tab 2
      </button>

      <div className="outlet">
        {selected === 1 ? <FirstTab /> : <SecondTab />}
      </div>
    </div>
  );
};

export default Tabs;
