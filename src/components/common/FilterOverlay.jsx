import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import CategoriesInput from "./CategoriesInput";
import { IoCheckmark } from "react-icons/io5";

const FilterOverlay = ({ appliedFilters, setFilter, hideFilters, filters }) => {
    const handleFilters = (filterItem) => {
        setFilter((prevFilters) => {
          const isStateFilter = ["All", "Active", "Done"].includes(filterItem);
          const isIncludeFilter = ["Everyone", "Only you"].includes(filterItem);
      
          // If the selected filter is "All", "Active", or "Done", remove the other state filters
          if (isStateFilter) {
            return ["All", "Active", "Done"].includes(filterItem)
              ? [filterItem]
              : [filterItem];
          }
      
          // If the selected filter is "Everyone" or "Only you", remove the other include filters
          if (isIncludeFilter) {
            return ["Everyone", "Only you"].includes(filterItem)
              ? [filterItem]
              : [filterItem];
          }
      
          // If the selected filter is a category, toggle its presence in the filters
          return prevFilters.includes(filterItem)
            ? prevFilters.filter((item) => item !== filterItem)
            : [...prevFilters, filterItem];
        });
      };
      

  const checkIfFilterIsApplied = (filterItem) => {
    if (appliedFilters.filter((item) => item == filterItem).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const displayFilters = (filterItem) => {
    switch (filterItem) {
      case "State":
        return (
          <div className="flex flex-col w-full ml-10 items-start font-normal gap-y-3">
            <button
              onClick={() => handleFilters("All")}
              className={`relative flex items-center ${
                checkIfFilterIsApplied("All") && "font-bold"
              }`}
            >
              All
              {checkIfFilterIsApplied("All") && (
                <IoCheckmark className="absolute top-0 text-2xl text-black right-100 -ml-10" />
              )}
            </button>
            <button
              onClick={() => handleFilters("Active")}
              className={`relative flex items-center ${
                checkIfFilterIsApplied("Active") && "font-bold"
              }`}
            >
              Active
              {checkIfFilterIsApplied("Active") && (
                <IoCheckmark className="absolute top-0 text-2xl text-black right-100 -ml-10" />
              )}
            </button>
            <button
              onClick={() => handleFilters("Done")}
              className={`relative flex items-center ${
                checkIfFilterIsApplied("Done") && "font-bold"
              }`}
            >
              Done
              {checkIfFilterIsApplied("Done") && (
                <IoCheckmark className="absolute top-0 text-2xl text-black right-100 -ml-10" />
              )}
            </button>
          </div>
        );
      case "Include":
        return (
          <div className="flex flex-col w-full ml-10 items-start font-normal gap-y-3">
            <button
              onClick={() => handleFilters("Everyone")}
              className={`relative flex items-center ${
                checkIfFilterIsApplied("Everyone") && "font-bold"
              }`}
            >
              Everyone
              {checkIfFilterIsApplied("Everyone") && (
                <IoCheckmark className="absolute top-0 text-2xl text-black right-100 -ml-10" />
              )}
            </button>
            <button
              onClick={() => handleFilters("Only you")}
              className={`relative flex items-center ${
                checkIfFilterIsApplied("Only you") && "font-bold"
              }`}
            >
              Only you
              {checkIfFilterIsApplied("Only you") && (
                <IoCheckmark className="absolute top-0 text-2xl text-black right-100 -ml-10" />
              )}
            </button>
          </div>
        );
      default:
        return "All";
    }
  };
  return (
    <div className="fixed h-screen w-screen top-0 left-0">
      <div
        onClick={hideFilters}
        className="fixed h-screen w-screen bg-black/20 top-0 left-0"
      ></div>
      <div className="absolute bg-white bottom-0 z-[101] left-0 w-screen rounded-t-[2rem] px-5 py-10">
        <div className="absolute top-[10px] left-0 w-screen flex justify-center">
          <div className="w-[25%] h-[5px] bg-black/50 rounded-full"></div>
        </div>
        <div className="flex flex-col w-full gap-y-3 mb-5">
          <h1 className="font-semibold text-2xl">Filters</h1>
          {filters &&
            filters.map((filterItem, index) =>
              filterItem == "Category" ? (
                <CategoriesInput
                  key={index}
                  label={"Categories"}
                  filter={true}
                />
              ) : (
                <div key={index} className="flex flex-col">
                  <h2 className="font-semibold text-lg">{filterItem}</h2>
                  {displayFilters(filterItem)}
                </div>
              )
            )}
        </div>
        <Button label={"Apply Filters"} action={hideFilters} />
      </div>
    </div>
  );
};

FilterOverlay.propTypes = {
  appliedFilters: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
  hideFilters: PropTypes.func.isRequired,
};

export default FilterOverlay;
