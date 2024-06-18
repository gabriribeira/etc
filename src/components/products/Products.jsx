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
      <main className="mt-16">
        <div className="flex flex-col px-5 fade-in">
          <div className="flex flex-col w-full gap-y-3 my-2">
            <form>
              <SearchInput
                label="Buscar"
                value={search}
                onChange={setSearch}
                placeholder="Encontrar Produto"
              />
            </form>
          </div>
          
          <div className="my-3">
            <CategoriesInput
              onChange={handleCategoryChange}
              value={category}
              label="Categorias"
              categorySelected={category}
              type="List"
            />
          </div>

          {search ? (
            <div>
              <SearchProducts label="Resultados" name={search} />
            </div>
          ) : (
            <>
              <div className="my-3">
                <ScrollProducts label="Promoções" type={category ? category.id : "1"} />
              </div>
              <div className="mb-3">
                <ScrollProducts label="Recomendados para você" type={category ? category.id : "5"} />
              </div>
              <div className="mb-3">
                <ScrollProducts label="Laticínios" type={category ? category.id : "2"} />
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
