import ItemCard from "./ItemCard";

const FreshItems = ({ items, fetchItems }) => {
  return (
    <div className="mx-6 my-6 flex flex-wrap gap-6 justify-center md:justify-start">
      {items.filter((item) => !item.notified).length === 0 ? (
        <div className="w-full h-[calc(100vh-300px)] flex flex-col justify-center items-center my-4">
          <div className="text-gray-800 text-3xl font-bold">
            Looks like there is no fresh item
          </div>
        </div>
      ) : (
        items
          .filter((item) => !item.notified)
          .map((item, idx) => {
            return <ItemCard key={idx} item={item} fetchItems={fetchItems} />;
          })
      )}
    </div>
  );
};

export default FreshItems;
