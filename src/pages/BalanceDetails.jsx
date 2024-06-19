import React, { useEffect, useState } from "react";
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

  const getUserDisplayName = (user) => {
    const nameParts = user.name.split(" ");
    const firstName = nameParts[0];
    const lastNameInitial = nameParts[nameParts.length - 1].charAt(0);
    return `${firstName} ${lastNameInitial}.`;
  };

  if (!balance || !user || !expenses || !authUser) return null;

  return (
    <div className="relative bg-white min-h-screen flex flex-col">
      <TopBar />
      <main className="pt-28 flex-grow">
        <div className="flex flex-col px-5 mt-6 fade-in">
          <div className="bg-black rounded-2xl flex justify-start w-full relative text-white p-3 relative h-[72px]">
            <div className="flex top-3 right-3 ">
              <div className="w-[45px] h-[45px] rounded-full flex items-center justify-center relative shrink-0">
                <img
                  //eslint-disable-next-line
                  src={require(`../assets/data/users/${authUser.img}`)}
                  alt="User Profile Picture"
                  className="w-full h-full absolute top-0 left-0 object-center object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-[45px] h-[45px] rounded-full flex items-center justify-center relative shrink-0 -ml-5">
                <img
                  //eslint-disable-next-line
                  src={require(`../assets/data/users/${user.img}`)}
                  alt="User Profile Picture"
                  className="w-full h-full absolute top-0 left-0 object-center object-cover rounded-full"
                  referrerPolicy="no-referrer"  
                />
              </div>
            </div>
            <div className="flex flex-col ml-2 grow">
              {balance > 0 ? (
                <h2 className="font-light text-base">
                  <span className="font-semibold">You</span> owe{" "}
                  <span className="font-semibold">{getUserDisplayName(user)}</span>
                </h2>
              ) : (
                <h2 className="font-light text-base">
                  <span className="font-semibold">{getUserDisplayName(user)}</span> owes{" "}
                  <span className="font-semibold">you</span>
                </h2>
              )}
            </div>
            <div className="flex text-2xl font-semibold text-salmon ml-2">
              {Math.abs(balance).toFixed(2)}
              <span className="font-light text-2xl">€</span>
            </div>
          </div>
          <div className="flex flex-col mt-6 pb-24 gap-y-3">
            <h2 className="text-lg font-normal">Expenses</h2>
            {expenses &&
              expenses.map((expense, index) => (
                <ExpenseInBalance expense={expense} authUser={authUser} key={index} />
              ))}
          </div>
        </div>

        {balance < 0 ? (
          <div className="fixed bottom-[80px] bg-white w-full p-5">
            <Button label="Define as paid" action={handlePaidBalance} />
          </div>
        ) : (
          <p className="font-light text-black text-sm w-full text-center mt-6">
            Only {user.name} can define
            <br />
            this balance as paid!
          </p>
        )}
      </main>
      <BottomBar />
    </div>
  );
};

export default BalanceDetails;
