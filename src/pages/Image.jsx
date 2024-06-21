import React from "react";
import PropTypes from "prop-types";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import { useParams } from "react-router-dom";
import items from "../data/items.json";

const Image = () => {
  const { id } = useParams();
  const item = items.find(item => item.id.toString() === id);

  return (
    <>
      <TopBar listTitle={item ? item.name : "Title"} />
      <div className="flex flex-col h-screen bg-white">
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          {item ? (
            <img
              src={require(`../assets/imgs/products/${item.img_url}`)}
              alt={item.name}
              className="max-w-full max-h-full mb-4 rounded-md"
              referrerPolicy="no-referrer"
            />
          ) : (
            <p>Imagem não encontrada</p>
          )}
        </div>
      </div>
      <BottomBar />
    </>
  );
};

Image.propTypes = {
  img_url: PropTypes.string,
  name: PropTypes.string,
};

export default Image;
