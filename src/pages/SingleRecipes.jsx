import React, { useContext, useState } from "react";
import { recipecontext } from "../context/RecipeContext";
import { useNavigate, useParams } from "react-router-dom";
import FreeSplitText from "../components/FreeSplitText";
import ScrollFloat from "../components/AnimateOnScroll";
import TiltedCard from "../components/TiltedCard";
import SplashCursor from "../components/SplashCursor";
import ShinyText from "../components/ShinyText";
import AnimateOnLoad from "@/components/AnimateOnLoad";
import GlareHover from "@/components/GlareHover";
import { toast } from "react-toastify";
import LikeButton from "@/components/LikeButton";
import Magnet from "@/components/Magnet";

const SingleRecipes = () => {
  // 1. Destructure data AND setdata together
  const { data, setdata } = useContext(recipecontext);
  const param = useParams();
  const navigate = useNavigate();

  // 2. SAFETY CHECK: If data isn't loaded yet, stop here.
  // This prevents the "data.find is not a function" crash.
  if (!data || !Array.isArray(data)) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  // 3. Find Recipe (Now it is safe)
  const recipe = data.find((r) => r.id == param.id);

  // 4. Handle "Recipe Not Found" (e.g. wrong ID)
  if (!recipe) {
    return (
      <div className="text-white text-center mt-10">Recipe not found!</div>
    );
  }

  const handleUpdateClick = () => {
    navigate(`/edit-recipe/${recipe.id}`);
  };

  const handleDeleteClick = () => {
    const filter = data.filter((r) => r.id !== recipe.id);
    localStorage.setItem("recipes", JSON.stringify(filter));
    setdata(filter);
    toast.success("Recipe Deleted Successfully!");
    navigate("/recipes");
  };

  return (
    <div className="flex justify-center mt-5 pt-5 ">
      <div className="leftpart w-1/2 flex flex-col gap-3 justify-start items-center p-2 sticky top-24 h-fit">
        {/* ---Magnettic Card--- */}
        <Magnet padding={50} magnetStrength={30}>
          <div className="relative w-[30vw] h-[50vh] m-5 rounded-2xl overflow-hidden shadow-2xl group">
            {/* 1. The Image (Standard img tag, styling restored) */}
            <img
              className="w-full h-full object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
              src={recipe.image}
              alt={recipe.title}
            />

            {/* 2. The Like Button (Overlay) */}
            <div className="absolute top-4 right-4 z-50">
              {/* Pass the recipe prop! */}
              <LikeButton recipe={recipe} />
            </div>
          </div>
        </Magnet>

        <FreeSplitText
          tag="h2"
          text={recipe.title}
          className="italic text-5xl font-bold mb-2 text-white text-center p-3 tracking-tight leading-snug"
          delay={50}
          from={{ opacity: 0, y: 50 }}
        />
      </div>

      <div className="rightpart flex flex-col gap-6 w-1/2 p-10">
        <SplashCursor />

        {/* Description */}
        <div className="description">
          <h2 className="w-fit rounded-4xl border mb-3 border-white/20 bg-white/10 px-4 text-white backdrop-blur-lg">
            <ShinyText
              text="Description"
              speed={3}
              className="text-xl italic font-normal"
            />
          </h2>
          <ScrollFloat
            textClassName="text-white font-bold"
            scrollStart="top bottom"
            scrollEnd="bottom top"
            className="text-xm"
          >
            {recipe.description}
          </ScrollFloat>
        </div>

        {/* Ingredients */}
        <div className="ingredients">
          <h2 className="w-fit rounded-4xl border mb-4 border-white/20 bg-white/10 px-4 text-white backdrop-blur-lg">
            <ShinyText
              text="Ingredients"
              speed={3}
              className="text-xl italic font-normal"
            />
          </h2>
          <div className="opacity-90 backdrop-blur-md rounded-2xl p-4 border border-white/20">
            <AnimateOnLoad
              delay={0.5}
              from={{ opacity: 0, y: 30 }}
              duration={0.8}
              ease="power3.out"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="p-2 text-white/90 font-semibold">
                        Ingredient
                      </th>
                      <th className="p-2 text-white/90 font-semibold">
                        Quantity
                      </th>
                      <th className="p-2 text-white/90 font-semibold">Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipe.ingredients.map((ing, index) => (
                      <tr key={index} className="border-b border-white/10">
                        <td className="p-2 text-white">{ing.name}</td>
                        <td className="p-2 text-white">{ing.quantity}</td>
                        <td className="p-2 text-white">{ing.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AnimateOnLoad>
          </div>
        </div>

        {/* Instructions */}
        <div className="instruction">
          <h2 className="w-fit rounded-4xl border mb-4 border-white/20 bg-white/10 px-4 text-white backdrop-blur-lg">
            <ShinyText
              text="Instructions"
              speed={3}
              className="text-xl italic font-normal"
            />
          </h2>
          <AnimateOnLoad
            delay={0.8}
            from={{ opacity: 0, y: 20 }}
            duration={0.6}
          >
            <div className="backdrop-blur-md rounded-2xl">
              <FreeSplitText
                tag="p"
                text={recipe.instruction}
                splitBy="words"
                className="text-lg text-white/90 leading-relaxed"
                delay={30}
                from={{ opacity: 0, y: 20 }}
              />
            </div>
          </AnimateOnLoad>
        </div>

        {/* Chef */}
        <div className="recipecrafter">
          <h2 className="w-fit rounded-4xl border mb-4 border-white/20 bg-white/10 px-4 text-white backdrop-blur-lg">
            <ShinyText
              text="Recipe Crafter"
              speed={3}
              className="text-xl italic font-normal"
            />
          </h2>
          <FreeSplitText
            tag="p"
            text={`Chef. ${recipe.chef} .`}
            splitBy="words"
            className="font-['Dancing_Script'] text-3xl text-white bg-clip-text font-bold mb-4"
            delay={200}
            from={{ opacity: 1, y: 20 }}
          />
        </div>

        {/* Buttons */}
        <div className="buttons flex gap-4 mt-6">
          <GlareHover
            width="150px"
            height="50px"
            background="#059669"
            glareColor="#ffffff"
            borderRadius="8px"
            onClick={handleUpdateClick}
          >
            <span className="text-white font-semibold">Update Recipe</span>
          </GlareHover>

          <GlareHover
            width="150px"
            height="50px"
            background="#ff4e57db"
            glareColor="#ffffff"
            borderRadius="8px"
            onClick={handleDeleteClick}
          >
            <span className="text-white font-semibold">Delete Recipe</span>
          </GlareHover>
        </div>
      </div>
    </div>
  );
};

export default SingleRecipes;
