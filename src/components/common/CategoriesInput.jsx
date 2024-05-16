import React from "react";
import PropTypes from "prop-types";
import Category from "./Category";
import CategoriesData from "../../data/categories.json";

const CategoriesInput = ({ label, categorySelected, onChange, filter, type }) => {
  // Filter categories based on the type prop
  const categories = CategoriesData.filter(category => category.type === type);

  const handleChange = (category) => {
    onChange(category);
  };

  return (
    categories && (
      <div className="w-full flex flex-col">
        {label && (
          <label htmlFor={label} className="mb-2 text-lg font-medium">
            {label}
          </label>
        )}
        <div className="flex flex-wrap gap-2 w-full">
          {filter && (
            <>
              <button
                onClick={() => handleChange("AllTag")}
                className="w-auto py-1 px-2 rounded-2xl text-base font-normal text-center transition-all duration-300 cursor-pointer bg-white"
                type="button"
              >
                All
              </button>
            </>
          )}
          {categories.map((category, index) => (
            <Category
              key={index}
              category={category}
              onChange={handleChange}
              filter={filter}
              value={
                filter
                  ? categorySelected.includes(category.title)
                    ? true
                    : false
                  : categorySelected
                  ? categorySelected.id === category.id
                    ? true
                    : false
                  : false
              }
            />
          ))}
        </div>
      </div>
    )
  );
};

CategoriesInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  categorySelected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  filter: PropTypes.bool,
  type: PropTypes.string.isRequired,  // Ensure type is a required string
};

export default CategoriesInput;
