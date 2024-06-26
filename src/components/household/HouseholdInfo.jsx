import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { SlArrowDown } from "react-icons/sl";
import Image from "../../assets/imgs/etc/logo_dots.png";

const HouseholdInfo = ({ household, users, openOverlayFromParent }) => {
  return (
    <>
      <div className="flex flex-col bg-black20 text-center relative">
        <Link
          to={"/household/edit"}
          className="text-black font-light text-sm absolute top-3 right-3"
          aria-label="Edit household"
        >
          edit
        </Link>
        <div className="py-16 flex flex-col items-center justify-center">
          <img
            //eslint-disable-next-line
            src={household.img_url ? household.img_url : Image}
            alt="Household Profile Picture"
            className="object-center object-cover rounded-full w-[150px] h-[150px]"
            referrerPolicy="no-referrer"
          />
          <div className="flex items-center gap-x-2 text-black">
            <h1 className="font-normal text-xl mt-2">{household.name}</h1>
            <button
              onClick={openOverlayFromParent}
              className="text-2xl text-black mt-2"
              aria-label="Change household button"
            >
              <SlArrowDown />
            </button>
          </div>
          <p className="font-light text-sm text-black">{users && users.length} {users && (users.length > 1 ? "Members" : "Member")}</p>
        </div>
      </div>
      <div className="flex flex-col px-5">
        <h1 className="font-semibold text-lg mb-2">Description</h1>
        <p className="text-black text-base">{household.description ? household.description : "No description yet"}</p>
      </div>
    </>
  );
};

HouseholdInfo.propTypes = {
  household: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  openOverlayFromParent: PropTypes.func.isRequired,
};

export default HouseholdInfo;
