import './NavigationTab.css';
import tikLogo from '../assets/Tikbgr.png';
import { Link } from 'react-router-dom'; // ✅ Make sure this is imported
import { useEffect, useState } from 'react';
import { auth } from '../Firebase'; // ✅ Firebase auth
import UserLogout from '../components/UserLogout'; // ✅ Custom logout button

function NavigationTab({ searchQuery, setSearchQuery }) {
  const [user, setUser] = useState(null); // ✅ Fixed "user is not defined"

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <nav>
      <div className='navigationTabContainer'>
        <div className='container-left'>
          <Link to="/">
            <img src={tikLogo} alt="Logo" className="logo-img" />
          </Link>
          <Link to="/videos" className='hyperlink'>
            <h3>Videos</h3>
          </Link>
          <Link to="/error404" className='hyperlink'>
            <h3>Clips</h3>
          </Link>

          {/* Auth-based conditional links */}
          {!user ? (
            <>
              <Link to="/login" className='hyperlink'>
                <h3>Login</h3>
              </Link>
              <Link to="/signup" className='hyperlink'>
                <h3>Create Account</h3>
              </Link>
            </>
          ) : (
            <Link to="/profile" className='hyperlink'>
              <h3>Profile</h3>
            </Link>
          )}

          {user && <UserLogout />}
        </div>

        <div className='container-right'>
          <Link to="/upload" className='hyperlink'>
            <h3>Upload</h3>
          </Link>
          <input
            type="text"
            placeholder="Search"
            className="searchbar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </nav>
  );
}

export default NavigationTab;
