import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BottomBar from "../common/BottomBar";
import TopBar from "../common/TopBar";
import UsersData from "../../data/users.json";
import ExpensesData from "../../data/expenses.json";
import Button from "../common/Button";

const ExpenseDetail = () => {
  const location = useLocation();
  const [expenseId, setExpenseId] = useState(null);
  const [expense, setExpense] = useState(null);
  const [user, setUser] = useState(null);
  const [members, setMembers] = useState([]);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const id = location.pathname.split("/")[3];
    setExpenseId(id);
  }, [location.pathname]);

  useEffect(() => {
    if (expenseId) {
      const expenseData = ExpensesData.find(
        (expense) => expense.id === parseInt(expenseId)
      );

      if (expenseData) {
        setExpense(expenseData);
        const payer = UsersData.find((user) => user.id === expenseData.user_id);
        setUser(payer);
        const memberList = expenseData.users.map((userId) =>
          UsersData.find((user) => user.id === userId)
        );
        setMembers(memberList);
      }
    }
  }, [expenseId]);

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

  if (!expense || !user) {
    return <div>Loading...</div>;
  }

  const handlePaidBalance = () => {
    console.log("Clicked!");
  };

  const getUserDisplayName = (user) => {
    const nameParts = user.name.split(" ");
    const firstName = nameParts[0];
    const lastNameInitial = nameParts[nameParts.length - 1].charAt(0);
    return `${firstName} ${lastNameInitial}.`;
  };

  return (
    <div className="relative bg-white min-h-screen">
      <TopBar />
      <main className="mt-32">
        <div className="flex flex-col px-4 mt-6 fade-in">
          <div className="bg-black shadow-lg rounded-2xl p-3 mb-4 text-white flex justify-start items-center">
            <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center relative shrink-0 mt-1 mr-3">
              <img
              //eslint-disable-next-line
                src={require(`../../assets/data/users/${user.img}`)}
                alt="User Profile Picture"
                className="w-full h-full absolute top-0 left-0 object-center object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col grow">
              <h2 className="text-xl font-medium">{expense.title}</h2>
              <p className="text-sm">paid by {getUserDisplayName(user)}</p>
            </div>
            <div className="text-2xl font-semibold text-red-500 ml-2">
              {expense.value.toFixed(2)}€
            </div>
          </div>
          <p className="font-medium">Members ({members.length})</p>
          {members.map((member) => (
            <div key={member.id} className="flex bg-black20 rounded-xl p-2 my-2 font-semibold justify-start items-center">
              <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center relative shrink-0 mt-1 mr-3">
                <img
                //eslint-disable-next-line
                  src={require(`../../assets/data/users/${member.img}`)}
                  alt="User Profile Picture"
                  className="w-full h-full absolute top-0 left-0 object-center object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>{member.name}</div>
            </div>
          ))}
          <div className="bg-black20 rounded-xl px-4 py-3 mb-2 mt-5 flex justify-between">
            <p className="text-gray-600">Date</p>
            <p>{new Date(expense.date).toLocaleDateString()}</p>
          </div>
          <div className="bg-black20 rounded-xl px-4 py-3 flex justify-between">
            <p className="text-gray-600">Category</p>
            <p>{expense.category}</p>
          </div>

          {authUser && authUser.id === user.id && !expense.paid && (
            <div className="fixed bottom-[80px] w-full flex justify-center">
              <Button label="Define as paid" action={handlePaidBalance} aria="Button define as paid" />
            </div>
          )}
        </div>
      </main>
      <BottomBar />
    </div>
  );
};

export default ExpenseDetail;
