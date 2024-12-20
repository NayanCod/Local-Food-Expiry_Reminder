import { useState, useEffect } from "react";
import axiosClient from "../../axiosConfig";
import { toast } from "react-toastify";
import { useDarkMode } from "../context/DarkModeContext";

const ItemActionForm = ({
  itemData = null, // Pass item data if editing
  onSubmit, // Callback for form submission
  closeModal,
}) => {
  const {isDarkMode} = useDarkMode();
  const [itemName, setItemName] = useState(itemData?.name || "");
  const [itemExpiryDate, setItemExpiryDate] = useState(
    itemData?.expiryDate || ""
  );
  const [notifyIntervals, setNotifyIntervals] = useState(
    itemData?.userNotifyIntervals?.join(", ") || ""
  );
  const [itemNameError, setItemNameError] = useState("");
  const [itemExpiryError, setItemExpiryError] = useState("");
  const [intervalError, setIntervalError] = useState("");

  useEffect(() => {
    if (itemData) {
      setItemName(itemData.name);
      setItemExpiryDate(itemData.expiryDate);
      setNotifyIntervals(itemData.userNotifyIntervals.join(", "));
    }
  }, [itemData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) return;

    const formattedExpiryDate = new Date(itemExpiryDate);
    formattedExpiryDate.setHours(0, 0, 0, 0);

    const intervals = notifyIntervals
      .split(",")
      .map((interval) => parseInt(interval.trim()))
      .filter((interval) => !isNaN(interval));

    const payload = {
      name: itemName,
      expiryDate: itemExpiryDate,
      userNotifyIntervals: intervals,
    };

    try {
      await onSubmit(payload); // Callback for submission
      toast.success(
        itemData ? "Item updated successfully!" : "Item added successfully!"
      );
      closeModal();
    } catch (error) {
      toast.error(itemData ? "Error updating item" : "Error adding item");
    }
  };

  const isValid = () => {
    let isValid = true;

    // Validate Item Name
    if (itemName.trim().length < 1) {
      setItemNameError("Name can't be empty");
      isValid = false;
    } else {
      setItemNameError("");
    }

    // Validate Expiry Date
    if (itemExpiryDate.length < 1) {
      setItemExpiryError("Expiry Date can't be empty");
      isValid = false;
    } else {
      const today = new Date();
      const expiryDate = new Date(itemExpiryDate);

      if (expiryDate < today) {
        setItemExpiryError("Expiry date can't be in the past");
        isValid = false;
      } else {
        setItemExpiryError("");
      }
    }

    // Validate Notify Intervals
    const intervals = notifyIntervals
      .split(",")
      .map((interval) => parseInt(interval.trim()))
      .filter((interval) => !isNaN(interval));

    if (intervals.some((interval) => interval <= 0)) {
      setIntervalError("Intervals must be positive integers.");
      isValid = false;
    } else {
      setIntervalError("");
    }

    return isValid;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-lg p-6 max-w-md mx-auto space-y-4 ${isDarkMode ? 'bg-gray-800 text-white transition-all duration-300': 'bg-white text-gray-800 transition-all duration-300'}`}
    >
      <div>
        <label
          htmlFor="itemName"
          className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
        >
          Item Name <span className="text-red-500">*</span>
        </label>
        <input
          id="itemName"
          type="text"
          placeholder="Enter item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm ${isDarkMode ? 'bg-gray-800 transition-all duration-300' : 'bg-white transition-all duration-300'}`}
        />
        {itemNameError && (
          <p className="text-red-500 text-sm font-semibold mt-2">
            {itemNameError}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="itemExpiryDate"
          className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
        >
          Expiry Date <span className="text-red-500">*</span>
        </label>
        <input
          id="itemExpiryDate"
          type="date"
          value={itemExpiryDate}
          onChange={(e) => setItemExpiryDate(e.target.value)}
          className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm ${isDarkMode ? 'bg-gray-800 transition-all duration-300' : 'bg-white transition-all duration-300'}`}
        />
        {itemExpiryError && (
          <p className="text-red-500 text-sm font-semibold mt-2">
            {itemExpiryError}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="notifyIntervals"
          className={`block text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
        >
          Notification Intervals (comma-separated days)
        </label>
        <input
          id="notifyIntervals"
          type="text"
          placeholder="Give intervals (e.g., 14, 7, 2, 1)"
          value={notifyIntervals}
          onChange={(e) => setNotifyIntervals(e.target.value)}
          className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm ${isDarkMode ? 'bg-gray-800 transition-all duration-300' : 'bg-white transition-all duration-300'}`}
        />
        {intervalError && (
          <p className="text-red-500 text-sm font-semibold mt-2">
            {intervalError}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
      >
        {itemData ? "Update Item" : "Add Item"}
      </button>
    </form>
  );
};

export default ItemActionForm;
