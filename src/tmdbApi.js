import axios from 'axios';

const API_KEY = 'd131311eb7ee903bee145ece88a03545'; // Replace with your actual TMDb API key
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

// Fetch a list of genres
export const fetchGenres = () => {
  return tmdbApi.get('/genre/movie/list');
};

// Fetch movies based on genre
export const fetchMovies = (genreId) => {
  return tmdbApi.get('/discover/movie', {
    params: {
      with_genres: genreId,
      sort_by: 'popularity.desc',
    },
  });
};

// Fetch movie details by ID
export const fetchMovieDetails = (movieId) => {
  return tmdbApi.get(`/movie/${movieId}`);
};

// Search movies by query
export const searchMovies = (query) => {
  return tmdbApi.get('/search/movie', {
    params: {
      query,
      page: 1,
      include_adult: false,
    },
  });
};

export const fetchMovieVideos = (movieId) => {
  return tmdbApi.get(`/movie/${movieId}/videos`);
};
