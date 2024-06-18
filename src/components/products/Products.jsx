import React from "react";
import { useState } from "react";
import TopBar from "../common/TopBar";
import BottomBar from "../common/BottomBar";
import SearchInput from "../common/SearchInput";
import CategoriesInput from "../common/CategoriesInput";
import ScrollProducts from "../common/ScrollProducts";

const Products = () => {

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    return (
    <div className="bg-white min-h-screen">
        <TopBar />
        <main className="mt-16">
            <div className="flex flex-col px-5 fade-in">
                <div className="flex flex-col w-full gap-y-3 my-2">
                    <form>
                        <SearchInput
                        label="Search"
                        value={search}
                        onChange={setSearch}
                        placeholder="Find Product"
                        />
                    </form>
                </div>
                
                <div className="my-3">
                    <CategoriesInput
                        onChange={setCategory}
                        value={category}
                        label="Categories"
                        categorySelected={category}
                        type="List"
                    />
                </div>

                <div className="my-3">
                    <ScrollProducts label="Promotions" type="1" />
                </div>

                <div className="my-3">
                    <ScrollProducts label="Recommended for you" type="5" />
                </div>

                <div className="mb-4">
                    <ScrollProducts label="Dairy" type="2" />
                </div>

            </div>
        </main>

        <BottomBar />
    </div>
    );
  };
  export default Products;