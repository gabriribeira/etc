import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { BsPlusCircleFill } from "react-icons/bs";
import { useSearchProductsQuery } from "../../app/api";
import Overlay from "./Overlay";
import { CSSTransition } from "react-transition-group";

const SearchProducts = ({ label, name }) => {
  const { data: response, error, isLoading } = useSearchProductsQuery(name, { skip: !name });
  const [products, setProducts] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null); // State to store selected product ID

  useEffect(() => {
    if (response) {
      setProducts(response);  
    }
  }, [response]);

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Produto não encontrado</div>;

  const truncateName = (name) => {
    if (name.length > 22) {
      return name.substring(0, 22) + '...';
    }
    return name;
  };

  const handleOverlay = (productId) => {
    setSelectedProductId(productId); // Set the selected product ID
    setShowOverlay(true); // Show the overlay
    console.log(productId);
  };

  return (
    <div className="flex flex-col bg-white m-auto p-auto">
      <label htmlFor={label} className="mb-2 text-lg font-semibold">
        {label}
      </label>
      <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
        <div className="flex flex-nowrap">
          {products.map((product, index) => (
            <div key={index} className="inline-block px-3">
              <div className="w-48 h-80 max-w-xs overflow-hidden rounded-lg shadow-md bg-white100 p-4">
                <img src={product.img_url} alt={product.name} className="w-full h-32 object-cover rounded-lg mb-4" />
                <div className="text-left">
                  <p className="text-lg font-semibold mb-1">{truncateName(product.name)}</p>
                  <p className="text-sm text-gray-600 mb-2">{product.amount} {product.unit}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-sm text-gray-400 line-through">{product.value}€</p>
                      <p className="text-lg text-red-600 font-bold">{product.value}€</p>
                    </div>
                    <div>
                      <BsPlusCircleFill size={45} onClick={() => handleOverlay(product.id)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CSSTransition
        in={showOverlay}
        timeout={500}
        classNames="menu-primary"
        className="fixed bottom-0 left-0 w-full bg-white z-[101] h-auto shadow-xl rounded-t-2xl p-5"
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
          productId={selectedProductId} // Pass the selected product ID to the overlay
        />
      </CSSTransition>
    </div>
  );
};

SearchProducts.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
};

export default SearchProducts;
