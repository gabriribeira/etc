import React, { useState, useEffect } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import SearchInput from "../components/common/SearchInput";
import Notification from "../components/common/Notification";
import { useGetRequestsQuery } from "../app/api";
import { useNavigationType } from "react-router-dom";

const Notifications = () => {
  const [search, setSearch] = useState("");
  const { data: requests, error, isLoading, refetch } = useGetRequestsQuery();

  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === "PUSH" || navigationType === "POP") {
      refetch();
    }
  }, [navigationType, refetch]);

  useEffect(() => {
    console.log("Requests:", requests);
  }, [requests]);

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  return (
    <div>
      <TopBar />
      <div className="flex flex-col px-5 gap-y-3 pt-32">
        <SearchInput
          label="Search Notifications"
          value={search}
          onChange={handleSearchChange}
          isNotificationSearch={true}
        />
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading requests</p>
        ) : requests && requests.data && requests.data.length > 0 ? (
          requests.data.map((request, index) => (
            <Notification key={index} activity={request} refetchRequests={refetch} />
          ))
        ) : (
          <p>You don&apos;t have any new notifications</p>
        )}
      </div>
      <BottomBar />
    </div>
  );
};

export default Notifications;