import React from "react";

const ItemCard = ({ item }) => {
  return (
    <div>
      <h2>
        {item?.name} <span>{item?.notified ? " - Expired" : ""}</span>
      </h2>
      <h2>Expiry Date: {new Date(item?.expiryDate).toLocaleString()}</h2>
    </div>
  );
};

export default ItemCard;
