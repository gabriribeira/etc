import React from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import ShoppingList from "../components/lists/ShoppingList";
import Button from "../components/common/Button";
import { BsStars } from 'react-icons/bs';
import { PiArchive } from "react-icons/pi";
import { useGetHouseholdListsQuery } from "../app/api";
import Loader from "../components/common/Loader";

const Lists = () => {
  const { data: lists, error, isLoading } = useGetHouseholdListsQuery();

  return (
    <div className="relative bg-white min-h-screen">
      <TopBar />
      <main className="pt-16">
        <div className="flex flex-col px-5 fade-in">
          <div className="flex flex-col gap-y-3 mt-5">
            <div className="flex justify-center items-center">
              <Button 
                label={
                  <span className="flex gap-x-2 justify-center items-center">
                    <BsStars color="white" size={30} />
                    Generate List With AI
                  </span>
                }
                bg="bg-gradient-to-r from-blue to-salmon text-white"
                to={`/lists/new`}
                state={{ aiToggle: true }}
                aria="Generate List With AI Button"
              />
            </div>
            <div className="flex ">
              <Button 
                label={
                  <span className="flex gap-x-2 items-center text-left justify-start ml-3">
                    <div className="flex justify-center items-center w-10 h-10 rounded-full bg-white mr-2">
                      <PiArchive size={30} color="black" />
                    </div>
                    <span>See Archive</span>
                  </span>
                } 
                bg="bg-black text-white text-left" 
                to="/lists/listarchive" 
                aria="Button See Archive"
                className="text-left"
              />
            </div>
            {isLoading && <Loader />}
            {error && <p>Error fetching lists: {error.message}</p>}
            {lists && lists.length > 0 ? (
              lists
                .filter((list) => list.is_finished !== true) // Filter out finished lists
                .map((list, index) => (
                  <ShoppingList list={list} key={index} />
                ))
            ) : (
              <p>No lists found for this household.</p>
            )}
          </div>
        </div>
      </main>
      <BottomBar />
    </div>
  );
};

export default Lists;
