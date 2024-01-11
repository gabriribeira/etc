import React from "react";
import PropTypes from "prop-types";
import Category from "./Category";
import CategoriesData from "../../data/categories.json";

const CategoriesInput = ({ label, categorySelected, onChange, filter }) => {
  const categories = CategoriesData;
  const handleChange = (category) => {
    onChange(category);
  };
  return (
    categories && (
      <div className="w-full flex flex-col">
        {label && (
          <label htmlFor={label} className="mb-2 text-lg font-semibold">
            {label}
          </label>
        )}
        <div className="flex flex-wrap gap-3 w-full">
          {filter && (
            <>
              <p>a</p>
              <button
                onClick={() => {
                  handleChange("AllTag");
                }}
                className={`w-auto py-1 px-4 rounded-2xl text-base font-normal text-center transition-all duration-300 cursor-pointer`}
                style={{
                  backgroundColor: categorySelected.includes("AllTag")
                    ? "#0f4c81"
                    : "#fcfcfc",
                  border: `2px solid #0f4c81"`,
                  color: categorySelected.includes("AllTag")
                    ? "#fcfcfc"
                    : "#0f4c81",
                }}
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
              filter={filter ? true : false}
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
  onChange: PropTypes.func,
  label: PropTypes.string,
  categorySelected: PropTypes.string,
  filter: PropTypes.bool,
};

export default CategoriesInput;
