import React, { useState, useEffect } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import MembersInput from "../components/common/MembersInput";
import UsersData from "../data/users.json";
import ExpensesData from "../data/expenses.json";
import { useNavigate } from "react-router-dom";
import CategoriesInput from "../components/common/CategoriesInput";

const NewExpense = () => {
  const usersData = UsersData;
  const expensesData = ExpensesData;
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  //eslint-disable-next-line
  const [paidBy, setPaidBy] = useState("");
  const [members, setMembers] = useState([]);
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
      setPaidBy(storedUser.id);
    }
  }, []);
  useEffect(() => {
    if (usersData) {
      setMembers(
        usersData
          .filter((user) => user.households.includes(1))
          .map((user) => user.id)
      );
    }
  }, [usersData]);
  const handleCreateExpense = () => {
    const newExpense = {
      id: expensesData.length + 1,
      title,
      value: Number(value),
      date,
      user_id: authUser.id,
      users: members,
      paid: false,
      category: category,
      household_id: 1,
    };
    expensesData.push(newExpense);
    navigate("/expenses");
  };
  return (
    authUser && (
      <div className="bg-white">
        <TopBar />
        <main className="pt-32">
          <form className="flex flex-col px-5 gap-y-4">
            <div className="flex flex-col w-full">
              <h2 className="mb-2 text-lg font-semibold">Paid By</h2>
              <div className="border border-black80 rounded-2xl p-2 flex flex items-center">
                <div className="w-[35px] h-[35px] rounded-full flex items-center justify-center relative shrink-0">
                  <img
                    //eslint-disable-next-line
                    src={require(`../assets/data/users/${authUser.img}`)}
                    alt="User Profile Picture"
                    className="w-full h-full absolute top-0 left-0 object-center object-cover rounded-full"
                  />
                </div>
                <p className="font-semibold text-lg ml-3">{authUser.name}</p>
              </div>
            </div>

            <Input label="Title" value={title} onChange={setTitle} />

            <div className="flex w-full gap-x-2 ">
              <div className="w-50">
                <Input label="Value" value={value} onChange={setValue} />
              </div>

              <Input label="Date" value={date} onChange={setDate} />
            </div>

            <MembersInput
              value={members}
              onChange={setMembers}
              label={"Edit members"}
            />
            <CategoriesInput
              label={"Category"}
              onChange={setCategory}
              value={category}
              categorySelected={category}
              type="Expense"
            />

            <Button
              label="Create Expense"
              action={handleCreateExpense}
              className="btn btn-primary"
            />
          </form>
        </main>
        <BottomBar />
      </div>
    )
  );
};
export default NewExpense;
