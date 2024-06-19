import React, { useEffect, useState } from 'react';
import BottomBar from '../components/common/BottomBar';
import TopBar from '../components/common/TopBar';
import ShoppingList from '../components/lists/ShoppingList';
import ListsData from '../data/lists.json';
import Button from '../components/common/Button';
import { BsStars } from 'react-icons/bs';
import { PiArchive } from 'react-icons/pi';
import { useLocation } from 'react-router-dom';
import ListArchive from './ListArchive';
import { useGetHouseholdListsQuery } from '../app/api';
//import Filter from "../components/common/Filter";

const Lists = () => {
  const { data: lists, error, isLoading } = useGetHouseholdListsQuery();
  const listsData = ListsData;
  //const [lists, setLists] = useState(null);
  const [authHousehold, setAuthHousehold] = useState(null);
  const [isEnableArchive, setIsEnableArchive] = useState(false);
  const [archiveCounter, setArchiveCounter] = useState(0);
  const [isArchived, setIsArchived] = useState([]);
  const location = useLocation();
  //const [appliedFilters, setAppliedFilters] = useState([]);

  useEffect(() => {
    const getCookieValue = (cookieName) => {
      const cookies = document.cookie.split('; ');
      for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === cookieName) {
          return JSON.parse(decodeURIComponent(value));
        }
      }
      return null;
    };
    const storedHousehold = getCookieValue('household');
    if (storedHousehold) {
      setAuthHousehold(storedHousehold);
    }
  }, []);
  useEffect(() => {
    // if (listsData && authHousehold) {
    //   const householdLists = listsData.filter(
    //     (list) => list.household_id === authHousehold.id,
    //   );
    //   setLists(householdLists);
    // }
  }, [listsData, authHousehold]);

  useEffect(() => {
    if (!isEnableArchive && !location.pathname.includes('lists')) {
      setArchiveCounter(0);
      setIsArchived((prevState) => ({
        ...Object.keys(prevState).reduce((acc, key) => {
          acc[key] = false;
          return acc;
        }, {}),
      }));
    }
  }, [location.pathname, isEnableArchive]);

  const handleCheckboxChange = (itemId, newCheckedStatus, item) => {
    const itemIndex = isArchived?.findIndex((i) => i?.id === itemId);

    if (newCheckedStatus) {
      if (itemIndex === -1) {
        setArchiveCounter((prevCounter) => prevCounter + 1);
        setIsArchived((prevState) => [...prevState, item]);
      }
    } else {
      if (itemIndex !== -1) {
        setArchiveCounter((prevCounter) => prevCounter - 1);
        const updatedArchived = [...isArchived];
        updatedArchived.splice(itemIndex, 1);
        setIsArchived(updatedArchived);
      }
    }
  };

  return (
    <div className="relative bg-white min-h-screen">
      <TopBar
        isEnableArchive={isEnableArchive}
        setIsEnableArchive={setIsEnableArchive}
        setIsArchived={setIsArchived}
      />

      <main className="pt-16">
        <div className="flex flex-col px-5 fade-in">
          <div className="flex flex-col gap-y-3 mt-5">
            <div className="flex justify-center items-center">
              {isEnableArchive ? (
                <strong className={`my-2`}>{archiveCounter} selected</strong>
              ) : (
                <>
                  {location.pathname == '/lists' && (
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
                  )}
                </>
              )}
            </div>
            <div className="flex ">
              {location.pathname == '/lists' && (
                <Button
                  label={
                    <span className="flex gap-x-2 items-center text-left justify-start ml-3">
                      <div
                        className={`flex justify-center items-center w-10 h-10 rounded-full ${
                          isEnableArchive
                            ? 'bg-black40 cursor-default'
                            : 'bg-white'
                        } mr-2`}
                      >
                        <PiArchive
                          size={30}
                          color={`${isEnableArchive ? 'gray' : 'black'}`}
                        />
                      </div>
                      <span>See Archive</span>
                    </span>
                  }
                  bg={`${
                    isEnableArchive ? 'bg-black40 cursor-default' : 'bg-black'
                  } text-white text-left`}
                  to={`${isEnableArchive ? '/lists' : '/lists/archive'}`}
                  aria="Button See Archive"
                  className={`text-left`}
                ></Button>
              )}
            </div>

            {location.pathname === '/lists/archive' && (
              <ListArchive isArchived={isArchived} />
            )}

            {isLoading && <p>Loading lists...</p>}
            {error && <p>Error fetching lists: {error.message}</p>}
            {lists && lists.length > 0 && location.pathname == '/lists' ? (
              lists.map((list, index) => (
                <ShoppingList
                  list={list}
                  key={index}
                  archiveCounter={archiveCounter}
                  setArchiveCounter={setArchiveCounter}
                  isEnableArchive={isEnableArchive}
                  isArchived={isArchived}
                  handleCheckboxChange={handleCheckboxChange}
                />
              ))
            ) : (
              <p>No lists found for this household.</p>
            )}
          </div>
        </div>
      </main>

      <BottomBar
        isEnableArchive={isEnableArchive}
        setIsEnableArchive={setIsEnableArchive}
        isArchived={isArchived}
        archiveCounter={archiveCounter}
        setIsArchived={setIsArchived}
      />
    </div>
  );
};

export default Lists;
