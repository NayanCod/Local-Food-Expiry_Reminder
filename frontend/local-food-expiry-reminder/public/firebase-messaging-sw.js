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

  const notificationData = {
    title: payload.notification?.title || "Notification Title",
    message: payload.notification?.body || "Notification Body",
    timestamp: new Date().toISOString(),
  };

  const notificationOptions = {
    body: payload.notification
      ? payload.notification.body
      : "Notification Body",
    icon: payload.notification ? payload.notification.image : "/user-solid.svg",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);

    try {
      await fetch("http://localhost:8080/api/notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2M2OWVmMzVlYWYzZWNkY2UzNzFmMiIsImlhdCI6MTczMjM0ODY3NywiZXhwIjoxNzMyNDM1MDc3fQ.vzzOCTajvlluaD1aNWpeyQJJzilF0_EhSpCA1id2cts`,
        },
        body: JSON.stringify(notificationData),
      });
      console.log("Notification saved to the database successfully.");
    } catch (error) {
      console.error("Failed to save notification to the database:", error);
    }
});
