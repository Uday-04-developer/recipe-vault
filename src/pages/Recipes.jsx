import React, { useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { recipecontext } from '../context/RecipeContext';
import RecipeCard from '../components/Recipecard';
import SplashCursor from '../components/SplashCursor';

import ScrollFloat from "../components/AnimateOnScroll";
import BlurCard from '@/components/BlurCard';




const Recipes = () => {
  const navigate= useNavigate();
  const {data}=useContext(recipecontext);
  //  here we use reipe card
  // In your parent component
const renderRecipes = data.map((recipe, index) => (
  <BlurCard 
    key={recipe.id} 
    delay={index * 10} // Staggered 1elay
    direction="bottom"
    className="inline-block"
  >
    <RecipeCard recipe={recipe} />
  </BlurCard>
));
  return (
    <div>
      <SplashCursor />
       <ScrollFloat
            textClassName="text-white  font-bold"
            scrollStart="top bottom"
            scrollEnd="bottom top"
            className="text-xm p-8"
          >

            <h1 
              className="text-[3rem] md:text-5xl font-bold text-white text-center"
              style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}
            >
              Recipes 
            </h1>
            <p className="text-white/90 text-center mt-2 font-medium" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
              Discover and share amazing recipes
            </p>

            
          </ScrollFloat>
        
      <div className='flex flex-wrap gap-5'>{data.length>=0 ? renderRecipes:"No Recipe Found!"} </div>

      <div className="Add-Button fixed bottom-9 right-10">
        <button
          type="button"
          aria-label="Create"
          onClick={() => navigate("/create")}
          className="flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-r from-pink-500 to-purple-600 text-white
             shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 
             focus:ring-gray-50 active:scale-95 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div> 
    </div>
    
  )
}

export default Recipes