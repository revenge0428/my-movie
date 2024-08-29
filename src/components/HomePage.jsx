import React, { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';
import GenreSelector from '../components/GenreSelector';
import SearchBar from '../components/SearchBar';
import { fetchMovies } from '../tmdbApi';


const HomePage = ({ genres }) => {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleSearchResults = (results) => {
    setMovies(results);
  };

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const response = await fetchMovies(selectedGenre);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    loadMovies();
  }, [selectedGenre]);

  return (
    <div className="home-page">
      <div className="hero-section">
        <SearchBar onSearchResults={handleSearchResults} />
      </div>
      <GenreSelector genres={genres} onSelectGenre={setSelectedGenre} />
      <h2>Latest Movies</h2>
      <div className="latest-movies">
        <Carousel movies={movies} />
      </div>
    </div>
  );
};

export default HomePage;
