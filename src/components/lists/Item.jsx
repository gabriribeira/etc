import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { RxDotsVertical } from "react-icons/rx";
import { CSSTransition } from "react-transition-group";
import Overlay from "../common/Overlay";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { useNavigate } from "react-router-dom";
import { HiOutlineCheck } from "react-icons/hi";
import { useDeleteItemMutation } from "../../app/api";
import { FaExclamationTriangle } from "react-icons/fa"; // Import warning icon

const Item = ({ item, list_id, refetch, isListLocked, isListLockedByUser, harmfulItems }) => {
  const [showEditItem, setShowEditItem] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isHarmful, setIsHarmful] = useState(false);
  const [harmfulReason, setHarmfulReason] = useState("");
  const navigate = useNavigate();
  const [deleteItem] = useDeleteItemMutation();

  useEffect(() => {
    if (harmfulItems) {
      const harmfulItem = harmfulItems.find(hItem => hItem.name === item.name);
      if (harmfulItem) {
        setIsHarmful(true);
        setHarmfulReason(harmfulItem.reason);
      } else {
        setIsHarmful(false);
        setHarmfulReason("");
      }
    }
  }, [harmfulItems, item.name]);

  const handleCheck = () => {
    if (!isListLocked || isListLockedByUser) {
      setChecked(!checked);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteItem(item.id).unwrap();
      setShowConfirmation(false);
      setShowEditItem(false);
      refetch();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
    setShowConfirmation(false);
    setShowEditItem(false);
  };

  const handleImageClick = () => {
    navigate(`/lists/${list_id}/item/${item.id}/image/`);
  };

  const truncateName = (name) => {
    if (name.length > 20) {
      return `${name.slice(0, 20)}...`;
    }
    return name;
  };

  return (
    <div className={`w-full flex items-center justify-between bg-black rounded-2xl p-3 gap-x-3 ${isHarmful ? 'border border-red-500' : ''}`}>
      <div className="flex items-center gap-x-3">
        <div className="relative h-6 w-6 flex-shrink-0 flex-nowrap">
          <input
            type="checkbox"
            checked={checked}
            onChange={handleCheck}
            disabled={isListLocked && !isListLockedByUser}
            className="appearance-none h-full w-full border-2 border-white rounded bg-black checked:bg-black checked:border-white checked:shadow-none"
          />
          {checked && (
            <div className="absolute inset-0 flex items-center justify-center text-white pointer-events-none">
              <HiOutlineCheck />
            </div>
          )}
        </div>
        <div
          className={`flex flex-col justify-between h-full gap-x-3 text-lg leading-5 text-white grow`}
        >
          <h1
            className={`font-medium text-lg leading-5 ${checked ? "line-through" : ""}`}
          >
            {truncateName(item.name)} {isHarmful && <FaExclamationTriangle className="text-red-500 inline ml-1" />}
          </h1>
          {item.brand && <p className="font-light text-sm">{item.brand}</p>}
          {item.amount && item.unit && (
            <p className="font-medium text-sm">
              {item.amount} {item.unit}
            </p>
          )}
          {item.store && <p className="font-medium text-sm">{item.store}</p>}
          {isHarmful && (
            <p className="text-red-500 text-sm">{harmfulReason}</p>
          )}
        </div>
      </div>

      <div className="flex items-center">
        {item.img_url && (
          <div
            className="rounded-full bg-white w-10 h-10"
            onClick={handleImageClick}
          >
            <img
              //eslint-disable-next-line
              src={item.img_url}
              className="w-full h-full rounded-full object-cover"
              alt={item.name}
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        <button
          className="text-2xl text-white ml-3"
          aria-label="Edit Item"
          onClick={() => setShowEditItem(!showEditItem)}
        >
          <RxDotsVertical />
        </button>
      </div>

      <CSSTransition
        in={showEditItem}
        timeout={500}
        classNames="menu-primary"
        className="fixed top-[60px] right-0 bg-white z-[101] h-auto shadow-xl rounded-b-2xl p-5"
        unmountOnExit
      >
        <Overlay
          label={item.name}
          options={["Edit item details", "Delete item"]}
          links={[
            `/lists/${list_id}/item/${item.id}`,
            null, // Use null since delete action doesn't require a link
          ]}
          hideOverlay={() => setShowEditItem(false)}
          onClicks={[() => {}, () => setShowConfirmation(true)]}
        />
      </CSSTransition>

      <ConfirmationDialog
        title="Delete Item?"
        details="The item will be removed from the shopping list."
        label="Delete"
        bg="bg-red-600"
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
  refetch: PropTypes.func.isRequired,
  isListLocked: PropTypes.bool.isRequired,
  isListLockedByUser: PropTypes.bool.isRequired,
  harmfulItems: PropTypes.array.isRequired,
};

export default Item;