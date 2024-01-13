import React, { useEffect, useState } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import SearchFilter from "../components/common/SearchFilter";
import Filter from "../components/common/Filter";
import ShoppingList from "../components/lists/ShoppingList";
import ListsData from "../data/lists.json";

const Lists = () => {
  const listsData = ListsData;
  const [lists, setLists] = useState(null);
  const handleFilterClick = () => {
    console.log("Filter Clicked");
  };
  useEffect(() => {
    if (listsData) {
      const householdLists = listsData.filter(
        (list) => list.household_id === 1
      ); //Não esquecer de mudar o household_id para o id da casa do user
      setLists(householdLists);
    }
  }, [listsData]);

  return (
    <div>
      <TopBar />
      <div className="flex flex-col px-5">
        <div className="flex items-center">
          <SearchFilter />
          <Filter onClick={handleFilterClick} />
        </div>
        <div className="flex flex-col gap-y-3 mt-6">
          {lists &&
            lists.length > 0 &&
            lists.map((list, index) => (
              <ShoppingList list={list} key={index} />
            ))}
        </div>
      </div>
      <BottomBar />
    </div>
  );
};
export default Lists;
