import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBxw4hEmkilrrEN9bWL1qOBUKsccu5HiUA",
    authDomain: "mhc--home-inspection.firebaseapp.com",
    projectId: "mhc--home-inspection",
    storageBucket: "mhc--home-inspection.firebasestorage.app",
    messagingSenderId: "903402751610",
    appId: "1:903402751610:web:76f4a9ad91daff60b59dc3",
    measurementId: "G-KL6GBHGDF7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
