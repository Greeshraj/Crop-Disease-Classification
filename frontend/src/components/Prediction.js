import React, { useState } from 'react';
import './Predict.css'; // Import CSS file

function Predict() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setPredictionResult(null); // Clear previous prediction when new file selected
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!selectedFile) {
      alert("Please select a file.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPredictionResult(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error state as needed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="predict-container">
      <h1>Predict Page</h1>
      <p>Welcome to the Predict Page</p>
      <form onSubmit={handleSubmit} className="predict-form">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={loading} className="predict-button">
          {loading ? 'Loading...' : 'Upload Image'}
        </button>
      </form>
      {selectedFile && (
        <div className="image-preview">
          <h2>Uploaded Image:</h2>
          <img src={URL.createObjectURL(selectedFile)} alt="Uploaded" className="uploaded-image" />
        </div>
      )}
      {predictionResult && (
        <div className="prediction-result">
          <h2>Prediction Result:</h2>
          <p className="result-text">
            Based on our analysis, the image depicts a {predictionResult.class.toLowerCase()} leaf condition
            with {Math.round(predictionResult.confidence * 100)}% confidence. This assessment utilizes advanced
            image processing techniques and machine learning algorithms to provide accurate predictions.
          </p>
        </div>
      )}
    </div>
  );
}

export default Predict;
