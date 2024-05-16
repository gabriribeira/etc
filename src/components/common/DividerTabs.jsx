import React from "react";
import PropTypes from "prop-types";

const DividerTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex items-center justify-start w-full">
      {tabs &&
        tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex justify-center items-center py-2 cursor-pointer transition-all duration-300  shadow-lg ${
              activeTab === index ? "bg-black text-white w-[64%] rounded-lg border-2 border-black" : "w-[34%] border-2 border-black from-white to-black/10 bg-gradient-to-r rounded-lg"
            }`}
            onClick={() => setActiveTab(index)}
          >
            <p className={`text-lg ${activeTab === index ? 'font-regular' : 'font-regular'}`}>{tab}</p>
          </button>
        ))}
    </div>
  );
};

DividerTabs.propTypes = {
  tabs: PropTypes.array,
  activeTab: PropTypes.number,
  setActiveTab: PropTypes.func,
};

export default DividerTabs;
