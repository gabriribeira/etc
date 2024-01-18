import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import CategoriesInput from "./CategoriesInput";
import { IoCheckmark } from "react-icons/io5";

const FilterOverlay = ({ appliedFilters, setFilter, hideFilters, filters }) => {
  const handleFilters = (filterItem) => {
    setFilter((prevFilters) => {
      if (prevFilters.includes(filterItem)) {
        return prevFilters.filter((item) => item !== filterItem);
      } else {
        if (["All", "Active", "Done"].includes(filterItem)) {
          return ["All", "Active", "Done"].includes(filterItem)
            ? filterItem == "All"
              ? [...prevFilters, filterItem].filter(
                  (item) => item !== "Active" && item !== "Done"
                )
              : filterItem == "Active"
                ? [...prevFilters, filterItem].filter(
                    (item) => item !== "All" && item !== "Done"
                  )
                : filterItem == "Done"
                  ? [...prevFilters, filterItem].filter(
                      (item) => item !== "All" && item !== "Active"
                    )
                  : [...prevFilters, filterItem]
            : ["Everyone", "Only you"].filter((item) => item !== filterItem);
        } else if (["Everyone", "Only you"].includes(filterItem)) {
          return ["Everyone", "Only you"].includes(filterItem)
            ? filterItem == "Everyone"
              ? [...prevFilters, filterItem].filter(
                  (item) => item !== "Only you"
                )
              : filterItem == "Only you"
                ? [...prevFilters, filterItem].filter(
                    (item) => item !== "Everyone"
                  )
                : [...prevFilters, filterItem]
            : ["Everyone", "Only you"].filter((item) => item !== filterItem);
        } else {
          return [...prevFilters, filterItem];
        }
      }
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
    <div className="fixed h-screen w-screen top-0 left-0 z-[99999999999]">
      <div
        onClick={hideFilters}
        className="fixed h-screen w-screen bg-black/20 top-0 left-0"
      ></div>
      <div className="absolute bg-white bottom-0  left-0 w-screen rounded-t-[2rem] px-5 py-10">
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
                  onChange={handleFilters}
                  categorySelected={appliedFilters}
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
