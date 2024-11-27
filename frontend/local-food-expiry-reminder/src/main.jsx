import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// const token = localStorage.getItem('token');

if ('BroadcastChannel' in window) {
  console.log("Broadccats is supported");
  
  // Create a BroadcastChannel instance
  const broadcast = new BroadcastChannel('auth-channel');

  // Retrieve the auth token from localStorage (or another source)
  const authToken = localStorage.getItem('token');

  // Send the auth token to the service worker
  broadcast.postMessage({ type: 'SET_AUTH_TOKEN', token: authToken });

  // Optional: If the token updates, send the new token
  const updateAuthToken = (newToken) => {
    broadcast.postMessage({ type: 'SET_AUTH_TOKEN', token: newToken });
  };

  // Example: Call `updateAuthToken` when the token changes
  // updateAuthToken('new-token-value');
}else{
  console.log("broadcats is not supported");
  
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js', { scope: "/" })
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
