import React, { useEffect, useRef, useState } from "react";

const ItemCard = ({ item }) => {
  const [showMenu, setShowMenu] = useState(false); 
  const [hover, setHover] = useState(false);
  const menuRef = useRef(null);
  const isExpired = item?.notified;
  const toggleMenu = () => setShowMenu((prev) => !prev);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`relative max-w-xs w-full border-2 rounded-lg p-4 shadow-md ${
        isExpired
          ? "border-red-500 bg-red-100"
          : "border-green-500 bg-green-100"
      }`}
      onMouseEnter={() => setHover(true)} // Track hover state
      onMouseLeave={() => {setHover(false); setShowMenu(false)}} // Reset hover state
    >
    <div className="absolute top-2 right-2 z-20" ref={menuRef}>
    {hover && ( // Show menu icon only on hover
          !showMenu ? (
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={toggleMenu}
              title="menu"
            >
              &#x22EE;
            </button>
          ) : (
            <button
              onClick={() => console.log("Delete clicked")}
              className="block bg-white border-1 border-gray-600 rounded-md w-full px-4 py-1 font-semibold text-left text-xs text-gray-800 hover:bg-gray-50"
            >
              Delete
            </button>
          )
        )}
      </div>
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
