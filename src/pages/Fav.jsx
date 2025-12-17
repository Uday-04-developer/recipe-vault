import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Magnet from "@/components/Magnet";
import ShinyText from "@/components/ShinyText";
import SplashCursor from "@/components/SplashCursor";
import BlurCard from "@/components/BlurCard";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const Fav = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("favorites");
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
      setFavorites([]);
    }
  }, []);

  // Remove from favorites
  const removeFromFavorites = (recipeId) => {
    const updatedFavs = favorites.filter((fav) => fav.id !== recipeId);
    setFavorites(updatedFavs);
    localStorage.setItem("favorites", JSON.stringify(updatedFavs));
  };

  return (
    <div
      className="min-h-screen text-white relative overflow-x-hidden p-8"
      style={{ backgroundColor: "black" }}
    >
      <SplashCursor />

      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter">
          <ShinyText text="Your Cookbook" speed={3} className="text-white" />
        </h1>
        <p className="text-zinc-400 text-lg">
          {favorites.length} {favorites.length === 1 ? "recipe" : "recipes"}{" "}
          saved
        </p>
      </div>

      {/* Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {favorites.map((recipe, index) => (
              <BlurCard
                key={recipe.id}
                delay={index * 100}
                direction="bottom"
                className="inline-block w-full"
              >
                {/* Custom Card with View & Delete Buttons */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 group h-full flex flex-col">
                  {/* Image */}
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                    {recipe.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2 flex grow">
                    {recipe.description}
                  </p>

                  {/* Metadata (Chef & Category) */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-gray-400">
                      By {recipe.chef}
                    </span>
                    {recipe.category && (
                      <span className="text-xs px-2 py-1 bg-purple-600/30 text-purple-300 rounded-full border border-purple-500/30">
                        {recipe.category}
                      </span>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-auto">
                   
                    <Link
                       to={`/recipes/details/${recipe.id}`}   
                      className="flex-1 w-content cursor-pointer backdrop-blur-md rounded-2xl p- border border-white/20 hover:bg-white/15 transition-all hover:scale-105 hover:shadow-2xl text-white text-center py-2 text-sm font-medium"
                    >

                        {/* <span className="flex text-center items-center gap-3 text-lg font-medium text-gray-500 hover:text-white transition-all hover:cursor-pointer"> */}
                          View Recipe
                        {/* </span> */}

                    </Link>

                    <button
                      onClick={() => removeFromFavorites(recipe.id)}
                      className="px-4 bg-transparent cursor-pointer text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      title="Remove from favorites"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              </BlurCard>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center h-[50vh] text-center border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm p-10">
            <div className="text-6xl mb-4">🍽️</div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Plate is Empty
            </h2>
            <p className="text-zinc-400 mb-8 max-w-md">
              You haven't saved any recipes yet. Go explore and find something
              delicious!
            </p>
            <Magnet padding={50} magnetStrength={30}>
              <Link
                to="/recipes"
                className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-all"
              >
                Browse Recipes
              </Link>
            </Magnet>
          </div>
        )}
      </div>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto mt-12 text-center relative z-10">
        <Magnet padding={50} magnetStrength={5}>
          <Link
            to="/"
            className="inline-block text-zinc-400 hover:text-white transition-colors"
          >
            ← Back to Kitchen
          </Link>
        </Magnet>
      </div>
    </div>
  );
};

export default Fav;
