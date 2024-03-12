import React, { useEffect, useState } from "react";
import ExpensesData from "../../data/expenses.json";
import UsersData from "../../data/users.json";
import { Link } from "react-router-dom";

const Balances = () => {
  const expensesData = ExpensesData;
  const usersData = UsersData;
  const [balances, setBalances] = useState(null);
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
  useEffect(() => {
    if (expensesData && usersData && authUser) {
      const calculatedBalances = calculateBalances(
        expensesData,
        usersData,
        authUser.id
      );
      setBalances(calculatedBalances);
    }
  }, [expensesData, usersData, authUser]);

  const calculateBalances = (expenses, users, authenticatedUserId) => {
    const userBalances = {};
    const userExpenses = {};

    // Initialize balances and expenses
    users.forEach((user) => {
      userBalances[user.id] = 0;
      userExpenses[user.id] = [];
    });

    // Calculate balances and track expenses based on expenses
    expenses.forEach((expense) => {
      if (!expense.paid) {
        const numberOfUsers = expense.users.length || 1; // Avoid division by zero
        const amountPerUser = expense.value / numberOfUsers;

        userBalances[expense.user_id] += expense.value;

        expense.users.forEach((userId) => {
          if (userId !== authenticatedUserId) {
            userBalances[userId] -= amountPerUser;
            userExpenses[userId].push(expense);
          }
        });
      }
    });

    return { userBalances, userExpenses };
  };

  const handleDetailsClick = (user) => {
    return balances.userExpenses[user.id];
  };

  return (
    <>
      {balances &&
        usersData.map(
          (user) =>
            user.id !== authUser.id &&
            (balances.userBalances[user.id] < 0 ||
              balances.userBalances[user.id] > 0) && (
              <Link
                to={"/expenses/balance"}
                state={{
                  balance: balances.userBalances[user.id],
                  user: user,
                  expenses: handleDetailsClick(user),
                }}
                key={user.id}
                className={`bg-black90 bg-gradient-to-r from-black90 to-white/30 shadow-lg rounded-2xl flex justify-between items-center w-full p-3 h-[160px]`}
              >
                <div className="flex flex-col justify-end h-full">
                  <h2 className="text-lg text-white font-normal">
                    {balances[user.id] > 0
                      ? <span><span className="font-medium">You</span> <span className="font-light">owe</span> <span className="font-medium">{balances.userBalances[user.id]}</span></span>
                      : <span className="font-medium">{user.name} <span className="font-light">owes</span> <span className="font-medium">you</span></span>}
                  </h2>
                  <div className="flex flex-col">
                    <div className="text-3xl font-semibold text-white">
                      {Math.abs(balances.userBalances[user.id].toFixed(2))}
                      <span className="font-light text-xl">€</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-start items-start h-full">
                  <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center relative shrink-0">
                    <img
                      //eslint-disable-next-line
                      src={require(`../../assets/data/users/${user.img}`)}
                      alt="User Profile Picture"
                      className="w-full h-full absolute top-0 left-0 object-center object-cover rounded-full"
                    />
                  </div>
                  <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center relative shrink-0 -ml-5">
                    <img
                      //eslint-disable-next-line
                      src={require(`../../assets/data/users/${authUser.img}`)}
                      alt="User Profile Picture"
                      className="w-full h-full absolute top-0 left-0 object-center object-cover rounded-full"
                    />
                  </div>
                </div>
              </Link>
            )
        )}
    </>
  );
};

export default Balances;
