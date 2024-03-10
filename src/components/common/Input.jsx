import React, { useState } from "react";
import PropTypes from "prop-types";

import { BsEye, BsEyeSlash } from "react-icons/bs";

const Input = ({ label, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full flex flex-col">
      <label htmlFor={label} className="mb-2 text-lg font-semibold">
        {label}
      </label>
      <div className="flex relative w-full items-center">
        {label === "Description" || label === "Details" ? (
          <textarea
            name={label}
            id={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="border-2 rounded-xl p-2 border-black80 focus:border-black focus:outline-none text-lg placeholder:text-black80 text-black w-full bg-white"
            placeholder={label}
            rows="3"
          />
        ) : (
          <input
            name={label}
            id={label}
            value={value}
            type={
              (label === "Password" || label === "Confirm Password") && !showPassword
                ? "password" : label === "Email" ? "email" : label == "Value" ? "number" : label == "Date" ? "date" : "text"
            }
            onChange={(e) => onChange(e.target.value)}
            className={`border-2 rounded-xl p-2 border-black80 focus:border-black focus:outline-none ${
              (label === "Password" || label === "Confirm Password") &&
              !showPassword &&
              value != ""
                ? "text-xl"
                : "text-lg"
            } placeholder:text-black80 text-black w-full bg-white`}
            placeholder={label}
          />
        )}
        {(label === "Password" || label === "Confirm Password") && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-xl absolute right-3"
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
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default Input;
