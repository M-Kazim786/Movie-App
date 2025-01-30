const API_KEY='ab558757ff13a37d67e121b1cf6709cb';
const BASE_URL='https://api.themoviedb.org/3';

export const getPopularMovies= async ()=>{
    const response=await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data=await response.json()
    return data.results;

}
export const searchMovies= async (query)=>{
    const response=await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data=await response.json()
    console.log(data.results);

    return data.results;

}