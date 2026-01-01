import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDOOD3_LtzM537BFlN53EESqC5FPKgm7hA",
    authDomain: "ration-plus.firebaseapp.com",
    projectId: "ration-plus",
    storageBucket: "ration-plus.firebasestorage.app",
    messagingSenderId: "145439381848",
    appId: "1:145439381848:web:10d99332fb94c8d7d6ad2d",
    measurementId: "G-SZN2GWR4LJ"
};

// Initialize Firebase
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, auth };
