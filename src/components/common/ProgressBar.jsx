import React, { useState, useEffect } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulating progress for demonstration purposes
      if (progress < 60) {
        setProgress((prevProgress) => prevProgress + 1);
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div style={{ width: '80%', margin: 'auto'}}>
      <progress
        value={progress}
        max="100"
        style={{
          width: '100%',
          backgroundColor: '#F1F1F1',
          borderRadius: '20px',
        }}
      >
        <span style={{ backgroundColor: '#B5D2B6', borderRadius: '8px' }}></span>
      </progress>
      <p>{progress}% Complete</p>
    </div>
  );
};

export default ProgressBar;
