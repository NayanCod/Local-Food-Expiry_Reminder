importScripts('https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging.js');

// Firebase configuration (ensure it's your actual config)
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

// Handle background notifications
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message', payload);

  const notificationTitle = payload.notification.title || 'Notification Title';
  const notificationOptions = {
    body: payload.notification.body || 'Notification Body',
    icon: payload.notification.icon || '/user-regular.svg', // Use a default icon if not provided
  };

  // Show notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});
