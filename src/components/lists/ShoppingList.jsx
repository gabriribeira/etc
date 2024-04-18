import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ItemsData from "../../data/items.json";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Overlay from "../common/Overlay";
import ConfirmationDialog from "../common/ConfirmationDialog";

import { RxDotsVertical } from "react-icons/rx";

const ShoppingList = ({ list }) => {
  const itemsData = ItemsData;
  const [items, setItems] = useState([]);
  const [showEditList, setShowEditList] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showReopenConfirmation, setShowReopenConfirmation] = useState(false);
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);

  const handleDeleteList = () => {
    // lógica para excluir o item
    console.log("Lista deletada:", list.id);
    setShowConfirmation(false);
    setShowEditList(false);
  };

  const handleReopenList = () => {
    // lógica 
    console.log("Lista reaberta:", list.id);
    setShowReopenConfirmation(false);
    setShowEditList(false);
  };

  const handleCloseList = () => {
    // lógica 
    console.log("Lista fechada:", list.id);
    setShowCloseConfirmation(false);
    setShowEditList(false);
  };

  useEffect(() => {
    if (list) {
      setItems(itemsData.filter((item) => item.list_id === list.id));
      console.log(list);
    }
  }, [list]);
  return (
    <>
    <Link
      to={`/lists/${list.id}`}
      className="flex items-start w-full bg-black90 shadow-xl justify-between p-3 h-[140px] rounded-2xl relative"
    >
      <div className="flex flex-col h-full text-white justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-medium ">{list.title}</h1>
          <p className="font-light text-sm">
            started by <span className="font-medium">Gabriel Ribeira</span>
          </p>
        </div>
        <div className="flex items-center w-full justify-start gap-x-3">
          <p className="font-light text-sm bg-white text-black py-1 px-5 rounded-full w-fit">
            {items.length} products
          </p>
          {list.closed && (
            <p className="font-light text-sm bg-black text-white border-white border-2 py-1 px-5 rounded-full w-fit">
              Closed
            </p>
          )}
        </div>
      </div>
      <div className="text-2xl text-white">
        <button
        type="button"
        aria-label="Button Edit List"
         onClick={(e) => {
              e.preventDefault();
              setShowEditList(!showEditList);
            }}>
          <RxDotsVertical />
        </button>
      </div>
    </Link>
    <CSSTransition
      in={showEditList}
      timeout={500}
      classNames="menu-primary"
      className="fixed top-[60px] left-0 w-full bg-white z-[101] h-auto shadow-xl rounded-b-2xl p-5"
      unmountOnExit
    >
      <Overlay
        label={list.title}
        options={[
          list.closed ? "Reopen shopping list" : "Close shopping list",
          "Edit shopping list",
          "Delete shopping list"
        ]}
        links={[
          list.closed ? "/" : "/lists",
          "/lists",
          "/lists"
        ]}
        hideOverlay={() => setShowEditList(false)}
        onClicks={[
          () => {list.closed ? setShowReopenConfirmation(true) : setShowCloseConfirmation(true)}, 
          () => {}, 
          () => setShowConfirmation(true) 
        ]}
      />
    </CSSTransition>

    <ConfirmationDialog
        title="Delete Shopping List?"
        details="You will delete this shopping list permanently from your household."
        label= "Delete"
        bg="bg-red-600"
        showConfirmation={showConfirmation}
        setShowConfirmation={setShowConfirmation}
        action={handleDeleteList}
    />

    <ConfirmationDialog
      title="Reopen Shopping List?"
      details="Once you open it, members will be able to add items to the list again."
      label="Open"
      bg="bg-blue"
      showConfirmation={showReopenConfirmation}
      setShowConfirmation={setShowReopenConfirmation}
      action={handleReopenList} // Função para reabrir a lista
    />

    <ConfirmationDialog
      title="Close Shopping List?"
      details="Once you open it, members won't be able to add items to the list."
      label="close"
      bg="bg-red-600"
      showConfirmation={showCloseConfirmation}
      setShowConfirmation={setShowCloseConfirmation}
      action={handleCloseList}
    />    


  </>
  );
};

ShoppingList.propTypes = {
  list: PropTypes.object.isRequired,
};

export default ShoppingList;
