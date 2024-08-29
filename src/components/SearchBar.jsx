import React, { useState } from 'react';
import { searchMovies } from '../tmdbApi';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchBar.css'; // Importing the CSS file for styling

const SearchBar = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      return; // Do nothing if the search term is empty
    }
    try {
      const response = await searchMovies(searchTerm);
      onSearchResults(response.data.results);
      navigate('/'); // Redirect to the home page or search results page if needed
    } catch (error) {
      console.error('Failed to search movies:', error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
