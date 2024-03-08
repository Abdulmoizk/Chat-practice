import { initializeApp } from "firebase/app";
import { getFirestore,doc, setDoc, getDoc  } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword ,
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBQJEU5M0vhmwcQd_pLB4SRffm0fELEBdE",
  authDomain: "abdul-moiz-11cd1.firebaseapp.com",
  databaseURL: "https://abdul-moiz-11cd1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "abdul-moiz-11cd1",
  storageBucket: "abdul-moiz-11cd1.appspot.com",
  messagingSenderId: "47102300225",
  appId: "1:47102300225:web:9a71cce3952054c70776c0",
  measurementId: "G-16H1G3D1B8"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(app);

export{
    auth,
    db,
    createUserWithEmailAndPassword,
    doc,
    setDoc,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword ,
    getDoc ,
    
}