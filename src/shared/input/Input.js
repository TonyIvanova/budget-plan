import React from "react";
import info from "../../assets/images/info.svg";
import "./Input.css";

const Input = ({ type, name, value, label, infoText, onChange }) => {
  let labelElement;

  if (label) {
    labelElement = (
      <label for={name}>
        {label} {infoText && <img src={info} alt={infoText} />}
      </label>
    );
  }

  return (
    <div className="custom-input">
      {labelElement}
      <input type={type} name={name} value={value} onChange={onChange} />
    </div>
  );
};

export default Input;
