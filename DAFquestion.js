import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

// Function to calculate DAF score
function calculateDAFScore(answers) {
    // Example: simple calculation based on responses (scale each response from 0-10)
    let totalScore = 0;
    for (const answer of Object.values(answers)) {
        totalScore += parseInt(answer) || 0; // Convert answer to integer, default to 0 if not valid
    }
    return totalScore / Object.values(answers).length; // Average score
}

// Form submission handler
document.getElementById('questionnaire-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const answers = {};

    formData.forEach((value, key) => {
        answers[key] = value;
    });

    console.log('Questionnaire Data:', answers);

    const dafScore = calculateDAFScore(answers);
    console.log('DAF Score:', dafScore);

    // Ensure the user is authenticated
    const user = auth.currentUser;
    if (user) {
        // Save the questionnaire data and DAF score to Firestore
        await setDoc(doc(db, "users", user.uid), { 
            questionnaire: answers, 
            dafScore: dafScore 
        }, { merge: true });

        alert('Thank you for submitting the questionnaire!');
        window.location.href = 'main.html';
    } else {
        alert('User not authenticated. Please log in again.');
    }
});

// Handle authentication state changes
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = 'index.html';
    }
});
