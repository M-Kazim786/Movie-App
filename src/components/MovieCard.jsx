import React from 'react';
import { Heart } from 'lucide-react';
import { useMovieContext } from '../context/MovieContext';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  const { isFav, addToFav, removeFromFav, selectMovie } = useMovieContext();
  const favorite = isFav(movie.id);

  const favBtn = (e) => {
    e.preventDefault();
    if (favorite) removeFromFav(movie.id);
    else addToFav(movie);
  };

  return (
    <div className="flex flex-col space-y-3">
      {/* Movie Card */}
      <Link
        to="/movie-details"
        onClick={() => selectMovie(movie)}
        className="block bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 group border border-gray-700"
      >
        <div className="relative aspect-[2/3] bg-gray-700">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />

          {/* Rating Badge */}
          {movie.vote_average && (
            <div className="absolute top-2 left-2 bg-black/90 text-white rounded-full px-3 py-1 text-sm font-bold shadow-md ring-2 ring-purple-500/50 backdrop-blur-md">
              {movie.vote_average.toFixed(1)}
            </div>
          )}

          {/* Favorite Button */}
          <button
            className="absolute top-2 right-2 p-2 bg-gray-900/90 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            onClick={(e) => {
              e.preventDefault();
              favBtn(e);
            }}
          >
            <Heart
              className={`w-5 h-5 ${
                favorite
                  ? 'fill-red-500 text-red-500'
                  : 'text-purple-400 hover:text-purple-300'
              }`}
            />
          </button>
        </div>
      </Link>

      {/* Title and Details Below the Card */}
      <div className="text-left">
        <h3 className="font-semibold text-lg text-white hover:text-purple-400 transition-colors duration-300">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-sm">
          {new Date(movie.release_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
