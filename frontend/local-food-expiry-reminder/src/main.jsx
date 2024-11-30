import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";


if ('BroadcastChannel' in window) {
  console.log("Broadcast is supported");
  
  // Create a BroadcastChannel instance
  const broadcast = new BroadcastChannel('auth-channel');

 // Function to send the token
 const sendAuthToken = () => {
  const authToken = localStorage.getItem('token');
  broadcast.postMessage({ type: 'SET_AUTH_TOKEN', token: authToken });
};

// Initial check for the token
sendAuthToken();

// Listen for the tokenUpdated event
window.addEventListener('tokenUpdated', sendAuthToken);
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
