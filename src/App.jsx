import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import { MovieProvider } from "./context/MovieContext";
import { motion } from "framer-motion";
import { Loader } from 'lucide-react';


const Home = lazy(() => import("./pages/Home"));
const Favorites = lazy(() => import("./pages/Favorites"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));

function App() {
  const location = useLocation();

  return (
    <MovieProvider>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Suspense fallback={<div><Loader className="animate-spin text-white" size={32} /></div>}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/movie-details" element={<MovieDetails />} /> {/* Fixed Route */}
              </Routes>
            </motion.div>
          </Suspense>
        </main>
      </div>
    </MovieProvider>
  );
}

export default App;
