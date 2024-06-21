import React, { useState } from "react";
import PropTypes from "prop-types";
import Category from "./Category";
import { useGetTagsQuery, useGetSpecificationsQuery } from "../../app/api";

const CategoriesInput = ({ label, categorySelected, onChange, filter, specificationsProps }) => {
  const { data: categories } = useGetTagsQuery();
  const [showAll, setShowAll] = useState(false);
  const { data: specifications } = useGetSpecificationsQuery();

  const handleChange = (category) => {
    if (specificationsProps) {
      handleSpecifications(category);
    } else {
      handleTags(category);
    }
  };

  const handleTags = (category) => {
    const selectedCategories = Array.isArray(categorySelected) ? categorySelected : [];
    if (selectedCategories.find((item) => item.id === category.id)) {
      const newCategory = selectedCategories.filter((item) => item.id !== category.id);
      onChange(newCategory);
    } else {
      onChange([...selectedCategories, category]);
    }
  };

  const handleSpecifications = (spec) => {
    const selectedSpecifications = Array.isArray(categorySelected) ? categorySelected : [];
    if (selectedSpecifications.find((item) => item.id === spec.id)) {
      const newSpecifications = selectedSpecifications.filter((item) => item.id !== spec.id);
      onChange(newSpecifications);
    } else {
      onChange([...selectedSpecifications, spec]);
    }
  };

  const isCategorySelected = (id) => {
    const selectedCategories = Array.isArray(categorySelected) ? categorySelected : [];
    return selectedCategories.some((selected) => selected.id === id);
  };

  return (
    categories && specifications && (
      <div className="w-full flex flex-col">
        {label && (
          <div className="flex justify-between items-center mb-2">
            <label htmlFor={label} className="text-lg font-medium">
              {label}
            </label>
            <button
              className="text-blue-500"
              onClick={() => setShowAll(!showAll)}
              type="button"
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
          {specificationsProps ? specifications.map((spec) => (
            <Category
              key={spec.id}
              category={spec}
              onChange={handleChange}
              filter={filter}
              value={isCategorySelected(spec.id)}
              specificationsProps={specificationsProps}
            />
          )) :
            categories.slice(0, showAll ? categories.length : 3).map((category) => (
              <Category
                key={category.id}
                category={category}
                onChange={handleChange}
                filter={filter}
                value={isCategorySelected(category.id)}
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
  specificationsProps: PropTypes.bool,
};

export default CategoriesInput;