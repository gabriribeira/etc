import React, { useEffect, useState } from "react";
import BottomBar from "../components/common/BottomBar";
import ListsData from "../data/lists.json";
import ItemsData from "../data/items.json";
import { useLocation, Link } from "react-router-dom";
import TopBar from "../components/common/TopBar";
// import SearchFilter from "../components/common/SearchFilter";
import { SlArrowRight } from "react-icons/sl";
import Item from "../components/lists/Item";
import Input from "../components/common/Input";
import AddMembers from "../components/common/AddMembers";
import AiStarsImg from "../assets/imgs/etc/ai-stars.svg"
import ToggleSwitch from "../components/common/ToggleSwitch";
import Button from "../components/common/Button";

const List = () => {
  const listsData = ListsData;
  const itemsData = ItemsData;
  const [list, setList] = useState(null);
  const [items, setItems] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [newItem, setNewItem] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [aiToggle, setAiToggle] = useState(false);
  const [recipeSelected, setRecipeSelected] = useState(false);
  const [eventSelected, setEventSelected] = useState(false);
  const location = useLocation();
  const handleRecipeButton = () => {
    setEventSelected(false);
    setRecipeSelected(true);
    setDescription("");
  }

  const handleEventButton = () => {
    setEventSelected(true);
    setRecipeSelected(false);
    setDescription("");
  }
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
      const list = listsData.filter(
        (list) => list.id == location.pathname.split("/")[2],
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
  useEffect(() => {
    setRecipeSelected(false);
    setEventSelected(false);
    setDescription("");
  }, [aiToggle]);
  return (
    <div className="bg-white min-h-screen">
      <TopBar listTitle={list ? list.title : ""} />
      {list ? (
        <>
          <main>
            <div className="flex flex-col px-5 fade-in">
              <div className="flex items-center">
                {/* {<SearchFilter />} */}
                {/* <Filter onClick={handleFilterClick} /> */}
              </div>
              <div className="flex flex-col w-full mt-6 gap-y-3">
                <div className="flex text-white bg-black bg-gradient-to-br from-black90 to-white/40 px-3 py-4 rounded-2xl w-full justify-between items-center h-full">
                  <form
                    className="flex gap-x-3 w-full items-center h-full"
                    onSubmit={handleNewItem}
                  >
                    <input
                      className="text-base font-light bg-transparent w-full placeholder-white placeholder:font-light font-normal focus:border-b-2 focus:border-white focus:outline-none transition-all duration-200 mr-5"
                      placeholder="Add a new item to the list"
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      autoFocus
                    />
                  </form>
                  <Link
                    to={`/lists/${list.id}/item/${0}`}
                    className="text-2xl text-white h-full flex items-center"
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
      ) : (
        <div className="flex flex-col px-5 fade-in">
          <div className="flex flex-col w-full mt-6 gap-y-3">
            <form>
              <Input label="Name" value={name} onChange={setName} placeholder={`List Name`}/>
              <br />
              {!aiToggle && (
                <>
                  <Input label="Description" value={description} onChange={setDescription} placeholder={`Eg: Secret Santa Dinner Shopping`}/>
                </>
              )}
              <br />
              <AddMembers />
              <div className="mt-6 flex flex-row justify-between align-middle items-center">
                <div className="flex align-middle items-center">
                  <img src={AiStarsImg}/>
                  <p className="ms-4 font-bold ai-linear-text-gradient">Generate List With AI</p>
                </div>
                <ToggleSwitch checked={aiToggle} onChange={setAiToggle} />
              </div>
              {aiToggle &&(
                <div className="flex flex-col">
                  <h4 className="text-[16px] my-2">An easier and faster way to create a shopping list. <strong className="inline ai-linear-text-gradient">Powered</strong> by et.cetera’s AI</h4>
                  <p className="text-[14px]">You can ask AI to generate the ingredients of a recipe or to help you out with the shopping list for your next event!</p>
                  <br />
                  <Button label="Recipe" stroke={true} action={handleRecipeButton} customBorder={recipeSelected ? "ai-border-gradient" : ""}/>
                  <br />
                  <Button label="Event" stroke={true} action={handleEventButton} customBorder={eventSelected ? "ai-border-gradient" : ""}/>
                  <br />
                  {recipeSelected && (
                    <>
                      <p className="text-[16px]">What recipe do you want to generate?</p>
                      <p className="text-[14px] my-2">Your recipe can be found in the list`s description.</p>
                    </>
                  )}
                  {eventSelected && (
                    <>
                      <p className="text-[16px]">What event do you need help with?</p>
                      <p className="text-[14px] my-2">I will help you create a list for the event you need.</p>
                    </>
                  )}
                  {(recipeSelected || eventSelected) && (
                    <Input label="" value={description} onChange={setDescription} placeholder={`${eventSelected ? "Eg: Birthday dinner for 5 friends, picnic date" : "Eg: Vegetarian Lasagna, Gluten Free"}`}/>
                  )}
                </div>
              )}
              <div className="my-6">
                <Button label="Done" submit={true} turnDisabled={!name || (name && aiToggle && !description)}/>
              </div>
            </form>
          </div>
        </div>
      )}
      <BottomBar />
    </div>
  );
};
export default List;
