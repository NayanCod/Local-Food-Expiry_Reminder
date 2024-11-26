import { useEffect, useState } from "react";
import { getToken } from "firebase/messaging";
import { onMessage } from "firebase/messaging";
import { messaging } from "../firebase.js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosClient from "../../axiosConfig.js";
import AllItems from "./AllItems.jsx";
import FreshItems from "./FreshItems.jsx";
import ExpiredItems from "./ExpiredItems.jsx";

function Home() {
  const [items, setItems] = useState();
  const [notifications, setNotifications] = useState();
  const [loading, setLoading] = useState(true);
  const [itemName, setItemName] = useState("");
  const [itemExpiryDate, setItemExpiryDate] = useState();
  const [addItemError, setAddItemError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [hoveredNotification, setHoveredNotification] = useState(false);
  const [allItem, setAllItem] = useState(true);
  const [expiredItem, setExpiredItem] = useState(false);
  const [freshItem, setFreshItem] = useState(false);
  const [unreadTab, setUnreadTab] = useState(true);
  const [allAlertTab, setAllAlertTab] = useState(false);

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
      const res = await axiosClient.get("/api/items/getItems");
      // console.log("USERS ITEMS", res.data);

      setItems(res.data?.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching items: ", error);
      setLoading(false);
    }
  };
  const fetchNotifications = async () => {
    try {
      const res = await axiosClient.get("/api/notification");
      // console.log("USERS ITEMS", res.data);

      setNotifications(res.data?.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching notifications: ", error);
      setLoading(false);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post("/api/items/addItem", {
        name: itemName,
        expiryDate: itemExpiryDate,
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
    } finally {
      setLoading(false);
    }
  };

  const alertClick = () => {
    setShowAlert(!showAlert);
  };

  const disableAllFilter = () => {
    setAllItem(false);
    setExpiredItem(false);
    setFreshItem(false);
  }

  const handleReadNotify = async (id) => {
    console.log(id);
    const readNotifi = await axiosClient.put(`/api/notification/${id}`);
    if (readNotifi) {
      console.log("Notification read");
      fetchNotifications();
    } else {
      console.log("error in reading notification");
    }
  };

  const disableAlertTab = () => {
    setAllAlertTab(false);
    setUnreadTab(false);
  }

  useEffect(() => {
    requestNotificationPermission();
    fetchItems();
    fetchNotifications();

    const unsubscribe = onMessage(messaging, async (payload) => {
      console.log("foregournd message recieved", payload);

      const { title, body } = payload.notification || {};
      toast.info(`📢 ${title}: ${body}`);

      try {
        await axiosClient.post("/api/notification", {
          title: title || "No Title",
          message: body || "No Body",
          timestamp: new Date().toISOString(),
        });
        fetchNotifications();
      } catch (error) {
        console.error("Failed to save notification:", error);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    //Todo: make a loading page (skeleton type)
    return <div>loading...</div>;
  } else {
    return (
      <>
        <ToastContainer />
        <div className="w-full flex justify-between px-8 py-3 items-center">
          <div>ADD Item</div>
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
              onClick={alertClick}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
            {notifications?.filter((n) => !n.isRead).length ? <div className="absolute top-0 right-1
             w-2 h-2 bg-red-500 rounded-full"></div> : null}
            {showAlert && (
              <div className="absolute w-80 h-80 top-8 right-0 border-2 p-3 border-black rounded-lg z-10 overflow-y-auto">
              <div className="flex gap-4">
                <button onClick={() => {disableAlertTab(); setUnreadTab(true)}} className="bg-gray-200 py-1.5 px-4 rounded-lg">Unread</button>
                <button onClick={() => {disableAlertTab(); setAllAlertTab(true)}} className="bg-gray-200 py-1.5 px-4 rounded-lg">All</button>
              </div>
                {unreadTab && (notifications.filter((notify) => !notify.isRead).length ===
                0 ? (
                  <p>No new notifications</p> // Show this message if no unread notifications exist
                ) : (
                  notifications
                    .filter((notify) => !notify.isRead)
                    .map((notify) => {
                      {
                        /* const isHovered = hoveredNotification === notify._id; */
                      }
                      return (
                        <div
                          key={notify.timestamp}
                          className="relative p-2 my-2 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 duration-200"
                          onMouseEnter={() => setHoveredNotification(true)} // Set hover state on mouse enter
                          onMouseLeave={() => setHoveredNotification(false)} // Reset hover state on mouse leave
                        >
                          <h2>
                            {notify.message.split(" ")[2]}{" "}
                            {notify.message.split(" ")[3] === "is"
                              ? ""
                              : notify.message.split(" ")[3]}
                          </h2>
                          <p>{notify.message}</p>

                          {/* Show handleClick notification when the notification is unread or hovered */}
                          {!notify.isRead && hoveredNotification && (
                            <div
                              className="absolute top-3 right-3 transition-all duration-200"
                              onClick={() => handleReadNotify(notify._id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18 18 6M6 6l12 12"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      );
                    })
                ))}
                {allAlertTab && (notifications.length ===
                0 ? (
                  <p>Empty notifications</p> // Show this message if no unread notifications exist
                ) : (
                  notifications
                    .map((notify) => {
                      return (
                        <div
                          key={notify.timestamp}
                          className="relative p-2 my-2 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 duration-200"
                          onMouseEnter={() => setHoveredNotification(true)} // Set hover state on mouse enter
                          onMouseLeave={() => setHoveredNotification(false)} // Reset hover state on mouse leave
                        >
                          <h2>
                            {notify.message.split(" ")[2]}{" "}
                            {notify.message.split(" ")[3] === "is"
                              ? ""
                              : notify.message.split(" ")[3]}
                          </h2>
                          <p>{notify.message}</p>

                          {/* Show handleClick notification when the notification is unread or hovered */}
                          {!notify.isRead && hoveredNotification && (
                            <div
                              className="absolute top-3 right-3 transition-all duration-200"
                              onClick={() => handleReadNotify(notify._id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18 18 6M6 6l12 12"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      );
                    })
                ))}
              </div>
            )}
          </div>
        </div>
        <form onSubmit={handleAddItem} className="border-2 p-4">
          <input
            type="text"
            placeholder="item name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <br></br>
          <input
            type="date"
            placeholder="expiry date of the item"
            value={itemExpiryDate}
            onChange={(e) => setItemExpiryDate(e.target.value)}
          />
          <br></br>
          <p className="text-red-500 text-sm font-semibold">{addItemError}</p>
          <button className="border-2 border-black p-1 bg-gray-100">
            Add Item
          </button>
        </form>
        <br></br>
        <hr></hr>
        <br></br>
        <h1>Your Items</h1>
        <div className="flex gap-4">
          <button onClick={() => {disableAllFilter(); setAllItem(true)}} className="bg-gray-200 py-1.5 px-4 rounded-lg">All</button>
          <button onClick={() => {disableAllFilter(); setFreshItem(true)}} className="bg-gray-200 py-1.5 px-4 rounded-lg">Fresh</button>
          <button onClick={() => {disableAllFilter(); setExpiredItem(true)}} className="bg-gray-200 py-1.5 px-4 rounded-lg">Expired</button>
        </div>
        {
          allItem ? <AllItems items={items}/> : null
        }
        {
          freshItem ? <FreshItems items={items} /> : null
        }
        {
          expiredItem ? <ExpiredItems items={items}/> : null
        }
        
      </>
    );
  }
}

export default Home;
