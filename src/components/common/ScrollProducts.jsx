import React from "react";
import PropTypes from "prop-types";
import { BsPlusCircleFill } from "react-icons/bs";
import { useGetProductsByCategoryQuery } from "../../app/api";

const ScrollProducts = ({ label, type }) => {
  const { data: products, error, isLoading } = useGetProductsByCategoryQuery(type);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="flex flex-col bg-white m-auto p-auto">
      <label htmlFor={label} className="mb-2 text-lg font-semibold">
        {label}
      </label>
      <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
        <div className="flex flex-nowrap">
          {products?.map((product, index) => (
            <div key={index} className="inline-block px-3">
              <div className="w-48 h-80 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out p-4">
                <img src={product.img_url} alt={product.name} className="w-full h-32 object-cover mb-4" />
                <div className="text-left">
                  <p className="text-lg font-semibold mb-1">{product.name}</p>
                  <p className="text-sm text-gray-600 mb-2">{product.amount} {product.unit}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-sm text-gray-400 line-through">{product.value}€</p>
                      <p className="text-lg text-red-600 font-bold">{product.value}€</p>
                    </div>
                    <div>
                      <BsPlusCircleFill size={45} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ScrollProducts.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default ScrollProducts;
