import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "fugthmanagement-89c84.firebaseapp.com",
  projectId: "fugthmanagement-89c84",
  storageBucket: "fugthmanagement-89c84.firebasestorage.app",
  messagingSenderId: "161907073123",
  appId: "1:161907073123:web:c48a03483719c8cdc29856",
  measurementId: "G-63TCSEGYLG"
};

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey);

export const firebaseApp = isFirebaseConfigured
  ? (getApps().length ? getApp() : initializeApp(firebaseConfig))
  : null;

export const firebaseAuth = firebaseApp ? getAuth(firebaseApp) : null;
