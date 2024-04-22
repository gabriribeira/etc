import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Button = ({ label, submit, action, to, bg, lg, stroke, turnDisabled, customBorder, aria }) =>
  to && to !== "" ? (
    <Link
      to={to}
      aria-label={aria}
      className={`${
        stroke ? "bg-white" : (bg && bg != '') ? bg : "bg-blue"
      }  ${stroke && "border-2 border-black"} ${stroke ? "text-black" : "text-white"} rounded-lg ${lg == true ? "py-5" : "py-3"} text-md font-medium w-full focus:outline-none text-center flex justify-center`}
    >
      {label}
    </Link>
  ) : (
    <button
      onClick={() => action()}
      type={submit ? "submit" : "button"}
      aria-label={aria}
      className={`${
        stroke ? "bg-white" : (bg && bg != '') ? bg : `${turnDisabled ? "bg-black40"  : "bg-black90 bg-gradient-to-r from-black90 to-white/20"}`
      } ${stroke && `${customBorder != `` ? customBorder : "border-2 border-black"} `} ${stroke ? "text-black" : "text-white"} rounded-lg ${lg == true ? "py-5" : "py-3"} text-md font-medium w-full focus:outline-none text-center flex justify-center`}
      disabled={turnDisabled ? turnDisabled : ""}
    >
      {label}
    </button>
  );

Button.propTypes = {
  label: PropTypes.string.isRequired,
  submit: PropTypes.bool,
  action: PropTypes.func,
  to: PropTypes.string,
  bg: PropTypes.string,
  lg: PropTypes.bool,
  stroke: PropTypes.bool,
  turnDisabled: PropTypes.bool,
  customBorder: PropTypes.string
  aria: PropTypes.string,
};

export default Button;
