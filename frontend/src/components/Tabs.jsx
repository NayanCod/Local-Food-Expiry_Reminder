import { useDarkMode } from "../context/DarkModeContext";

const Tabs = ({ activeTab, setActiveTab }) => {
  const {isDarkMode} = useDarkMode();

  const getTabClass = (tabName) =>
    `py-1 px-4 rounded-lg font-semibold cursor-pointer ${
      activeTab === tabName
        ? "text-white"
        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
    }`;

  return (
    <div className={`flex pl-6 gap-4 border-b-2 pb-2 ${isDarkMode ? 'border-gray-700 transition-all duration-300' : 'border-gray-300 transition-all duration-300'}`}>
      <button
        onClick={() => setActiveTab("All")}
        className={`${getTabClass("All")} ${
          activeTab === "All" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        All
      </button>
      <button
        onClick={() => setActiveTab("Fresh")}
        className={`${getTabClass("Fresh")} ${
          activeTab === "Fresh" ? "bg-green-500 text-white" : "bg-gray-200"
        }`}
      >
        Fresh
      </button>
      <button
        onClick={() => setActiveTab("Expiring")}
        className={`${getTabClass("Expiring")} ${
          activeTab === "Expiring"
            ? "bg-orange-500 text-white"
            : "bg-gray-200"
        }`}
      >
        Expiring
      </button>
      <button
        onClick={() => setActiveTab("Expired")}
        className={`${getTabClass("Expired")} ${
          activeTab === "Expired" ? "bg-red-500 text-white" : "bg-gray-200"
        }`}
      >
        Expired
      </button>
    </div>
  );
};

export default Tabs;
