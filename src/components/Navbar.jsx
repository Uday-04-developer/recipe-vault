import React from 'react';
import { NavLink } from 'react-router-dom';
import logoImage from '../assests/logo.png';

const Navbar = () => {
  return (

<div className="w-[95%] mx-auto my-9 rounded-4xl sticky top-5 z-50 
    bg-white/90 backdrop-blur-2xl backdrop-saturate-150 
    border border-white/20 
    shadow-[0_0_20px_rgba(0,0,0,0.1)] 
    border-t-0 transition-all duration-300">
      {/* Using w-[95%] and mx-auto to center with 2.5% space on each side */}
      {/* */}
      <div className="py-3 flex items-center justify-between relative">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-2 ml-8">
          <img src={logoImage} alt="Logo" className="h-10 w-auto rounded-4xl" />
        </div>

        {/* Center: Title */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-4xl text-center text-gray-800 font-bold" style={{ fontFamily: `'Pacifico', cursive` }}>
            Recipe Vault
          </h1>
        </div>

        {/* Right: Nav Links */}
        <div className="flex items-center gap-6 text-gray-700 font-medium mr-8">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'text-red-400' : 'hover:text-red-300 transition hover:cursor-pointer ')}
          >
            Home
          </NavLink>
          <NavLink
            to="/recipes"
            className={({ isActive }) => (isActive ? 'text-red-400' : 'hover:text-red-300 transition hover:cursor-pointer ')}
          >
            Recipes
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'text-red-400' : 'hover:text-red-300 transition hover:cursor-pointer ')}
          >
            About
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;