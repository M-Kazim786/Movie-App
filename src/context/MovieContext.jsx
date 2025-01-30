import { createContext,useState,useContext,useEffect} from "react";

const MovieContext=createContext();

export const useMovieContext=()=> useContext(MovieContext);

export const MovieProvider=({children})=>{

    const[favorites,setFavorites]=useState([]);

    useEffect(()=>{
        const savedFavs=JSON.parse(localStorage.getItem('favorites'));
        setFavorites(savedFavs);

    },[])

    useEffect(()=>{
        if(favorites.length > 0) {
        localStorage.setItem('favorites',JSON.stringify(favorites));
        }

    },[favorites])

    const addToFav=(movie)=>{
        setFavorites(prev=>[...prev,movie]);

    }
    const removeFromFav=(movieId)=>{
        setFavorites(prev=>{
            const updateFav=prev.filter(movie=>movie.id!==movieId);
            localStorage.setItem('favorites',JSON.stringify(updateFav));
            return updateFav;
    })


    }
    const isFav=(movieId)=>{
        return favorites.some(movie=>movie.id===movieId)

    }

    const value={
        favorites,
        addToFav,
        removeFromFav,
        isFav,
    }

return <MovieContext.Provider value={value}>
    {children}
</MovieContext.Provider>

}