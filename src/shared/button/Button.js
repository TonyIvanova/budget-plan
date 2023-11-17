import React from "react";
import "./Button.css";

const Button = ({ label, icon, onClick }) => {
  if (icon) {
    return (
      <button className="custom-button" onClick={onClick}>
        <img src={icon} alt={label} />
        {label}
      </button>
    );
  } else {
    return (
      <button className="custom-button" onClick={onClick}>
        {label}
      </button>
    );
  }
};

export default Button;
