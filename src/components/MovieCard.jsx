import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MovieCard.css'; 

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div className="movie-overlay">
          <h4>See Details</h4>
        </div>
      </Link>
      <h3>{movie.title}</h3>
    </div>
  );
};

export default MovieCard;
