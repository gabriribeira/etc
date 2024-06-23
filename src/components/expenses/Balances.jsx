import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

const Balances = ({ expenses }) => {
  const authUser = useSelector((state) => state.auth.user);
  const [receivables, setReceivables] = useState([]);
  const [payables, setPayables] = useState([]);
  const [showMoreCredits, setShowMoreCredits] = useState(false);
  const [showMoreDebts, setShowMoreDebts] = useState(false);

  useEffect(() => {
    if (expenses && authUser) {
      calculateBalances(expenses, authUser.id);
    }
  }, [expenses, authUser]);

  const calculateBalances = (expenses, authenticatedUserId) => {
    const receivables = {};
    const payables = {};

    expenses.forEach((expense) => {
      const { user_id: payerId, users, value, is_paid } = expense;
      const amountPerUser = value / users.length;

      if (!is_paid) {
        users.forEach((user) => {
          if (!user.Expense_User.is_paid) {
            if (payerId === authenticatedUserId && user.id !== authenticatedUserId) {
              if (!receivables[user.id]) {
                receivables[user.id] = { user, balance: 0, expenses: [] };
              }
              receivables[user.id].balance += amountPerUser;
              receivables[user.id].expenses.push(expense);
            } else if (user.id === authenticatedUserId && payerId !== authenticatedUserId) {
              if (!payables[payerId]) {
                payables[payerId] = { user: expense.payer, balance: 0, expenses: [] };
              }
              payables[payerId].balance -= amountPerUser;
              payables[payerId].expenses.push(expense);
            }
          }
        });
      }
    });

    setReceivables(Object.values(receivables));
    setPayables(Object.values(payables));
  };

  return (
    <>
      <p className="mt-3">My Receivables ({receivables.length})</p>
      {receivables
        .slice(0, showMoreCredits ? receivables.length : 2)
        .map(({ user, balance, expenses }) => (
          <Link
            to={"/expenses/balance"}
            state={{
              balance: balance,
              user: user,
              expenses: expenses,
            }}
            key={user.id}
            className={`bg-black shadow-lg rounded-2xl flex justify-between items-center w-full p-3 h-[130px]`}
          >
            <div className="flex flex-col h-full w-full justify-between">
              <div className="flex justify-start w-full ">
                <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center relative shrink-0">
                  <img
                    src={user.img_url}
                    alt="User Profile Picture"
                    className="w-full h-full absolute top-0 left-0 object-center object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center relative shrink-0 -ml-5">
                  <img
                    src={authUser.img_url}
                    alt="User Profile Picture"
                    className="w-full h-full absolute top-0 left-0 object-center object-cover rounded-full"
                    referrerPolicy="no-referrer"
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
                  <h2 className="text-xl text-white font-medium">
                    {Math.abs(balance).toFixed(2)}€
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
      {receivables.length > 2 && (
        <button
          className="text-sm text-gray-500 mt-2 focus:outline-none"
          onClick={() => setShowMoreCredits(!showMoreCredits)}
        >
          {showMoreCredits ? "Show less" : "Show more"}
        </button>
      )}

      <p className="mt-3">My Payables ({payables.length})</p>
      {payables
        .slice(0, showMoreDebts ? payables.length : 2)
        .map(({ user, balance, expenses }) => (
          user && ( // Ensure user is not undefined
            <Link
              to={"/expenses/balance"}
              state={{
                balance: balance,
                user: user,
                expenses: expenses,
              }}
              key={user.id}
              className={`bg-black shadow-lg rounded-2xl flex justify-between items-center w-full p-3 h-[130px]`}
            >
              <div className="flex flex-col h-full w-full justify-between">
                <div className="flex justify-start w-full ">
                  <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center relative shrink-0">
                    <img
                      src={authUser.img_url}
                      alt="User Profile Picture"
                      className="w-full h-full absolute top-0 left-0 object-center object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center relative shrink-0 -ml-5">
                    <img
                      src={user.img_url}
                      alt="User Profile Picture"
                      className="w-full h-full absolute top-0 left-0 object-center object-cover rounded-full"
                      referrerPolicy="no-referrer"
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
                    <h2 className="text-xl text-white font-medium">
                      {Math.abs(balance).toFixed(2)}€
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
          )
        ))}
      {payables.length > 2 && (
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