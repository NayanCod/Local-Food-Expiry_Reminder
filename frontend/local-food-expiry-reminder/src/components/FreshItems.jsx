import ItemCard from "./ItemCard";

const FreshItems = ({ items }) => {
  return (
    <div>
      {items.filter((item) => !item.notified).map((item, idx) => {
        return <ItemCard key={idx} item={item} />;
      })}
    </div>
  );
};

export default FreshItems;
