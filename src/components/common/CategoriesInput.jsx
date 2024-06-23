import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Category from "./Category";
import { useGetTagsQuery, useGetSpecificationsQuery, useGetCategoriesQuery } from "../../app/api";

const CategoriesInput = ({ label, categorySelected = [], onChange, filter, specificationsProps, categoriesProps }) => {
  const { data: tags, error: tagsError } = useGetTagsQuery();
  const { data: specifications, error: specificationsError } = useGetSpecificationsQuery();
  const { data: categoriesLegit, error: categoriesLegitError } = useGetCategoriesQuery();
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Handle initial selection
  }, [tags, specifications, categoriesLegit]);

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
    const newSelection = categorySelected.includes(category.id)
      ? categorySelected.filter(id => id !== category.id)
      : [...categorySelected, category.id];
    onChange(newSelection);
  };

  const handleCategories = (category) => {
    const newSelection = categorySelected.includes(category.id)
      ? categorySelected.filter(id => id !== category.id)
      : [...categorySelected, category.id];
    onChange(newSelection);
  };

  const handleSpecifications = (spec) => {
    const newSelection = categorySelected.includes(spec.id)
      ? categorySelected.filter(id => id !== spec.id)
      : [...categorySelected, spec.id];
    onChange(newSelection);
  };

  const isCategorySelected = (id) => {
    return categorySelected.includes(id);
  };

  if (tagsError || specificationsError || categoriesLegitError) {
    return <div>Error loading categories</div>;
  }

  return (
    (tags || specifications || categoriesLegit) && (
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
            <button
              onClick={() => handleChange({ id: "AllTag" })}
              className="w-auto py-1 px-2 rounded-2xl text-base font-normal text-center transition-all duration-300 cursor-pointer bg-white"
              type="button"
            >
              All
            </button>
          )}
          {specificationsProps
            ? specifications?.map((spec) => (
                <Category
                  key={spec.id}
                  category={spec}
                  onChange={handleChange}
                  filter={filter}
                  value={isCategorySelected(spec.id)}
                  specificationsProps={specificationsProps}
                />
              ))
            : categoriesProps
            ? categoriesLegit?.slice(0, showAll ? categoriesLegit.length : 3).map((category) => (
                <Category
                  key={category.id}
                  category={category}
                  onChange={handleChange}
                  filter={filter}
                  value={isCategorySelected(category.id)}
                  categoriesProps={categoriesProps}
                />
              ))
            : tags?.slice(0, showAll ? tags.length : 3).map((category) => (
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
  categorySelected: PropTypes.arrayOf(PropTypes.number),
  filter: PropTypes.bool,
  specificationsProps: PropTypes.bool,
  categoriesProps: PropTypes.bool,
};

export default CategoriesInput;