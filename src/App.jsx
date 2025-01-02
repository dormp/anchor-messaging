import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StarterPage from './Pages/starter-page';
import MainPage from './Pages/main-page';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* StarterPage */}
        <Route path="/" element={<StarterPage />} />
        {/* MainPage */}
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
}


export default App;
