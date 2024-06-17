import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Overlay from "../common/Overlay";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { FiLock } from "react-icons/fi";
import { FiUnlock } from "react-icons/fi";

const ShoppingList = ({ list }) => {
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
  return (
    <>
    <Link
      to={`/lists/${list.id}`}
      className="flex items-start w-full bg-black shadow-xl justify-between p-3 h-[130px] rounded-2xl relative"
    >
      <div className="flex flex-col h-full text-white justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-medium ">{list.name}</h1>
          <p className="font-light text-sm">
            started by <span className="font-medium">{list.User.name}</span>
          </p>
        </div>
        <div className="flex items-center w-full justify-start gap-x-3">
          <p className="font-semibold text-sm bg-white text-black py-1 px-5 rounded-full w-fit">
            {list.Items.length} products
          </p>
          {list.is_closed && (
            <p className="text-sm font-semibold bg-salmon text-black border-salmon border-2 py-1 px-5 rounded-full w-fit">
              locked
            </p>
          )}
        </div>
      </div>
      <div className="text-2xl text-white">
        
          {list.is_closed ? <FiLock /> : <FiUnlock />}
        
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
      label="Close"
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
