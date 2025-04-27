import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import UserSignUp from "./pages/UserSignup";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import VidUpload from "./pages/VidUpload";
import Video from "./pages/Video";
import ViewVideo from "./pages/ViewVideo";
import Profile from "./pages/Profile";
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/signup" element={<UserSignUp/>} />
        <Route path='/forgot' element={<ForgotPasswordPage/>} />
        <Route path='/upload' element={<VidUpload/>} />
        <Route path="/videos" element={<Video/>} />
        <Route path='video/:uid' element={<ViewVideo/>} />
        <Route path='/profile' element={<Profile/>}  />
      </Routes>
    </Router>
  );
};

export default AppRouter;
