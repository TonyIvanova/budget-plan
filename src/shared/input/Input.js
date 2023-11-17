import React from "react";
import info from "../../assets/images/info.svg";
import "./Input.css";

const Input = ({ type, name, value, label, infoText, disabled, onChange }) => {
  let labelElement;

  if (label) {
    labelElement = (
      <label htmlFor={name}>
        {label} {infoText && <img src={info} alt={infoText} />}
      </label>
    );
  }

  return (
    <div className="custom-input">
      {labelElement}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled ? "disabled" : ""}
      />
    </div>
  );
};

export default Input;
