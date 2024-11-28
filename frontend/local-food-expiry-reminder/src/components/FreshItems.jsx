import ItemCard from "./ItemCard";

const FreshItems = ({ items, fetchItems }) => {
  return (
    <div className="mx-6 my-6 flex flex-wrap gap-6 justify-center md:justify-start">
      {items.filter((item) => !item.notified).map((item, idx) => {
        return <ItemCard key={idx} item={item} fetchItems={fetchItems} />;
      })}
    </div>
  );
};

export default FreshItems;
