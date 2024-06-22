import React, { useState } from "react";
import PropTypes from "prop-types";
import Category from "./Category";
import { useGetTagsQuery, useGetSpecificationsQuery, useGetCategoriesQuery } from "../../app/api";

const CategoriesInput = ({ label, categorySelected, onChange, filter, specificationsProps, categoriesProps }) => {
  const { data: categories } = useGetTagsQuery();
  const [showAll, setShowAll] = useState(false);
  const { data: specifications } = useGetSpecificationsQuery();
  const { data: categoriesLegit } = useGetCategoriesQuery();

  const handleChange = (category) => {
    if (specificationsProps) {
      handleSpecifications(category);
    } else if (categoriesProps) {
      handleCategories(category);
    } else {
      handleTags(category);
    }
  };

  const handleTags = (category) => {
    if (categorySelected === category.id) {
      onChange(null); // Deselect if the same category is clicked
    } else {
      onChange(category.id); // Select the new category
    }
  };

  const handleCategories = (spec) => {
    if (categorySelected === spec.id) {
      onChange(null); // Deselect if the same category is clicked
    } else {
      onChange(spec.id); // Select the new category
    }
  };

  const handleSpecifications = (spec) => {
    if (categorySelected === spec.id) {
      onChange(null); // Deselect if the same category is clicked
    } else {
      onChange(spec.id); // Select the new category
    }
  };

  const isCategorySelected = (id) => {
    return categorySelected === id;
  };

  return (
    categories && specifications && categoriesLegit && (
      <div className="w-full flex flex-col">
        {label && (
          <div className="flex justify-between items-center mb-2">
            <label htmlFor={label} className="text-lg font-semibold">
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
          )) : categoriesProps ? categoriesLegit.slice(0, showAll ? categoriesLegit.length : 3).map((category) => (
            <Category
              key={category.id}
              category={category}
              onChange={handleChange}
              filter={filter}
              value={isCategorySelected(category.id)}
              categoriesProps={categoriesProps}
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
  categorySelected: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // Changed to allow single category selection
  filter: PropTypes.bool,
  specificationsProps: PropTypes.bool,
  categoriesProps: PropTypes.bool,
};

export default CategoriesInput;