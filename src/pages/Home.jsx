// src/components/Home.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import ImageTrail from "../components/ImageTrail";
import FlowingMenu from "../components/FlowingMenu";

import { motion } from "framer-motion";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import ShinyText from "@/components/ShinyText";
import GradientText from "@/components/GradientText";

// Smaller aesthetic food images for background (400x300)
const IMAGES = [
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=300&fit=crop",
];

// Recipe categories for FlowingMenu
const recipeCategories = [
  {
    link: "/recipes/breakfast",
    text: "Breakfast",
    image:
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&h=400&fit=crop",
  },
  {
    link: "/recipes/lunch",
    text: "Lunch",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
  },
  {
    link: "/recipes/high-tea",
    text: "Supper",
    image:
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&h=400&fit=crop",
  },
  {
    link: "/recipes/dinner",
    text: "Dinner",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen  ">
      {/* text-flip or switch  componenet */}

      {/* ImageTrail - Full page background with smaller images */}
      <div className="fixed inset-0 z-0">
        <ImageTrail items={IMAGES} variant={5} />
      </div>

      {/* Overlay to ensure content is readable */}
      <div className="fixed inset-0 pointer-events-none z-0" />

      {/* Main Content */}
      <div id="ui-content" className="relative z-10 p-9">
        {/* Header with Title */}
        <header className="">
          <div className="max-w-7xl mx-auto px-4 py-6  p-6 pt-0">
            {/* <h1
              className="text-[3rem] md:text-5xl font-bold text-white text-center"
              style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}
            >
              Recipe Vault
            </h1> */}
            <div className="z-20   md:text-5xl font-bold text-white/80 text-center">
              <h1 className="font-normal text-5xl flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row italic pb-3 "   style={{ fontFamily: `'Pacifico', cursive` }}>
                Welcome
              </h1>
              <h1 className="font-normal text-white/80 text-5xl flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row tracking- italic  pb-3"   style={{ fontFamily: `'Pacifico', cursive` }}>
                to{" "}
              </h1>
               {/* <GradientText
                  colors={[
                    "#0a71ff",
                    "#878787",
                    "#8b6cf5",
                    "#fff",
                    "#7639e8",
                  ]}
 
                  animationSpeed={8}
                  showBorder={true}
                  className="text-xs  md:text-sm font-medium  tracking-widest uppercase"
                > */}

                
              <motion.div className="relative text-6xl mx-4  flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row tracking-tighter">
                <LayoutTextFlip
                  text=""
                  words={["HomeChef Vault","Tastebook","The Flavor Room","Daily Recipe Studio"

                    // "Preserving Your Best Tastes",
                    ]}
                />
              </motion.div>
              {/* </GradientText> */}
              {/* <ShinyText
              text="Experience the power of modern UI components that bring your
                ideas to life."
              speed={3}
              className=" italic font-normal mt-4 text-center text-base text-neutral-600"
            /> */}
              {/* <p className="mt-4 text-center text-base text-neutral-600 dark:text-neutral-400">
                Experience the power of modern UI components that bring your
                ideas to life.
              </p> */}
              <div className="mt-1">
              
                <GradientText
                  colors={[
                    "#7639e8",
                    "#878787",
                    "#8b6cf5",
                    "#fff",
                    "#7639e8",
                  ]}
 
                  animationSpeed={8}
                  showBorder={false}
                  className="text-xs p-2  md:text-sm font-medium  tracking-widest uppercase"
                >
                 A comforting space to save, cook, and craft your favorite recipes.
                </GradientText>
              </div>
            </div>
            {/* <p
              className="text-white/90 text-center mt-2 font-medium"
              style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.8)" }}
            >
              Home for Your Recipes
            </p> */}
          </div>
        </header>

        {/* FlowingMenu - Full width, 50vh */}
        <div className="w-full h-[50vh] bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15">
          <FlowingMenu items={recipeCategories} />
        </div>

        {/* Bottom Content Section */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature Card 1 */}
            <div
              onClick={() => navigate("/recipes")}
              className="cursor-pointer bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all hover:scale-105 hover:shadow-2xl"
            >
              <div className="text-4xl mb-4">📖</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Browse Recipes
              </h3>
              <p className="text-white/80">
                Explore thousands of recipes from our community
              </p>
            </div>

            {/* Feature Card 2 */}
            <div
              onClick={() => navigate("/create")}
              className="bg-white/10 cursor-pointer backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all hover:scale-105 hover:shadow-2xl"
            >
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Share Your Recipes
              </h3>
              <p className="text-white/80">
                Add your own recipes and inspire others
              </p>
            </div>

            {/* Feature Card 3 */}
            <div
              onClick={() => navigate("/favorites")}
              className="cursor-pointer bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all hover:scale-105 hover:shadow-2xl"
            >
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Saved in Favorites ❤️
              </h3>
              <p className="text-white/80">Keep track of recipes you love</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">
                Start Your Culinary Journey
              </h2>
              <p className="text-white/80 mb-6">
                Join our community of food lovers and share your favorite
                recipes
              </p>
              <button
                onClick={() => navigate("/create")}
                className="px-8 py-3 bg-linear-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-pink-500/50 transition-all hover:scale-105"
              >
                Add Your First Recipe
              </button>
              {/* Not using this  */}
              {/* <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="bg-black text-white flex items-center space-x-2"
              >
                <span>Add Your First Recipe</span>
              </HoverBorderGradient> */}
            </div>
          </div>
        </div>
      </div>

      {/* FAB button for adding recipes */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          type="button"
          aria-label="Add Recipe"
          onClick={() => navigate("/create")}
          className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-linear-to-r from-pink-500 to-purple-600 text-white shadow-2xl hover:shadow-pink-500/50 focus:outline-none focus:ring-4 focus:ring-pink-400/50 active:scale-95 transition-all duration-200 hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 md:w-10 md:h-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Home;
