import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Button = ({ label, submit, action, to, bg, lg, stroke }) =>
  to && to !== "" ? (
    <Link
      to={to}
      className={`${
        stroke ? "bg-white" : (bg && bg != '') ? bg : "bg-blue"
      }  ${stroke && "border-2 border-blue"} ${stroke ? "text-blue" : "text-white"} rounded-lg ${lg == true ? "py-5" : "py-3"} text-md font-medium w-full focus:outline-none text-center flex justify-center`}
    >
      {label}
    </Link>
  ) : (
    <button
      onClick={() => action()}
      type={submit ? "submit" : "button"}
      className={`${
        stroke ? "bg-white" : (bg && bg != '') ? bg : "bg-black90 bg-gradient-to-r from-black90 to-white/20"
      } ${stroke && "border-2 border-blue"} ${stroke ? "text-blue" : "text-white"} rounded-lg ${lg == true ? "py-5" : "py-3"} text-md font-medium w-full focus:outline-none text-center flex justify-center`}
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
};

export default Button;
