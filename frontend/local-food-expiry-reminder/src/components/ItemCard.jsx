import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../axiosConfig";

const ItemCard = ({ item, fetchItems }) => {
  const [showMenu, setShowMenu] = useState(false); 
  const [hover, setHover] = useState(false);
  const menuRef = useRef(null);
  const isExpired = item?.notified;
  const toggleMenu = () => setShowMenu((prev) => !prev);

  const handleDelete = async(id) => {
    try {
      const deleteItem = await axiosClient.delete(`/api/items/${id}`);
      if(deleteItem){
        toast.success("Item removed!");
        // console.log("Item removed successfullyy", deleteItem);
        fetchItems();
        setShowMenu(false);
      }
    } catch (error) {
      // console.log("Error is removing the items", error);
      toast.error("Error is removing the items");
      
    }
  }

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
      className={`max-w-xs w-full border-2 rounded-lg p-4 shadow-md ${
        isExpired
          ? "border-red-500 bg-red-100"
          : "border-green-500 bg-green-100"
      }`}
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => {setHover(false); setShowMenu(false)}} 
    >
    <div className="flex justify-between" ref={menuRef}>
    <div
        className={`text-xl font-semibold ${
          isExpired ? "text-red-700" : "text-green-700"
        }`}
      >
        {item?.name}{" "}
        {/* {isExpired && <span className="text-sm font-normal">- Expired</span>} */}
      </div>
    {hover && ( 
          !showMenu ? (
            <button
              className="text-gray-500 hover:text-gray-700 font-bold"
              onClick={toggleMenu}
              title="menu"
            >
              &#x22EE;
            </button>
          ) : (
            <button
              onClick={() => handleDelete(item._id)}
              className=" bg-white border-1 border-gray-600 rounded-md px-4 py-1 font-semibold text-left text-xs text-gray-800 hover:bg-gray-50"
            >
              Delete
            </button>
          )
        )}
      </div>

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
