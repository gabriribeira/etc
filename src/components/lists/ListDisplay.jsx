import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  useGetListQuery,
  useGetListItemsQuery,
  useAddItemMutation,
  useLockListMutation,
  useUnlockListMutation,
  useEstimateListValueMutation,
  useGetCategoriesQuery,
  useCheckFoodRestrictionsMutation,
} from "../../app/api";
import Item from "./Item";
import { SlArrowRight } from "react-icons/sl";
import TopBar from "../common/TopBar";
import { FiLock } from "react-icons/fi";
import { useSelector } from "react-redux";
import ConfirmationDialog from "../common/ConfirmationDialog";
import NotificationPopup from "../common/NotificationPopup";

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
  const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const [addItem] = useAddItemMutation();
  const [lockList] = useLockListMutation();
  const [unlockList] = useUnlockListMutation();
  const [estimateListValue] = useEstimateListValueMutation();
  const [checkListFoodRestrictions] = useCheckFoodRestrictionsMutation();
  const [estimatedValue, setEstimatedValue] = useState(null);
  const [newItem, setNewItem] = useState("");
  const [foodRestrictions, setFoodRestrictions] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationDetails, setConfirmationDetails] = useState("");
  const [popup, setPopup] = useState({ message: "", isVisible: false });

  useEffect(() => {
    if (location.state && location.state.message) {
      setPopup({ message: location.state.message, isVisible: true });
    }
  }, [location.state]);

  useEffect(() => {
    if (categories && !categoriesLoading) {
      const categoryMap = categories.reduce((acc, category) => {
        acc[category.id] = category.name;
        return acc;
      }, {});
      setCategoryMap(categoryMap);
    }
  }, [categories, categoriesLoading]);

  const [categoryMap, setCategoryMap] = useState({});

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
      created_at: new Date().toISOString(),
      created_by: null,
    };

    try {
      await addItem(newItemJson).unwrap();
      refetchItems();
      setNewItem("");
      setPopup({ message: "Item Added", isVisible: true });
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleLock = async () => {
    try {
      await lockList(list.id).unwrap();
      const response = await estimateListValue(list.id).unwrap();
      setEstimatedValue(response.data.estimatedValue);
      const response2 = await checkListFoodRestrictions(list.id).unwrap();
      setFoodRestrictions(response2.data.harmfulItems);

      refetchList();
      setConfirmationDetails(`The list has been locked. Estimated Market Value: €${response.data.estimatedValue.toFixed(2)}`);
      setShowConfirmation(true);
    } catch (error) {
      console.error("Error locking list:", error);
    }
  };

  const handleUnlock = async () => {
    try {
      await unlockList(list.id).unwrap();
      refetchList();
      setConfirmationDetails("The list has been unlocked.");
      setShowConfirmation(true);
    } catch (error) {
      console.error("Error unlocking list:", error);
    }
  };

  if (listLoading || itemsLoading || categoriesLoading) return <p>Loading...</p>;
  if (listError || itemsError) return <p>Error loading data</p>;

  const isListLockedByUser = list.is_closed && list.user_id_closed === user;

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    const category = item.category_id ? categoryMap[item.category_id] : "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  // Separate uncategorized items
  const uncategorizedItems = groupedItems["Uncategorized"] || [];
  delete groupedItems["Uncategorized"];

  return (
    <div className="bg-white min-h-screen">
      {list && (
        <TopBar
          listTitle={list.name}
          listClosed={list.is_closed}
          lockList={handleLock}
          unlockList={handleUnlock}
          id_List={list.id}
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
                    {foodRestrictions !== null && (
                      <p className="mt-2">
                        This list contains items that may not be suitable for one member due to food restrictions.
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
                  {uncategorizedItems.length > 0 && (
                    <div className="flex flex-col gap-y-3">
                      <h2 className="font-medium text-lg">Uncategorized</h2>
                      <div className="flex flex-col gap-3">
                        {uncategorizedItems.map((item, index) => (
                          <Item
                            item={item}
                            key={`uncategorized-${index}`}
                            list_id={list.id}
                            refetch={refetchItems}
                            isListLocked={list.is_closed}
                            isListLockedByUser={isListLockedByUser}
                            harmfulItems={foodRestrictions}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {Object.entries(groupedItems).map(([category, items]) => (
                    <div key={`category-${category}`} className="flex flex-col gap-y-3">
                      <h2 className="font-medium text-lg">{category}</h2>
                      <div className="flex flex-col gap-y-3">
                        {items.map((item, index) => (
                          <Item
                            item={item}
                            key={`category-${category}-${index}`}
                            list_id={list.id}
                            refetch={refetchItems}
                            isListLocked={list.is_closed}
                            isListLockedByUser={isListLockedByUser}
                            harmfulItems={foodRestrictions}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </>
      ) : null}
      {showConfirmation && (
        <ConfirmationDialog
          title="Action Completed"
          details={confirmationDetails}
          label="Close"
          bg="bg-black"
          showConfirmation={showConfirmation}
          setShowConfirmation={setShowConfirmation}
          action={() => setShowConfirmation(false)}
        />
      )}
      <NotificationPopup
        message={popup.message}
        isVisible={popup.isVisible}
        onClose={() => setPopup({ ...popup, isVisible: false })}
      />
    </div>
  );
};

export default ListDisplay;