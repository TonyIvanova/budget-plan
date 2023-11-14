import React, { useState } from "react";
import arrow from "../../assets/images/arrow.svg";
import info from "../../assets/images/info.svg";
import "./dropdown.css";

const Dropdown = ({ options, infoText, label, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  let labelElement;
  if (label) {
    labelElement = (
      <label style={{ marginBottom: "8px" }}>
        {label} {infoText && <img src={info} alt={infoText} />}
      </label>
    );
  }

  const onOptionClick = (option) => {
    setSelected(option);
    setIsOpen(false);
    onSelect(option);
  };

  const onSelectClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {labelElement}
      <div className="dropdown-container">
        <div className="dropdown" onClick={onSelectClick}>
          {selected ? selected.label : "Select..."}{" "}
          <img src={arrow} alt="arrow" />
        </div>
        {isOpen && (
          <ul className="dropdown-options">
            {options?.map((option, index) => (
              <li
                key={index}
                className="dropdown-option"
                onClick={() => onOptionClick(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
