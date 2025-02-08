import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {

  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Favorites local storage

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFavs = JSON.parse(localStorage.getItem("favorites"));
      setFavorites(savedFavs || []);
    }
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  // MovieDetails page local storage

  useEffect(()=>{
    const savedMovies=JSON.parse(localStorage.getItem('selectedMovie'));
    setSelectedMovie(savedMovies || null);
  },[])

  useEffect(() => {
    if (selectedMovie) {
      localStorage.setItem("selectedMovie", JSON.stringify(selectedMovie));
    }
  }, [selectedMovie]);

  // Favorites page functions

  const addToFav = (movie) => {
    setFavorites((prev) => {
      if (!prev.some((m) => m.id === movie.id)) {
        return [...prev, movie];
      }
      return prev;
    });
  };

  const removeFromFav = (movieId) => {
    setFavorites((prev) => {
      return prev.filter((movie) => movie.id !== movieId);
    });
  };

  const isFav = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  // MovieDetails page functions

  const selectMovie = (movie) => {
    setSelectedMovie(movie);
    localStorage.setItem("selectedMovie", JSON.stringify(movie));
  };

  const value = {
    favorites,
    addToFav,
    removeFromFav,
    isFav,
    selectMovie,
    selectedMovie,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};
