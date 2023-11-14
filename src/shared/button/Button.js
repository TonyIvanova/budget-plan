import React from "react";
import "./Button.css";

const Button = ({ label, icon }) => {
  if (icon) {
    return (
      <button className="custom-button">
        <img src={icon} alt={label} />
        {label}
      </button>
    );
  } else {
    return <button className="custom-button">{label}</button>;
  }
};

export default Button;
