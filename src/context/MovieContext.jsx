import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {

  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(() => JSON.parse(localStorage.getItem("selectedMovie")) || null);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFavs = JSON.parse(localStorage.getItem("favorites"));
      setFavorites(savedFavs || []); // Fallback to an empty array if savedFavs is null
    }
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  useEffect(() => {
    if (selectedMovie) {
      localStorage.setItem("selectedMovie", JSON.stringify(selectedMovie));
    }
  }, [selectedMovie]);

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
