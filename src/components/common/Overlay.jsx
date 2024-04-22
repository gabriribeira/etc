import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { GoInfo } from "react-icons/go";
import { LuUser } from "react-icons/lu";
import { RiNotification4Line } from "react-icons/ri";
import { SlArrowRight } from "react-icons/sl";
import { CiLogout } from "react-icons/ci";
import { FiLock, FiUnlock } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { BiPencil } from "react-icons/bi";
//import { RxCross2 } from "react-icons/rx";
import Cookies from "js-cookie";

const Overlay = ({ label, options, links, hideOverlay, onClicks }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("household");
    navigate("/login");
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !document
          .getElementById('overlay')
          .contains(event.target)
      ) {
        hideOverlay();
      }
    };

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed h-screen w-screen top-0 left-0 z-[102]">
      <div
        onClick={hideOverlay}
        className="fixed h-screen w-screen top-0 left-0"
        id="overlay"
      ></div>
      <div className="absolute bg-white bottom-0 z-[111] shadow-[0px_-10px_30px_-10px_rgba(0,0,0,0.5)] left-0 w-screen rounded-t-[2rem] px-5 py-10">
        <div className="absolute top-[10px] left-0 w-screen flex justify-center">
          <div className="w-[25%] h-[5px] bg-black/50 rounded-full"></div>
        </div>
        <div className="flex flex-col gap-y-3 mb-6">
          <div className="flex items-center gap-x-3">
            <h1 className="font-semibold text-xl text-black">{label}</h1>
          </div>
          {options.map((option, index) => 
            option !== "Logout" ? (
              <Link
                key={index}
                to={links[index]}
                action={hideOverlay}
                className={`w-full text-lg flex items-center relative gap-y-3 gap-x-3 ${
                  (option === "Delete shopping list" || option === "Delete item") ? "text-red-600" : ""
                }`}
                onClick={onClicks ? onClicks[index] : null} // Adicionando manipulador de evento de clique apenas se onClicks for fornecido
              >
                <div className="text-2xl">
                  {option === "About" && <GoInfo />}
                  {option === "Notifications" && <RiNotification4Line />}
                  {option === "Profile" && <LuUser />}
                  {option === "Logout" && <CiLogout />}
                  {option === "Close shopping list" && <FiLock />}
                  {option === "Edit shopping list" && <BiPencil />}
                  {option === "Edit item details" && <BiPencil />}
                  {option === "Delete shopping list" && <HiOutlineTrash />}
                  {option === "Delete item" && <HiOutlineTrash />}
                  {option === "Reopen shopping list" && <FiUnlock />}
                </div>
                {option}
                <div className="absolute right-3">
                  <SlArrowRight />
                </div>
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                key={index}
                className="w-full text-lg flex items-center relative gap-y-3 gap-x-3"
              >
                <div className="text-2xl">
                  {option === "About" && <GoInfo />}
                  {option === "Notifications" && <RiNotification4Line />}
                  {option === "Profile" && <LuUser />}
                  {option === "Logout" && <CiLogout />}
                </div>
                {option}
                <div className="absolute right-3">
                  <SlArrowRight />
                </div>
              </button>
            )
          )}
        </div>
        <Button label={"Cancel"} action={hideOverlay} stroke={true} />
      </div>
    </div>
  );
};

Overlay.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  links: PropTypes.string.isRequired,
  hideOverlay: PropTypes.func.isRequired,
  onClicks: PropTypes.array, // Tornando a propriedade onClicks opcional
};

export default Overlay;
