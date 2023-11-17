import React, { useCallback, useEffect, useState } from "react";
import info from "../../assets/images/info.svg";
import "./Input.css";
import _debounce from "lodash.debounce";

const Input = ({ type, name, value, label, infoText, disabled, onChange }) => {
  let labelElement;
  const [localValue, setLocalValue] = useState(value);

  const debounceChange = useCallback(_debounce(onChange, 300), []);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const inputChange = (event) => {
    setLocalValue(event.target.value);
    debounceChange(event);
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
