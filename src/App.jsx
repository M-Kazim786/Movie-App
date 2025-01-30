import Favorites from "./pages/Favorites"
import Home from "./pages/Home"
import {Routes,Route} from 'react-router-dom'
import Navbar from "./components/Navbar"
import { MovieProvider } from "./context/MovieContext"

function App() {
  return (
    <MovieProvider>
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
        </Routes>
      </main>
    </div>
    </MovieProvider>
  )
}

export default App