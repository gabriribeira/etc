import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingList from "../components/lists/ShoppingList";
import ConfirmationDialog from "../components/common/ConfirmationDialog";
import { useGetHouseholdListsQuery, useArchiveListMutation, useDeleteListMutation } from "../app/api";
import Loader from "../components/common/Loader";
import NotificationPopup from "../components/common/NotificationPopup";

function ListArchive() {
  const [selectedLists, setSelectedLists] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showArchiveConfirmation, setShowArchiveConfirmation] = useState(false);
  const navigate = useNavigate();
  const [popup, setPopup] = useState({ message: "", isVisible: false });

  const { data: lists, error, isLoading, refetch } = useGetHouseholdListsQuery();
  const [archiveList] = useArchiveListMutation();
  const [deleteList] = useDeleteListMutation();

  const handleCheckboxChange = (listId) => {
    console.log("List ID selected:", listId);
    setSelectedLists((prevSelected) =>
      prevSelected.includes(listId)
        ? prevSelected.filter((id) => id !== listId)
        : [...prevSelected, listId]
    );
  };

  const handleDoneClick = () => {
    console.log("Done button clicked");
    navigate("/lists", { state: { message: "Lists archived" } });
  };

  const handleArchiveClick = () => {
    console.log("Archive button clicked with selected lists:", selectedLists);
    setShowArchiveConfirmation(true);
  };

  const handleDeleteClick = () => {
    console.log("Delete button clicked with selected lists:", selectedLists);
    setShowDeleteConfirmation(true);
  };

  const handleArchiveList = async () => {
    console.log("Confirmed archive for lists:", selectedLists);
    for (const listId of selectedLists) {
      await archiveList(listId);
      setPopup({ message: "List archived", isVisible: true });
    }
    setShowArchiveConfirmation(false);
    setSelectedLists([]);
    refetch();
  };

  const handleDeleteList = async () => {
    console.log("Confirmed delete for lists:", selectedLists);
    for (const listId of selectedLists) {
      await deleteList(listId);
      setPopup({ message: "List deleted", isVisible: true });
    }
    setShowDeleteConfirmation(false);
    setSelectedLists([]);
    refetch();
  };

  const isButtonsDisabled = selectedLists.length === 0;

  return (
    <div className="w-screen h-screen z-[101] bg-white flex flex-col">
      <div className="w-full max-w-md px-5 mx-auto flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-4 my-4">
          <button className="text-black p-3" onClick={handleDoneClick}>
            Done
          </button>
          <div className="absolute top-0 left-0 right-0 flex justify-center mt-4">
            <img
              // eslint-disable-next-line
              src={require(`../assets/imgs/etc/short_logo_salmon.webp`)}
              alt="Logo"
              className="h-[25px]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <div className="text-center text-gray-500 my-4">
          {selectedLists.length} selected
        </div>

        <div className="space-y-4 flex-grow overflow-y-auto mb-28"> {/* Added margin bottom */}
          {isLoading && <Loader />}
          {error && <p>Error fetching lists: {error.message}</p>}
          {lists && lists.length > 0 ? (
            lists
              .filter((list) => !list.is_finished)
              .map((list) => (
                <div key={list.id} className="flex items-center bg-white text-black rounded-lg">
                  <input
                    type="checkbox"
                    className="mr-3 w-6 h-6"
                    onChange={() => handleCheckboxChange(list.id)}
                    checked={selectedLists.includes(list.id)}
                  />
                  <ShoppingList list={list} />
                </div>
              ))
          ) : (
            <p>No lists found for this household.</p>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex justify-around py-4  shadow-[0px_-10px_30px_-10px_rgba(0,0,0,0.5)] bg-white z-10"> {/* Fixed the button bar */}
        <button
          className={`flex-grow mx-2 ${isButtonsDisabled ? "text-black40 px-6 py-2" : "text-black px-6 py-2"}`}
          disabled={isButtonsDisabled}
          onClick={handleArchiveClick}
        >
          Archive
        </button>
        <button
          className={`flex-grow mx-2 ${isButtonsDisabled ? "text-black40 px-6 py-2" : "text-black px-6 py-2 "}`}
          disabled={isButtonsDisabled}
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </div>

      <ConfirmationDialog
        title="Delete List?"
        details="The list will be removed from the shopping."
        label="Delete"
        bg="bg-red-600"
        showConfirmation={showDeleteConfirmation}
        setShowConfirmation={setShowDeleteConfirmation}
        action={handleDeleteList}
      />
      <ConfirmationDialog
        title="Archive List?"
        details="The list will be archived."
        label="Archive"
        bg="bg-blue-600"
        showConfirmation={showArchiveConfirmation}
        setShowConfirmation={setShowArchiveConfirmation}
        action={handleArchiveList}
      />
      <NotificationPopup
        message={popup.message}
        isVisible={popup.isVisible}
        onClose={() => setPopup({ ...popup, isVisible: false })}
      />
    </div>
  );
}

export default ListArchive;
