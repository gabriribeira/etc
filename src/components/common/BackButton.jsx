import React from "react";
import { SlArrowLeft } from "react-icons/sl";
import PropTypes from "prop-types";

const BackButton = ({onClick}) => {
  return (
    <button onClick={onClick} className="text-xl pr-2 flex flex-shrink-0 z-[102]" aria-label="Back Button">
      <SlArrowLeft />
    </button>
  );
};

BackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default BackButton;
