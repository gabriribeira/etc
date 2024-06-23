import React, { useState, useEffect } from "react";
import TopBar from "../common/TopBar";
import BottomBar from "../common/BottomBar";
import SearchInput from "../common/SearchInput";
import CategoriesInput from "../common/CategoriesInput";
import ScrollProducts from "../common/ScrollProducts";
import { useGetProductsBySupermarketQuery, useGetProductsOrderedByPriceQuery, useGetAllProductsQuery, useGetProductsByCategoryQuery, useSearchProductsQuery } from "../../app/api";

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState([]);
  const [filters, setFilters] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [products, setProducts] = useState([]);
  
  const selectedSupermarket = filters.find(f => !['Price Low to High', 'Price High to Low', 'Popularity'].includes(f));
  const priceOrder = filters.find(f => ['Price Low to High', 'Price High to Low'].includes(f)) ?
    (filters.includes('Price Low to High') ? 'asc' : 'desc') : null;

  const { data: productsBySupermarket, error: supermarketError } = useGetProductsBySupermarketQuery(
    selectedSupermarket,
    { skip: !isFiltered || !selectedSupermarket }
  );

  const { data: productsOrderedByPrice, error: priceError } = useGetProductsOrderedByPriceQuery(
    priceOrder,
    { skip: !isFiltered || !priceOrder }
  );

  const { data: productsByCategory, error: categoryError } = useGetProductsByCategoryQuery(
    category.length ? category[0] : null,
    { skip: !category.length }
  );

  const { data: allProducts, error: allProductsError } = useGetAllProductsQuery(
    undefined,
    { skip: isFiltered }
  );

  const { data: searchedProducts, error: searchError } = useSearchProductsQuery(
    search,
    { skip: !search }
  );

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setIsFiltered(newFilters.length > 0);
  };

  useEffect(() => {
    setIsFiltered(filters.length > 0 || category.length > 0 || search.length > 0);
  }, [filters, category, search]);

  useEffect(() => {
    let filteredProducts = [];
    if (search && searchedProducts && searchedProducts.length > 0) {
      filteredProducts = searchedProducts;
    } else if (productsBySupermarket && productsBySupermarket.data) {
      filteredProducts = productsBySupermarket.data;
    } else if (productsOrderedByPrice && productsOrderedByPrice.data) {
      filteredProducts = productsOrderedByPrice.data;
    } else if (productsByCategory && productsByCategory.data) {
      filteredProducts = productsByCategory.data;
    } else if (allProducts && allProducts.data) {
      filteredProducts = allProducts.data;
    }

    if (category.length) {
      filteredProducts = filteredProducts.filter(product => category.includes(product.category_id));
    }

    setProducts(filteredProducts);
  }, [search, searchedProducts, productsBySupermarket, productsOrderedByPrice, productsByCategory, allProducts, category]);

  return (
    <div className="bg-white min-h-screen">
      <TopBar onFiltersChange={handleFiltersChange} />
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
              categorySelected={category}
              label="Categories"
              categoriesProps={true}
            />
          </div>

          {isFiltered ? (
            <>
              {(supermarketError || priceError || categoryError || searchError) ? (
                <div>Error loading products</div>
              ) : (
                <div className="my-3">
                  <ScrollProducts label="Filtered Products" products={products} />
                </div>
              )}
            </>
          ) : (
            <>
              {allProductsError ? (
                <div>Error loading products</div>
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