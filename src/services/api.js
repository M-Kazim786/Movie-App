import axios from 'axios'

const API_KEY=import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL='https://api.themoviedb.org/3';

export const getPopularMovies= async ()=>{
    const response=await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    return response.data.results;

}
export const searchMovies= async (query)=>{
    const response=await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
     return response.data.results;

}
export const getMovieDetails=async(movie_id)=>{
    const response=await axios.get(`${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}`);
    return response.data;

}
export const getMovieTrailers= async(movie_id)=>{
    const response=await axios.get(`${BASE_URL}/movie/${movie_id}/videos?api_key=${API_KEY}`);
    return response.data;

}