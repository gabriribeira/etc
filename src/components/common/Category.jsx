import React from "react";
import PropTypes from "prop-types";

const Category = ({ category, value, onChange, filter }) => {
  return (
    category && (
      <button
        onClick={() => filter ? onChange(category.title) : onChange(category)}
        className={`w-auto py-1 px-4 rounded-2xl text-base font-normal text-center transition-all duration-300 cursor-pointer`}
        style={{
          backgroundColor: value ? category.color : "#fcfcfc",
          border: `2px solid ${category.color}`,
          color: value ? "#fcfcfc" : category.color,
        }}
        type="button"
      >
        {category.title}
      </button>
    )
  );
};

Category.propTypes = {
  category: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  filter: PropTypes.bool,
};

export default Category;
