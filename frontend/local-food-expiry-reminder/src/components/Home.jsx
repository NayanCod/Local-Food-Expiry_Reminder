import { useEffect, useRef, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext.jsx";
import { getToken } from "firebase/messaging";
import { onMessage } from "firebase/messaging";
import { messaging } from "../firebase.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosClient from "../../axiosConfig.js";
import AllItems from "./AllItems.jsx";
import FreshItems from "./FreshItems.jsx";
import ExpiredItems from "./ExpiredItems.jsx";
import Notifications from "./Notifications.jsx";
import FixedModal from "./FixedModal.jsx";
import WarningDialog from "./WarningDialog.jsx";
import Tabs from "./Tabs.jsx";
import Logo from "./Logo.jsx";
import AboutToExpiredItems from "./AboutToExpiredItems.jsx";
import ItemActionForm from "./ItemActionForm.jsx";

function Home() {
  const {isDarkMode, toggleDarkMode} = useDarkMode();
  const [items, setItems] = useState();
  const [notifications, setNotifications] = useState();
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [allItem, setAllItem] = useState(true);
  const [expiredItem, setExpiredItem] = useState(false);
  const [freshItem, setFreshItem] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [showMenu, setShowMenu] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchLoad, setSearchLoad] = useState(false);

  const notificationRef = useRef(null);
  const alertIconRef = useRef(null);
  const accountIconRef = useRef(null);
  const accountRef = useRef(null);

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
          // console.log("TOKEN GENERATED", token);
          const updateToken = await axiosClient.post("/api/auth/updateToken", {
            fcmToken: token,
          });
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
      setFilteredItems(res.data?.data);
      setLoading(false);
    } catch (error) {
      // console.log("Error fetching items: ", error);
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchLoad(true);
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);

    // Filter items based on the search text
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(searchValue)
    );
    console.log(filtered);

    setFilteredItems(filtered);
    setSearchLoad(false);
  };

  const fetchNotifications = async () => {
    try {
      const res = await axiosClient.get("/api/notification");
      // console.log("USERS ITEMS", res.data);

      setNotifications(res.data?.data);
      setLoading(false);
    } catch (error) {
      // console.log("Error fetching notifications: ", error);
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

    const beepSound = new Audio("/notificationBeep.mp3");

    const unsubscribe = onMessage(messaging, async (payload) => {
      console.log("foregournd message recieved", payload);

      const { title, body } = payload.notification || {};
      toast.info(`📢 ${title}: ${body}`);

      beepSound
        .play()
        .catch((error) => console.error("Failed to play beep sound:", error));

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
          <div className={`fixed top-0  ${isDarkMode ? 'bg-gray-800 text-white shadow-gray-700 transition-all duration-300' : 'bg-white text-gray-800 shadow-gray-200 transition-all duration-300'} shadow-md w-full flex justify-between px-4 md:px-8 py-3 items-center`}>
            <Logo />
            <div className="flex gap-4 items-center">
              <FixedModal heading="Add Item" button="Add Item" btnClass={`${isDarkMode ? 'text-white hover:text-green-500' : 'text-gray-800 hover:text-green-500'}`}>
                <ItemActionForm
                  onSubmit={async (payload) => {
                    await axiosClient.post(`/api/items/addItem`, payload); // Edit API call
                    fetchItems(); // Refresh items after update
                  }}
                />
              </FixedModal>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={isDarkMode ? 'white' : 'none'}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 hover:text-green-500 cursor-pointer"
                onClick={toggleDarkMode}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>

              <div className="relative cursor-pointer" ref={alertIconRef}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 hover:text-green-600"
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
                  className="w-6 h-6 cursor-pointer hover:text-green-600"
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
          <div className={`flex-grow ${isDarkMode ? 'bg-gray-800 text-white transition-all duration-300' : 'bg-white text-gray-800 transition-all duration-300'}`}>
            <div className="flex justify-between items-cente">
              <h1 className="ml-6 mt-20 text-2xl md:text-3xl text-blue-600 font-semibold font-sans my-6">
                Your Items
              </h1>
              <div className={`flex items-center justify-between pl-4 pr-4 py-1.5 mr-6 mt-20 my-6 w-60 border rounded-full ${isDarkMode ? 'border-white' : 'border-gray-800'}`}>
                <input
                  type="text"
                  placeholder="Search items"
                  className={`outline-none text-sm placeholder:text-sm ${isDarkMode ? 'bg-gray-800 transition-all duration-300' : 'bg-white transition-all duration-300'}`}
                  value={searchText}
                  onChange={handleSearchChange}
                />
                {searchLoad ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-4 h-4 animate-spin ${isDarkMode ? 'text-green-500 transition-all duration-300' : 'text-green-700 transition-all duration-300'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                ) : searchText ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={`w-4 h-4 hover:text-green-900 hover:cursor-pointer ${isDarkMode ? 'text-green-500 transition-all duration-300' : 'text-green-700 transition-all duration-300'}`}
                    onClick={() => {
                      setSearchText("");
                      setFilteredItems(items);
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className={`w-4 h-4 ${isDarkMode ? 'text-green-500 transition-all duration-300' : 'text-green-700 transition-all duration-300'}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                )}
              </div>
            </div>

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
                  <AllItems items={filteredItems} fetchItems={fetchItems} />
                )}
                {activeTab === "Fresh" && (
                  <FreshItems items={filteredItems} fetchItems={fetchItems} />
                )}
                {activeTab === "Expired" && (
                  <ExpiredItems items={filteredItems} fetchItems={fetchItems} />
                )}
                {activeTab === "Expiring" && (
                  <AboutToExpiredItems
                    items={filteredItems}
                    fetchItems={fetchItems}
                  />
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
