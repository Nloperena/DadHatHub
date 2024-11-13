import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ isLoading }) => {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (!isLoading) {
      // Trigger the door opening animation
      setAnimationClass('loaded');
    }
  }, [isLoading]);

  return (
    <div className={`loading-screen ${animationClass}`}>
      <div className="door left-door"></div>
      <div className="door right-door"></div>
      {isLoading && <div className="spinner"></div>}
    </div>
  );
};

export default LoadingScreen;
