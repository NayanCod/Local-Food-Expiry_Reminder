import { useState } from "react";
import axiosClient from "../../axiosConfig";
import { toast } from "react-toastify";

const AddItemForm = ({ setItems, setLoading, closeModal }) => {
  const [itemName, setItemName] = useState("");
  const [itemExpiryDate, setItemExpiryDate] = useState("");
  const [addItemError, setAddItemError] = useState("");
  const [notifyIntervals, setNotifyIntervals] = useState("");
  const [userNotifyIntervals, setUserNotifyIntervals] = useState([]);
  const [intervalError, setIntervalError] = useState("");
  const [itemNameError, setItemNameError] = useState("");
  const [itemExpiryError, setItemExpiryError] = useState("");

  const handleAddItem = async (e) => {
    e.preventDefault();

    if (!isValid()) {
      return;
    }
    try {
      const formattedExpiryDate = new Date(itemExpiryDate);
      formattedExpiryDate.setHours(0, 0, 0, 0);

      const intervals = notifyIntervals
        .split(",")
        .map((interval) => parseInt(interval.trim()))
        .filter((interval) => !isNaN(interval));

      const res = await axiosClient.post("/api/items/addItem", {
        name: itemName,
        expiryDate: itemExpiryDate,
        userNotifyIntervals: intervals,
      });
      toast.success("Item added successfully!");
      // console.log("Item added", res.data?.data);

      setItems((prevItems) => [...prevItems, res.data?.data]);

      // Reset form inputs
      setItemName("");
      setItemExpiryDate("");
      setNotifyIntervals("");
      setUserNotifyIntervals([]);
      setAddItemError("");
      closeModal();
    } catch (error) {
      // console.log("Error adding items", error);
      toast.error("Error in adding items");
      setAddItemError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleIntervalChange = (e) => {
    setNotifyIntervals(e.target.value);
  };

  const isValid = () => {
    let isValid = true;

    // Validate Item Name
    if (itemName.trim().length < 1) {
      setItemNameError("Name can't be empty");
      isValid = false;
    } else {
      setItemNameError(""); // Clear error if valid
    }

    // Validate Expiry Date
    if (itemExpiryDate.length < 1) {
      setItemExpiryError("Expiry Date can't be empty");
      isValid = false;
    } else {
      const today = new Date();
      const expiryDate = new Date(itemExpiryDate);

      // Check if expiry date is in the past
      if (expiryDate < today) {
        setItemExpiryError("Expiry date can't be in the past");
        isValid = false;
      } else {
        setItemExpiryError(""); // Clear error if valid
      }
    }

    // Validate Notify Intervals
    const now = new Date();
    const expiryDate = new Date(itemExpiryDate);

    // Validate the format: Check if each interval is an integer
    const intervals = notifyIntervals
      .split(",")
      .map((interval) => parseInt(interval.trim()))
      .filter((interval) => !isNaN(interval));

    if (intervals.length === 0) {
      setIntervalError("Please enter valid intervals (e.g., 14, 7, 2, 1).");
      isValid = false;
    } else {
      setIntervalError(""); // Clear error if valid
    }

    // Validate each interval (must be a positive integer, within the range)
    for (const interval of intervals) {
      if (interval <= 0) {
        setIntervalError("Intervals must be positive integers.");
        isValid = false;
        break;
      }

      // Check if the notification date is before the expiry date and after today's date
      const notificationDate = new Date(
        expiryDate.getTime() - interval * 24 * 60 * 60 * 1000
      );
      if (notificationDate <= now || notificationDate >= expiryDate) {
        setIntervalError(
          "Each interval must be between today and the expiry date."
        );
        isValid = false;
        break;
      }
    }

    return isValid;
  };

  return (
    <form
      onSubmit={handleAddItem}
      className="rounded-lg p-6 bg-white max-w-md mx-auto space-y-4"
    >
      {/* Item Name Input */}
      <div>
        <label
          htmlFor="itemName"
          className="block text-sm font-medium text-gray-600"
        >
          Item Name
        </label>
        <input
          id="itemName"
          type="text"
          placeholder="Enter item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        {itemNameError && (
          <p className="text-red-500 text-sm font-semibold mt-2">
            {itemNameError}
          </p>
        )}
      </div>

      {/* Expiry Date Input */}
      <div>
        <label
          htmlFor="itemExpiryDate"
          className="block text-sm font-medium text-gray-600"
        >
          Expiry Date
        </label>
        <input
          id="itemExpiryDate"
          type="date"
          placeholder="Enter expiry date"
          value={itemExpiryDate}
          onChange={(e) => setItemExpiryDate(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        {itemExpiryError && (
          <p className="text-red-500 text-sm font-semibold mt-2">
            {itemExpiryError}
          </p>
        )}
      </div>
      {/* Notify Intervals */}
      <div>
        <label
          htmlFor="notifyIntervals"
          className="block text-sm font-medium text-gray-600"
        >
          Notification Intervals (in days, comma-separated)
        </label>
        <input
          id="notifyIntervals"
          type="text"
          placeholder="Give intervals (e.g., 14, 7, 2, 1)"
          value={notifyIntervals}
          onChange={handleIntervalChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        {intervalError && (
          <p className="text-red-500 text-sm font-semibold mt-2">
            {intervalError}
          </p>
        )}
      </div>

      {/* Error Message */}
      {addItemError && (
        <p className="text-red-500 text-sm font-semibold">{addItemError}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        Add Item
      </button>
    </form>
  );
};

export default AddItemForm;
