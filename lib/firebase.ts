import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCaGT6BT6Gh3gpN59NwM4xpHfXlYjb9590",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "meganods-2e252.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "meganods-2e252",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "meganods-2e252.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "663627577654",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:663627577654:web:afb7dcaa3d87a2a7169b97",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || ""
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore with Resilience & Persistence Protocol
const db = typeof window !== "undefined" 
  ? initializeFirestore(app, {
      localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
      // Fallback to long polling if environment terminates standard GRPC streams
      experimentalForceLongPolling: true 
    })
  : getFirestore(app);

const auth = getAuth(app);

export { app, db, auth };
