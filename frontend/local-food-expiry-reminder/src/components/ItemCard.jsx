import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../axiosConfig";
import FixedModal from "./FixedModal";
import AddItemForm from "./AddItemForm";

const ItemCard = ({ item, fetchItems }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [hover, setHover] = useState(false);
  const menuRef = useRef(null);

  const now = new Date();
  const isExpired = item?.notified && new Date(item.expiryDate) < now;
  const isFresh = !item?.notified && new Date(item.expiryDate) > now;
  const isAboutToExpire = item?.notified && new Date(item.expiryDate) > now;

  const toggleMenu = () => setShowMenu((prev) => !prev);

  const handleDelete = async (id) => {
    try {
      const deleteItem = await axiosClient.delete(`/api/items/${id}`);
      if (deleteItem) {
        toast.success("Item removed!");
        fetchItems();
        setShowMenu(false);
      }
    } catch (error) {
      toast.error("Error removing the item");
    }
  };

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
          : isFresh
          ? "border-green-500 bg-green-100"
          : isAboutToExpire
          ? "border-orange-500 bg-orange-100"
          : ""
      }`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setShowMenu(false);
      }}
    >
      <div className="flex justify-between" ref={menuRef}>
        <div
          className={`text-xl font-semibold ${
            isExpired
              ? "text-red-700"
              : isFresh
              ? "text-green-700"
              : isAboutToExpire
              ? "text-orange-700"
              : ""
          }`}
        >
          {item?.name}
        </div>

        {hover && !showMenu && (
          <button
            className="text-gray-500 hover:text-gray-700 font-bold"
            onClick={toggleMenu}
            title="menu"
          >
            &#x22EE;
          </button>
        )}

        {hover && showMenu && (
          <div className="flex gap-4 mx-3">
            <FixedModal
              heading="Edit Item"
              button="Edit"
              btnClass="font-semibold text-left text-xs text-gray-800 hover:text-gray-600"
            >
              <AddItemForm
                itemData={item} // Pass current item data for editing
                onSubmit={async (updatedItem) => {
                  await axiosClient.put(`/api/items/${item._id}`, updatedItem); // Edit API call
                  fetchItems(); // Refresh items after update
                }}
                // closeModal={closeModal} // Function to close modal
              />
            </FixedModal>
            <button
              onClick={() => handleDelete(item._id)}
              className="font-semibold text-left text-xs text-gray-800 hover:text-gray-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <p className="text-gray-600 mt-2">
        {item?.expiryDate && (
          <>
            {isExpired
              ? "Expired on: "
              : isFresh
              ? "Expiry Date: "
              : isAboutToExpire
              ? "Expiring On: "
              : null}
            <span className="font-medium">
              {new Date(item.expiryDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </>
        )}
      </p>
    </div>
  );
};

export default ItemCard;
