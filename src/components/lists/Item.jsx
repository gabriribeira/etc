import React, { useState } from "react";
import PropTypes from "prop-types";
import { RxDotsVertical } from "react-icons/rx";
import { CSSTransition } from "react-transition-group";
import Overlay from "../common/Overlay";
import ConfirmationDialog from "../common/ConfirmationDialog";

const Item = ({ item, list_id }) => {
  const [showEditItem, setShowEditItem] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);
  }

  const handleDelete = () => {
    // lógica para excluir o item
    console.log("Item deletado:", item.id);
    setShowConfirmation(false);
    setShowEditItem(false);
  };

  return (
    <div className="w-full flex items-center justify-between bg-black rounded-2xl p-3 gap-x-3">
      <div className="flex items-center gap-x-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheck}
          className="rounded-full appearance-none w-8 h-6 border-2 border-gray-300 checked:bg-white checked:border-white checked:border-2 focus:outline-none focus:border-white focus:ring-1 focus:ring-gray-400"
        />
        
      <div className={`flex flex-col justify-between h-full w-full gap-x-3 w-full text-lg leading-5 text-white ${checked ? 'line-through' : ''}`}>
        <h1 className="font-medium text-lg leading-5">{item.name}</h1>
        {item.brand && <p className="font-light text-sm">{item.brand}</p>}
        {item.amount && <p className="font-medium text-sm">{item.amount} {item.unit}</p>}
      </div>
      </div>
      <button className="text-2xl text-white" aria-label="Edit Item" onClick={() => setShowEditItem(!showEditItem)}>
        <RxDotsVertical />
      </button>
      <CSSTransition
        in={showEditItem}
        timeout={500}
        classNames="menu-primary"
        className="fixed top-[60px] left-0 w-full bg-white z-[101] h-auto shadow-xl rounded-b-2xl p-5"
        unmountOnExit
      >
        <Overlay
          label={item.name}
          options={[
            "Edit item details",
            "Delete item"
          ]}
          links={[
            `/lists/${list_id}/item/${item.id}`,
            null // Use null since delete action doesn't require a link
          ]}
          hideOverlay={() => setShowEditItem(false)}
          onClicks={[
            () => {}, 
            () => setShowConfirmation(true) 
          ]}
        />
      </CSSTransition>
        
      <ConfirmationDialog 
        title= "Delete Item?"
        details= "The item will be removed from the shopping list."
        label = "Delete"
        bg = "bg-red-600"
        showConfirmation={showConfirmation}
        setShowConfirmation={setShowConfirmation}
        action={handleDelete}
      />

    </div>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
  list_id: PropTypes.number.isRequired,
};

export default Item;
