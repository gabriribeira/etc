import React from "react";
import TopBar from "../components/common/TopBar";
import BottomBar from "../components/common/BottomBar";
import ExpenseInBalance from "../components/expenses/ExpenseInBalance";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import ExpensesData from "../data/expenses.json";

const BalanceDetails = () => {
  const expensesData = ExpensesData;
  const location = useLocation();
  const navigate = useNavigate();
  const { balance, user, expenses } = location.state || {};
  const handlePaidBalance = () => {
    expenses.forEach((expense) => {
      expensesData.forEach((expenseData) => {
        if (expenseData.id === expense.id) {
          if (expenseData.users.length === 1) {
            expenseData.paid = true;
          } else {
            expenseData.value =
              expenseData.value - expense.value / expenseData.users.length;
            expenseData.users = expenseData.users.filter(
              (userIt) => userIt !== user.id
            );
          }
        }
      });
    });
    navigate("/expenses");
  };
  return (
    balance &&
    user &&
    expenses && (
      <div className="relative bg-white">
        <TopBar />
        <div className="flex flex-col px-5 mt-6 fade-in">
          <div className="bg-black90 bg-gradient-to-r shadow-lg from-black90 to-white/30 rounded-2xl flex items-end relative text-white p-3 relative h-[180px]">
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
            <div className="flex flex-col mt-20">
              {balance > 0 ? (
                <h2 className="font-light text-lg">
                  <span className="font-semibold">You</span> owe{" "}
                  <span className="font-semibold">{user.name}</span>
                </h2>
              ) : (
                <h2 className="font-light text-lg">
                  <span className="font-semibold">{user.name}</span> owes{" "}
                  <span className="font-semibold">you</span>
                </h2>
              )}
              <h1 className="text-4xl font-semibold">
                {Math.abs(balance.toFixed(2))}
                <span className="font-light text-2xl">€</span>
              </h1>
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
        {balance < 0 ? (
          <div className="mt-6 fixed bottom-[80px] bg-white w-screen p-5">
            <Button label="Define as paid" action={handlePaidBalance} />
          </div>
        ) : (
          <p className="font-light text-black text-sm w-full text-center mt-6">
            Only {user.name} can define
            <br />
            this balance as paid!
          </p>
        )}
        <BottomBar />
      </div>
    )
  );
};

export default BalanceDetails;
