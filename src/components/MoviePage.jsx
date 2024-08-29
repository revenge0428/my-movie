import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { fetchMovieDetails, fetchMovieVideos } from '../tmdbApi';
import '../styles/MoviePage.css'

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const movieResponse = await fetchMovieDetails(id);
        setMovie(movieResponse.data);

        const videosResponse = await fetchMovieVideos(id);
        const firstVideo = videosResponse.data.results[0];
        if (firstVideo) {
          setVideoUrl(`https://www.youtube.com/watch?v=${firstVideo.key}`);
        }
      } catch (error) {
        console.error('Failed to fetch movie details or videos:', error);
      }
    };

    loadMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-page">
      <div className="hero-image" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})` }}>
        <h1>{movie.title}</h1>
      </div>
      <div className="movie-details">
        {videoUrl && (
          <ReactPlayer
            url={videoUrl}
            playing={true}
            controls={true}
            width="100%"
            height="500px"
          />
        )}
        <h3>Genres: {movie.genres.map(genre => genre.name).join(', ')}</h3>
        <p>{movie.overview}</p>
        <a href={`https://www.example.com/rent-or-buy/${movie.id}`} target="_blank" rel="noopener noreferrer" className="action-button">
          Rent or Buy this Movie
        </a>
      </div>
    </div>
  );
};

export default MoviePage;