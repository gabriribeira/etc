import React from "react";
import TopBar from "../components/common/TopBar";
import BottomBar from "../components/common/BottomBar";
import { useGetHouseholdListsQuery } from "../app/api";
import Loader from "../components/common/Loader";

function Archive() {
  const { data: lists, error, isLoading } = useGetHouseholdListsQuery();

  return (
    <div>
      <TopBar listTitle="Archive" />
      <main className="px-5 py-4 mt-32">
        {isLoading && <Loader />}
        {error && <p>Error fetching lists: {error.message}</p>}
        {lists && lists.length > 0 ? (
          lists
            .filter((list) => list.is_finished === true) // Filter for finished lists
            .map((list) => (
              <div key={list.id} className="bg-black text-white font-semibold rounded-lg mb-4 p-4">
                {list.name}
              </div>
            ))
        ) : (
          <p>No finished lists found.</p>
        )}
      </main>
      <BottomBar />
    </div>
  );
}

export default Archive;
