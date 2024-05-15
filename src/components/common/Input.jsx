import React, { useState } from "react";
import PropTypes from "prop-types";

import { BsEye, BsEyeSlash } from "react-icons/bs";

const Input = ({ label, placeholder, value, onChange, error, size }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full flex flex-col">
      <label htmlFor={label} className="mb-2 text-lg font-medium">
        {label}
      </label>
      <div className="flex relative w-full items-center">
        {label === "Description" || label === "Details" || label === "" ? (
          <textarea
            name={label}
            id={label}
            value={value}
            aria-label={label}
            onChange={(e) => onChange(e.target.value)}
            className="border rounded-xl p-2 border-black80 focus:border-black focus:outline-noneplaceholder:text-black50 text-black w-full bg-white"
            placeholder={placeholder ? placeholder : label}
            rows="3"
          />
        ) : (
          <input
            name={label}
            id={label}
            value={value}
            aria-label= {label}
            type={
              (label === "Password" || label === "Confirm Password") && !showPassword
                ? "password" : label === "Email" ? "email" : label == "Value" ? "number" : label == "Date" ? "date" : "text"
            }
            onChange={(e) => onChange(e.target.value)}
            className={`border rounded-xl p-2 border-black80 focus:border-black focus:outline-none ${
              (label === "Password" || label === "Confirm Password") &&
              !showPassword &&
              value != ""
                ? "text-xl"
                : "text-lg"
            } placeholder:text-black50 text-black  bg-white ${size ? size : 'w-full'}`}
            placeholder={placeholder ? placeholder : label}
            
          />
          
        )}
        
        {(label === "Password" || label === "Confirm Password") && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-xl absolute right-3"
            aria-label="Show password"
          >
            {showPassword ? <BsEye /> : <BsEyeSlash />}
          </button>
        )}
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  size: PropTypes.string,
};

export default Input;
