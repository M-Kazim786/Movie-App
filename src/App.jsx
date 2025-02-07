import Favorites from "./pages/Favorites"
import Home from "./pages/Home"
import {Routes,Route, useLocation} from 'react-router-dom'
import Navbar from "./components/Navbar"
import { MovieProvider } from "./context/MovieContext"
import {motion} from 'framer-motion'
import MovieDetails from "./pages/MovieDetails"

function App() {

  const location=useLocation();

  return (

    <MovieProvider>
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
      <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="/movie_details" element={<MovieDetails/>}/>
        </Routes>
        </motion.div>
      </main>
    </div>
    </MovieProvider>
  )
}

export default App