// src/pages/List.jsx

import React from "react";
import { useLocation } from "react-router-dom";
import BottomBar from "../components/common/BottomBar";
import ListDisplay from "../components/lists/ListDisplay";
import NewList from "../components/lists/NewList";

const List = () => {
  const location = useLocation();
  const listId = location.pathname.split("/")[2];

  return (
    <div className="bg-white min-h-screen">
      {listId ? <ListDisplay /> : <NewList />}
      <BottomBar />
    </div>
  );
};

export default List;
