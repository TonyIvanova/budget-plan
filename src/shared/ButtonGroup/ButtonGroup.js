import React, { useState } from "react";
import "./ButtonGroup.css";
import info from "../../assets/images/info.svg";

const ButtonGroup = ({ label, infoText, buttons, onClick }) => {
  const [active, setActive] = useState(0);

  const onButtonClick = (button, index) => {
    setActive(index);
    onClick(button);
  };

  let labelElement;

  if (label) {
    labelElement = (
      <label>
        {label} {infoText && <img src={info} alt={infoText} />}
      </label>
    );
  }

  return (
    <div className="button-group">
      {labelElement}
      <div className="buttons-wrapper">
        {buttons.map((button, index) => (
          <button
            className={active === index ? "active" : ""}
            key={index}
            onClick={() => onButtonClick(button, index)}
          >
            {button?.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonGroup;
