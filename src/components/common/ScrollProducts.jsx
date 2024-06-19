import React, { useState } from "react";
import PropTypes from "prop-types";
import { BsPlusCircleFill } from "react-icons/bs";
import { useGetProductsByCategoryQuery } from "../../app/api";
import { CSSTransition } from "react-transition-group";
import Overlay from "./Overlay";

const ScrollProducts = ({ label, type }) => {
  const { data: response, error, isLoading } = useGetProductsByCategoryQuery(type);
  const [showOverlay, setShowOverlay] = useState(false);

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar os produtos</div>;

  const products = response?.data || [];

  const truncateName = (name) => {
    if (name.length > 22) {
      return name.substring(0, 22) + '...';
    }
    return name;
  };

  const handleOverlay = () => {
    setShowOverlay(!showOverlay);
  }

  return (
    <div className="flex flex-col bg-white m-auto p-auto">
      <label htmlFor={label} className="mb-2 text-lg font-semibold">
        {label}
      </label>
      <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
        <div className="flex flex-nowrap">
          {products.map((product, index) => (
            <div key={index} className="inline-block px-3">
              <div className="w-48 h-80 max-w-xs overflow-hidden rounded-lg shadow-md bg-white100 p-4 flex flex-col justify-between">
                <img src={product.img_url} alt={product.name} className="w-full h-32 object-cover rounded-lg mb-4" />
                <div className="text-left flex flex-col justify-end flex-grow">
                  <p className="text-lg font-semibold mb-1">{truncateName(product.name)}</p>
                  <p className="text-sm text-gray-600 mb-2">{product.amount} {product.unit}</p>
                  <div className="flex items-end justify-between mt-auto">
                    <div className="flex flex-col">
                      <p className="text-sm text-gray-400 line-through">{product.value}€</p>
                      <p className="text-lg text-red-600 font-bold">{(product.value * 0.9).toFixed(2)}€</p>
                    </div>
                    <div className="flex items-end">
                      <BsPlusCircleFill size={45} onClick={handleOverlay} />
                    </div>
                  </div>
                </div>
              </div>

              <CSSTransition
                in={showOverlay}
                timeout={500}
                classNames="menu-primary"
                className="fixed top-[60px] left-0 w-full bg-white z-[101] h-auto shadow-xl rounded-b-2xl p-5"
                unmountOnExit
              >
                <Overlay
                  label="Add to List"
                  options={[
                    "New List",
                    "Search",
                    "Lists",
                  ]}
                  links={[null, null, null]}
                  hideOverlay={() => setShowOverlay(false)}
                  onClicks={[() => {}, () => {}, () => {}]}
                />
              </CSSTransition>
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
