import React, { useState } from "react";
import TopBar from "../common/TopBar";
import BottomBar from "../common/BottomBar";
import SearchInput from "../common/SearchInput";
import CategoriesInput from "../common/CategoriesInput";
import ScrollProducts from "../common/ScrollProducts";
import SearchProducts from "../common/SearchProducts";

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    console.log(selectedCategory?.id); // Log o id da categoria aqui, acessando com segurança
  };

  return (
    <div className="bg-white min-h-screen">
      <TopBar />
      <main className="mt-14">
        <div className="flex flex-col px-5 fade-in">
          <div className="flex flex-col w-full gap-y-3 my-2">
            <form>
              <SearchInput
                label="Search"
                value={search}
                onChange={setSearch}
                placeholder="Find Products"
              />
            </form>
          </div>
          
          <div className="my-3">
            <CategoriesInput
              onChange={handleCategoryChange}
              value={category}
              label="Categories"
              categorySelected={category}
              type="List"
            />
          </div>

          {search ? (
            <div>
              <SearchProducts label="Results" name={search} />
            </div>
          ) : (
            <>
              <div className="my-3">
                <ScrollProducts label="Promotions" type={category ? category.id : "1"} />
              </div>
              <div className="mb-3">
                <ScrollProducts label="Recommended for you" type={category ? category.id : "5"} />
              </div>
              <div className="mb-3">
                <ScrollProducts label="Dairy" type={category ? category.id : "2"} />
              </div>
            </>
          )}
        </div>
      </main>
      <BottomBar />
    </div>
  );
};

export default Products;
