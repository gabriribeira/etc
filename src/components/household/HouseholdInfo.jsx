import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { SlArrowDown } from "react-icons/sl";

const HouseholdInfo = ({ household, users, openOverlayFromParent }) => {
  return (
    <>
      <div className="flex flex-col bg-black bg-gradient-to-br from-black to-white/20  text-center relative">
        <Link
          to={"/households/household/edit"}
          className="text-white font-light text-sm absolute top-3 right-3"
        >
          edit
        </Link>
        <div className="py-16 flex flex-col items-center justify-center">
          <img
            //eslint-disable-next-line
            src={require(`../../assets/data/households/${household.img}`)}
            alt="Household Profile Picture"
            className="object-center object-cover rounded-full w-[150px] h-[150px] shadow-2xl"
          />
          <div className="flex items-center gap-x-2 text-white">
            <h1 className="font-normal text-xl mt-2">{household.name}</h1>
            <button
              onClick={openOverlayFromParent}
              className="text-2xl text-white mt-2"
            >
              <SlArrowDown />
            </button>
          </div>
          <p className="font-light text-sm text-white">{users.length} Members</p>
        </div>
      </div>
      <div className="flex flex-col px-5 mt-6">
        <h1 className="font-semibold text-lg mb-2">Description</h1>
        <p className="text-black text-base">{household.description}</p>
      </div>
    </>
  );
};

HouseholdInfo.propTypes = {
  household: PropTypes.object,
  users: PropTypes.array,
  openOverlayFromParent: PropTypes.func,
};

export default HouseholdInfo;
