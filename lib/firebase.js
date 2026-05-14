import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "fugthmanagement-89c84.firebaseapp.com",
  projectId: "fugthmanagement-89c84",
  storageBucket: "fugthmanagement-89c84.firebasestorage.app",
  messagingSenderId: "161907073123",
  appId: "1:161907073123:web:c48a03483719c8cdc29856"
};

// Initialize Firebase securely
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
