import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BottomBar from "../common/BottomBar";
import TopBar from "../common/TopBar";
import Button from "../common/Button";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { useGetExpenseQuery, useMarkExpensePaidMutation, useDeleteExpenseMutation, useMarkWholeExpensePaidMutation } from "../../app/api";
import { useSelector } from "react-redux";

const ExpenseDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expenseId, setExpenseId] = useState(null);
  const authUser = useSelector((state) => state.auth.user);
  const [expense, setExpense] = useState(null);
  const [userHasPaid, setUserHasPaid] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showMarkWholeExpenseConfirmation, setShowMarkWholeExpenseConfirmation] = useState(false);

  useEffect(() => {
    const id = location.pathname.split("/")[2];
    setExpenseId(id);
  }, [location.pathname]);

  const { data: retrievedExpense, refetch } = useGetExpenseQuery(expenseId, {
    skip: !expenseId,
  });

  useEffect(() => {
    if (retrievedExpense) {
      setExpense(retrievedExpense.data);
      const hasPaid = retrievedExpense.data.users.some(user => user.id === authUser.id && user.Expense_User.is_paid);
      setUserHasPaid(hasPaid);
    }
  }, [retrievedExpense, authUser.id]);

  const [markExpensePaid] = useMarkExpensePaidMutation();
  const [deleteExpense] = useDeleteExpenseMutation();
  const [markWholeExpensePaid] = useMarkWholeExpensePaidMutation();

  const handlePaidBalance = async () => {
    try {
      await markExpensePaid({ expenseId, userId: authUser.id }).unwrap();
      refetch();
    } catch (error) {
      console.error("Error marking expense as paid:", error);
    }
  };

  const handleDeleteExpense = async () => {
    try {
      await deleteExpense(expenseId).unwrap();
      navigate("/expenses");
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleMarkWholeExpensePaid = async () => {
    try {
      await markWholeExpensePaid({ expenseId }).unwrap();
      refetch();
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error marking the whole expense as paid:", error);
    }
  };

  const getUserDisplayName = (name) => {
    const nameParts = name.split(" ");
    const firstName = nameParts[0];
    const lastNameInitial = nameParts[nameParts.length - 1].charAt(0);
    return `${firstName} ${lastNameInitial}.`;
  };

  return (
    expense && (
      <div className="relative bg-white min-h-screen">
        <TopBar />
        <main className="mt-32">
          <div className="flex flex-col px-4 mt-6 fade-in">
            <div className={`bg-black shadow-lg rounded-2xl p-3 mb-4 text-white flex justify-start items-center z-[90] ${userHasPaid && 'rounded-b-none'}`}>
              <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center relative shrink-0 mt-1 mr-3">
                <img
                  src={expense.payer?.img_url}
                  alt="User Profile Picture"
                  className="w-full h-full absolute top-0 left-0 object-center object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col grow">
                <h2 className="text-xl font-medium">{expense.title}</h2>
                <p className="text-sm">paid by {getUserDisplayName(expense.payer?.name)}</p>
              </div>
              <div className="text-2xl font-semibold text-red-500 ml-2">
                {expense.value.toFixed(2)}€
              </div>
            </div>
            {userHasPaid && <div className="bg-salmon text-white p-2 rounded-b-2xl -mt-7 pt-5 z-[89]">You have paid for this expense.</div>}

            <p className={`font-medium ${userHasPaid && 'mt-5'}`}>Members ({expense.users.length})</p>
            {expense.users.map((member) => (
              <div key={member.id} className="flex bg-black20 rounded-xl p-2 my-2 font-semibold justify-start items-center">
                <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center relative shrink-0 mt-1 mr-3">
                  <img
                    src={member.img_url}
                    alt="User Profile Picture"
                    className="w-full h-full absolute top-0 left-0 object-center object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>{member?.name}</div>
                {member.Expense_User.is_paid && <div className="ml-auto text-green-500">Paid</div>}
              </div>
            ))}
            <div className="bg-black20 rounded-xl px-4 py-3 mb-2 mt-5 flex justify-between">
              <p className="text-gray-600">Date</p>
              <p>{new Date(expense.date).toLocaleDateString()}</p>
            </div>
            {authUser && !expense.is_paid && !userHasPaid && (
              <div className="fixed bottom-[80px] left-0 w-full flex justify-center px-3 pb-3">
                <Button label="Mark as paid" action={() => setShowConfirmation(true)} aria="Button mark as paid" />
              </div>
            )}
            {authUser && authUser.id === expense.payer.id && (
              <div className="fixed bottom-[80px] left-0 w-full flex justify-center px-3 pb-3">
                <Button label="Delete Expense" action={() => setShowDeleteConfirmation(true)} bg={'bg-salmon'} aria="Button delete expense" />
              </div>
            )}
            {authUser && authUser.id === expense.payer.id && (
              <div className="fixed bottom-[140px] left-0 w-full flex justify-center px-3 pb-3">
                <Button label="Mark Entire Expense as Paid" stroke={true} action={() => {
                  const unpaidMembers = expense.users.filter(user => !user.Expense_User.is_paid);
                  if (unpaidMembers.length > 0) {
                    setShowConfirmation(true);
                  } else {
                    handleMarkWholeExpensePaid();
                  }
                }} aria="Button mark entire expense as paid" />
              </div>
            )}
          </div>
        </main>
        <BottomBar />
        <ConfirmationDialog
          title="Confirm Marking as Paid"
          details="Are you sure you want to mark this expense as paid?"
          label="Confirm"
          bg="bg-red-600"
          showConfirmation={showConfirmation}
          setShowConfirmation={setShowConfirmation}
          action={handlePaidBalance}
        />
        <ConfirmationDialog
          title="Confirm Marking as Paid"
          details="There are users who have not marked their part as paid. Are you sure you want to mark this entire expense as paid?"
          label="Confirm"
          showConfirmation={showMarkWholeExpenseConfirmation}
          setShowConfirmation={setShowMarkWholeExpenseConfirmation}
          action={handleMarkWholeExpensePaid}
        />
        <ConfirmationDialog
          title="Confirm Deletion"
          details="Are you sure you want to delete this expense? This action cannot be undone."
          label="Confirm"
          bg="bg-red-600"
          showConfirmation={showDeleteConfirmation}
          setShowConfirmation={setShowDeleteConfirmation}
          action={handleDeleteExpense}
        />
      </div>
    )
  );
};

export default ExpenseDetail;