import React, { useState } from "react";
import PropTypes from "prop-types";
import { RxDotsVertical } from "react-icons/rx";
import TopBar from "../components/common/TopBar";
import BottomBar from "../components/common/BottomBar";
import { useGetHouseholdListsQuery, useGetUserQuery, useUnarchiveListMutation } from "../app/api";
import Loader from "../components/common/Loader";
import ConfirmationDialog from "../components/common/ConfirmationDialog";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useNavigationType } from "react-router-dom";

function Archive() {
  const { data: lists, error, isLoading, refetch } = useGetHouseholdListsQuery();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === "PUSH" || navigationType === "POP") {
      refetch();
    }
  }, [navigationType, refetch]);

  return (
    <div>
      <TopBar listTitle="Archive" />
      <main className="px-5 py-4 mt-32">
        {isLoading && <Loader />}
        {error && <p>Error fetching lists: {error.message}</p>}
        {lists && lists.length > 0 ? (
          lists
            .filter((list) => list.is_finished === true) // Filter for finished lists
            .map((list) => <ListItem key={list.id} list={list} />)
        ) : (
          <p>No finished lists found.</p>
        )}
      </main>
      <BottomBar />
    </div>
  );
}

function ListItem({ list }) {
  const { data: user, isLoading, error } = useGetUserQuery(list.user_id);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [unarchiveList] = useUnarchiveListMutation(); // Use the mutation hook
  const navigate = useNavigate();

  console.log('User data:', user); // Log completo dos dados do usuário

  if (isLoading) return <Loader />;
  if (error || !user) return <p>Error fetching user: {error?.message || 'User not found'}</p>;

  const handleUnarchiveList = async () => {
    try {
      await unarchiveList(list.id).unwrap(); // Call the mutation
      console.log(`List ${list.id} unarchived`);
    } catch (error) {
      console.error("Failed to unarchive the list: ", error);
    } finally {
      setShowConfirmation(false);
      navigate("/lists/archive");
    }
  };

  return (
    <>
      <div className="bg-black text-white font-semibold rounded-lg mb-4 p-4 flex justify-between items-center">
        <div>
          <p className="text-xl font-semibold">{list.name}</p>
          <p className="text-sm font-normal text-white">started by <span className="font-bold">{user?.data?.name}</span></p>
        </div>
        <RxDotsVertical size={25} onClick={() => setShowConfirmation(true)} className="cursor-pointer" />
      </div>
      {showConfirmation && (
        <ConfirmationDialog
          title="Unarchive Shopping List?"
          details="You will unarchive this shopping list from your household."
          label="Unarchive"
          bg="bg-black"
          showConfirmation={showConfirmation}
          setShowConfirmation={setShowConfirmation}
          action={handleUnarchiveList}
        />
      )}
    </>
  );
}

ListItem.propTypes = {
  list: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired,
    is_finished: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Archive;
