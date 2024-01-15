import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import UsersData from "../../data/users.json";

const ExpenseInBalance = ({ expense }) => {
  const usersData = UsersData;
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (usersData && expense) {
      const userAux = usersData.find((user) => user.id === expense.user_id);
      setUser(userAux);
    }
  }, [expense, usersData]);
  return (
    user &&
    expense && (
      <div className="flex items-center justify-between bg-black10 p-3 rounded-2xl h-[100px]">
        <div className="flex flex-col justify-between h-full">
          <h2 className="font-light text-black text-base">{expense.title}</h2>
          <h1 className="text-base font-light">
            <span className="font-semibold text-lg">{expense.value}€</span> paid
            by <span className="font-semibold text-lg">{user.name}</span>
          </h1>
        </div>
        <div className="flex flex-col items-end h-full justify-between">
          <img
            //eslint-disable-next-line
            src={require(`../../assets/data/users/${user.img}`)}
            alt="User Profile Picture"
            className="w-[40px] h-[40px] rounded-full object-cover object-center shrink-0"
          />
          <h1 className="text-base font-light">
            <span className="font-light text-base ">
              {expense.users.length} members
            </span>
          </h1>
        </div>
      </div>
    )
  );
};

ExpenseInBalance.propTypes = {
  expense: PropTypes.object.isRequired,
};

export default ExpenseInBalance;
