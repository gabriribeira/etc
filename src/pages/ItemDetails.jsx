import React, { useEffect, useState } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import Input from "../components/common/Input";
import AmountInput from "../components/lists/AmountInput";
import MembersInput from "../components/common/MembersInput";
import UsersData from "../data/users.json";

const ItemDetails = () => {
  const usersData = UsersData;
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(1);
  const [unit, setUnit] = useState("pack");
  const [members, setMembers] = useState([]);
  const [details, setDetails] = useState("");
  const [brand, setBrand] = useState("");
  const [store, setStore] = useState("");
  useEffect(() => {
    if(usersData) {
      setMembers(usersData.filter(user => user.households.includes(1)).map(user => user.id));
    }
  }, [usersData]);
  return (
    <div>
      <TopBar />
      <div className="flex flex-col px-5 gap-y-3">
        <Input label="Name" value={name} onChange={setName} />
        <AmountInput
          label="Amount"
          value={amount}
          onChange={setAmount}
          valueUnit={unit}
          onChangeUnit={setUnit}
        />
        <MembersInput value={members} onChange={setMembers} />
        <Input label="Details" value={details} onChange={setDetails} />
        <Input label="Brand" value={brand} onChange={setBrand} />
        <Input label="Store" value={store} onChange={setStore} />
      </div>
      <BottomBar />
    </div>
  );
};
export default ItemDetails;
