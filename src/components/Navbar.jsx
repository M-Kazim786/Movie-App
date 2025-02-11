import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Menu, X, Heart, Home as HomeIcon } from "lucide-react";
import Auth from "./Auth";

const Navbar = () => {
  const { isLoaded, user } = useUser();
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

  // Get display name with fallback options
  const displayName =
    user?.username ||
    user?.firstName ||
    user?.emailAddresses[0]?.emailAddress?.split("@")[0] ||
    "User";

  return (
    <nav className="relative bg-gray-900 text-white shadow-lg border-b border-gray-700 font-poppins">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left Side - Logo */}
        <Link to="/" className="text-3xl font-extrabold text-purple-400 hover:text-purple-300 transition">
          🎬 MovieApp
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link to="/" className="flex items-center gap-1 text-lg font-medium hover:text-purple-400 transition">
            <HomeIcon size={20} /> Home
          </Link>
          <Link to="/favorites" className="flex items-center gap-1 text-lg font-medium hover:text-purple-400 transition">
            <Heart size={20} /> Favorites
          </Link>
        </div>

        {/* Right Side - Auth Section */}
        <div className="hidden lg:flex items-center space-x-5">
          {user && (
            <span className="text-gray-300">
              Welcome, <span className="font-medium text-purple-400">{displayName}</span>
            </span>
          )}
          {showAuth && <Auth isMobile={false} />}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2 rounded-md hover:bg-gray-800 transition"
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
          {user && (
            <div className="text-center pb-4 border-b border-gray-700">
              <span className="text-gray-300">
                Welcome, <span className="font-medium text-purple-400">{displayName}</span>
              </span>
            </div>
          )}
          <Link
            to="/"
            className="flex items-center gap-2 py-2 text-lg font-medium hover:text-purple-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            <HomeIcon size={20} /> Home
          </Link>
          <Link
            to="/favorites"
            className="flex items-center gap-2 py-2 text-lg font-medium hover:text-purple-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            <Heart size={20} /> Favorites
          </Link>

          {/* Mobile Auth Section */}
          {showAuth && (
            <div className="pt-4 border-t border-gray-700">
              <Auth isMobile={true} />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
