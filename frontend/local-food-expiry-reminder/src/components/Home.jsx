import { useEffect } from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "../firebase";

function Home() {
  async function requestNotificationPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      try {
        const token = await getToken(messaging, {
          vapidKey:
            "BAFC6H1DCM7vMOyHHJNhvoK0OzlijdUg8Nbtal2PQ9na6KxbO1MP5cVMIp5cfsJz2uuSrjWLwgNlnmTNlXbZuRE",
        });
        if (token) {
          console.log("TOKEN GENERATED", token);
          await fetch("http://localhost:5000/auth/update-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you're using localStorage for JWT
            },
            body: JSON.stringify({ fcmToken: token }),
          });
        } else {
          console.log("No registraion token available");
        }
      } catch (error) {
        console.error("Error getiing FCM token: ", error);
      }
    } else if (permission === "denied") {
      alert("You denied the permission. Please grant it to use this app efficiently");
    }
  }
  useEffect(() => {
    requestNotificationPermission();
  }, []);
  return <div>Home Page</div>;
}

export default Home;
