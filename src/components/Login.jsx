import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import GoogleSignIn from "../components/GoogleSignIn";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./Login.css";
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirect to home page after login
    } catch (error) {
      setError(error.message);
      console.error("Error signing in:", error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      signIn(email, password);
      alert("LOGGED IN!");
    } else {
      setError('Please enter both email and password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Sign In</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <GoogleSignIn />
        <p className="forgot-password">
          <Link to="/forgot">Forgot Password</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
