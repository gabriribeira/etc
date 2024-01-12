import React from "react";
import PropTypes from "prop-types";

const HouseholdBanner = ({ household }) => {

    return (
        <div className="flex flex-col bg-black10 text-center">
            <button className="text-right mr-2 mt-2 text-blue font-semibold text-sm">edit</button>
                <div className="py-8">
                    <img
                        src={require(`../../assets/data/households/${household.img}`)}
                        alt='Household Profile Picture'
                        className="object-center rounded mx-auto max-w-36"
                    />
                    <h1 className="font-semibold text-lg">{household.name}</h1>
                    <p className="font-light text-sm">x Members</p>
                </div>
        </div> 
    );
};

HouseholdBanner.propTypes = {
    household: PropTypes.object,
  };

export default HouseholdBanner;