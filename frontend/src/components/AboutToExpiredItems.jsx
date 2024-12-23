import { useDarkMode } from "../context/DarkModeContext";
import ItemCard from "./ItemCard";

const AboutToExpiredItems = ({ items, fetchItems }) => {
  const {isDarkMode} = useDarkMode();
  const now = new Date();
  const expiredItems = items.filter(
    (item) => item.notified && new Date(item.expiryDate) > now
  );

  return (
    <div className="mx-6 my-6 flex flex-wrap gap-6 justify-center md:justify-start">
      {expiredItems.length === 0 ? (
        <div className="w-full h-[calc(100vh-300px)] flex flex-col justify-center items-center my-4">
          <div className={`text-xl md:text-3xl font-bold text-center ${isDarkMode ? 'text-gray-100 transition-all duration-300' : 'text-gray-800 transition-all duration-300'}`}>
            Looks like there is no item expiring
          </div>
        </div>
      ) : (
        expiredItems.map((item, idx) => (
          <ItemCard key={idx} item={item} fetchItems={fetchItems} />
        ))
      )}
    </div>
  );
};

export default AboutToExpiredItems;
