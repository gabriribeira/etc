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
  const [isEditing, setIsEditing] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);

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
      const itemId = location.pathname.split("/")[4];
      if (itemsData && itemId !== '0') {
        const item = itemsData.find((item) => item.id == itemId);
        if (item) {
          setIsEditing(true);
          setEditingItemId(itemId);
          setName(item.name);
          setValue(item.price);
          setAmount(item.amount);
          setUnit(item.unit);
          setMembers(item.members);
          setDetails(item.details);
          setBrand(item.brand);
          setStore(item.store);
          setCategory(item.category);
          setPhoto(item.img_url);
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
    if (isEditing) {
      const index = itemsData.findIndex((item) => item.id == editingItemId);
      if (index !== -1) {
        itemsData[index] = {
          id: editingItemId,
          list_id: Number(list_id),
          name,
          price: Number(value),
          details,
          brand,
          store,
          amount,
          unit,
          members,
          category,
          img_url: photo,
          suggestion: false,
          created_at: itemsData[index].created_at, // Keep original creation date
          created_by: itemsData[index].created_by, // Keep original creator
        };
        console.log(itemsData);
        navigate("/lists/" + list_id);
        return;
      }
    }

    
    const newItem = {
      id: itemsData.length + 1,
      list_id: Number(list_id),
      name,
      price: Number(value),
      details,
      brand,
      store,
      amount,
      unit,
      members,
      category,
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
            <Button label="Done" action={handleAddItem} />
          </div>
        </div>
      </main>
      <BottomBar />
    </div>
  );
};

export default ItemDetails;
