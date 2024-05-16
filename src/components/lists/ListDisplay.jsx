// src/components/lists/ListDisplay.jsx

import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Item from "./Item";
import { SlArrowRight } from "react-icons/sl";
import TopBar from "../common/TopBar";
import ListsData from "../../data/lists.json";
import ItemsData from "../../data/items.json";

const ListDisplay = () => {
  const listsData = ListsData;
  const itemsData = ItemsData;
  const [list, setList] = useState(null);
  const [items, setItems] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [newItem, setNewItem] = useState("");
  const location = useLocation();

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
      photo: "",
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
    <div className="bg-white min-h-screen">
      {list && <TopBar listTitle={list.title} />}
      {list ? (
        <>
          <main className="pt-28">
            <div className="flex flex-col px-5 fade-in">
              <div className="flex flex-col w-full mt-6 gap-y-3">
                <div className="flex text-black border border-black px-3 py-4 rounded-2xl w-full justify-between items-center h-full">
                  <form
                    className="flex gap-x-3 w-full items-center h-full"
                    onSubmit={handleNewItem}
                  >
                    <input
                      className="text-base font-light bg-transparent w-full  placeholder:font-light font-normal focus:border-b-2 focus:border-white focus:outline-none transition-all duration-200 mr-5"
                      placeholder="Add a new item to the list"
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      autoFocus
                      required
                    />
                  </form>
                  <Link
                    to={`/lists/${list.id}/item/${0}`}
                    className="text-2xl text-black h-full flex items-center"
                    aria-label="Add a new item"
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
          </main>
        </>
      ) : null}
    </div>
  );
};

export default ListDisplay;
