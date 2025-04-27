import './VideoComponent.css';
import pfp from '../assets/sonic-fan-94-pfp.png'; // Default profile picture

function VideoComponent({ videoUrl, title, username, userPfp, views, uploadDate, description }) {
  const formatDate = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (seconds < 60) {
      return 'Just now';
    } else if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (days < 30) {
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (months < 12) {
      return `${months} month${months !== 1 ? 's' : ''} ago`;
    } else if (years < 2) {
      return `${years} year ago`;
    } else {
      return 'Just old';
    }
  };

  return (
    <div className="videoComponent-container">
      <div className="videoComponent-top">
        <div className="videoComponent">
          <video width="100%" controls className="actual-video">
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="videoComponent-bottom">
        <div className="videoComponent-lower-left">
          <img
            src={userPfp || pfp} // Use the provided pfp or the default
            alt="profile-pic"
            className="profile-pic"
          />
        </div>

        <div className="videoComponent-lower-right">
          <div className="video-information">
            <h3 className="video-title">{title}</h3>
            <h5 className="video-owner">{username}</h5>
            <div className="video-date-views">
              <h6>{views} views</h6>
              <h6> • </h6>
              <h6>{formatDate(uploadDate)}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoComponent;
