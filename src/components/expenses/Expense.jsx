import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import UsersData from "../../data/users.json";

const Expense = ({ expense }) => {

  const users = UsersData;
  const user = users.find((user) => user.id === expense.user_id);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const getCookieValue = (cookieName) => {
      const cookies = document.cookie.split("; ");
      for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === cookieName) {
          return JSON.parse(decodeURIComponent(value));
        }
      }
      return null;
    };

    const storedUser = getCookieValue("user");
    if (storedUser) {
      setAuthUser(storedUser);
    }
  }, []);

  return (
    authUser && expense &&
    <div
      className={`${expense.user_id !== authUser.id ? "bg-black  shadow-lg" : "bg-black shadow-lg from-salmon to-black90/40"
        } rounded-2xl flex justify-between items-center h-[130px] w-full p-3`}
    >
      <div className={`flex flex-col justify-between h-full text-white`}>
        <h2 className="text-lg font-normal">{expense.title}</h2>
        <div className="flex flex-col">
          <div className="text-3xl font-semibold text-salmon">
            {expense.value.toFixed(2)}<span className="font-light text-xl">€</span>
          </div>
          <p className="font-light text-sm">
            spent by <span className="font-semibold">{user.name}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end h-full">
        <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center relative shrink-0">
          <img
            //eslint-disable-next-line
            src={require(`../../assets/data/users/${user.img}`)}
            alt="User Profile Picture"
            className={`w-full h-full absolute top-0 left-0 object-center object-cover rounded-full`}
          />
        </div>
        <p className={`text-sm text-white`}>
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
