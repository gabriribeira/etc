import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ItemsData from "../../data/items.json";
import { Link } from "react-router-dom";
import { PiLockSimpleOpenThin } from "react-icons/pi";

const ShoppingList = ({ list }) => {
  const itemsData = ItemsData;
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (list) {
      setItems(itemsData.filter((item) => item.list_id === list.id));
      console.log(list);
    }
  }, [list]);
  return (
    <Link
      to={`/lists/${list.id}`}
      className="flex items-start w-full bg-black bg-gradient-to-br from-black90 to-white/40 shadow-xl justify-between p-3 h-[140px] rounded-2xl relative"
    >
      <div className="flex flex-col h-full text-white justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-medium ">{list.title}</h1>
          <p className="font-light text-sm">
            started by <span className="font-medium">Gabriel Ribeira</span>
          </p>
        </div>
        <div className="flex items-center w-full justify-start gap-x-3">
          <p className="font-light text-sm bg-gradient-to-r from-black80 to-white/30 py-1 px-5 rounded-full w-fit">
            {items.length} products
          </p>
          {list.closed && (
            <p className="font-light text-sm bg-gradient-to-r from-salmon/40 via-salmon/60 to-salmon py-1 px-5 rounded-full w-fit">
              Closed
            </p>
          )}
        </div>
      </div>
      <div className="text-2xl text-white">
        <PiLockSimpleOpenThin />
      </div>
    </Link>
  );
};

ShoppingList.propTypes = {
  list: PropTypes.object.isRequired,
};

export default ShoppingList;
