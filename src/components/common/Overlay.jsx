import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { GoInfo } from "react-icons/go";
import { LuUser } from "react-icons/lu";
import { RiNotification4Line } from "react-icons/ri";
import { SlArrowRight } from "react-icons/sl";

const Overlay = ({ label, options, links, hideOverlay }) => {
  return (
    <div className="fixed h-screen w-screen top-0 left-0 z-[100]">
      <div
        onClick={hideOverlay}
        className="fixed h-screen w-screen bg-black/20 top-0 left-0"
      ></div>
      <div className="absolute bg-white bottom-0 z-[111] left-0 w-screen rounded-t-[2rem] px-5 py-10">
        <div className="absolute top-[10px] left-0 w-screen flex justify-center">
          <div className="w-[25%] h-[5px] bg-black/50 rounded-full"></div>
        </div>
        <div className="flex flex-col gap-y-3 mb-6">
          <div className="flex items-center gap-x-3">
            <div className="text-3xl">
              <IoSettingsOutline />
            </div>
            <h1 className="font-semibold text-xl text-black">{label}</h1>
          </div>
          {options.map((option, index) => (
            <Link
              key={index}
              to={links[index]}
              action={hideOverlay}
              className="w-full text-lg flex items-center relative gap-y-3 gap-x-3"
            >
              <div className="text-2xl">
                {option === "About" && <GoInfo />}
                {option === "Notifications" && <RiNotification4Line />}
                {option === "Profile" && <LuUser />}
              </div>
              {option}
              <div className="absolute right-3">
              <SlArrowRight />
              </div>
            </Link>
          ))}
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
};

export default Overlay;
