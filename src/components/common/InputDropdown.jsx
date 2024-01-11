import React, {useState} from "react";
import PropTypes from "prop-types";
import { SlArrowDown } from "react-icons/sl";

const InputDropdown = ({ label, value, onChange, options }) => {
  const [showOptions, setShowOptions] = useState(false);
  const handleChange = (option) => {
    onChange(option);
    setShowOptions(false);
  };
  return (
    <div className="w-full flex flex-col">
      <label htmlFor={label} className="mb-2 text-lg font-semibold">
        {label}
      </label>
      <div className="flex relative w-full items-center transition-all duration-300">
        <button
          id={label}
          className={`border-2 rounded-xl p-2 border-black40 focus:border-black focus:outline-none text-lg ${value ? "text-black" : "text-black50"} text-start w-full flex items-center justify-between`}
          placeholder={label}
          onClick={() => setShowOptions(!showOptions)}
          type="button"
        >
          {value ? value : "Select an option"}
          <span className="text-2xl"><SlArrowDown /></span>
        </button>
        {showOptions && (
          <div className="absolute top-[100%] border-2 border-black border-t-0 rounded-2xl flex flex-col w-full  transition-all duration-300 bg-white z-[10] rounded-t-none -mt-3 pt-3">
            {options &&
              options.map((option, index) => (
                <button
                  key={index}
                  className={`w-full text-lg text-black p-2 rounded-b-2xl transition-all duration-300 text-start ${option == value && "font-semibold"}`}
                  onClick={() => handleChange(option)}
                >
                  {option}
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

InputDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
};

export default InputDropdown;
