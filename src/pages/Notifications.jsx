import React, { useState } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import SearchInput from "../components/common/SearchInput";
import Notification from "../components/common/Notification";

const Notifications = () => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  return (
    <div>
      <TopBar />
      <SearchInput
        label="Search"
        value={search}
        onChange={handleSearchChange}
        isNotificationSearch={true} 
      />
      <Notification/>
      <BottomBar />
    </div>
  );
};

export default Notifications;
