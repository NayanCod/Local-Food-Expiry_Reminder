import ItemCard from "./ItemCard";

const AllItems = ({ items }) => {
  return (
    <div>
      {items.map((item, idx) => {
        return <ItemCard key={idx} item={item} />;
      })}
    </div>
  );
};

export default AllItems;
