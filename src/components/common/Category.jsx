import React from "react";
import PropTypes from "prop-types";

const Category = ({ category, value, onChange, filter, specificationsProps, categoriesProps }) => {
  return (
    category && (
      <button
        onClick={() => filter ? onChange(category.title) : onChange(category)}
        className={`w-auto py-1 px-2 rounded-2xl text-base font-normal text-center transition-all duration-300 cursor-pointer border-2 border-black ${value ? "bg-black text-white" : "bg-white text-black"}`}
        type="button"
      >
        {specificationsProps || categoriesProps ? category.name : category.title}
      </button>
    )
  );
};

Category.propTypes = {
  category: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  value: PropTypes.bool,
  onChange: PropTypes.func,
  filter: PropTypes.bool,
  specificationsProps: PropTypes.bool,
  categoriesProps: PropTypes.bool,
};

export default Category;
