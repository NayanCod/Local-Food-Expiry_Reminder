import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "food-expiry-remind.firebaseapp.com",
  projectId: "food-expiry-remind",
  storageBucket: "food-expiry-remind.firebasestorage.app",
  messagingSenderId: "1085503246149",
  appId: "1:1085503246149:web:384e121a0e771aca59f82c",
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
