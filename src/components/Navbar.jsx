import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
      <nav className="bg-gray-800 text-white shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="navbar-brand">
            <Link to="/" className="text-xl font-bold text-purple-400 hover:text-purple-300 transition">
              Movie App
            </Link>
          </div>
          <div className="space-x-6">
            <Link to="/" className="hover:text-purple-400 transition">Home</Link>
            <Link to="/favorites" className="hover:text-purple-400 transition">Favorites</Link>
          </div>
        </div>
      </nav>
    )
  }

export default Navbar