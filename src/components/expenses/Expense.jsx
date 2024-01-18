import React from "react";
import PropTypes from "prop-types";
import UsersData from "../../data/users.json";

const Expense = ({ expense }) => {
  const users = UsersData;
  const user = users.find((user) => user.id === expense.user_id);
  return (
    <div className={`${expense.paid ? "bg-black90/30" : "bg-black90"} rounded-2xl flex justify-between items-center w-full p-3 h-full`}>
      <div className={`flex flex-col justify-between h-full ${expense.paid ? "text-black60" : "text-white"}`}>
        <h2 className="text-lg font-light">{expense.title}</h2>
        <div className="flex flex-col">
          <div className="text-4xl font-semibold">
            {expense.value.toFixed(2)}<span className="font-light text-xl">€</span>
          </div>
          <p className="font-light text-base">
            spent by <span className="font-semibold">{user.name}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between items-center h-full">
        <div className="w-[45px] h-[45px] rounded-full flex items-center justify-center relative shrink-0">
          <img
            //eslint-disable-next-line
            src={require(`../../assets/data/users/${user.img}`)}
            alt="User Profile Picture"
            className={`w-full h-full absolute top-0 left-0 object-center object-cover ${expense.paid && "opacity-50"} rounded-full`}
          />
        </div>
        <p className={`text-normal ${expense.paid ? "text-black60" : "text-white"} mt-2`}>
          {expense.users.length} member
          <span className={expense.users.length > 1 ? "" : "hidden"}>s</span>
        </p>
      </div>
    </div>
  );
};

Expense.propTypes = {
  expense: PropTypes.object,
};

export default Expense;
