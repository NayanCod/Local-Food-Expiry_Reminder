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

  self.registration.showNotification(notificationTitle, notificationOptions);
});
