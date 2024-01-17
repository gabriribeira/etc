import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { SlArrowDown } from "react-icons/sl";

const HouseholdInfo = ({ household, users, openOverlayFromParent }) => {
  return (
    <>
      <div className="flex flex-col bg-black10 text-center relative">
        <Link
          to={"/households/household/edit"}
          className="text-blue font-semibold text-base absolute top-3 right-4"
        >
          edit
        </Link>
        <div className="py-16 flex flex-col items-center justify-center">
          <img
            //eslint-disable-next-line
            src={require(`../../assets/data/households/${household.img}`)}
            alt="Household Profile Picture"
            className="object-center object-cover rounded-full w-[150px] h-[150px]"
          />
          <div className="flex items-center gap-x-2">
            <h1 className="font-bold text-xl mt-2">{household.name}</h1>
            <button
              onClick={openOverlayFromParent}
              className="text-2xl text-black mt-2"
            >
              <SlArrowDown />
            </button>
          </div>
          <p className="font-light text-base">{users.length} Members</p>
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
