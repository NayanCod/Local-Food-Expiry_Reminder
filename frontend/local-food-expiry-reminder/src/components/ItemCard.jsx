import React from "react";

const ItemCard = ({ item }) => {
  const isExpired = item?.notified;

  return (
    <div
      className={`max-w-xs w-full border-2 rounded-lg p-4 shadow-md ${
        isExpired
          ? "border-red-500 bg-red-100"
          : "border-green-500 bg-green-100"
      }`}
    >
      <h2
        className={`text-xl font-semibold ${
          isExpired ? "text-red-700" : "text-green-700"
        }`}
      >
        {item?.name}{" "}
        {isExpired && <span className="text-sm font-normal">- Expired</span>}
      </h2>

      <p className="text-gray-600 mt-2">
        {isExpired ? (
          <>
            Expired on:{" "}
            <span className="font-medium">
              {new Date(item?.expiryDate).toLocaleString()}
            </span>
          </>
        ) : (
          <>
            Expiry Date:{" "}
            <span className="font-medium">
              {new Date(item?.expiryDate).toLocaleString()}
            </span>
          </>
        )}
      </p>
    </div>
  );
};

export default ItemCard;
