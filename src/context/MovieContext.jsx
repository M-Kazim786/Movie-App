import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();
export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavs);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const savedMovie = JSON.parse(localStorage.getItem("selectedMovie"));
    setSelectedMovie(savedMovie || null);
  }, []);

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
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFav = (movieId) => favorites.some((movie) => movie.id === movieId);

  const selectMovie = (movie) => {
    setSelectedMovie(movie);
    localStorage.setItem("selectedMovie", JSON.stringify(movie));
  };

  return (
    <MovieContext.Provider value={{ favorites, addToFav, removeFromFav, isFav, selectMovie, selectedMovie }}>
      {children}
    </MovieContext.Provider>
  );
};
