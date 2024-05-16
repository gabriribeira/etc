import React, { useEffect, useState } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import Input from "../components/common/Input";
import AmountInput from "../components/lists/AmountInput";
import MembersInput from "../components/common/MembersInput";
import UsersData from "../data/users.json";
import Button from "../components/common/Button";
import ItemsData from "../data/items.json";
import { useNavigate, useLocation } from "react-router-dom";
import CategoriesInput from "../components/common/CategoriesInput";
import PhotoInput from "../components/common/PhotoInput";

const ItemDetails = () => {
  const usersData = UsersData;
  const itemsData = ItemsData;
  const navigate = useNavigate();
  const location = useLocation();
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
  const [authUser, setAuthUser] = useState(null);
  const [list_id, setList_id] = useState(null);
  const [suggestions, setSuggestions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/fetchData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        setSuggestions(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
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
  
  useEffect(() => {
    if (location && itemsData) {
      setList_id(location.pathname.split("/")[2]);
      if (itemsData && location.pathname.split("/")[4] !== 0 && location.pathname.split("/")[4] !== '0') {
        const item = itemsData.filter(
          (item) => item.id == location.pathname.split("/")[4]
        );
        if (item) {
          console.log(item);
          setName(item[0].name);
          setValue(item[0].price);
          setAmount(item[0].amount);
          setUnit(item[0].unit);
          setMembers(item[0].members);
          setDetails(item[0].details);
          setBrand(item[0].brand);
          setStore(item[0].store);
          setCategory(item[0].category);
          setPhoto(item[0].photo);
        }
      }
    }
  }, [location, itemsData]);
  
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
    }
  }, []);
  
  useEffect(() => {
    if (name.length > 2) {
      if (suggestions) {
        const filteredSuggestions = suggestions.filter((suggestion) =>
          suggestion.name.toLowerCase().includes(name.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
        console.log(filteredSuggestions);
      }
    }
  }, [name]);
  
  const handleAddItem = () => {
    const newItem = {
      id: itemsData.length + 1,
      list_id: Number(list_id),
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
      suggestion: false,
      created_at: new Date().toISOString().split("T")[0],
      created_by: authUser.id,
    };
    itemsData.push(newItem);
    console.log(itemsData);
    navigate("/lists/" + list_id);
  };
  
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
            action={() => {
              handleAddItem();
            }}
          />
          </div>
        </div>
      </main>
      <BottomBar />
    </div>
  );
};

export default ItemDetails;
