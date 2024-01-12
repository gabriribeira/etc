import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import UsersData from "../../data/users.json";
import { Link } from "react-router-dom";
import MembersComp from "../household/Members";

const HouseholdInfo = ({ household }) => {
    const users = UsersData;
    const [householdUsers, setHouseholdUsers] = useState([]);

    useEffect(() => {
        if (users) {
            const householdUsers = users.filter(user => user.households.includes(1)); //alterar para o household correto
            const userCount = householdUsers.length;
            setHouseholdUsers(userCount);
        }
    }, [users]);

    return (
        <>
        <div className="flex flex-col bg-black10 text-center">
            <Link to={"/households/household/edit"} className="text-right mr-4 mt-4 text-blue font-semibold text-sm">edit </Link>
                <div className="py-8">
                    <img
                        src={require(`../../assets/data/households/${household.img}`)}
                        alt='Household Profile Picture'
                        className="object-center rounded mx-auto max-w-36"
                    />
                    <h1 className="font-bold text-lg">{household.name}</h1>
                    <p className="font-light text-sm">{householdUsers} Members</p>
                </div>
        </div> 

        <div className="flex flex-col px-5 gap-y-5">
            <div className="flex flex-col mt-5">
                <h1 className="font-bold text-base">Description</h1>
                <p className="text-black text-sm">{household.description}</p>
            </div>

            <div className="flex flex-col">
                <h1 className="font-bold text-base">Sustainability</h1>
                <p className="text-black text-sm">
                    Tags component
                </p>
                <p className="text-black text-sm">
                    Goal component
                </p>
            </div>
            <MembersComp />  
        </div>
        </>
    );
};

HouseholdInfo.propTypes = {
    household: PropTypes.object,
  };

export default HouseholdInfo;