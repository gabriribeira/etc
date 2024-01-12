import React, { useEffect, useState } from "react";
import BottomBar from "../components/common/BottomBar";
import ListsData from "../data/lists.json";
import ItemsData from "../data/items.json";
import { useLocation, Link } from "react-router-dom";
import TopBar from "../components/common/TopBar";
import SearchFilter from "../components/common/SearchFilter";
import { SlArrowRight } from "react-icons/sl";
import Filter from "../components/common/Filter";

const List = () => {
  const listsData = ListsData;
  const itemsData = ItemsData;
  const [list, setList] = useState(null);
  const [items, setItems] = useState(null);
  const [newItem, setNewItem] = useState("");
  const location = useLocation();
  const handleFilterClick = () => {
    console.log("Filter Clicked");
  };
  useEffect(() => {
    if (location.pathname && location.pathname.split("/")[2] && listsData) {
      console.log(location.pathname.split("/")[2]);
      const list = listsData.filter(
        (list) => list.id == location.pathname.split("/")[2]
      );
      setList(list[0]);
    }
  }, [location.pathname, listsData]);
  useEffect(() => {
    if (list && itemsData) {
      const items = itemsData.filter((item) => item.list_id === list.id);
      setItems(items);
    }
  }, [list, itemsData]);
  return (
    <div>
      <TopBar />
      {list && (
        <div className="flex flex-col px-5">
          <div className="flex items-center">
            <SearchFilter />
            <Filter onClick={handleFilterClick} />
          </div>
          <div className="flex flex-col w-full mt-6 gap-y-3">
            <div className="flex text-white bg-blue px-3 py-4 rounded-2xl w-full justify-between items-center h-full">
              <div className="flex gap-x-3 w-full items-center h-full">
                <button className="w-[30px] h-[30px] rounded-full bg-transparent border-2 border-white shrink-0"></button>
                <input
                  className="text-base font-light bg-transparent w-full placeholder-white placeholder:font-light font-normal focus:border-b-2 focus:border-white focus:outline-none transition-all duration-200 mr-5" 
                  placeholder="Add a new item to the list"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                />
              </div>
              <div className="text-2xl text-white h-full flex items-center">
                <SlArrowRight />
              </div>
            </div>
            {items &&
              items.map((item, index) => (
                <Link
                  to={`/lists/${list.id}/item/${item.id}`}
                  className="flex items-center justify-between bg-blue80 rounded-2xl px-3 py-2 mb-3"
                  key={index}
                >
                  <div className="flex flex-col text-white">
                    <h1 className="text-xl font-semibold">{item.title}</h1>
                    <p className="font-light">{item.quantity}</p>
                  </div>
                  <div className="text-xl text-white">
                    <SlArrowRight />
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
      <BottomBar />
    </div>
  );
};
export default List;
