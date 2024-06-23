import React, { useState, useEffect } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import ExpenseMembersInput from "../components/common/ExpenseMembersInput";
import { useNavigate } from "react-router-dom";
import { useCreateExpenseMutation } from "../app/api";
import { useSelector } from "react-redux";

const NewExpense = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [members, setMembers] = useState([]);
  const authUser = useSelector((state) => state.auth.user);
  const [createExpense, { isLoading }] = useCreateExpenseMutation();

  useEffect(() => {
    if (authUser) {
      setMembers([authUser.id]);
    }
  }, [authUser]);

  const handleCreateExpense = async () => {
    try {
      const newExpense = {
        title,
        details,
        value: Number(value),
        date,
        is_paid: false,
        user_id: authUser.id,
        members,
      };
      await createExpense(newExpense).unwrap();
      navigate("/expenses", { state: { message: "Expense created" } });
    } catch (error) {
      console.error("Error creating expense:", error);
    }
  };

  return (
    authUser && (
      <div className="bg-white">
        <TopBar />
        <main className="pt-32">
          <form className="flex flex-col px-5 gap-y-4">
            <div className="flex flex-col w-full">
              <h2 className="mb-2 text-lg font-semibold">Paid By</h2>
              <div className="border border-black80 rounded-2xl p-2 flex items-center">
                <div className="w-[35px] h-[35px] rounded-full flex items-center justify-center relative shrink-0">
                  <img
                    src={authUser.img_url}
                    alt="User Profile Picture"
                    className="w-full h-full absolute top-0 left-0 object-center object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="font-semibold text-lg ml-3">{authUser.name}</p>
              </div>
            </div>

            <Input label="Title" value={title} onChange={setTitle} />
            <Input label="Details" value={details} onChange={setDetails} />
            <div className="flex w-full gap-x-2">
              <div className="w-50">
                <Input label="Value" value={value} onChange={setValue} />
              </div>
              <Input label="Date" value={date} onChange={setDate} />
            </div>
            <ExpenseMembersInput
              value={members}
              onChange={setMembers}
              label={"Edit members"}
            />
            <Button
              label="Create Expense"
              action={handleCreateExpense}
              className="btn btn-primary"
              isLoading={isLoading}
            />
          </form>
        </main>
        <BottomBar />
      </div>
    )
  );
};

export default NewExpense;