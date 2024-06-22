import React, { useState } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import SearchInput from "../components/common/SearchInput";
import Notification from "../components/common/Notification";
import { useGetRequestsQuery } from "../app/api";

const Notifications = () => {
  const [search, setSearch] = useState("");
  const { data: requests, error, isLoading } = useGetRequestsQuery();

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
        ) : requests && requests.length > 0 ? (
          requests.map((request, index) => (
            <Notification key={index} activity={request} />
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