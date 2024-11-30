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
  const [showMenu, setShowMenu] = useState(false);

  const notificationRef = useRef(null);
  const alertIconRef = useRef(null);
  const accountIconRef = useRef(null);
  const accountRef = useRef(null);

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
          const updateToken = await axiosClient.post(
            "/api/auth/updateToken",
            {
              fcmToken: token,
            },
          );
        } else {
          console.log("No registraion token available");
        }
      } catch (error) {
        console.error("Error getiing FCM token: ", error);
      }
    } else if (permission === "denied") {
      toast.info(
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
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target) &&
        (!accountIconRef.current ||
          !accountIconRef.current.contains(event.target))
      ) {
        setShowMenu(false);
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
            <div>
              <h1 className="text-2xl font-bold text-gray-100">
                <span className="relative text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.7)]">
                  Fresh
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-green-500 rounded-full"></span>
                </span>
                <span className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.7)]">
                  Track
                </span>
              </h1>
            </div>
            <div className="flex gap-4 items-center">
            <FixedModal heading="Add Item" button="Add Item">
                    <AddItemForm setItems={setItems} setLoading={setLoading} />
                  </FixedModal>
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
              <div ref={accountIconRef} onClick={() => setShowMenu(!showMenu)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </div>
              {showMenu && (
                <div
                  ref={accountRef}
                  className="absolute w-30 top-16 right-3 p-3 border-1 border-gray-300 flex flex-col gap-3 shadow-md bg-gray-50 rounded-lg z-20"
                >
                  <WarningDialog
                    heading="Are you sure, You want to logout ?"
                    accept={handleLogout}
                  >
                    Logout
                  </WarningDialog>
                </div>
              )}

            </div>
          </div>
          <div className="flex-grow">
            <h1 className="ml-6 mt-20 text-3xl text-gray-800 font-semibold font-sans my-6">
              Your Items
            </h1>
            <Tabs activeTab={activeTab} setActiveTab={handleTabChange} />

            {items.length === 0 ? (
              <div className="w-full h-[calc(100vh-300px)] flex flex-col justify-center items-center my-4">
                <div className="text-gray-800 text-3xl font-bold">
                  Looks like there is no item
                </div>
                <div className="text-gray-500 text-lg">
                  Add some to keep track of their expiry
                </div>
              </div>
            ) : (
              <div className="my-4 overflow-y-auto h-[calc(100vh-200px)] scrollable-container">
                {activeTab === "All" && (
                  <AllItems items={items} fetchItems={fetchItems} />
                )}
                {activeTab === "Fresh" && (
                  <FreshItems items={items} fetchItems={fetchItems} />
                )}
                {activeTab === "Expired" && (
                  <ExpiredItems items={items} fetchItems={fetchItems} />
                )}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Home;
