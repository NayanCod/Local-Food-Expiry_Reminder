import { useDarkMode } from "../context/DarkModeContext";
import ItemCard from "./ItemCard";

const AllItems = ({ items, fetchItems }) => {
  const {isDarkMode} = useDarkMode();
  return (
    <div className="mx-6 my-6 flex flex-wrap gap-6 justify-center md:justify-start">
    {items.length === 0 ? (
        <div className="w-full h-[calc(100vh-300px)] flex flex-col justify-center items-center my-4">
          <div className={`text-xl md:text-3xl font-bold text-center ${isDarkMode ? 'text-gray-100 transition-all duration-300' : 'text-gray-800 transition-all duration-300'}`}>
            Looks like there is no items
          </div>
        </div>
      ) : (
        items.map((item, idx) => (
          <ItemCard key={idx} item={item} fetchItems={fetchItems} />
        ))
      )}
    </div>
  );
};

export default AllItems;
