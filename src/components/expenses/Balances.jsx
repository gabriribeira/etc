import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { useGetHouseholdQuery } from "../../app/api";

const Balances = ({ expenses }) => {
  const [balances, setBalances] = useState(null);
  const { data: household, isLoading } = useGetHouseholdQuery();
  const authUser = useSelector((state) => state.auth.user);
  const [showMoreCredits, setShowMoreCredits] = useState(false);
  const [showMoreDebts, setShowMoreDebts] = useState(false);
  console.log(household);
  useEffect(() => {
    if (expenses && authUser && household && !isLoading) {
      const calculatedBalances = calculateBalances(
        expenses,
        household.data.Users,
        authUser.id
      );
      setBalances(calculatedBalances);
    }
  }, [expenses, isLoading, authUser, household]);

  const calculateBalances = (expenses, users, authenticatedUserId) => {
    const userBalances = {};
    const userExpenses = {};

    users.forEach((user) => {
      if (
        user.id === authenticatedUserId ||
        expenses.some(
          (exp) =>
            exp.users.some((expUser) => expUser.id === user.id) &&
            exp.users.some((expUser) => expUser.id === authenticatedUserId)
        )
      ) {
        userBalances[user.id] = 0;
        userExpenses[user.id] = [];
      }
    });

    expenses.forEach((expense) => {
      const expenseUsers = expense.users.map((user) => user.id);
      console.log(expense);
      if (
        !expense.is_paid &&
        (expenseUsers.includes(authenticatedUserId) ||
          expense.user_id === authenticatedUserId)
      ) {
        const numberOfUsers = expense.users.length || 1;
        const amountPerUser = expense.value / numberOfUsers;

        if (expense.user_id === authenticatedUserId) {
          expense.users.forEach((expenseUser) => {
            const userId = expenseUser.id;
            if (userId !== authenticatedUserId) {
              userBalances[userId] -= amountPerUser;
              if (userExpenses[userId]) {
                userExpenses[userId].push({
                  ...expense,
                  amountOwed: `+${amountPerUser.toFixed(2)}`,
                });
              }
            }
          });
        } else if (expenseUsers.includes(authenticatedUserId)) {
          userBalances[expense.user_id] += amountPerUser;
          if (userExpenses[expense.user_id]) {
            userExpenses[expense.user_id].push({
              ...expense,
              amountOwed: `-${amountPerUser.toFixed(2)}`,
            });
          }
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

  const creditUsers = household?.data.Users.filter(
    (user) => user.id !== authUser?.id && balances?.userBalances[user.id] < 0
  );
  const debtUsers = household?.data.Users.filter(
    (user) => user.id !== authUser?.id && balances?.userBalances[user.id] > 0
  );

  return (
    <>
      <p className="mt-3">My Receivables ({totalCredits})</p>
      {balances &&
        creditUsers
          .slice(0, showMoreCredits ? creditUsers.length : 2)
          .map((user) => (
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
                      <span className="font-medium">{user.name}</span>{" "}
                      <span className="font-light">owes</span>
                      <span className="font-semibold"> You </span>
                    </h2>
                  </div>

                  <div className="flex ml-2 justify-end">
                    <h2 className="text-lg text-white font-light">
                      {Math.abs(balances.userBalances[user.id]).toFixed(2)}$
                    </h2>
                  </div>
                </div>

                <div className="flex flex-col">
                  <h2 className="text-base text-white text-left w-full font-light mt-2">
                    View details
                  </h2>
                </div>
              </div>
            </Link>
          ))}
      {totalCredits > 2 && (
        <button
          className="text-sm text-gray-500 mt-2 focus:outline-none"
          onClick={() => setShowMoreCredits(!showMoreCredits)}
        >
          {showMoreCredits ? "Show less" : "Show more"}
        </button>
      )}

      <p className="mt-3">My Payables ({totalDebts})</p>
      {balances &&
        debtUsers.slice(0, showMoreDebts ? debtUsers.length : 2).map((user) => (
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
                    src={require(`../../assets/data/users/${authUser.img}`)}
                    alt="User Profile Picture"
                    className="w-full h-full absolute top-0 left-0 object-center object-cover rounded-full"
                  />
                </div>
                <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center relative shrink-0 -ml-5">
                  <img
                    //eslint-disable-next-line
                    src={require(`../../assets/data/users/${user.img}`)}
                    alt="User Profile Picture"
                    className="w-full h-full absolute top-0 left-0 object-center object-cover rounded-full"
                  />
                </div>

                <div className="flex ml-2 grow">
                  <h2 className="text-lg text-white font-normal">
                    <span className="font-semibold">You</span>{" "}
                    <span className="font-light">owe</span>
                    <span className="font-medium"> {user.name} </span>
                  </h2>
                </div>

                <div className="flex ml-2 justify-end">
                  <h2 className="text-lg text-white font-light">
                    {Math.abs(balances.userBalances[user.id]).toFixed(2)}$
                  </h2>
                </div>
              </div>

              <div className="flex flex-col">
                <h2 className="text-base text-white text-left w-full font-light mt-2">
                  View details
                </h2>
              </div>
            </div>
          </Link>
        ))}
      {totalDebts > 2 && (
        <button
          className="text-sm text-gray-500 mt-2 focus:outline-none"
          onClick={() => setShowMoreDebts(!showMoreDebts)}
        >
          {showMoreDebts ? "Show less" : "Show more"}
        </button>
      )}
    </>
  );
};

Balances.propTypes = {
  expenses: propTypes.array.isRequired,
};

export default Balances;
