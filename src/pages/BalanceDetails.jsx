import React, { useEffect } from "react";
// eslint-disable-next-line
import PropTypes from "prop-types";
import TopBar from "../components/common/TopBar";
import BottomBar from "../components/common/BottomBar";
import ExpenseInBalance from "../components/expenses/ExpenseInBalance";
import { useLocation } from "react-router-dom";

const BalanceDetails = () => {
  const location = useLocation();
  // eslint-disable-next-line
  const { balance, user, expenses } = location.state || {};
  useEffect(() => {
    if (location.state) {
      console.log(location.state.expenses, "ola");
    }
  }, [location.state]);
  return (
    balance &&
    user &&
    expenses && (
      <div>
        <TopBar />
        <div className="flex flex-col px-5 mt-6">
          <div className="bg-black90 h-[200px] rounded-2xl flex items-end relative text-white p-6 relative h-full">
            <div className="flex top-3 right-3 absolute">
              <div className="w-[45px] h-[45px] rounded-full flex items-center justify-center relative shrink-0">
                <img
                  //eslint-disable-next-line
                  src={require(`../assets/data/users/gabriribeira.webp`)}
                  alt="User Profile Picture"
                  className="w-full h-full absolute top-0 left-0 object-center object-cover rounded-full"
                />
              </div>
              <div className="w-[45px] h-[45px] rounded-full flex items-center justify-center relative shrink-0 -ml-5">
                <img
                  //eslint-disable-next-line
                  src={require(`../assets/data/users/carolina.webp`)}
                  alt="User Profile Picture"
                  className="w-full h-full absolute top-0 left-0 object-center object-cover rounded-full"
                />
              </div>
            </div>
            <div className="flex flex-col">
              {balance > 0 ? (
                <h2 className="font-light text-lg">
                  You owe <span className="font-semibold">{user.name}</span>
                </h2>
              ) : (
                <h2 className="font-light text-lg">
                  <span className="font-semibold">{user.name}</span> owes you
                </h2>
              )}
              <h1 className="text-4xl font-semibold">{balance.toFixed(2)}€</h1>
            </div>
          </div>
          <div className="flex flex-col mt-6 gap-y-3">
            <h2 className="text-lg font-semibold">Expenses</h2>
            {expenses &&
              expenses.map((expense, index) => (
                <ExpenseInBalance expense={expense} key={index} />
              ))}
          </div>
        </div>
        <BottomBar />
      </div>
    )
  );
};

BalanceDetails.propTypes = {
  location: PropTypes.object.isRequired,
};

export default BalanceDetails;
