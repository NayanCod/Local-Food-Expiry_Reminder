import { useEffect, useRef, useState } from "react";
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
import Notifications from "./Notifications.jsx";
import FixedModal from "./FixedModal.jsx";
import AddItemForm from "./AddItemForm.jsx";
import WarningDialog from "./WarningDialog.jsx";
import Tabs from "./Tabs.jsx";

function Home() {
  const [items, setItems] = useState();
  const [notifications, setNotifications] = useState();
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [allItem, setAllItem] = useState(true);
  const [expiredItem, setExpiredItem] = useState(false);
  const [freshItem, setFreshItem] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  const notificationRef = useRef(null);
  const alertIconRef = useRef(null);

  const authToken = localStorage.getItem("token");

  const handleTabChange = (tabName) => {
    disableAllFilter();
    setActiveTab(tabName);
  };

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

  const alertClick = () => {
    setShowAlert(!showAlert);
  };

  const disableAllFilter = () => {
    setAllItem(false);
    setExpiredItem(false);
    setFreshItem(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        (!alertIconRef.current || !alertIconRef.current.contains(event.target))
      ) {
        setShowAlert(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    //Todo: make a loading page (skeleton type)
    return <div>loading...</div>;
  } else {
    return (
      //Todo: Make a dark mode theme
      <>
        <div className="h-screen flex flex-col overflow-y-auto hide-scroll">
          <ToastContainer />
          <div className="fixed top-0 bg-white shadow-md shadow-gray-200 w-full flex justify-between px-8 py-3 items-center">
            <div>FreshTrack</div>
            <div className="flex gap-4 items-center">
              <FixedModal heading="Add Item" button="Add Item">
                <AddItemForm setItems={setItems} setLoading={setLoading} />
              </FixedModal>
              <WarningDialog
                heading="Are you sure, You want to logout ?"
                accept={handleLogout}
              >
                Logout
              </WarningDialog>
              <div className="relative" ref={alertIconRef}>
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
                {notifications?.filter((n) => !n.isRead).length ? (
                  <div
                    className="absolute top-0 right-1
             w-2 h-2 bg-red-500 rounded-full"
                  ></div>
                ) : null}
                {showAlert && (
                  <div ref={notificationRef}>
                    <Notifications
                      notifications={notifications}
                      fetchNotifications={fetchNotifications}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex-grow">
          <h1 className="ml-6 mt-20 text-3xl text-gray-800 font-semibold font-sans my-6">Your Items</h1>
          <Tabs activeTab={activeTab} setActiveTab={handleTabChange} />
          <div className="my-4 overflow-y-auto h-[calc(100vh-200px)] scrollable-container">
            {activeTab === "All" && <AllItems items={items} />}
            {activeTab === "Fresh" && <FreshItems items={items} />}
            {activeTab === "Expired" && <ExpiredItems items={items} />}
          </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
