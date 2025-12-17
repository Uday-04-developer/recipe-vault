import { useRef, useEffect, useContext } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { recipecontext } from "../context/RecipeContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import ShinyText from "@/components/ShinyText";
import ScrollFloat from "@/components/AnimateOnScroll";
import StarBorder from "@/components/StarBorder";
import Magnet from "@/components/Magnet";
import BlurCard from "@/components/BlurCard";
import ImageTrail from "@/components/ImageTrail";
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

const Update = () => {
  const navigate = useNavigate();
  const { data, setdata } = useContext(recipecontext);
  const { id } = useParams();

  // Find the specific recipe to update
  const recipeToUpdate = data.find((recipe) => recipe.id === id);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    control,
    reset,watch,
    formState: { errors },
  } = useForm({
    defaultValues: recipeToUpdate || {
      title: "",
      image: "",
      description: "",
      instruction: "",
      category: "",
      chef: "",
      ingredients: [{ name: "", quantity: "", unit: "" }],
    },
  });

  // Use useEffect to reset the form data if the context data loads later
  useEffect(() => {
    if (recipeToUpdate) {
      reset(recipeToUpdate);
    }
  }, [recipeToUpdate, reset]);

  const SubmitHandler = (updatedRecipeData) => {
    // Keep the original ID
    updatedRecipeData.id = id;

    // Update the main data array in the context
    // setdata((prevData) =>
    //   prevData.map((recipe) => (recipe.id === id ? updatedRecipeData : recipe))
    // );
    const updatedArray = data.map((recipe) => 
    recipe.id === id ? updatedRecipeData : recipe
  );
    setdata(updatedArray);
    // localStorage.setItem("recipes", JSON.stringify(updatedRecipeData));
      localStorage.setItem("recipes", JSON.stringify(updatedArray));

    toast.success("Recipe Updated Successfully!");
    navigate(`/recipes/details/${id}`);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  // If the recipe isn't found, show a loading or error state
  if (!recipeToUpdate) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <ShinyText
          text="Loading recipe or recipe not found..."
          speed={1}
          className="text-2xl text-white"
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-linear-to-br from-purple-900/20 via-black to-pink-900/20">
      <div className="fixed inset-0 z-0 bg-linear-to-br from-purple-900/20 via-black to-pink-900/20">
        <ImageTrail items={IMAGES} variant={5} />
      </div>
      <div className="w-full max-w-4xl  p-6">
        {/* Header Section */}
        <ScrollFloat
          textClassName="text-white font-bold"
          scrollStart="top bottom"
          scrollEnd="bottom top"
          className="text-center mb-8"
        >
          <motion.div
            className="text-center mb-8 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ShinyText
              text="Update Recipe"
              disabled={false}
              speed={3}
              // Using darker shades for better contrast on a dark background
              className="text-3xl md:text-5xl text- font-bold bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text block mb-2"
            />

            <motion.p
              className="text-gray-400 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Updating:{" "}
              <span className="text-white font-semibold">
                {recipeToUpdate.title}
              </span>
            </motion.p>
          </motion.div>
        </ScrollFloat>

        {/* Enhanced Form */}
        <form onSubmit={handleSubmit(SubmitHandler)}>
          <BlurCard
            delay={200}
            direction="bottom"
            className="  w-full  text-center mb-8 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
          >
            <div className="space-y-6  ">
              {/* Title Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <ShinyText
                    text="Recipe Title"
                    speed={3}
                    className="text-2xl"
                  />
                </label>
                <input
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  placeholder="Enter title of Recipe"
                  className="  ease-out 
           hover:scale-103 
           hover:shadow-2xl hover:shadow-purple-500/40 w-full p-4 bg-black/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:border-purple-500/75 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm"
                />
                {errors.title && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors.title.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Image URL */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <ShinyText text="Image URL" speed={3} className="text-2xl" />
                </label>
                <input
                  type="url"
                  {...register("image", { required: "Image URL is required" })}
                  placeholder="Enter image URL of Recipe"
                  className=" hover:scale-103 
           hover:shadow-2xl hover:shadow-purple-500/40 w-full p-4 bg-black/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm"
                />
              </motion.div>
                {/* Image Preview - only render if image URL exists */}
                          {watch("image") && (
                            <motion.div className="mt-4 rounded-xl overflow-hidden p-4  h-48">
                              <img
                                src={watch("image")}
                                alt="Recipe preview"
                                className="w-full h-full object-cover rounded-3xl object-center-bottom"
                                onError={(e) =>
                                  (e.target.src =
                                    "https://via.placeholder.com/400x300?text=Invalid+URL")
                                }
                              />
                            </motion.div>
                          )}
              

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <ShinyText
                    text="Description"
                    speed={3}
                    className="text-2xl"
                  />
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  placeholder="Describe your amazing recipe..."
                  rows="3"
                  className=" hover:scale-103 
           hover:shadow-2xl hover:shadow-purple-500/40 w-full p-4 bg-black/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm resize-none"
                />
              </motion.div>

              {/* Ingredients Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-black/30 hover:scale-103 
           hover:shadow-2xl hover:shadow-purple-500/40 p-6 rounded-2xl border border-purple-500/20"
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <ShinyText
                    text="Ingredients"
                    speed={3}
                    className="text-2xl font-bold"
                  />
                </label>
                <div className="flex items-center justify-between  mb-4">
                  <span className="text-sm text-gray-400">
                    {fields.length} items
                  </span>
                </div>

                <AnimatePresence>
                  {fields.map((field, index) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3 mb-3 p-3 bg-black/40 rounded-lg hover:bg-black/60 transition-colors"
                    >
                      <input
                        {...register(`ingredients.${index}.quantity`, {
                          required: "Quantity is required",
                        })}
                        placeholder="Qty"
                        type="number"
                        className="w-20 p-2 bg-black/50 border border-gray-600 rounded-lg text-white text-center focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30"
                      />
                      <input
                        {...register(`ingredients.${index}.unit`)}
                        placeholder="Unit"
                        className="w-24 p-2 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30"
                      />
                      <input
                        {...register(`ingredients.${index}.name`)}
                        placeholder="Ingredient Name"
                        className="flex-1 p-2 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30"
                      />
                      <Magnet padding={20} magnetStrength={30}>
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </Magnet>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <Magnet padding={30} magnetStrength={20}>
                  <button
                    type="button"
                    onClick={() => append({ name: "", quantity: "", unit: "" })}
                    className="w-full p-2 py-3  bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add Ingredient
                  </button>
                </Magnet>
              </motion.div>

              {/* Instructions */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <ShinyText
                    text="Instructions"
                    speed={3}
                    className="text-2xl"
                  />
                </label>
                <textarea
                  {...register("instruction", {
                    required: "Instructions are required",
                  })}
                  placeholder="Step-by-step instructions..."
                  rows="4"
                  className="hover:scale-103 
           hover:shadow-2xl hover:shadow-purple-500/40 w-full p-4 bg-black/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm resize-none"
                />
              </motion.div>

              {/* Category Select */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <ShinyText text="Category" speed={3} className="text-2xl" />
                </label>
                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="hover:scale-103 
           hover:shadow-2xl hover:shadow-purple-500/40 w-full p-4 bg-black/50 border border-purple-500/30 rounded-xl text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm appearance-none"
                >
                  <option value="" disabled className="bg-gray-800">
                    Select a Category
                  </option>
                  <optgroup label="By Meal Type" className="bg-gray-800">
                    <option value="appetizer" className="bg-gray-800">
                      Appetizer & Snack
                    </option>
                    <option value="breakfast" className="bg-gray-800">
                      Breakfast
                    </option>
                    <option value="lunch" className="bg-gray-800">
                      Lunch
                    </option>
                    <option value="dinner" className="bg-gray-800">
                      Dinner
                    </option>
                    <option value="dessert" className="bg-gray-800">
                      Dessert 🍰
                    </option>
                    <option value="main-course" className="bg-gray-800">
                      Main Course
                    </option>
                    <option value="side-dish" className="bg-gray-800">
                      Side Dish
                    </option>
                  </optgroup>
                  <optgroup label="By Diet" className="bg-gray-800">
                    <option value="vegetarian" className="bg-gray-800">
                      Vegetarian
                    </option>
                    <option value="vegan" className="bg-gray-800">
                      Vegan 🌱
                    </option>
                    <option value="gluten-free" className="bg-gray-800">
                      Gluten-Free
                    </option>
                    <option value="keto" className="bg-gray-800">
                      Keto
                    </option>
                    <option value="healthy" className="bg-gray-800">
                      Healthy
                    </option>
                  </optgroup>
                </select>
              </motion.div>

              {/* Chef Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <ShinyText
                    text="Chef's Name"
                    speed={3}
                    className="text-2xl"
                  />
                </label>
                <input
                  type="text"
                  {...register("chef", { required: "Chef name is required" })}
                  placeholder="Enter name of Recipe Crafter..."
                  className="hover:scale-103 
           hover:shadow-2xl hover:shadow-purple-500/40 w-full p-4 bg-black/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="pt-6"
              >
                <Magnet padding={50} magnetStrength={15}>
                  <button 
                    // as="button"
                    type="submit"
                    // color="green"
                    // speed="3s"
                    
                    className="
           hover:shadow-2xl p-2 focus:bg-blue-500 cursor-pointer hover:shadow-green-500/40 w-full py-4 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <ShinyText
                      text="Update Recipe"
                      speed={2}
                      className="text-2xl text-white animate-pulse font-normal tracking-tighter"
                    />
                  </button>
                </Magnet>
              </motion.div>
            </div>
          </BlurCard>
        </form>
      </div>
    </div>
  );
};

export default Update;
