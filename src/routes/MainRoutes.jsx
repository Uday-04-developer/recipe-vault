import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Recipes from '../pages/Recipes'
import Create from '../pages/Create'
import SingleRecipes from '../pages/SingleRecipes'
import Update from '@/pages/Update'
import PageNotFound from '@/pages/PageNotFound'
import Favorites from '@/pages/Fav'




const MainRoutes = () => {
  return (
    <div >

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/recipes" element={<Recipes />} />
            {/* <Route path="/recipe/details/:id" element={<SingleRecipes />} />  */}
            <Route path="/recipes/details/:id" element={<SingleRecipes />} />
            <Route path="/favorites" element={<Favorites />} />
            
          
            <Route path="/create" element={<Create />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/create/recipe/" element={<Recipes />} />
             <Route path="/edit-recipe/:id" element={<Update />} />
        </Routes>
    </div>
  )
}

export default MainRoutes