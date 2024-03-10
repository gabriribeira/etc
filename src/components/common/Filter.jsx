import React from "react";
import PropTypes from "prop-types";

const Filter = ({ onClick }) => {
  return (
    <div className="flex items-center justify-center ml-2">
      <button
        className="flex items-center justify-center bg-white rounded-full w-10 h-10"
        onClick={onClick}
      >
        <svg
          className="w-6 h-6 text-black80"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4 6h16M4 12h8m-8 6h16"
          ></path>
        </svg>
      </button>
    </div>
  );
};

Filter.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Filter;
