import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const GoogleSignUp = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google User:", result.user);
      navigate('/'); // Redirect to home page after Google Sign-Up
    } catch (error) {
      console.error("Error with Google Sign-In:", error.message);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleSignUp}>
        Sign Up with Google
      </button>
    </div>
  );
};

export default GoogleSignUp;
