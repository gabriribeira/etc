import React, { useEffect, useState } from "react";
import BottomBar from "../components/common/BottomBar";
import ListsData from "../data/lists.json";
import ItemsData from "../data/items.json";
import { useLocation, Link } from "react-router-dom";
import TopBar from "../components/common/TopBar";
import SearchFilter from "../components/common/SearchFilter";
import { SlArrowRight } from "react-icons/sl";
import Filter from "../components/common/Filter";
import Item from "../components/lists/Item";

const List = () => {
  const listsData = ListsData;
  const itemsData = ItemsData;
  const [list, setList] = useState(null);
  const [items, setItems] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [newItem, setNewItem] = useState("");
  const location = useLocation();
  const handleFilterClick = () => {
    console.log("Filter Clicked");
  };
  const handleNewItem = (e) => {
    e.preventDefault();
    const newItemJson = {
      id: itemsData.length + 1,
      list_id: list.id,
      name: newItem,
      price: null,
      details: "",
      brand: "",
      store: "",
      amount: null,
      unit: "",
      members: [],
      suggestion: false,
      created_at:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate(),
      created_by: null,
    };

    try {
      itemsData.push(newItemJson);
      console.log("Item added successfully!");
      setRefresh(true);
      setNewItem("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
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
    if (list && itemsData && refresh) {
      const items = itemsData.filter((item) => item.list_id === list.id);
      setItems(items);
      setRefresh(false);
    }
  }, [list, itemsData, refresh]);
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
              <form
                className="flex gap-x-3 w-full items-center h-full"
                onSubmit={handleNewItem}
              >
                <button
                  className="w-[30px] h-[30px] rounded-full bg-transparent border-2 border-white shrink-0"
                  type="button"
                ></button>
                <input
                  className="text-base font-light bg-transparent w-full placeholder-white placeholder:font-light font-normal focus:border-b-2 focus:border-white focus:outline-none transition-all duration-200 mr-5"
                  placeholder="Add a new item to the list"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                />
              </form>
              <Link
                to={`/lists/${list.id}/item/${0}`}
                className="text-2xl text-white h-full flex items-center"
              >
                <SlArrowRight />
              </Link>
            </div>
            <div className="flex flex-col-reverse gap-y-3">
              {items &&
                items.map((item, index) => (
                  <Item item={item} key={index} list_id={list.id} />
                ))}
            </div>
          </div>
        </div>
      )}
      <BottomBar />
    </div>
  );
};
export default List;
