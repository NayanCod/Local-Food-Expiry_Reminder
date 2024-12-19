import { useState } from "react";
import axiosClient from "../../axiosConfig";
import { toast } from "react-toastify";

const AddItemForm = ({ setItems, setLoading, closeModal }) => {
  const [itemName, setItemName] = useState("");
  const [itemExpiryDate, setItemExpiryDate] = useState("");
  const [addItemError, setAddItemError] = useState("");

  const testExpiryDate = new Date();
  testExpiryDate.setMinutes(testExpiryDate.getMinutes() + 5);
  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const formattedExpiryDate = new Date(itemExpiryDate);
      formattedExpiryDate.setHours(0, 0, 0, 0);
      const res = await axiosClient.post("/api/items/addItem", {
        name: itemName,
        expiryDate: itemExpiryDate,
      });
      toast.success("Item added successfully!");
      // console.log("Item added", res.data?.data);

      setItems((prevItems) => [...prevItems, res.data?.data]);

      // Reset form inputs
      setItemName("");
      setItemExpiryDate("");
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
