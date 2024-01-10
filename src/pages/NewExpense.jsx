import React, {useState} from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const NewExpense = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");
  return (
    <div>
      <TopBar />
      <form className="flex flex-col px-5 gap-y-6">
        <Input label="Title" value={title} onChange={setTitle} />
        <Input label="Value" value={value} onChange={setValue} />
        <Input label="Date" value={date} onChange={setDate} />
        <Input label="Details" value={details} onChange={setDetails} />
        <Button label="Create Expense" type="submit" className="btn btn-primary" />
      </form>
      <BottomBar />
    </div>
  );
};
export default NewExpense;
