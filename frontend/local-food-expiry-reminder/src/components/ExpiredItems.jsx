import ItemCard from "./ItemCard";

const ExpiredItems = ({ items, fetchItems }) => {
  const now = new Date();

  const expiredItems = items.filter(
    (item) => new Date(item.expiryDate) < now
  );

  return (
    <div className="mx-6 my-6 flex flex-wrap gap-6 justify-center md:justify-start">
      {expiredItems.length === 0 ? (
        <div className="w-full h-[calc(100vh-300px)] flex flex-col justify-center items-center my-4">
          <div className="text-gray-800 text-xl md:text-3xl font-bold text-center">
            Looks like there is no expired item
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

export default ExpiredItems;
