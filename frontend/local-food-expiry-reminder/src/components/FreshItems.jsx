import ItemCard from "./ItemCard";

const FreshItems = ({ items }) => {
  return (
    <div className="mx-6 my-6 flex flex-wrap gap-6 justify-start">
      {items.filter((item) => !item.notified).map((item, idx) => {
        return <ItemCard key={idx} item={item} />;
      })}
    </div>
  );
};

export default FreshItems;
