import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDyXDYqmZ2NQCv1hkkusFYrZmr4rLe9_7E",
  authDomain: "smiles2024sjbit.firebaseapp.com",
  projectId: "smiles2024sjbit",
  storageBucket: "smiles2024sjbit.firebasestorage.app",
  messagingSenderId: "510075608026",
  appId: "1:510075608026:web:aab1e6b1f1e31a97497ee3"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.querySelector('.google-btn').addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            console.log('Google Login Successful:', result.user);
            alert('Login Successful!');
        })
        .catch((error) => {
            console.error('Google Login Error:', error.message);
        });
});

document.querySelector('.facebook-btn').addEventListener('click', () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            console.log('Facebook Login Successful:', result.user);
            alert('Login Successful!');
        })
        .catch((error) => {
            console.error('Facebook Login Error:', error.message);
        });
});

document.querySelector('.email-login').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('Login Successful:', userCredential.user);
            alert('Login Successful!');
        })
        .catch((error) => {
            console.error('Login Error:', error.message);
        });
});

document.querySelector('.forgot-password-link').addEventListener('click', () => {
    const email = prompt('Enter your email for password reset:');
    if (email) {
        auth.sendPasswordResetEmail(email)
            .then(() => alert('Password reset email sent!'))
            .catch((error) => console.error('Password Reset Error:', error.message));
    }
});

document.querySelector('.signup-link').addEventListener('click', () => {
    const email = prompt('Enter your email to sign up:');
    const password = prompt('Create a password:');
    if (email && password) {
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log('Sign-Up Successful:', userCredential.user);
                alert('Account created successfully!');
            })
            .catch((error) => {
                console.error('Sign-Up Error:', error.message);
            });
    }
});
