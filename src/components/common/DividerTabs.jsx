import React from "react";
import PropTypes from "prop-types";

const DividerTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex items-center justify-between w-full">
      {tabs &&
        tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex justify-center items-center py-2 cursor-pointer transition-all duration-300 rounded-lg shadow-lg ${
              activeTab === index ? "bg-salmon text-white w-[64%] bg-gradient-to-l from-salmon to-black/20" : "w-[34%] from-white to-black/10 bg-gradient-to-r"
            }`}
            onClick={() => setActiveTab(index)}
          >
            <p className={`text-lg ${activeTab === index ? 'font-regular' : 'font-light'}`}>{tab}</p>
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
