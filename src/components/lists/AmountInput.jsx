import React, { useState } from "react";
import PropTypes from "prop-types";
import { SlArrowDown } from "react-icons/sl";

const AmountInput = ({ label, value, onChange, valueUnit, onChangeUnit }) => {
  const [showOptions, setShowOptions] = useState(false);
  const options = ["unit", "package", "kg", "liter"];
  const handleChange = (option) => {
    onChangeUnit(option);
    setShowOptions(false);
  };
  return (
    <div className="flex flex-col">
      <label htmlFor={label} className="mb-2 text-lg font-medium">
        {label}
      </label>
      <div className="flex items-center gap-x-2">
        <input
          name={label}
          id={label}
          value={value}
          type="number"
          onChange={(e) => onChange(e.target.value)}
          className={`border rounded-xl p-2 border-black80 focus:border-black focus:outline-none text-lg placeholder:text-black80 text-black w-10 bg-white`}
          placeholder=" "
        />
        <div className="flex relative w-32 items-center transition-all duration-300">
          <button
            className={`border rounded-xl p-2 border-black80 focus:border-black focus:outline-none text-lg ${
              valueUnit ? "text-black" : "text-black50"
            } text-start w-full flex items-center justify-between`}
            onClick={() => setShowOptions(!showOptions)}
            type="button"
          >
            {valueUnit ? valueUnit : "Select an option"}
            <span className="text-2xl">
              <SlArrowDown />
            </span>
          </button>
          {showOptions && (
            <div className="absolute top-[100%] border border-black border-t-0 rounded-2xl flex flex-col w-full  transition-all duration-300 bg-white z-[10] rounded-t-none -mt-3 pt-3">
              {options &&
                options.map((option, index) => (
                  <button
                    key={index}
                    className={`w-full text-lg text-black p-2 rounded-b-2xl transition-all duration-300 text-start ${
                      option == valueUnit && "font-semibold"
                    }`}
                    onClick={() => handleChange(option)}
                  >
                    {option}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

AmountInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  valueUnit: PropTypes.string.isRequired,
  onChangeUnit: PropTypes.func.isRequired,
};

export default AmountInput;
