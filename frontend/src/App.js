import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Predict from './components/Prediction';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/predict" element={<Predict />} />
      </Routes>
    </Router>
  );
}

export default App;
