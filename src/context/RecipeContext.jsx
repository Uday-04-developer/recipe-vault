import React, { createContext, useEffect, useState } from 'react'
export const recipecontext=createContext(null);

const RecipeContect = (props) => {
    const [data, setdata]=useState([]);
    // useEffect(() => {
    //   setdata(JSON.parse(localStorage.getItem("recipes")) || [] );},[]);
          useEffect(() => {
      try {
        const recipes = JSON.parse(localStorage.getItem("recipes"));
        setdata(Array.isArray(recipes) ? recipes : []);
      } catch (error) {
        console.error("Error parsing recipes:", error);
        setdata([]);
      }
    }, []);
  

    // console.log(data);
  return (
    <recipecontext.Provider value={{data, setdata}}>
        {props.children}
        
    </recipecontext.Provider>
  )
}

export default RecipeContect
// {
//   "id": "Z0dqgGjF6Basdfdasd9l5zXbta0l9",
//   "title": "Healthy Turmeric Smoothie",
//   "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
//   "description": "A refreshing smoothie packed with the goodness of turmeric and fruits.",
//   "category": "Healthy",
//   "chef": "Alex Jhion",
//   "ingredients": [
//     {
//       "name": "Haldi (Turmeric)",
//       "quantity": "5",
//       "unit": "teaspoon"
//     },
//     {
//       "name": "sugar",
//       "quantity": "100",
//       "unit": "gram"
//     }
//   ],
//   "instruction": "Blend all ingredients until smooth and enjoy!"
// },{
//   "id": "Z0dqgGjF6B9l5zXbta0l9",
//   "title": "Healthy Turmeric Smoothie",
//   "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987",
//   "description": "A refreshing smoothie packed with the goodness of turmeric and fruits.",
//   "category": "Healthy",
//   "chef": "Ram Chandra",
//   "ingredients": [
//     {
//       "name": "Haldi (Turmeric)",
//       "quantity": "5",
//       "unit": "teaspoon"
//     },
//     {
//       "name": "sugar",
//       "quantity": "100",
//       "unit": "gram"
//     }
//   ],
//   "instruction": "Blend all ingredients until smooth and enjoy!"
// }