import React, { useEffect, useState } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import ShoppingList from "../components/lists/ShoppingList";
import ListsData from "../data/lists.json";

const Lists = () => {
  const listsData = ListsData;
  const [lists, setLists] = useState(null);
  const [authHousehold, setAuthHousehold] = useState(null);
  useEffect(() => {
    const getCookieValue = (cookieName) => {
      const cookies = document.cookie.split("; ");
      for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === cookieName) {
          return JSON.parse(decodeURIComponent(value));
        }
      }
      return null;
    };
    const storedHousehold = getCookieValue("household");
    if (storedHousehold) {
      setAuthHousehold(storedHousehold);
    }
  }, []);
  useEffect(() => {
    if (listsData && authHousehold) {
      const householdLists = listsData.filter(
        (list) => list.household_id === authHousehold.id
      );
      setLists(householdLists);
    }
  }, [listsData, authHousehold]);

  return (
    <div className="relative bg-white min-h-screen">
      <TopBar />
      <div className="flex flex-col px-5 fade-in">
        <div className="flex flex-col gap-y-3 mt-5">
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
