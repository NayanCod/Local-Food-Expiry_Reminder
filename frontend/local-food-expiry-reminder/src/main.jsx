import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Function to send the token to the BroadcastChannel
const sendAuthToken = () => {
  const authToken = localStorage.getItem("token");
  if (authToken) {
    broadcast.postMessage({ type: "SET_AUTH_TOKEN", token: authToken });
  }
};

// Check if BroadcastChannel is supported
let broadcast = null;
if ("BroadcastChannel" in window) {
  console.log("BroadcastChannel is supported");
  broadcast = new BroadcastChannel("auth-channel");

  // Initial check for the token
  sendAuthToken();

  // Listen for the tokenUpdated event
  window.addEventListener("tokenUpdated", sendAuthToken);
} else {
  console.log("BroadcastChannel is not supported");
}

// Register Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js", { scope: "/" })
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);

      // Send token to service worker during app initialization
      sendAuthToken();
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

// Render the App
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

export { broadcast }; // Export the broadcast instance for use in App
