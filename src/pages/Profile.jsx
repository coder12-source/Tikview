import React, { useEffect, useState } from 'react';
import { auth, db } from '../Firebase'; // Import Firebase config
import { doc, getDoc } from 'firebase/firestore'; // Firestore methods
import NavigationTab from '../components/NavigationTab';

export default function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser; // Get the currently authenticated user
      if (user) {
        const userRef = doc(db, "users", user.uid); // Reference to the user's document in Firestore
        const docSnap = await getDoc(userRef); // Fetch the user document from Firestore

        if (docSnap.exists()) {
          setUserData(docSnap.data()); // Set user data in state (including profile picture)
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <NavigationTab />
      <h1>Welcome to your Profile</h1>
      {userData ? (
        <div>
          <h2>{userData.displayName}</h2>
    
          {/* Display the profile picture */}
          <img
            src={userData.photoURL}  // URL from Firestore
            alt="User Profile"
            style={{ width: '150px', height: '150px', borderRadius: '50%' }}  // Make it circular
          />
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
