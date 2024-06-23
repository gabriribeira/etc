import React, { useEffect, useState } from "react";
import TopBar from "../components/common/TopBar";
import BottomBar from "../components/common/BottomBar";
import DividerTabs from "../components/common/DividerTabs";
import Expense from "../components/expenses/Expense";
import Balances from "../components/expenses/Balances";
import { useGetExpensesQuery } from "../app/api";
import { useSelector } from "react-redux";
import { useNavigationType } from "react-router-dom";

const Expenses = () => {
  const { data: expensesData, error, isLoading, refetch } = useGetExpensesQuery();
  const [activeTab, setActiveTab] = useState(0);
  const [expenses, setExpenses] = useState(null);
  const authUser = useSelector((state) => state.auth.user);
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === "PUSH" || navigationType === "POP") {
      refetch();
    }
  }, [navigationType, refetch]);


  useEffect(() => {
    if (expensesData && authUser) {

      setExpenses(expensesData.data);
    }
  }, [expensesData, authUser]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading expenses</div>;

  return (
    <div className="relative bg-white min-h-screen">
      <TopBar />
      <main className="pt-20">
        <div className="flex flex-col px-5">
          <DividerTabs
            tabs={["Expenses", "Balances"]}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          {activeTab === 0 ? (
            <div className="flex flex-col py-5 gap-y-3 fade-in">
              {expenses &&
                expenses.map((expense, index) => (
                  <React.Fragment key={index}>
                    {index === 0 || expenses[index - 1]?.date !== expense.date ? (
                      <h1 className="font-light text-base">
                        {formatDate(expense.date)}
                      </h1>
                    ) : null}
                    <Expense expense={expense} />
                  </React.Fragment>
                ))}
            </div>
          ) : (
            <div className="flex flex-col py-3 gap-y-3 fade-in">
              <Balances expenses={expenses} />
            </div>
          )}
        </div>
      </main>
      <BottomBar />
    </div>
  );
};

const formatDate = (expenseDate) => {
  const today = new Date();
  const expenseDateObj = new Date(expenseDate);
  const timeDiff = today.getTime() - expenseDateObj.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (daysDiff === 0) {
    return "Today";
  } else if (daysDiff === 1) {
    return "Yesterday";
  } else {
    return expenseDateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
};

export default Expenses;