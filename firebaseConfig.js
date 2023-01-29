// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADussfKhElJzw7Xn2PEZ5Eeq9dRmUX4yg",
  authDomain: "weatherapplication-d7ada.firebaseapp.com",
  projectId: "weatherapplication-d7ada",
  storageBucket: "weatherapplication-d7ada.appspot.com",
  messagingSenderId: "1022785699429",
  appId: "1:1022785699429:web:6fbb5a3d679d6e8a26d08c",
  storageBucket: "gs://weatherapplication-d7ada.appspot.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage };
