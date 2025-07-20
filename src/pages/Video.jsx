import React, { useEffect, useState } from 'react';
import { db } from '../Firebase.js';
import { getDocs, collection } from 'firebase/firestore';
import './Video.css';
import VideoComponent from '../components/VideoComponent.jsx';
import NavigationTab from '../components/NavigationTab.jsx';

const Video = () => {
  const [videos, setVideos] = useState([]);
  const [users, setUsers] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideosAndUsers = async () => {
      try {
        const videoCollection = collection(db, 'videos');
        const videoSnapshot = await getDocs(videoCollection);
        const videoList = videoSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const userCollection = collection(db, 'users');
        const userSnapshot = await getDocs(userCollection);
        const userMap = {};
        userSnapshot.docs.forEach(doc => {
          userMap[doc.id] = doc.data();
        });

        setVideos(videoList);
        setUsers(userMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideosAndUsers();
  }, []);

  // Generic filtering on multiple fields: title, description, username
  const filteredVideos = videos.filter(video => {
    const lowerQuery = searchQuery.toLowerCase();

    const titleMatch = video.title?.toLowerCase().includes(lowerQuery);
    const descMatch = video.description?.toLowerCase().includes(lowerQuery);

    const user = users[video.userId];
    const usernameMatch = user?.username?.toLowerCase().includes(lowerQuery);

    return titleMatch || descMatch || usernameMatch;
  });

  if (loading) return <p>Loading videos...</p>;

  return (
    <div>
      <NavigationTab searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {filteredVideos.length === 0 && <p>No videos found for "{searchQuery}"</p>}

      {filteredVideos.map(video => {
        const user = users[video.userId];
        if (!user) return null; // Or show placeholder if preferred

        return (
          <VideoComponent
            key={video.id || video.link} // use doc id or link as unique key
            videoUrl={video.link}
            title={video.title}
            userId={video.userId}
            username={user.username}
            userPfp={user.profilePicture}
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
