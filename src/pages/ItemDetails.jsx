import React, { useEffect, useState } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import Input from "../components/common/Input";
import AmountInput from "../components/lists/AmountInput";
import MembersInput from "../components/common/MembersInput";
import Button from "../components/common/Button";
import CategoriesInput from "../components/common/CategoriesInput";
import PhotoInput from "../components/common/PhotoInput";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useGetItemQuery,
  useAddItemMutation,
  useUpdateItemMutation,
  useSearchProductsQuery,
  useGetListItemsQuery
} from "../app/api";
import { useDebounce } from "../hooks/useDebounce";

const ItemDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const itemId = location.pathname.split("/")[4];
  const listId = location.pathname.split("/")[2];
  const { refetch: refetchListItems } = useGetListItemsQuery(listId);
  const [addItem] = useAddItemMutation();
  const [updateItem] = useUpdateItemMutation();
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState(null);
  const [amount, setAmount] = useState(1);
  const [unit, setUnit] = useState("pack");
  const [members, setMembers] = useState([]);
  const [details, setDetails] = useState("");
  const [brand, setBrand] = useState("");
  const [store, setStore] = useState("");
  const [category, setCategory] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isSuggestions, setIsSuggestions] = useState(false);
  const { data: item, isLoading, isError } = useGetItemQuery(itemId, { skip: itemId === "0" });
  const debouncedName = useDebounce(name, 500);
  const { data: recommendations } = useSearchProductsQuery(debouncedName, {
    skip: !debouncedName || debouncedName.length < 2 || !showRecommendations,
  });

  useEffect(() => {
    console.log(category);
  }, [category]);

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
      setCategory(item.category_id);
      setPhoto(item.img_url);
      setIsSuggestions(item.is_suggestion);
    }
  }, [item]);

  const handleSaveItem = async () => {
    try {
      const formData = new FormData();
      formData.append("list_id", Number(listId));
      formData.append("category_id", category ? category : null);
      formData.append("name", name);
      formData.append("price", Number(value));
      formData.append("details", details);
      formData.append("brand", brand);
      formData.append("store", store);
      formData.append("amount", amount);
      formData.append("unit", unit);
      formData.append("members", members);
      if (photo) {
        formData.append("img_url", photo);
      }
      formData.append("is_suggestion", isSuggestions);
      formData.append("is_expense", false);
      if (itemId === "0") {
        await addItem(formData).unwrap();
      } else {
        await updateItem({ id: itemId, formData }).unwrap();
      }
      await refetchListItems();
      navigate(`/lists/${listId}`);
    } catch (error) {
      console.error("Failed to update Item:", error);
      alert("Failed to update Item");
    }
  };

  const selectProduct = (product) => {
    setName(product.name);
    setValue(product.value);
    setUnit(product.unit);
    setBrand(product.brand);
    setStore(product.store);
    setCategory(product.category_id); // Ensure category_id is used here
    setPhoto(product.img_url);
    setShowRecommendations(false);
    setIsSuggestions(false);
  };

  const handleNameChange = (value) => {
    setName(value);
    setShowRecommendations(true);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading item data</p>;

  return (
    <div className="bg-white">
      <TopBar onBack={handleSaveItem} listTitle="Edit Item" />
      <main className="pt-32 mb-16 gap-x-5">
        <div className="flex justify-start px-5 gap-3 mb-5">
          <PhotoInput onChange={setPhoto} value={photo} />
          <div className="relative w-full">
            <div className="w-full">
              <Input
                label="Name *"
                value={name}
                placeholder="Name"
                onChange={handleNameChange}
                required
              />
            </div>
            {showRecommendations && recommendations && (
              <div className="absolute bg-white border border-gray-200 shadow-lg w-full mt-1 z-10">
                {recommendations.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => selectProduct(product)}
                  >
                    <div className="flex items-center">
                      <img src={product.img_url} alt={product.name} className="w-12 h-12 object-cover mr-2" />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.brand}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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
            <MembersInput
              label="Edit Members"
              value={members}
              onChange={setMembers}
            />
            <Input label="Brand" value={brand} onChange={setBrand} />
            <CategoriesInput
              onChange={setCategory}
              value={category}
              label="Category"
              categorySelected={category}
              categoriesProps={true}
              type="List"
            />
            <Input label="Store" value={store} onChange={setStore} />
            <Input
              label="Details"
              value={details}
              onChange={setDetails}
              placeholder="Details"
            />
            <Button label="Done" action={handleSaveItem} />
          </div>
        </div>
      </main>
      <BottomBar />
    </div>
  );
};

export default ItemDetails;