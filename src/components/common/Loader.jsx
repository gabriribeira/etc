import React from "react";
import LoaderGif from "../../assets/imgs/etc/loader.gif";

const Loader = () => {
  return (
    <div className="h-screen w-screen fixed bottom-0 left-0 flex items-center justify-center z-[999999999] bg-black/20">
      <img src={LoaderGif} alt="Loader" className="w-[30%] z-[9999999999]" />
    </div>
  );
};

export default Loader;
