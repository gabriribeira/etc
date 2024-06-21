import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import CategoriesData from "../../data/categories.json";
import { IoCheckmark } from "react-icons/io5";

const FilterOverlay = ({ appliedFilters, setFilter, hideFilters, filters, location }) => {
  const handleFilters = (filterItem) => {
    setFilter((prevFilters) => {
      if (prevFilters.includes(filterItem)) {
        return prevFilters.filter((item) => item !== filterItem);
      } else {
        if (["All", "Unchecked", "Checked"].includes(filterItem)) {
          return ["All", "Unchecked", "Checked"].includes(filterItem)
            ? filterItem === "All"
              ? [...prevFilters, filterItem].filter(
                  (item) => item !== "Unchecked" && item !== "Checked"
                )
              : filterItem === "Unchecked"
              ? [...prevFilters, filterItem].filter(
                  (item) => item !== "All" && item !== "Checked"
                )
              : filterItem === "Checked"
              ? [...prevFilters, filterItem].filter(
                  (item) => item !== "All" && item !== "Unchecked"
                )
              : [...prevFilters, filterItem]
            : ["Everyone", "You"].filter((item) => item !== filterItem);
        } else if (["AllLists", "Opened", "Closed"].includes(filterItem)) {
          return ["AllLists", "Opened", "Closed"].includes(filterItem)
            ? filterItem === "AllLists"
              ? [...prevFilters, filterItem].filter(
                  (item) => item !== "Opened" && item !== "Closed"
                )
              : filterItem === "Opened"
              ? [...prevFilters, filterItem].filter(
                  (item) => item !== "AllLists" && item !== "Closed"
                )
              : filterItem === "Closed"
              ? [...prevFilters, filterItem].filter(
                  (item) => item !== "AllLists" && item !== "Opened"
                )
              : [...prevFilters, filterItem]
            : ["Everyone", "You"].filter((item) => item !== filterItem);
        } else if (["Everyone", "You"].includes(filterItem)) {
          return ["Everyone", "You"].includes(filterItem)
            ? filterItem === "Everyone"
              ? [...prevFilters, filterItem].filter((item) => item !== "You")
              : filterItem === "You"
              ? [...prevFilters, filterItem].filter((item) => item !== "Everyone")
              : [...prevFilters, filterItem]
            : ["Everyone", "You"].filter((item) => item !== filterItem);
        } else {
          return [...prevFilters, filterItem];
        }
      }
    });
  };

  const checkIfFilterIsApplied = (filterItem) => {
    if (
      (filterItem === "All" || filterItem === "AllLists" || filterItem === "Everyone") &&
      appliedFilters.length === 0
    ) {
      return true;
    }
    return appliedFilters.includes(filterItem);
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
              onClick={() => handleFilters("Unchecked")}
              className={`relative flex items-center ${
                checkIfFilterIsApplied("Unchecked") && "font-bold"
              }`}
            >
              Unchecked
              {checkIfFilterIsApplied("Unchecked") && (
                <IoCheckmark className="absolute top-0 text-2xl text-black right-100 -ml-10" />
              )}
            </button>
            <button
              onClick={() => handleFilters("Checked")}
              className={`relative flex items-center ${
                checkIfFilterIsApplied("Checked") && "font-bold"
              }`}
            >
              Checked
              {checkIfFilterIsApplied("Checked") && (
                <IoCheckmark className="absolute top-0 text-2xl text-black right-100 -ml-10" />
              )}
            </button>
          </div>
        );

      case "Lists":
        return (
          <div className="flex flex-col w-full ml-10 items-start font-normal gap-y-3">
            <button
              onClick={() => handleFilters("AllLists")}
              className={`relative flex items-center ${
                checkIfFilterIsApplied("AllLists") && "font-bold"
              }`}
            >
              All
              {checkIfFilterIsApplied("AllLists") && (
                <IoCheckmark className="absolute top-0 text-2xl text-black right-100 -ml-10" />
              )}
            </button>
            <button
              onClick={() => handleFilters("Opened")}
              className={`relative flex items-center ${
                checkIfFilterIsApplied("Opened") && "font-bold"
              }`}
            >
              Unlocked
              {checkIfFilterIsApplied("Opened") && (
                <IoCheckmark className="absolute top-0 text-2xl text-black right-100 -ml-10" />
              )}
            </button>
            <button
              onClick={() => handleFilters("Closed")}
              className={`relative flex items-center ${
                checkIfFilterIsApplied("Closed") && "font-bold"
              }`}
            >
              Locked
              {checkIfFilterIsApplied("Closed") && (
                <IoCheckmark className="absolute top-0 text-2xl text-black right-100 -ml-10" />
              )}
            </button>
          </div>
        );

      case "Products For":
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
              onClick={() => handleFilters("You")}
              className={`relative flex items-center ${
                checkIfFilterIsApplied("You") && "font-bold"
              }`}
            >
              You
              {checkIfFilterIsApplied("You") && (
                <IoCheckmark className="absolute top-0 text-2xl text-black right-100 -ml-10" />
              )}
            </button>
          </div>
        );

      case "Include":
        return (
          <div className="flex flex-col w-full ml-10 items-start font-normal gap-y-3">
            <button
              onClick={() => handleFilters("Cheapest")}
              className={`relative flex items-center ${
                checkIfFilterIsApplied("Cheapest") && "font-bold"
              }`}
            >
              Cheapest Suggestions
              {checkIfFilterIsApplied("Cheapest") && (
                <IoCheckmark className="absolute top-0 text-2xl text-black right-100 -ml-10" />
              )}
            </button>
            <button
              onClick={() => handleFilters("Greenest")}
              className={`relative flex items-center ${
                checkIfFilterIsApplied("Greenest") && "font-bold"
              }`}
            >
              Greenest Suggestions
              {checkIfFilterIsApplied("Greenest") && (
                <IoCheckmark className="absolute top-0 text-2xl text-black right-100 -ml-10" />
              )}
            </button>
            <button
              onClick={() => handleFilters("Simple")}
              className={`relative flex items-center ${
                checkIfFilterIsApplied("Simple") && "font-bold"
              }`}
            >
              Simple Products
              {checkIfFilterIsApplied("Simple") && (
                <IoCheckmark className="absolute top-0 text-2xl text-black right-100 -ml-10" />
              )}
            </button>
            <button
              onClick={() => handleFilters("Detailed")}
              className={`relative flex items-center ${
                checkIfFilterIsApplied("Detailed") && "font-bold"
              }`}
            >
              Detailed Products
              {checkIfFilterIsApplied("Detailed") && (
                <IoCheckmark className="absolute top-0 text-2xl text-black right-100 -ml-10" />
              )}
            </button>
          </div>
        );

      case "Category": {
        const categoryType = location.pathname === "/expenses" ? "Expense" : "List";
        return (
          <div className="flex flex-wrap gap-2">
            {CategoriesData.filter(category => category.type === categoryType).map((category, index) => (
              <button
                key={index}
                onClick={() => handleFilters(category.title)}
                className={`py-1 px-2 border border-black rounded-2xl text-base font-normal transition-all duration-300 ${
                  checkIfFilterIsApplied(category.title) ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        );
      }

      case "Paid by":
        return (
          <div className="flex flex-col w-full ml-10 items-start font-normal gap-y-3">
            <button
              onClick={() => handleFilters("You")}
              className={`relative flex items-center ${
                checkIfFilterIsApplied("You") && "font-bold"
              }`}
            >
              Everyone
              {checkIfFilterIsApplied("You") && (
                <IoCheckmark className="absolute top-0 text-2xl text-black right-100 -ml-10" />
              )}
            </button>
            <button
              onClick={() => handleFilters("Others")}
              className={`relative flex items-center ${
                checkIfFilterIsApplied("Others") && "font-bold"
              }`}
            >
              Only you
              {checkIfFilterIsApplied("Others") && (
                <IoCheckmark className="absolute top-0 text-2xl text-black right-100 -ml-10" />
              )}
            </button>
          </div>
        );

      case "Order by":
        return (
          <div className="flex flex-col w-full ml-10 items-start font-normal gap-y-3">
            <button
              onClick={() => handleFilters("Price Low to High")}
              className={`relative flex items-center ${
                checkIfFilterIsApplied("Price Low to High") && "font-bold"
              }`}
            >
              Price Low to High
              {checkIfFilterIsApplied("Price Low to High") && (
                <IoCheckmark className="absolute top-0 text-2xl text-black right-100 -ml-10" />
              )}
            </button>
            <button
              onClick={() => handleFilters("Price High to Low")}
              className={`relative flex items-center ${
                checkIfFilterIsApplied("Price High to Low") && "font-bold"
              }`}
            >
              Price High to Low
              {checkIfFilterIsApplied("Price High to Low") && (
                <IoCheckmark className="absolute top-0 text-2xl text-black right-100 -ml-10" />
              )}
            </button>
            <button
              onClick={() => handleFilters("Popularity")}
              className={`relative flex items-center ${
                checkIfFilterIsApplied("Popularity") && "font-bold"
              }`}
            >
              Popularity
              {checkIfFilterIsApplied("Popularity") && (
                <IoCheckmark className="absolute top-0 text-2xl text-black right-100 -ml-10" />
              )}
            </button>
          </div>
        );

      case "Supermarket":
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
              onClick={() => handleFilters("Aldi")}
              className={`relative flex items-center ${
                checkIfFilterIsApplied("Aldi") && "font-bold"
              }`}
            >
              Aldi
              {checkIfFilterIsApplied("Aldi") && (
                <IoCheckmark className="absolute top-0 text-2xl text-black right-100 -ml-10" />
              )}
            </button>
            <button
              onClick={() => handleFilters("Auchan")}
              className={`relative flex items-center ${
                checkIfFilterIsApplied("Auchan") && "font-bold"
              }`}
            >
              Auchan
              {checkIfFilterIsApplied("Auchan") && (
                <IoCheckmark className="absolute top-0 text-2xl text-black right-100 -ml-10" />
              )}
            </button>
            <button
              onClick={() => handleFilters("Continente")}
              className={`relative flex items-center ${
                checkIfFilterIsApplied("Continente") && "font-bold"
              }`}
            >
              Continente
              {checkIfFilterIsApplied("Continente") && (
                <IoCheckmark className="absolute top-0 text-2xl text-black right-100 -ml-10" />
              )}
            </button>
            <button
              onClick={() => handleFilters("Lidl")}
              className={`relative flex items-center ${
                checkIfFilterIsApplied("Lidl") && "font-bold"
              }`}
            >
              Lidl
              {checkIfFilterIsApplied("Lidl") && (
                <IoCheckmark className="absolute top-0 text-2xl text-black right-100 -ml-10" />
              )}
            </button>
            <button
              onClick={() => handleFilters("Mercadona")}
              className={`relative flex items-center ${
                checkIfFilterIsApplied("Mercadona") && "font-bold"
              }`}
            >
              Mercadona
              {checkIfFilterIsApplied("Mercadona") && (
                <IoCheckmark className="absolute top-0 text-2xl text-black right-100 -ml-10" />
              )}
            </button>
            <button
              onClick={() => handleFilters("Pingo Doce")}
              className={`relative flex items-center ${
                checkIfFilterIsApplied("Pingo Doce") && "font-bold"
              }`}
            >
              Pingo Doce
              {checkIfFilterIsApplied("Pingo Doce") && (
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
      <div className="absolute bg-white bottom-0 left-0 w-screen max-h-[80%] overflow-y-auto rounded-t-[2rem] px-5 py-10">
        <div className="absolute top-[10px] left-0 w-screen flex justify-center">
          <div className="w-[25%] h-[5px] bg-black/50 rounded-full"></div>
        </div>
        <div className="flex flex-col w-full gap-y-3 mb-5">
          <h1 className="font-semibold text-2xl">Filters</h1>
          {filters &&
            filters.map((filterItem, index) => (
              <div key={index} className="flex flex-col">
                <h2 className="font-semibold text-lg">{filterItem}</h2>
                {displayFilters(filterItem)}
              </div>
            ))}
        </div>
        <Button label={"Apply Filters"} action={hideFilters} />
      </div>
    </div>
  );
};

FilterOverlay.propTypes = {
  appliedFilters: PropTypes.array.isRequired,
  setFilter: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
  hideFilters: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default FilterOverlay;
