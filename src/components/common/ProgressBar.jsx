import React from "react";
import PropTypes from "prop-types";

const ProgressBar = ({ progress }) => {
  const progressStyle = (progress) => {
    switch (progress) {
      case 0:
        return (
          <div
            className={`w-[0%] h-full bg-black bg-gradient-to-r from-black to-green rounded-full`}
          ></div>
        );
      case 1:
        return (
          <div
            className={`w-[10%] h-full bg-black bg-gradient-to-r from-black to-green rounded-full`}
          ></div>
        );
      case 2:
        return (
          <div
            className={`w-[20%] h-full bg-black bg-gradient-to-r from-black to-green rounded-full`}
          ></div>
        );
      case 3:
        return (
          <div
            className={`w-[30%] h-full bg-black bg-gradient-to-r from-black to-green rounded-full`}
          ></div>
        );
      case 4:
        return (
          <div
            className={`w-[40%] h-full bg-black bg-gradient-to-r from-black to-green rounded-full`}
          ></div>
        );
      case 5:
        return (
          <div
            className={`w-[50%] h-full bg-black bg-gradient-to-r from-black to-green rounded-full`}
          ></div>
        );
      case 6:
        return (
          <div
            className={`w-[60%] h-full bg-black bg-gradient-to-r from-black to-green rounded-full`}
          ></div>
        );
      case 7:
        return (
          <div
            className={`w-[70%] h-full bg-black bg-gradient-to-r from-black to-green rounded-full`}
          ></div>
        );
      case 8:
        return (
          <div
            className={`w-[80%] h-full bg-black bg-gradient-to-r from-black to-green rounded-full`}
          ></div>
        );
      case 9:
        return (
          <div
            className={`w-[90%] h-full bg-black bg-gradient-to-r from-black to-green rounded-full`}
          ></div>
        );
      case 10:
        return (
          <div
            className={`w-[100%] h-full bg-black bg-gradient-to-r from-black to-green rounded-full`}
          ></div>
        );
      default:
        return (
          <div
            className={`w-[0%] h-full bg-black bg-gradient-to-r from-black to-green rounded-full`}
          ></div>
        );
    }
  };
  return (
    <div className="w-full h-3 bg-black20 rounded-full">
      {progressStyle(progress)}
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ProgressBar;
