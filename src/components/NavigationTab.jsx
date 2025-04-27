import './NavigationTab.css';
import tikLogo from '../assets/Tikbgr.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '../Firebase'; // Import the auth module
import UserLogout from '../components/UserLogout';

function NavigationTab() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser); // Monitor auth state

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <nav>
      <div className='navigationTabContainer'>
        <div className='container-left'>
          <Link to="/"><img src={tikLogo} alt="Logo" className="logo-img" /></Link>
          <Link to="/videos" className='hyperlink'> <h3> Videos </h3> </Link>
          <Link to="/error404" className='hyperlink'> <h3> Clips </h3> </Link>
          
          {/* Conditional rendering */}
          {!user ? (
            <>
              <Link to="/login" className='hyperlink'> <h3> Login </h3> </Link>
              <Link to="/signup" className='hyperlink'> <h3> Create Account </h3> </Link>
            </>
          ) : (
            <Link to="/profile" className='hyperlink'> <h3> Profile </h3> </Link>
          )}
          
          {user && <UserLogout />} {/* Only render logout if user is logged in */}
        </div>

        <div className='container-right'>
          <Link to="/upload" className='hyperlink' > <h3> Upload </h3> </Link>
          <input type="text" placeholder="Search" className='searchbar' />
        </div>
      </div>
    </nav>
  );
}

export default NavigationTab;
