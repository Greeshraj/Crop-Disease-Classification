import React from 'react';
import './Home.css'; // Import CSS file

import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate = useNavigate();
    
    
    const handlePredictClick = () => {
        
        navigate('/predict');
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Potato Leaf Condition Predictor</h1>
        <p>Analyze Potato Field Health with Leaf Images</p>
        <button className="predict-button" onClick={handlePredictClick}>
          Predict Disease
        </button>
      </div>
    </div>
  );
}

export default Home;
