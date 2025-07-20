import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../Firebase';

const GoogleSignOut = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error.message);
      console.log("hello")
    }

  };

  return (
    <button onClick={handleSignOut}>Sign out</button>
  );
};

export default GoogleSignOut;
