import React, {useState} from "react";
import PropTypes from "prop-types";
import { useGetProductsByCategoryQuery } from "../../app/api";
import { BsPlusCircleFill } from "react-icons/bs";
import Overlay from "./Overlay";
import { CSSTransition } from "react-transition-group";

const ScrollProducts = ({ label, type, products }) => {
  const { data: response, error, isLoading } = useGetProductsByCategoryQuery(type, { skip: !!products });

  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const productList = products || (response?.data || []);

  if (!products && isLoading) return <div>Loading...</div>;
  if (!products && error) return <div>Error loading products</div>;

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
          {productList.map((product, index) => (
            <div key={index} className="inline-block px-3">
              <div className="w-48 h-80 max-w-xs overflow-hidden rounded-lg shadow-md bg-white100 p-4 flex flex-col justify-between space-y-0">
                <img src={product.img_url} alt={product.name} className="w-full h-32 object-cover rounded-lg mb-4" />
                <div className="text-left flex flex-col justify-end flex-grow">
                  <p className="text-lg font-semibold mb-1">{truncateName(product.name)}</p>
                  <p className="text-sm text-gray-600 mb-2">{product.amount} {product.unit}</p>
                  <p className="text-sm text-gray-600 mb-2 mt-[-10px]">{product.store}</p>
                  <div className="flex items-end justify-between mt-auto">
                    <div className="flex flex-col">
                      <p className="text-sm text-gray-400 line-through">{product.value}€</p>
                      <p className="text-lg text-red-600 font-bold mt-[-5px]">{(product.value * 0.9).toFixed(2)}€</p>
                    </div>
                    <div className="flex items-end">
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
          productId={selectedProductId}
        />
      </CSSTransition>
    </div>
  );
}

ScrollProducts.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.number,
  products: PropTypes.array,
};

export default ScrollProducts;