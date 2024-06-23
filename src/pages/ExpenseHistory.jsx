import React, { useEffect, useState } from "react";
import TopBar from "../components/common/TopBar";
import BottomBar from "../components/common/BottomBar";
import Expense from "../components/expenses/Expense";
import { useGetExpensesHistoryQuery } from "../app/api";
import { useSelector } from "react-redux";

const ExpenseHistory = () => {
    const { data: expensesData, error, isLoading } = useGetExpensesHistoryQuery();
    const [expenses, setExpenses] = useState(null);
    const authUser = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (expensesData && authUser) {
            setExpenses(expensesData.data);
        }
    }, [expensesData, authUser]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading expenses history</div>;

    return (
        <div className="relative bg-white min-h-screen">
            <TopBar />
            <main className="pt-28">
                <div className="flex flex-col px-5">
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

export default ExpenseHistory;