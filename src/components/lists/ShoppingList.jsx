import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { SlArrowRight } from "react-icons/sl";
import ItemsData from "../../data/items.json";
import { Link } from "react-router-dom";

const ShoppingList = ({ list }) => {
  const itemsData = ItemsData;
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (list) {
      setItems(itemsData.filter((item) => item.list_id === list.id));
    }
  }, [list]);
  return (
    <Link
      to={`/lists/${list.id}`}
      className="flex items-center w-full bg-blue80 justify-between px-3 h-[100px] rounded-2xl"
    >
      <div className="flex flex-col text-white">
        <h1 className="text-xl font-medium ">{list.title}</h1>
        <p className="font-light text-base">{items.length} products</p>
      </div>
      <div className="text-4xl text-white">
        <SlArrowRight />
      </div>
    </Link>
  );
};

ShoppingList.propTypes = {
  list: PropTypes.object.isRequired,
};

export default ShoppingList;
