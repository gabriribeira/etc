import React from "react";
import PropTypes from "prop-types";

const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full h-2 bg-white rounded-full">
      <div className={`${progress} w-3/4 h-full bg-green60 rounded-full`}></div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ProgressBar;
