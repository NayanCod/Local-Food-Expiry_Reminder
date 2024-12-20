import { useState } from "react";
import UnreadNotification from "./UnreadNotification";
import AllNotifications from "./AllNotifications";
import { useDarkMode } from "../context/DarkModeContext";

const Notifications = ({ notifications, fetchNotifications }) => {
  const {isDarkMode} = useDarkMode();
  const [unreadTab, setUnreadTab] = useState(true);
  const [allAlertTab, setAllAlertTab] = useState(false);

  const disableAlertTab = () => {
    setAllAlertTab(false);
    setUnreadTab(false);
  };

  return (
    <div className={`absolute w-60 md:w-80 h-80 top-12 -right-12 p-3 border-1 border-gray-300 shadow-md rounded-lg z-20 ${isDarkMode ? 'bg-gray-700 text-white transition-all duration-300' : 'bg-white text-gray-800 transition-all duration-300'}`}>
      <div className="flex gap-4 w-full">
        <button
          onClick={() => {
            disableAlertTab();
            setUnreadTab(true);
          }}
          className={
            unreadTab
              ? "bg-green-500 text-white font-semibold text-md py-1.5 px-4 rounded-lg w-1/2"
              : "bg-gray-200 text-gray-800 text-bold py-1.5 px-4 rounded-lg w-1/2"
          }
        >
          Unread
        </button>
        <button
          onClick={() => {
            disableAlertTab();
            setAllAlertTab(true);
          }}
          className={
            allAlertTab
              ? "bg-green-500 text-white font-semibold text-md py-1.5 px-4 rounded-lg w-1/2"
              : "bg-gray-200 text-gray-800 text-bold py-1.5 px-4 rounded-lg w-1/2"
          }
        >
          All
        </button>
      </div>

      <div className="overflow-y-auto h-[calc(100%-3rem)] mt-3 hide-scroll">
        {unreadTab &&
          (notifications.filter((notify) => !notify.isRead).length === 0 ? (
            <p>No new notifications</p>
          ) : (
            <UnreadNotification
              notifies={notifications.filter((notify) => !notify.isRead)}
              fetchNotifications={fetchNotifications}
            />
          ))}
        {allAlertTab &&
          (notifications.length === 0 ? (
            <p>Empty notifications</p>
          ) : (
            <AllNotifications
              notifies={notifications}
              fetchNotifications={fetchNotifications}
            />
          ))}
      </div>
    </div>
  );
};

export default Notifications;
