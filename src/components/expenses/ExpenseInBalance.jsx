import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ExpenseInBalance = ({ expense, authUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (expense && expense.users) {
      const userAux = expense.users.find((user) => user.id === expense.user_id);
      setUser(userAux);
    }
  }, [expense]);

  useEffect(() => {
    console.log('ExpenseInBalance - Expense:', expense);
  }, [user, expense]);

  const amountPerUser = (expense?.value / expense?.users.length).toFixed(2);
  const isPaidByAuthUser = authUser.id === expense.user_id;
  const amountColor = isPaidByAuthUser ? "text-salmon" : "text-white";

  const getUserDisplayName = (name) => {
    const nameParts = name.split(" ");
    const firstName = nameParts[0];
    const lastNameInitial = nameParts[nameParts.length - 1].charAt(0);
    return `${firstName} ${lastNameInitial}.`;
  };

  return (
    <Link to={`/expense-details/${expense.id}`} className="no-underline">
      <div className="bg-black rounded-2xl flex justify-between items-center h-[130px] w-full p-3">
        <div className="flex flex-col h-full w-full justify-between">
          <div className="flex justify-start w-full">
            <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center relative shrink-0">
              <img
                src={expense.payer?.img_url}
                alt="User Profile Picture"
                className="w-full h-full absolute top-0 left-0 object-center object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col ml-2 grow h-full text-white">
              <h2 className="text-lg font-normal">{expense.title}</h2>
              <p className="font-light text-sm">
                paid by <span className="font-semibold">{getUserDisplayName(expense.payer.name)}</span>
              </p>
            </div>
            <div className="flex justify-end">
              <div className={`text-2xl font-semibold ${amountColor}`}>
                {amountPerUser}
                <span className="font-light text-xl">€</span>
              </div>
            </div>
          </div>
          <div className="flex justify-start w-full">
            <p className="font-semibold text-sm bg-white text-black py-1 px-5 rounded-full w-fit">
              {expense.users.length} member
              <span className={expense.users.length > 1 ? "" : "hidden"}>s</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

ExpenseInBalance.propTypes = {
  expense: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
};

export default ExpenseInBalance;