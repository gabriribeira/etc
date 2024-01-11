import React, { useEffect, useState } from "react";
import TopBar from "../components/common/TopBar";
import BottomBar from "../components/common/BottomBar";
import DividerTabs from "../components/common/DividerTabs";
import ExpensesData from "../data/expenses.json";
import Expense from "../components/expenses/Expense";
import Balances from "../components/expenses/Balances";
import NewButton from "../components/common/NewButton";

const Expenses = () => {
  const expensesData = ExpensesData;
  const [activeTab, setActiveTab] = useState(0);
  const [expenses, setExpenses] = useState(null);

  useEffect(() => {
    if (expensesData) {
      const expensesAux = expensesData
        .filter((expense) => expense.household_id === 1) // NÃO ESQUECER ALTERAR PARA HOUSEHOLD CORRETO
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      setExpenses(expensesAux);
    }
  }, [expensesData]);

  return (
    <div className="relative">
      <TopBar />
      <div className="flex flex-col px-5">
        <DividerTabs
          tabs={["Expenses", "Balances"]}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {activeTab === 0 ? (
          <div className="flex flex-col py-3 gap-y-3">
            {expenses &&
              expenses.map((expense, index) => (
                <React.Fragment key={index}>
                  {index === 0 || expenses[index - 1]?.date !== expense.date ? (
                    <h1 className="font-semibold text-lg">
                      {formatDate(expense.date)}
                    </h1>
                  ) : null}
                  <Expense expense={expense} />
                </React.Fragment>
              ))}
          </div>
        ) : (
          <div className="flex flex-col py-3 gap-y-3">
            <Balances />
          </div>
        )}
      </div>
      <NewButton path={"/expenses/new"} />
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
    // Show the full date for expenses on different days
    return expenseDateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
};

export default Expenses;
