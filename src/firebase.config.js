// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbMW-E1PFgnGT0-dHGrZkCWzsnOxYvLqA",
  authDomain: "house-marketplace-rapp.firebaseapp.com",
  projectId: "house-marketplace-rapp",
  storageBucket: "house-marketplace-rapp.appspot.com",
  messagingSenderId: "228441110486",
  appId: "1:228441110486:web:0a00e4f0c681ad2d8d5677"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore()