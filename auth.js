import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signInWithEmailAndPassword, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

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
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Redirect functions
function redirectToQuestionnairePage() {
    window.location.href = 'DAFquestion.html';
}

function redirectToMainPage() {
    window.location.href = 'main.html';
}

// Signup Button Handler
document.getElementById('signup-btn')?.addEventListener('click', async () => {
    try {
        // Attempt Google Sign-Up
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Check if this is the first time the user is signing up
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists()) {
            // First-time user
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                createdAt: new Date().toISOString()
            });
            redirectToQuestionnairePage(); // Redirect to the questionnaire
        } else {
            redirectToMainPage(); // Existing user
        }
    } catch (error) {
        console.error("Signup Error:", error);
        alert("Signup failed: " + error.message);
    }
});

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

// Authentication State Observer
onAuthStateChanged(auth, (user) => {
    // Do nothing unless the user clicks a button
    if (user) {
        console.log("User is authenticated:", user.email);
    } else {
        console.log("No user is authenticated.");
    }
});
