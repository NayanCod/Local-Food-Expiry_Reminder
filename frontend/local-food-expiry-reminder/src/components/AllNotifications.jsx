import { useState } from "react";
import axiosClient from "../../axiosConfig";

const AllNotifications = ({ notifies, fetchNotifications }) => {
  const [hoveredNotification, setHoveredNotification] = useState(false);

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
  return (
    <div>
      {notifies.map((notify) => {
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
      })}
    </div>
  );
};

export default AllNotifications;
