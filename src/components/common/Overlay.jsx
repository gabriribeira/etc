import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { GoInfo } from "react-icons/go";
import { LuUser } from "react-icons/lu";
import { RiNotification4Line } from "react-icons/ri";
import { SlArrowRight } from "react-icons/sl";
import { CiLogout } from "react-icons/ci";
import { FiLock, FiUnlock } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { BiPencil } from "react-icons/bi";
import Cookies from "js-cookie";
import { useGetHouseholdListsQuery, useAddItemMutation, useGetProductByIdQuery } from "../../app/api"; // Import your API hooks
import SearchInput from "./SearchInput";

const Overlay = ({ label, options, links, hideOverlay, onClicks, productId }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("household");
    navigate("/login");
    hideOverlay();
  };

  const { data: lists, error, isLoading } = useGetHouseholdListsQuery(); // Fetch lists data
  const { data: product, error: productError, isLoading: productLoading } = useGetProductByIdQuery(productId); // Fetch product data
  const [addItem] = useAddItemMutation(); // Use the addItem mutation
  const [search, setSearch] = useState("");
  const [selectedLists, setSelectedLists] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Setup an event listener to handle clicks outside the overlay content
    const handleClickOutside = (event) => {
      if (label !== "Add to List" && !document.getElementById("overlay-container").contains(event.target)) {
        hideOverlay();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hideOverlay, label]);

  useEffect(() => {
    if (product) {
      setSelectedProduct(product);
    }
  }, [product]);

  const filteredLists = lists?.filter(list => list.name.toLowerCase().includes(search.toLowerCase()));

  const handleCheckboxChange = (listId) => {
    setSelectedLists((prevSelectedLists) => {
      if (prevSelectedLists.includes(listId)) {
        return prevSelectedLists.filter((id) => id !== listId);
      } else {
        return [...prevSelectedLists, listId];
      }
    });
  };

  const handleDone = async () => {
    
    if (!selectedProduct) {
      console.error("Product data not available.");
      return;
    }

    try {
      for (const listId of selectedLists) {
        const newItem = {
          list_id: Number(listId),
          category_id: 1, // Certifique-se de ajustar conforme necessário
          name: selectedProduct.name,
          price: Number(selectedProduct.value),
          details: selectedProduct.details || "",
          brand: selectedProduct.brand || "",
          store: selectedProduct.store || "",
          amount: selectedProduct.amount,
          unit: selectedProduct.unit,
          members: [],
          category: selectedProduct.category || "",
          img_url: selectedProduct.img_url || "",
          is_suggestion: false,
          is_expense: false,
        };

        console.log("Payload to be sent:", newItem); // Log the payload
        await addItem(newItem).unwrap();
        console.log(`Added product with ID: ${productId} to list with ID: ${listId}`);
      }
      hideOverlay();
    } catch (error) {
      console.error("Error adding product to lists:", error);
      console.error(`Error details: ${JSON.stringify(error.data)}`);
      // Handle error accordingly
    }
  };

  return (
    <div className="fixed h-screen w-screen top-0 left-0 z-[102]">
      <div className="fixed h-screen w-screen top-0 left-0" id="overlay"></div>
      <div className="absolute bg-white bottom-0 z-[111] shadow-[0px_-10px_30px_-10px_rgba(0,0,0,0.5)] left-0 w-screen rounded-t-[2rem] px-5 py-10 max-h-[80%] overflow-y-auto" id="overlay-container">
        <div className="absolute top-[10px] left-0 w-screen flex justify-center">
          <div className="w-[25%] h-[5px] bg-black/50 rounded-full"></div>
        </div>
        <div className="flex flex-col gap-y-3 mb-6">
          <div className="flex items-center gap-x-3">
            <h1 className="font-semibold text-xl text-black">{label}</h1>
          </div>
          {label === "Add to List" ? (
            <React.Fragment>
              <Button
                to={`/lists/new?product_id=${productId}`}
                stroke={true}
                label="New shopping list"
              />
              <div className="relative mt-3">
                <SearchInput label="Search" placeholder="Find List" value={search} onChange={setSearch} />
              </div>
              {isLoading && <div>Loading...</div>}
              {error && <div>Error loading lists</div>}
              {productLoading && <div>Loading product...</div>}
              {productError && <div>Error loading product</div>}

              {filteredLists && filteredLists.map((list, idx) => (
                <div key={idx} className="flex items-center gap-x-2 mb-2">
                  <input 
                    type="checkbox" 
                    id={`list-${list.id}`} 
                    className="w-6 h-6" 
                    checked={selectedLists.includes(list.id)} 
                    onChange={() => handleCheckboxChange(list.id)} 
                  />
                  <label htmlFor={`list-${list.id}`} className="text-lg">{list.name}</label>
                </div>
              ))}

            </React.Fragment>
          ) : (
            options.map((option, index) => (
              <React.Fragment key={index}>
                {option !== "Logout" && links[index] !== null ? (
                  <Link
                    to={links[index]}
                    action={hideOverlay}
                    className={`w-full text-lg flex items-center relative gap-y-3 gap-x-3 z-[112] ${option === "Delete shopping list" || option === "Delete item" ? "text-red-600" : ""}`}
                    onClick={() => {
                      if (onClicks && onClicks[index]) onClicks[index]();
                      hideOverlay();
                    }}
                  >
                    <div className="text-2xl">
                      {option === "About" && <GoInfo />}
                      {option === "Notifications" && <RiNotification4Line />}
                      {option === "Profile" && <LuUser />}
                      {option === "Logout" && <CiLogout />}
                      {option === "Lock shopping list" && <FiLock />}
                      {option === "Unlock shopping list" && <FiUnlock />}
                      {option === "Edit shopping list" && <BiPencil />}
                      {option === "Edit item details" && <BiPencil />}
                      {option === "Delete shopping list" && <HiOutlineTrash />}
                      {option === "Delete item" && <HiOutlineTrash />}
                      {option === "Reopen shopping list" && <FiUnlock />}
                    </div>
                    {option}
                    <div className="absolute right-3"><SlArrowRight /></div>
                  </Link>
                ) : (
                  option !== "Logout" ? (
                    <button
                      onClick={(e) => { e.preventDefault(); onClicks[index](); hideOverlay(); }}
                      className="w-full text-lg flex items-center relative gap-y-3 gap-x-3"
                    >
                      <div className="text-2xl">
                        {option === "About" && <GoInfo />}
                        {option === "Notifications" && <RiNotification4Line />}
                        {option === "Profile" && <LuUser />}
                        {option === "Logout" && <CiLogout />}
                        {option === "Lock shopping list" && <FiLock />}
                        {option === "Unlock shopping list" && <FiUnlock />}
                        {option === "Edit shopping list" && <BiPencil />}
                        {option === "Edit item details" && <BiPencil />}
                        {option === "Delete shopping list" && <HiOutlineTrash />}
                        {option === "Delete item" && <HiOutlineTrash />}
                        {option === "Reopen shopping list" && <FiUnlock />}
                      </div>
                      {option}
                      <div className="absolute right-3"><SlArrowRight /></div>
                    </button>
                  ) : (
                    <button
                      onClick={handleLogout}
                      className="w-full text-lg flex items-center relative gap-y-3 gap-x-3"
                    >
                      <div className="text-2xl">
                        <CiLogout />
                      </div>
                      {option}
                      <div className="absolute right-3"><SlArrowRight /></div>
                    </button>
                  )
                )}
              </React.Fragment>
            ))
          )}
        </div>
        {label === "Add to List" ? (
          <Button label={"Done"} action={handleDone} />
        ) : (
          <Button label={"Cancel"} action={hideOverlay} stroke={true} />
        )}
      </div>
    </div>
  );
};

Overlay.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  links: PropTypes.array.isRequired,
  hideOverlay: PropTypes.func.isRequired,
  onClicks: PropTypes.array,
  productId: PropTypes.string.isRequired, // Add this line to prop types
};

export default Overlay;
