// firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut // ✅ Import signOut
} from "firebase/auth";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDrGY3NhaX4NDXAl1wybRlrzasZZViuWNk",
  authDomain: "woodshope.firebaseapp.com",
  projectId: "woodshope",
  storageBucket: "woodshope.firebasestorage.app",
  messagingSenderId: "364428267648",
  appId: "1:364428267648:web:de321d1e31cefd50929665",
  measurementId: "G-L5S93S449R"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

/**
 * 🔐 Sign Up with Email & Password
 */
const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * 🔑 Login with Email & Password
 */
const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * 🔓 Login with Google
 */
const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return { success: true, user: result.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ✅ Export everything
export {
  auth,
  provider,
  signUpWithEmail,
  loginWithEmail,
  loginWithGoogle,
  signOut // ✅ Exported for use in logout
};
