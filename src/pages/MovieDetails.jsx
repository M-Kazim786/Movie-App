import React, { useEffect, useState } from 'react';
import { getMovieDetails } from '../services/api';
import { useMovieContext } from '../context/MovieContext';
import { Loader } from 'lucide-react';

const MovieDetails = () => {
  const { selectedMovie } = useMovieContext();
  const [loading, setLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const details = await getMovieDetails(selectedMovie.id);
        setMovieDetails(details);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [selectedMovie]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 to-black">
        <Loader className="animate-spin text-white" size={32} />
      </div>
    );
  }

  if (!movieDetails) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 to-black text-white">
        No movie details available.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black text-white">
      {/* Background Poster */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
        }}
      ></div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Poster */}
          <div className="md:w-1/3 flex-shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className="w-full rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Details */}
          <div className="md:w-2/3 md:pl-12 mt-8 md:mt-0">
            <h1 className="text-5xl font-bold text-white mb-4">{movieDetails.title}</h1>
            <p className="text-xl text-gray-300 italic mb-6">{movieDetails.tagline}</p>

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <span className="text-gray-400 font-semibold">Release Date:</span>
                <span className="text-white ml-2">{movieDetails.release_date}</span>
              </div>
              <div>
                <span className="text-gray-400 font-semibold">Runtime:</span>
                <span className="text-white ml-2">{movieDetails.runtime} minutes</span>
              </div>
              <div>
                <span className="text-gray-400 font-semibold">Genres:</span>
                <span className="text-white ml-2">
                  {movieDetails.genres.map((genre) => genre.name).join(', ')}
                </span>
              </div>
              <div>
                <span className="text-gray-400 font-semibold">Rating:</span>
                <span className="text-white ml-2">
                  {movieDetails.vote_average} / 10 ({movieDetails.vote_count} votes)
                </span>
              </div>
            </div>

            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Overview</h2>
              <p className="text-lg text-gray-300 leading-relaxed">{movieDetails.overview}</p>
            </div>

            {/* Additional Details (if available) */}
            {movieDetails.homepage && (
              <div className="mb-8">
                <a
                  href={movieDetails.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                >
                  Official Website
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;