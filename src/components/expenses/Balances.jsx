import React, { useEffect, useState } from "react";
import ExpensesData from "../../data/expenses.json";
import UsersData from "../../data/users.json";
import { Link } from "react-router-dom";

const Balances = () => {
  const expensesData = ExpensesData;
  const usersData = UsersData;
  const [balances, setBalances] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [showMoreCredits, setShowMoreCredits] = useState(false);
  const [showMoreDebts, setShowMoreDebts] = useState(false);

  const getUserDisplayName = (user) => {
    const nameParts = user.name.split(" ");
    const firstName = nameParts[0];
    const lastNameInitial = nameParts[nameParts.length - 1].charAt(0);
    return `${firstName} ${lastNameInitial}.`;
  };

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

    // Initialize balances and expenses for the authenticated user only
    users.forEach((user) => {
      if (
        user.id === authenticatedUserId ||
        expenses.some(
          (exp) =>
            exp.users.includes(user.id) &&
            exp.users.includes(authenticatedUserId)
        )
      ) {
        userBalances[user.id] = 0;
        userExpenses[user.id] = [];
      }
    });

    // Calculate balances and track expenses based on expenses involving the authenticated user
    expenses.forEach((expense) => {
      if (
        !expense.paid &&
        (expense.users.includes(authenticatedUserId) ||
          expense.user_id === authenticatedUserId)
      ) {
        const numberOfUsers = expense.users.length || 1; // Avoid division by zero
        const amountPerUser = expense.value / numberOfUsers;

        if (expense.user_id === authenticatedUserId) {
          // The authenticated user paid the expense
          expense.users.forEach((userId) => {
            if (userId !== authenticatedUserId) {
              userBalances[userId] -= amountPerUser; // They owe the authenticated user
              userExpenses[userId].push({
                ...expense,
                amountOwed: `+${amountPerUser.toFixed(2)}`,
              });
            }
          });
        } else if (expense.users.includes(authenticatedUserId)) {
          // The authenticated user owes part of this expense
          userBalances[expense.user_id] += amountPerUser; // Authenticated user owes the payer
          userExpenses[expense.user_id].push({
            ...expense,
            amountOwed: `-${amountPerUser.toFixed(2)}`,
          });
        }
      }
    });

    return { userBalances, userExpenses };
  };

  const handleDetailsClick = (user) => {
    return balances.userExpenses[user.id];
  };

  const totalCredits = Object.values(balances?.userBalances || {}).filter(
    (balance) => balance < 0
  ).length;
  const totalDebts = Object.values(balances?.userBalances || {}).filter(
    (balance) => balance > 0
  ).length;

  const creditUsers = usersData.filter(
    (user) => user.id !== authUser?.id && balances?.userBalances[user.id] < 0
  );
  const debtUsers = usersData.filter(
    (user) => user.id !== authUser?.id && balances?.userBalances[user.id] > 0
  );

  return (
    <>
      <p className="mt-3">My Receivables ({totalCredits})</p>
      {balances &&
        creditUsers.slice(0, showMoreCredits ? creditUsers.length : 2).map(
          (user) => (
            <Link
              to={"/expenses/balance"}
              state={{
                balance: balances.userBalances[user.id],
                user: user,
                expenses: handleDetailsClick(user),
              }}
              key={user.id}
              className={`bg-black shadow-lg rounded-2xl flex justify-between items-center w-full p-3 h-[130px]`}
            >
              <div className="flex flex-col h-full w-full justify-between">
                <div className="flex justify-start w-full ">
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

                  <div className="flex ml-2 grow">
                    <h2 className="text-lg text-white font-normal">
                      <span className="font-medium">{getUserDisplayName(user)}</span>{" "}
                      <span className="font-light">owes</span><span className="font-semibold"> You </span>
                      
                    </h2>
                  </div>

                  <div className="flex ml-2 justify-end">
                    <div className="text-2xl font-semibold text-salmon">
                      {Math.abs(balances.userBalances[user.id]).toFixed(2)}
                      <span className="font-light text-xl">€</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-start w-full" id="2">
                  <p className="font-semibold text-sm bg-white text-black py-1 px-5 rounded-full w-fit">
                    {balances.userExpenses[user.id].length} expense
                    {balances.userExpenses[user.id].length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </Link>
          )
        )}
      {creditUsers.length > 2 && (
        <div className="w-full text-left mb-3">
        <button
          onClick={() => setShowMoreCredits(!showMoreCredits)}
          className="text-blue-500 font-bold"
        >
          {showMoreCredits ? "See less" : "See more"}
        </button>
      </div>
      )}
      <p>My Debts ({totalDebts})</p>
      {balances &&
        debtUsers.slice(0, showMoreDebts ? debtUsers.length : 2).map(
          (user) => (
            <Link
              to={"/expenses/balance"}
              state={{
                balance: balances.userBalances[user.id],
                user: user,
                expenses: handleDetailsClick(user),
              }}
              key={user.id}
              className="bg-black shadow-lg rounded-2xl flex justify-between items-center w-full p-3 h-[130px]"
            >
              <div className="flex flex-col h-full w-full justify-between">
                <div className="flex justify-start w-full">
                  <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center relative shrink-0">
                    <img
                      src={require(`../../assets/data/users/${user.img}`)}
                      alt="User Profile Picture"
                      className="w-full h-full absolute top-0 left-0 object-center object-cover rounded-full"
                    />
                  </div>
                  <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center relative shrink-0 -ml-5">
                    <img
                      src={require(`../../assets/data/users/${authUser.img}`)}
                      alt="Auth User Profile Picture"
                      className="w-full h-full absolute top-0 left-0 object-center object-cover rounded-full"
                    />
                  </div>
                  <div className="flex ml-2 grow">
                    <h2 className="text-lg text-white font-normal">
                      <span className="font-medium">You owe </span>
                      <span className="font-medium">{getUserDisplayName(user)}</span>{" "}
                      <span className="font-light">
                        {Math.abs(balances.userBalances[user.id]).toFixed(2)}€
                      </span>
                    </h2>
                  </div>
                  <div className="flex ml-2 justify-end">
                    <div className="text-2xl font-semibold text-salmon">
                      {Math.abs(balances.userBalances[user.id]).toFixed(2)}
                      <span className="font-light text-xl">€</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-start w-full" id="2">
                  <p className="font-semibold text-sm bg-white text-black py-1 px-5 rounded-full w-fit">
                    {balances.userExpenses[user.id].length} expense
                    {balances.userExpenses[user.id].length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </Link>
          )
        )}
      {debtUsers.length > 2 && (
        <div className="w-full text-left">
        <button
          onClick={() => setShowMoreDebts(!showMoreDebts)}
          className="text-blue-500"
        >
          {showMoreDebts ? "See less" : "See more"}
        </button>
        </div>
      )}
    </>
  );
};

export default Balances;
