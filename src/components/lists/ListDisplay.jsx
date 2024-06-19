import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  useGetListQuery,
  useGetListItemsQuery,
  useAddItemMutation,
  useLockListMutation,
  useUnlockListMutation,
  useEstimateListValueMutation,
} from "../../app/api";
import Item from "./Item";
import { SlArrowRight } from "react-icons/sl";
import TopBar from "../common/TopBar";
import { FiLock } from "react-icons/fi";
import { useSelector } from "react-redux";

const ListDisplay = () => {
  const location = useLocation();
  const listId = location.pathname.split("/")[2];
  const user = useSelector((state) => state.auth.user?.id);
  const {
    data: list,
    error: listError,
    isLoading: listLoading,
    refetch: refetchList,
  } = useGetListQuery(listId);
  const {
    data: items,
    error: itemsError,
    isLoading: itemsLoading,
    refetch: refetchItems,
  } = useGetListItemsQuery(listId);
  const [addItem] = useAddItemMutation();
  const [lockList] = useLockListMutation();
  const [unlockList] = useUnlockListMutation();
  const [estimateListValue] = useEstimateListValueMutation();
  const [estimatedValue, setEstimatedValue] = useState(null);
  const [newItem, setNewItem] = useState("");

  const handleNewItem = async (e) => {
    e.preventDefault();
    const newItemJson = {
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
      is_suggestion: false,
      is_expense: false,
      category_id: null,
      created_at: new Date().toISOString(),
      created_by: null,
    };

    try {
      await addItem(newItemJson).unwrap();
      refetchItems();
      setNewItem("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleLock = async () => {
    try {
      await lockList(list.id).unwrap();
      const response = await estimateListValue(list.id).unwrap();
      setEstimatedValue(response.data.estimatedValue);

      refetchList();
    } catch (error) {
      console.error("Error locking list:", error);
    }
  };

  const handleUnlock = async () => {
    try {
      await unlockList(list.id).unwrap();
      refetchList();
    } catch (error) {
      console.error("Error unlocking list:", error);
    }
  };

  if (listLoading || itemsLoading) return <p>Loading...</p>;
  if (listError || itemsError) return <p>Error loading data</p>;

  const isListLockedByUser = list.is_closed && list.user_id_closed === user;

  return (
    <div className="bg-white min-h-screen">
      {list && (
        <TopBar
          listTitle={list.name}
          listClosed={list.is_closed}
          lockList={handleLock}
          unlockList={handleUnlock}
        />
      )}
      {list ? (
        <>
          <main className="pt-28">
            <div className="flex flex-col px-5 fade-in">
              <div className="flex flex-col w-full mt-6 gap-y-3">
                {list.is_closed ? (
                  <div>
                    <div className="flex text-white bg-black80 px-3 py-4 rounded-2xl w-full justify-center items-center h-full">
                      <FiLock size={25} className="mr-3" /> Locked Shopping List
                      {isListLockedByUser && (
                        <button
                          onClick={handleUnlock}
                          className="ml-3 px-4 py-2 bg-red-500 text-white rounded"
                        >
                          Unlock List
                        </button>
                      )}
                    </div>
                    {list.user_id_closed && (
                      <p className="mt-2">
                        Locked by user: {list.user_id_closed}
                      </p>
                    )}
                    {estimatedValue !== null && (
                      <p className="mt-2">
                        Estimated Market Value: €{estimatedValue.toFixed(2)}
                      </p>
                    )}
                    <p className="mt-2">
                      If you want to add more items, you need to unlock the
                      Shopping List.
                    </p>
                  </div>
                ) : (
                  <div className="flex text-black border border-black px-3 py-4 rounded-2xl w-full justify-between items-center h-full">
                    <form
                      className="flex gap-x-3 w-full items-center h-full"
                      onSubmit={handleNewItem}
                    >
                      <input
                        className="text-base font-light bg-transparent w-full placeholder:font-light font-normal focus:border-b-2 focus:border-white focus:outline-none transition-all duration-200 mr-5"
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
                )}
                <div className="flex flex-col-reverse gap-y-3">
                  {items &&
                    items.map((item, index) => (
                      <Item
                        item={item}
                        key={index}
                        list_id={list.id}
                        refetch={refetchItems}
                        isListLocked={list.is_closed}
                        isListLockedByUser={isListLockedByUser}
                      />
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