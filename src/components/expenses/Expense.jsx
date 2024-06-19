import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Expense = ({ expense }) => {
  const authUser = useSelector((state) => state.auth.user);
  const paid = expense.paid;

  // const getUserDisplayName = (user) => {
  //   const nameParts = user.name.split(" ");
  //   const firstName = nameParts[0];
  //   const lastNameInitial = nameParts[nameParts.length - 1].charAt(0);
  //   return `${firstName} ${lastNameInitial}.`;
  // };

  return (
    authUser && expense && (
      <Link to={{
        pathname: `/expenses/expensedetails/${expense.id}`,
        state: { expense }
      }} className="w-full">
        <div
          className={`${expense.user_id !== authUser.id ? "bg-black shadow-lg" : "bg-black shadow-lg from-salmon to-black90/40"
            } rounded-2xl flex flex-col justify-between items-center h-[130px] w-full p-3`}
        >
          <div className={`flex justify-start w-full text-white`} id="1">
            <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center relative shrink-0 mt-1">
              {/* <img
                //eslint-disable-next-line
                src={require(`../../assets/data/users/${user.img}`)}
                alt="User Profile Picture"
                className={`w-full h-full absolute top-0 left-0 object-center object-cover rounded-full`}
              /> */}
            </div>
            <div className="flex flex-col ml-2 grow">
              <h2 className="text-lg font-normal">{expense.title}</h2>
              <p className="font-light text-sm">
                {/* paid by <span className="font-semibold">{getUserDisplayName(user)}</span> */}
              </p>
            </div>
            <div className="flex text-2xl font-semibold text-salmon">
              {expense.value.toFixed(2)}<span className="font-light">€</span>
            </div>
          </div>
          <div className="flex justify-start w-full" id="2">
            <p className="font-semibold text-sm bg-white text-black py-1 px-5 rounded-full w-fit">
              {expense.users?.length} member
              <span className={expense.users?.length > 1 ? "" : "hidden"}>s</span>
            </p>
            <p className="font-semibold text-sm bg-white text-black py-1 px-5 rounded-full w-fit ml-2">
              {expense.category}
            </p>
            {paid && (
              <p className="font-semibold text-sm bg-salmon text-black py-1 px-5 rounded-full w-fit ml-2">
                paid
              </p>
            )}
          </div>
        </div>
      </Link>
    )
  );
};

Expense.propTypes = {
  expense: PropTypes.object.isRequired,
};

export default Expense;
