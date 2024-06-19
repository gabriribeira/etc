import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Category from "./Category";
import { useGetTagsQuery } from "../../app/api";

const CategoriesInput = ({ label, categorySelected, onChange, filter }) => {
  const { data: categories } = useGetTagsQuery();
  const [showAll, setShowAll] = useState(false);

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
          <div className="flex justify-between items-center mb-2">
            <label htmlFor={label} className="text-lg font-medium">
              {label}
            </label>
            <button
              className="text-blue-500 "
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "View Less" : "View All"}
            </button>
          </div>
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
          {categories.slice(0, showAll ? categories.length : 3).map((category, index) => (
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
  categorySelected: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  filter: PropTypes.bool,
};

export default CategoriesInput;
