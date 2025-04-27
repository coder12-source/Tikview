import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase';
import { setDoc, doc } from 'firebase/firestore'; // Import Firestore methods
import { db } from '../Firebase'; // Assuming you have the Firebase Firestore initialized
import "./SignUp.css";
import GoogleSignUp from "../components/GoogleSignUp";

function SignUp() {
  // Local state for email, password, username, and errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);

  // Sign up function
  const signUp = async (email, password, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add the user to Firestore using the UID from Firebase Auth
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid, // Use the Firebase Auth UID
        email: user.email,
        username: username,
        pfp: "", // Empty string for profile picture (you can update it later)
      });

      console.log("User signed up and data saved:", user);

      // Perform other actions like redirecting the user to a different page if needed
    } catch (error) {
      setError(error.message); // Set error message if sign-up fails
      console.error("Error signing up:", error.message);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password && username) {
      signUp(email, password, username);
      alert("email: " + email + " password: " + password + " username: " + username);
    } else {
      setError('Please enter email, password, and username.');
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </div>
        <button type="submit">Sign Up</button>
      </form>

      <GoogleSignUp />
      {/* Display error if it exists */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default SignUp;
