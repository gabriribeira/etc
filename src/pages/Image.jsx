import React from "react";
import { useParams } from "react-router-dom";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import { useGetItemQuery } from "../app/api";

const Image = () => {
  const { id } = useParams();
  const { data: item, error, isLoading } = useGetItemQuery(id);

  return (
    <>
      <TopBar listTitle={item ? item.name : "Title"} />
      <div className="flex flex-col h-screen bg-white">
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          {isLoading && <p>Loading...</p>}
          {error && <p>Error loading item: {error.message}</p>}
          {item ? (
            <img
              src={item.img_url}
              alt={item.name}
              className="max-w-full max-h-full mb-4 rounded-md"
              referrerPolicy="no-referrer"
            />
          ) : (
            !isLoading && <p>Imagem não encontrada</p>
          )}
        </div>
      </div>
      <BottomBar />
    </>
  );
};

export default Image;
