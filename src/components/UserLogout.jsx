import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const UserLogout = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("You have successfully logged out!");
      navigate('/'); // Redirect to home page after logout
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div>
      <h3 onClick={handleLogout}>Logout</h3>
    </div>
  );
};

export default UserLogout;
