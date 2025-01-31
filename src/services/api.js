const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = '/api';  // Use the proxy

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  const data = await response.json();
  console.log(data.results);
  return data.results;
};
