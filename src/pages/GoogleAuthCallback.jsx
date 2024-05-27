import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Assuming you get user info from the backend via session/cookies
    // If not, you'll need to implement token handling and storage
    navigate('/profile'); // Redirect to the profile page after successful login
  }, [navigate]);

  return (
    <div>Loading...</div>
  );
};

export default GoogleAuthCallback;
