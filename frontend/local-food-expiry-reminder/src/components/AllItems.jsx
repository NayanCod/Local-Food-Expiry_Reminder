import ItemCard from "./ItemCard";

const AllItems = ({ items }) => {
  return (
    <div className="mx-6 my-6 flex flex-wrap gap-6 justify-start">
      {items.map((item, idx) => {
        return <ItemCard key={idx} item={item} />;
      })}
    </div>
  );
};

export default AllItems;
