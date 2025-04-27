import React, { useEffect, useState } from 'react';
import { db } from '../Firebase.js'; // Import your Firestore instance
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import './Video.css';
import VideoComponent from '../components/VideoComponent.jsx'; // Import your VideoComponent
import NavigationTab from '../components/NavigationTab.jsx';

const Video = () => {
  const [videos, setVideos] = useState([]);
  const [users, setUsers] = useState({}); // To store user data with uid as the key

  useEffect(() => {
    // Fetch videos
    const fetchVideos = async () => {
      const videoCollection = collection(db, 'videos'); // Reference to your 'videos' collection
      const videoSnapshot = await getDocs(videoCollection); // Get documents from the collection
      const videoList = videoSnapshot.docs.map(doc => doc.data()); // Map docs to data
      setVideos(videoList); // Set video data into state

      // Fetch users (we'll do this after videos are fetched)
      const userCollection = collection(db, 'users');
      const userSnapshot = await getDocs(userCollection);
      const userMap = {};
      userSnapshot.docs.forEach(doc => {
        userMap[doc.id] = doc.data(); // Store user data by uid
      });
      setUsers(userMap); // Set users data into state
    };

    fetchVideos();
  }, []); // Empty dependency array to run once on component mount

  return (
    <div>
      <NavigationTab />
      {videos.map((video, index) => {
        // Get the user's data based on userId (uid)
        const user = users[video.userId];

        // Check if user data exists for this video
        if (!user) return null; // Skip rendering if user data is not found

        return (
          <VideoComponent
            key={index}
            videoUrl={video.link}
            title={video.title}
            userId={video.userId}
            username={user.username} // Pass username
            userPfp={user.profilePicture} // Pass profile picture
            views={video.views}
            uploadDate={video.upload_date}
            description={video.description}
          />
        );
      })}
    </div>
  );
};

export default Video;
