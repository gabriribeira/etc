import React from "react";
import PropTypes from "prop-types";

const ProgressBar = ({ progress }) => {
  const progressStyle = (progress) => {
    console.log(progress);
    switch (progress) {
      case 0:
        return "w-0";
      case 1:
        return "w-[10%]";
      case 2:
        return "w-[20%]";
      case 3:
        return "w-[30%]";
      case 4:
        return "w-[40%]";
      case 5:
        return "w-[50%]";
      case 6:
        return "w-[60%]";
      case 7:
        return "w-[70%]";
      case 8:
        return "w-[80%]";
      case 9:
        return "w-[90%]";
      case 10:
        return "w-full";
      default:
        break;
    }
  };
  return (
    <div className="w-full h-3 bg-white rounded-full">
      <div
        className={`${progressStyle(progress)} h-full bg-black bg-gradient-to-r from-black to-green rounded-full`}
      ></div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ProgressBar;
