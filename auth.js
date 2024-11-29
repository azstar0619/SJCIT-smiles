import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDyXDYqmZ2NQCv1hkkusFYrZmr4rLe9_7E",
    authDomain: "smiles2024sjbit.firebaseapp.com",
    projectId: "smiles2024sjbit",
    storageBucket: "smiles2024sjbit.firebasestorage.app",
    messagingSenderId: "510075608026",
    appId: "1:510075608026:web:aab1e6b1f1e31a97497ee3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Redirect functions
function redirectToMainPage() {
    window.location.href = 'main.html';
}

function redirectToLoginPage() {
    window.location.href = 'index.html';
}

// Login Button Handler
document.getElementById('login-btn')?.addEventListener('click', async () => {
    const email = prompt("Please enter your email:");
    const password = prompt("Please enter your password:");

    if (email && password) {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            redirectToMainPage();
        } catch (error) {
            alert("Login failed: " + error.message);
        }
    }
});

// Signup Button Handler
document.getElementById('signup-btn')?.addEventListener('click', async () => {
    try {
        // Attempt Google Sign-Up
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        console.log("User signed up:", user);
        redirectToMainPage();
    } catch (error) {
        console.error("Signup Error:", error);
        alert("Signup failed: " + error.message);
    }
});

// Logout Button Handler
document.getElementById('logout-btn')?.addEventListener('click', async () => {
    try {
        await signOut(auth);
        redirectToLoginPage();
    } catch (error) {
        console.error("Logout Error:", error);
        alert("Logout failed: " + error.message);
    }
});

// Authentication State Observer
auth.onAuthStateChanged((user) => {
    // Current page path
    const currentPath = window.location.pathname;

    if (user) {
        // If user is signed in and not on main page, redirect to main page
        if (!currentPath.includes('main.html')) {
            redirectToMainPage();
        }
    } else {
        // If no user and not on login page, redirect to login page
        if (!currentPath.includes('index.html')) {
            redirectToLoginPage();
        }
    }
});