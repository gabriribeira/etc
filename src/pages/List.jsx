import React, { useEffect, useState } from "react";
import BottomBar from "../components/common/BottomBar";
import ListsData from "../data/lists.json";
import { useLocation } from "react-router-dom";
import TopBar from "../components/common/TopBar";

const List = () => {
  const listsData = ListsData;
  const [list, setList] = useState(null);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname && location.pathname.split("/")[2] && listsData) {
      console.log(location.pathname.split("/")[2]);
      const list = listsData.filter(
        (list) => list.id == location.pathname.split("/")[2]
      );
      setList(list[0]);
    }
  }, [location.pathname, listsData]);
  return (
    <div>
      <TopBar />
      {list && (
        <div className="flex flex-col px-5">
          <div className="flex items-center">ola</div>
        </div>
      )}
      <BottomBar />
    </div>
  );
};
export default List;
