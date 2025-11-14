import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
// Replace these values with your own from Firebase Console > Project Settings
const firebaseConfig = {
  apiKey: "AIzaSyC9Sq8WOO4aEJIzop8VZqGwbCaNMOMh7wc",
  authDomain: "socialwall-6ce96.firebaseapp.com",
  projectId: "socialwall-6ce96",
  storageBucket: "socialwall-6ce96.firebasestorage.app",
  messagingSenderId: "243704773208",
  appId: "1:243704773208:web:f8f210b5bc529f9d9b682d",
  measurementId: "G-EQ84TJZTHK"
};

// Check if Firebase is configured (has real API key, not placeholder)
export const isConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY_HERE" && 
                            firebaseConfig.apiKey.length > 0;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Log configuration status
if (isConfigured) {
  console.log("✅ Firebase configured and connected");
} else {
  console.warn(
    "⚠️ Firebase is not configured!\n\n" +
    "To enable full functionality:\n" +
    "1. Create a Firebase project at https://console.firebase.google.com/\n" +
    "2. Set up Firestore Database\n" +
    "3. Replace the config in client/src/lib/firebase.ts\n" +
    "4. See FIREBASE_SETUP.md for detailed instructions\n\n" +
    "The app will work in demo mode with local state only."
  );
}
