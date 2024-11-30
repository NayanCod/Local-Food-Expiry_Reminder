// firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.9.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.9.0/firebase-messaging-compat.js"
);

// Firebase configuration and initialization code
const firebaseConfig = {
  apiKey: "AIzaSyDWsdv7_3OCYaFUkM-bvE4AVtpXpEBLp3A",
  authDomain: "food-expiry-remind.firebaseapp.com",
  projectId: "food-expiry-remind",
  storageBucket: "food-expiry-remind.firebasestorage.app",
  messagingSenderId: "1085503246149",
  appId: "1:1085503246149:web:384e121a0e771aca59f82c",
};

// Initialize Firebase in the service worker
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

const broadcast = new BroadcastChannel('auth-channel');
let authToken = null;

// Listen for messages on the BroadcastChannel
broadcast.onmessage = (event) => {
  if (event.data && event.data.type === 'SET_AUTH_TOKEN') {
    authToken = event.data.token; // Save the token in a global variable
    console.log('Service Worker received auth token:', authToken);
  }
};

messaging.onBackgroundMessage(async (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message",
    payload
  );
  const notificationTitle = payload.notification
    ? payload.notification.title
    : "Notification Title";

  const notificationOptions = {
    body: payload.notification
      ? payload.notification.body
      : "Notification Body",
    icon: payload.notification ? payload.notification.image : "/user-solid.svg",
  };

  if (authToken) {
    // console.log(authToken);
    
    // Log the request payload
    const notificationPayload = {
      title: notificationTitle,
      message: payload.notification ? payload.notification.body : "Notification Body",
      timestamp: new Date().toISOString(),
    };
    // console.log('Notification Payload:', notificationPayload);
  
    // Use the token to make an API request
    try {
      const apiResponse = await fetch('http://localhost:8080/api/notification', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,  // Use the token in the header
          'Content-Type': 'application/json',    // Ensure correct content type
        },
        body: JSON.stringify(notificationPayload),
      });
  
      const responseJson = await apiResponse.json();
      // console.log('API Response:', responseJson);
    } catch (error) {
      console.error('Failed to send notification to API:', error);
    }
  } else {
    console.warn('No auth token available for API request');
  }

  // console.log("AUTH TOKEN IN ONBAKGROUND MESSAGE: ", authToken);

  self.registration.showNotification(notificationTitle, notificationOptions);

  
  
});
