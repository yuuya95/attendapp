import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlo1TOrgF9PyAIAn6BH2n8lMwrq_F-i0A",
  authDomain: "attend-e778a.firebaseapp.com",
  projectId: "attend-e778a",
  storageBucket: "attend-e778a.appspot.com",
  messagingSenderId: "442459476797",
  appId: "1:442459476797:web:49a16aa08be22aad236b54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore(app)

export {db, auth}