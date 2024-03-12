import React from "react";
import PropTypes from "prop-types";
import UsersData from "../../data/users.json";

const Expense = ({ expense }) => {

  const users = UsersData;
  const user = users.find((user) => user.id === expense.user_id);

  return (
    <div
      className={`${expense.paid ? "bg-black90 bg-gradient-to-r from-black90 to-white/30 shadow-lg" : "bg-salmon bg-gradient-to-l shadow-lg from-salmon to-black90/40"
        } rounded-2xl flex justify-between items-center h-[180px] w-full p-3`}
    >
      <div className={`flex flex-col justify-between h-full text-white`}>
        <h2 className="text-xl font-normal">{expense.title}</h2>
        <div className="flex flex-col">
          <div className="text-4xl font-semibold">
            {expense.value.toFixed(2)}<span className="font-light text-xl">€</span>
          </div>
          <p className="font-light text-base">
            spent by <span className="font-semibold">{user.name}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end h-full">
        <div className="w-[45px] h-[45px] rounded-full flex items-center justify-center relative shrink-0">
          <img
            //eslint-disable-next-line
            src={require(`../../assets/data/users/${user.img}`)}
            alt="User Profile Picture"
            className={`w-full h-full absolute top-0 left-0 object-center object-cover rounded-full`}
          />
        </div>
        <p className={`text-normal text-white`}>
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
