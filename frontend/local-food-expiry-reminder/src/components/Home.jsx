import { useEffect, useState } from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "../firebase";
import axios from "axios";

function Home() {
  const [items, setItems] = useState();
  const [loading, setLoading] = useState(true);
  const [itemName, setItemName] = useState("");
  const [itemExpiryDate, setItemExpiryDate] = useState();
  const [addItemError, setAddItemError] = useState("");

  const authToken = localStorage.getItem("token");

  const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      try {
        const token = await getToken(messaging, {
          vapidKey:
            "BAFC6H1DCM7vMOyHHJNhvoK0OzlijdUg8Nbtal2PQ9na6KxbO1MP5cVMIp5cfsJz2uuSrjWLwgNlnmTNlXbZuRE",
        });
        if (token) {
          console.log("TOKEN GENERATED", token);
          const updateToken = await axios.post(
            "http://localhost:8080/api/auth/updateToken",
            {
              fcmToken: token,
            },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
        } else {
          console.log("No registraion token available");
        }
      } catch (error) {
        console.error("Error getiing FCM token: ", error);
      }
    } else if (permission === "denied") {
      alert(
        "You denied the permission. Please grant it to use this app efficiently"
      );
    }
  };

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/items/getItems", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      // console.log("USERS ITEMS", res.data);

      setItems(res.data?.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching items: ", error);
      setLoading(false);
    }
  };

  const handleAddItem = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/items/addItem", {
        name: itemName,
        expiryDate: itemExpiryDate,
      },{
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log("Item added", res.data?.data);

      setItems((prevItems) => [...prevItems, res.data?.data]);

      // Reset form inputs
      setItemName("");
      setItemExpiryDate("");
      setAddItemError("");

    } catch (error) {
      console.log("Error adding items", error);
      setAddItemError(error);
    } finally{
      setLoading(false);
    }
    
  }

  useEffect(() => {
    requestNotificationPermission();
    fetchItems();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  } else {
    return (
      <>
        <div>ADD Item</div>
        <form onSubmit={handleAddItem} className="border-2 p-4">
          <input type="text" placeholder="item name" value={itemName} onChange={(e) => setItemName(e.target.value)}/>
          <br></br>
          <input type="date" placeholder="expiry date of the item" value={itemExpiryDate} onChange={(e) => setItemExpiryDate(e.target.value)}/>
          <br></br>
          <p className="text-red-500 text-sm font-semibold">{addItemError}</p>
          <button className="border-2 border-black p-1 bg-gray-100">Add Item</button>
        </form>
        <br></br>
        <hr></hr>
        <br></br>
        <h1>Your Items</h1>
        {items.map((item, index) => {
          return (
            <div key={index}>
              <h2>{item?.name}</h2>
              <h2>Expiry Date: {new Date(item?.expiryDate).toLocaleString()}</h2>
            </div>
          );
        })}
      </>
    );
  }
}

export default Home;
