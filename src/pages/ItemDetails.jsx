import React, { useEffect, useState } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import Input from "../components/common/Input";
import AmountInput from "../components/lists/AmountInput";
import MembersInput from "../components/common/MembersInput";
import Button from "../components/common/Button";
import { useNavigate, useLocation } from "react-router-dom";
import CategoriesInput from "../components/common/CategoriesInput";
import PhotoInput from "../components/common/PhotoInput";
import { useGetItemQuery, useAddItemMutation, useUpdateItemMutation } from '../app/api';

const ItemDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const itemId = location.pathname.split("/")[4];
  const listId = location.pathname.split("/")[2];
  const { data: item, isLoading, isError } = useGetItemQuery(itemId, {
    skip: itemId === '0',
  });
  const [addItem] = useAddItemMutation();
  const [updateItem] = useUpdateItemMutation();
  
  const [name, setName] = useState("");
  const [value, setValue] = useState(null);
  const [amount, setAmount] = useState(1);
  const [unit, setUnit] = useState("pack");
  const [members, setMembers] = useState([]);
  const [details, setDetails] = useState("");
  const [brand, setBrand] = useState("");
  const [store, setStore] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setValue(item.price);
      setAmount(item.amount);
      setUnit(item.unit);
      setMembers(item.members);
      setDetails(item.details);
      setBrand(item.brand);
      setStore(item.store);
      setCategory(item.category);
      setPhoto(item.photo);
    }
  }, [item]);

  const handleSaveItem = async () => {
    const itemData = {
      list_id: Number(listId),
      category_id: 1,
      name: name,
      price: Number(value),
      details: details,
      brand: brand,
      store: store,
      amount: amount,
      unit: unit,
      members: members,
      category: category,
      img_url: photo,
      is_suggestion: false,
      is_expense: false,
    };

    try {
      if (itemId === '0') {
        await addItem(itemData).unwrap();
      } else {
        await updateItem({ id: itemId, ...itemData }).unwrap();
      }
      navigate(`/lists/${listId}`);
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading item data</p>;

  return (
    <div className="bg-white">
      <TopBar />
      <main className="pt-32 mb-16 gap-x-5">
        <div className="flex justify-start px-5 gap-3 mb-5">
          <PhotoInput onChange={setPhoto} value={photo} />
          <Input label="Name *" value={name} placeholder="Name" onChange={setName} required />
        </div>

        <div className="flex flex-col px-5 gap-y-3">
          <AmountInput
            label="Amount"
            value={amount}
            onChange={setAmount}
            valueUnit={unit}
            onChangeUnit={setUnit}
          />
          <p className="font-medium mt-2">Members</p>
          <div className="flex flex-col gap-y-4">
            <MembersInput label={"Edit Members"} value={members} onChange={setMembers} />
            <Input label="Brand" value={brand} onChange={setBrand} />
            <CategoriesInput onChange={setCategory} value={category} label={"Category"} categorySelected={category} type="List"/>
            <Input label="Store" value={store} onChange={setStore} />
            <Input label="Details" value={details} onChange={setDetails} placeholder="Details" />
            <Button
              label="Done"
              action={handleSaveItem}
            />
          </div>
        </div>
      </main>
      <BottomBar />
    </div>
  );
};

export default ItemDetails;
