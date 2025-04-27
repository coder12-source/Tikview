import React, { useState } from "react";
import axios from "axios";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import NavigationTab from "../components/NavigationTab";
import "./VidUpload.css";

const VidUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [videoData, setVideoData] = useState(null);

  const auth = getAuth(); // Get current Firebase auth instance
  const user = auth.currentUser; // Get logged-in user

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !title || !description) {
      alert("Please fill in all fields!");
      return;
    }

    if (!user) {
      alert("You must be logged in to upload a video.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        const uploadedVideoData = {
          ...response.data,
          isVideo: true, // Set isVideo to true
          userId: user.uid, // Upload Firebase UID
        };

        setVideoData(uploadedVideoData);
        saveToFirebase(uploadedVideoData);
      } else {
        alert("Upload failed, please try again!");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading video.");
    } finally {
      setUploading(false);
    }
  };

  // Save video details to Firestore
  const saveToFirebase = async (videoData) => {
    try {
      await addDoc(collection(db, "videos"), videoData);
      alert("Video details saved to Firestore!");
    } catch (err) {
      console.error("Firestore error:", err);
    }
  };

  return (
    <div className="container">
      <NavigationTab />
      <h1>Upload Video</h1>

      <input type="file" accept="video/*" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Enter Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {videoData && (
        <div className="video-preview">
          <h3>{videoData.title}</h3>
          <p>{videoData.description}</p>
          <p>
            <strong>Uploaded Video URL:</strong>{" "}
            <a href={videoData.link} target="_blank" rel="noopener noreferrer">
              {videoData.link}
            </a>
          </p>

          <video controls width="600">
            <source src={videoData.link} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default VidUpload;
