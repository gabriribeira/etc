import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const HouseholdInfo = ({ household, users }) => {
  return (
    <>
      <div className="flex flex-col bg-black10 text-center relative">
        <Link
          to={"/households/household/edit"}
          className="text-blue font-semibold text-base absolute top-3 right-4"
        >
          edit
        </Link>
        <div className="py-16">
          <img
            //eslint-disable-next-line
            src={require(`../../assets/data/households/${household.img}`)}
            alt="Household Profile Picture"
            className="object-center rounded mx-auto max-w-36"
          />
          <h1 className="font-bold text-xl mt-2">{household.name}</h1>
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
};

export default HouseholdInfo;
