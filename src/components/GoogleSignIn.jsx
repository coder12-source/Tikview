import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const GoogleSignIn = () => {
  const navigate = useNavigate(); // Initialize navigate

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google User:", result.user);
      navigate('/'); // Redirect to home page after Google Sign-In
    } catch (error) {
      console.error("Error with Google Sign-In:", error.message);
    }
  };

  return (
    <button onClick={googleSignIn}>Sign in with Google</button>
  );
};

export default GoogleSignIn;
