import React, { useState } from "react";
import TopBar from "../common/TopBar";
import BottomBar from "../common/BottomBar";
import SearchInput from "../common/SearchInput";
import CategoriesInput from "../common/CategoriesInput";
import ScrollProducts from "../common/ScrollProducts";
import SearchProducts from "../common/SearchProducts";

const Products = () => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);

  const handleCategoryChange = (selectedCategories) => {
    setCategories(selectedCategories);
    console.log(selectedCategories.map(cat => cat.id)); // Log os ids das categorias selecionadas
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
              categorySelected={categories}
              label="Categories"
              type="List"
            />
          </div>

          {search ? (
            <div>
              <SearchProducts label="Results" name={search} />
            </div>
          ) : (
            <>
              {categories.length > 0 ? (
                categories.map(category => (
                  <div key={category.id} className="my-3">
                    <ScrollProducts label={category.title} type={category.id} />
                  </div>
                ))
              ) : (
                <>
                  <div className="my-3">
                    <ScrollProducts label="Promotions" type="1" />
                  </div>
                  <div className="mb-3">
                    <ScrollProducts label="Recommended for you" type="5" />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </main>
      <BottomBar />
    </div>
  );
};

export default Products;
