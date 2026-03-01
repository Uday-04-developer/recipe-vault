import React, { createContext, useEffect, useState } from "react";

export const recipecontext = createContext(null);

// The beautiful sample data for your Vercel deployment
const sampleRecipes = [
  {
    id: "sample-1",
    title: "Midnight Truffle Pasta",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=1000",
    description: "A rich, velvety pasta dish crafted for late-night cravings. Infused with black truffle oil and topped with fresh parmesan.",
    category: "Dinner",
    chef: "Uday",
    ingredients: [
      { name: "Fettuccine", quantity: "200", unit: "g" },
      { name: "Heavy Cream", quantity: "1", unit: "cup" },
      { name: "Truffle Oil", quantity: "2", unit: "tbsp" },
      { name: "Parmesan Cheese", quantity: "50", unit: "g" }
    ],
    instruction: "Boil pasta in salted water until al dente. In a separate pan, gently heat the heavy cream and stir in the parmesan until smooth. Toss the pasta into the sauce, drizzle generously with truffle oil, and garnish with black pepper. Serve immediately."
  },
  {
    id: "sample-2",
    title: "Neon Berry Smoothie Bowl",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=1000",
    description: "An aesthetically pleasing, vibrant smoothie bowl packed with antioxidants, dragon fruit, and mixed wild berries.",
    category: "Breakfast",
    chef: "Aria",
    ingredients: [
      { name: "Frozen Dragon Fruit", quantity: "1", unit: "cup" },
      { name: "Mixed Berries", quantity: "1", unit: "cup" },
      { name: "Almond Milk", quantity: "0.5", unit: "cup" },
      { name: "Chia Seeds", quantity: "1", unit: "tbsp" }
    ],
    instruction: "Blend the frozen dragon fruit, mixed berries, and almond milk until completely smooth and thick. Pour into a chilled bowl. Arrange chia seeds, fresh fruit, and coconut flakes in a geometric pattern on top."
  }
];

const RecipeContext = (props) => {
  // 1. Load instantly before first render (Fixes the flicker bug)
  const [data, setdata] = useState(() => {
    try {
      const savedData = localStorage.getItem("recipes");
      const parsedData = savedData ? JSON.parse(savedData) : [];
      
      // 2. Inject samples if they have no data (Great for Vercel visitors)
      if (Array.isArray(parsedData) && parsedData.length > 0) {
        return parsedData;
      } else {
        localStorage.setItem("recipes", JSON.stringify(sampleRecipes));
        return sampleRecipes;
      }
    } catch (error) {
      console.error("Failed to load recipes:", error);
      return sampleRecipes; 
    }
  });

  // 3. Auto-save any changes you make to the data state
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(data));
  }, [data]);

  return (
    <recipecontext.Provider value={{ data, setdata }}>
      {props.children}
    </recipecontext.Provider>
  );
};

export default RecipeContext;
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