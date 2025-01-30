import React from 'react'
import { Heart } from 'lucide-react'
import { useMovieContext } from '../context/MovieContext'

function MovieCard({movie}) {

    const {isFav,addToFav,removeFromFav}=useMovieContext();
    const favorite=isFav(movie.id);



    const favBtn = (e) => {
      e.preventDefault()
      if(favorite) removeFromFav(movie.id);
      else addToFav(movie)
    }

    return (
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-purple-500/20 transition group border border-gray-700">
        <div className="relative aspect-[2/3] bg-gray-700">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
          />
          {/* Rating Badge */}
        {movie.vote_average && (
          <div className="absolute bottom-2 left-2 bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold text-sm">
            {movie.vote_average.toFixed(1)}
          </div>
        )}
           <button
          className="absolute top-2 right-2 p-2 bg-gray-900/90 rounded-full opacity-0 group-hover:opacity-100 transition hover:scale-110"
          onClick={favBtn}
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
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 text-white">{movie.title}</h3>
          <p className="text-gray-400">
  {new Date(movie.release_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })}
</p>

        </div>
      </div>
    )
  }

export default MovieCard