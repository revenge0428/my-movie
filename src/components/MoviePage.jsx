import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { fetchMovieDetails, fetchMovieVideos } from '../tmdbApi';
import '../styles/MoviePage.css';

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isPlayingFullMovie, setIsPlayingFullMovie] = useState(false);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const movieResponse = await fetchMovieDetails(id);
        setMovie(movieResponse.data);

        const videosResponse = await fetchMovieVideos(id);
        const firstVideo = videosResponse.data.results[0];
        if (firstVideo) {
          setTrailerUrl(`https://www.youtube.com/watch?v=${firstVideo.key}`);
        }
      } catch (error) {
        console.error('Failed to fetch movie details or videos:', error);
      }
    };

    loadMovie();
  }, [id]);

  const handlePlayFullMovie = () => {
    setVideoUrl(`https://vidsrc.in/embed/${id}`);
    setIsPlayingFullMovie(true); 
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-page">
      <div
        className="hero-image"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})` }}
      >
        <h1>{movie.title}</h1>
      </div>
      <div className="movie-details">
        {isPlayingFullMovie ? (
          <iframe
            src={videoUrl}
            referrerPolicy="origin"
            width="100%"
            height="500px"
            frameBorder="0"
            allowFullScreen
            title="Full Movie"
          ></iframe>
        ) : (
          <ReactPlayer
            url={trailerUrl}
            playing={true}
            controls={true}
            width="100%"
            height="500px"
          />
        )}
        {!isPlayingFullMovie && (
          <button onClick={handlePlayFullMovie} className="play-button">
            Play Full Movie
          </button>
        )}
        <h3>Genres: {movie.genres.map((genre) => genre.name).join(', ')}</h3>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default MoviePage;
