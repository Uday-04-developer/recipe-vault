import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Group } from 'lucide-react';
import { toast } from 'react-toastify';

const LikeButton = ({ recipe }) => {
  // 1. Initialize state from localStorage
  const [liked, setLiked] = useState(() => {
    if (!recipe) return false; // Safety check if no recipe provided
    
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) {
      const favorites = JSON.parse(storedFavs);
      // Check if current recipe is already in favorites
      return favorites.some(fav => fav.id === recipe.id);
    }
    return false;
  });

  // 2. Toggle like function with localStorage management
  const toggleLike = () => {
    if (!recipe) return; // Safety check
    
    // Get current favorites from localStorage
    const storedFavs = localStorage.getItem("favorites");
    let favorites = storedFavs ? JSON.parse(storedFavs) : [];
    
    
    if (liked) {
      // Remove from favorites
      favorites = favorites.filter(fav => fav.id !== recipe.id);
      toast.info("Removed from Favorites");
      
      // Remove from localStorage
    } else {
      // Add to favorites (avoid duplicates)
      if (!favorites.some(fav => fav.id === recipe.id)) {
        favorites.push(recipe);
        toast.success("Added to Favorites!");   //  
      }
    }
    
    // Save to localStorage and update state
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setLiked(!liked);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.8 }} // Click animation
      onClick={toggleLike}
      className="group cursor-pointer relative flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:bg-white/20 transition-all duration-300"
      title={liked ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={`w-6 h-6 transition-all duration-300 ${
          liked 
            ? "fill-red-500 stroke-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" // Active State (Glowing Red)
            : "fill-transparent hover:fill-white stroke-white stroke-[2px]" // Inactive State (White Outline)
        }`}
      >
        <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path>
      </svg>
      
      {/* Optional: Pulse animation when liked */}
      {liked && (
        <motion.div
          className="absolute inset-0 rounded-full bg-red-500/20"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.button>
  );
};

export default LikeButton;
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Group } from 'lucide-react';

// const LikeButton = () => {
//   const [liked, setLiked] = useState(false);

//   return (
//     <motion.button
//       whileTap={{ scale: 0.8 }} // Click animation
//       onClick={() => setLiked(!liked)}
//       className="group cursor-pointer  relative flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:bg-white/20 transition-all duration-300"
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 24 24"
//         className={`w-6 h-6 transition-all duration-300 ${
//           liked 
//             ? "fill-red-500 stroke-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)] " // Active State (Glowing Red)
//             : "fill-transparent hover:fill-white stroke-white stroke-[2px]" // Inactive State (White Outline)
//         }`}
//       >
//         <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path>
//       </svg>
//     </motion.button>
//   );
// };

// export default LikeButton;

