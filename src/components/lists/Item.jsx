import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { RxDotsVertical } from "react-icons/rx";

const Item = ({ item, list_id }) => {
  return (
    <div className="w-full flex items-center jusitfy-between bg-salmon bg-gradient-to-l shadow-lg from-salmon to-black90/40 rounded-2xl p-3 gap-x-3">
      <button
        className="w-[30px] h-[30px] rounded-full bg-transparent border-2 border-white shrink-0"
        type="button"
      ></button>
      <Link
        to={`/lists/${list_id}/item/${item.id}`}
        className="flex flex-col justify-between h-full w-full gap-x-3 w-full text-lg leading-5 text-white"
      >
        <h1 className="font-medium text-lg leading-5">{item.name}</h1>
        {item.brand && <p className="font-light text-sm">{item.brand}</p>}
        {item.amount && <p className="font-medium text-sm">{item.amount} {item.unit}</p>}
      </Link>
      <button className="text-2xl text-white">
        <RxDotsVertical />
      </button>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
  list_id: PropTypes.number.isRequired,
};

export default Item;
