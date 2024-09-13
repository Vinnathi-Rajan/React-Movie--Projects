import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ManageMovies from './components/ManageMovies';
import ManageScreening from './components/ManageScreening';
import ManageSelling from './components/ManageSelling';
import ManageSeating from './components/ManageSeating';
import './App.css'; // Import the CSS file

const App = () => {
  return (
    <Router>
      <header className="app-header">
        <h1>Movie Management System</h1>
      </header>
      <div className="container">
        <nav className="nav-buttons">
          <Link to="/movies" className="nav-button">Manage Movies</Link>
          <Link to="/screenings" className="nav-button">Manage Screenings</Link>
          <Link to="/selling" className="nav-button">Manage Selling</Link>
          <Link to="/seating" className="nav-button">Manage Seating</Link>
        </nav>
        <Routes>
          <Route path="/movies" element={<ManageMovies />} />
          <Route path="/screenings" element={<ManageScreening />} />
          <Route path="/selling" element={<ManageSelling />} />
          <Route path="/seating" element={<ManageSeating />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
