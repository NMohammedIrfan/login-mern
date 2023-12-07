import React from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="containers">
      <div className="header">
        <h1>All Great Achievements Require Time!</h1>
      </div>

      <div className="content">
        <div className="login-section">
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
        </div>

        <div className="signup-section">
          <button className="signup-button" onClick={handleSignup}>
            Signup
          </button>
        </div>
      </div>

      <div className="footer">
        <p>© 2023 Straps. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LandingPage;
