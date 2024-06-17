import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Category from "./Category";
import { useGetTagsQuery } from "../../app/api";

const CategoriesInput = ({ label, categorySelected, onChange, filter }) => {
  const { data: categories } = useGetTagsQuery();

  const handleChange = (category) => {
    if (categorySelected.includes(category)) {
      const newCategory = categorySelected.filter((item) => item !== category);
      return onChange(newCategory);
    } else {
      return onChange([...categorySelected, category]);
    }
  };

  useEffect(() => {
    console.log(categorySelected);
  }, [categorySelected]);

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
              value={categorySelected.includes(category) ? true : false}
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
  categorySelected: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  filter: PropTypes.bool,
};

export default CategoriesInput;
