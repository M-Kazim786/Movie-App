import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";
import Auth from "./Auth";

const Navbar = () => {
  const { isLoaded } = useUser();
  const [showAuth, setShowAuth] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setShowAuth(true);
    }
  }, [isLoaded]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest("nav")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  return (
    <nav className="relative bg-gray-900 text-white shadow-lg border-b border-gray-700 font-poppins">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          <Link to="/" className="text-3xl font-extrabold text-purple-400 hover:text-purple-300 transition">
            🎬 MovieApp
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center justify-center space-x-8">
            <Link to="/" className="text-lg font-medium hover:text-purple-400 transition">
              Home
            </Link>
            <Link to="/favorites" className="text-lg font-medium hover:text-purple-400 transition">
              Favorites
            </Link>
          </div>

          {/* Desktop Auth Section */}
          {showAuth && (
            <div className="hidden lg:flex items-center space-x-5">
              <Auth isMobile={false} />
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute left-0 right-0 z-20 bg-gray-900 border-b border-gray-700 shadow-xl transition-all duration-300 ease-in-out ${
            menuOpen ? "top-full opacity-100 visible" : "top-[-490px] opacity-0 invisible"
          }`}
        >
          <div className="px-6 py-4 space-y-4">
            <Link
              to="/"
              className="block py-2 text-lg font-medium hover:text-purple-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className="block py-2 text-lg font-medium hover:text-purple-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              Favorites
            </Link>

            {/* Mobile Auth Section */}
            {showAuth && (
              <div className="pt-4 border-t border-gray-700">
                <Auth isMobile={true} />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;