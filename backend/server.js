import express from 'express';
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';
import cors from 'cors';

const app = express();
const upload = multer(); // Memory storage for uploaded files

app.use(cors()); // Allow frontend to call this backend

// API Route for Video Upload
app.post("/upload", upload.single("file"), async (req, res) => {
    const { title, description } = req.body; // Get title & description from frontend
  
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
  
    try {
      const formData = new FormData();
      formData.append("reqtype", "fileupload");
      formData.append("userhash", ""); // Optional: Catbox userhash
      formData.append("fileToUpload", req.file.buffer, req.file.originalname);
  
      const response = await axios.post("https://catbox.moe/user/api.php", formData, {
        headers: { ...formData.getHeaders() },
      });
  
      const videoUrl = response.data.trim(); // Get video link
  
      // Construct the full response object
      const videoData = {
        title,
        description,
        link: videoUrl,
        likes: 0,
        dislikes: 0,
        views: 0,
        upload_date: new Date().toISOString(),
      };
  
      res.json(videoData);
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Error uploading video" });
    }
  });

// Start server on port 5000
app.listen(5000, () => console.log('Backend running on http://localhost:5000'));




  