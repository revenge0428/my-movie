import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import MoviePage from './components/MoviePage';
import { fetchGenres } from './tmdbApi'; 
import './App.css'

const App = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const response = await fetchGenres();
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Failed to fetch genres:', error);
      }
    };

    loadGenres();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage genres={genres} />} />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Routes>
    </Router>
  );
};

export default App;