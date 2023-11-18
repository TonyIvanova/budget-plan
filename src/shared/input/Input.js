import React, { useCallback, useEffect, useState } from "react";
import info from "../../assets/images/info.svg";
import "./Input.css";


const Input = ({ type, name, value, label, infoText, disabled, onChange }) => {
  let labelElement;
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const inputChange = (event) => {
    setLocalValue(event.target.value);
    onChange(event.target.value);
  };

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
        value={localValue}
        onChange={inputChange}
        disabled={disabled ? "disabled" : ""}
      />
    </div>
  );
};

export default Input;
