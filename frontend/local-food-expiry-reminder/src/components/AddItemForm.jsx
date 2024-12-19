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

  const handleAddItem = async (e) => {
    e.preventDefault();

    if (!validateIntervals()) {
      return;
    }
    try {
      const formattedExpiryDate = new Date(itemExpiryDate);
      formattedExpiryDate.setHours(0, 0, 0, 0);

      const intervals = notifyIntervals
        .split(",")
        .map(interval => parseInt(interval.trim()))
        .filter(interval => !isNaN(interval));

      const res = await axiosClient.post("/api/items/addItem", {
        name: itemName,
        expiryDate: itemExpiryDate,
        userNotifyIntervals: intervals
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

  const validateIntervals = () => {
    const now = new Date();
    const expiryDate = new Date(itemExpiryDate);

    // Validate the format: Check if each interval is an integer
    const intervals = notifyIntervals
      .split(",")
      .map((interval) => parseInt(interval.trim()))
      .filter((interval) => !isNaN(interval));

    if (intervals.length === 0) {
      setIntervalError("Please enter valid intervals (e.g., 14, 7, 2, 1).");
      return false;
    }

    // Validate each interval (must be a positive integer, within the range)
    for (const interval of intervals) {
      if (interval <= 0) {
        setIntervalError("Intervals must be positive integers.");
        return false;
      }

      // Check if the notification date is before the expiry date and after today's date
      const notificationDate = new Date(expiryDate.getTime() - interval * 24 * 60 * 60 * 1000);
      if (notificationDate <= now || notificationDate >= expiryDate) {
        setIntervalError("Each interval must be between today and the expiry date.");
        return false;
      }
    }

    // Clear error if intervals are valid
    setIntervalError("");
    return true;
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
          <p className="text-red-500 text-sm font-semibold mt-2">{intervalError}</p>
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
