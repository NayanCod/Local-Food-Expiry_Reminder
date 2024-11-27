import React from "react";

const Tabs = ({ activeTab, setActiveTab }) => {
  const getTabClass = (tabName) =>
    `py-1.5 px-4 rounded-lg cursor-pointer ${
      activeTab === tabName
        ? "bg-blue-500 text-white"
        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
    }`;

  return (
    <div className="flex pl-6 gap-4 border-b-2 border-gray-300 pb-2">
      <button
        onClick={() => setActiveTab("All")}
        className={getTabClass("All")}
      >
        All
      </button>
      <button
        onClick={() => setActiveTab("Fresh")}
        className={getTabClass("Fresh")}
      >
        Fresh
      </button>
      <button
        onClick={() => setActiveTab("Expired")}
        className={getTabClass("Expired")}
      >
        Expired
      </button>
    </div>
  );
};

export default Tabs;
