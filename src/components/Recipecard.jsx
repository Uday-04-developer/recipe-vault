import React from "react";
import { Link } from "react-router-dom";
import ShinyText from "./ShinyText";
import Magnet from "./Magnet";

import BlurCard from "./BlurCard";

const Recipecard = (props) => {
  const { id, image, title, chef, description } = props.recipe;
  return (
    //  <Magnet
    //   padding={80}
    //   magnetStrength={25}
    //   wrapperClassName="inline-block"
    // >
    <BlurCard
      delay={100}
      direction="bottom"
      className="inline-block ml-8 "
      onAnimationComplete={() => console.log("Card animation completed!")}
    >
      <Magnet padding={50} disabled={false} magnetStrength={20}>
        <div className="card w-[30vw]">
          
          <Link
            to={`details/${id}`}
            className=" w-[30vw] p-6 m-3 overflow-hidden rounded-2xl 
            cursor-pointer 
            shadow-xl shadow-white/30 
            transition-all duration-300 ease-out 
            hover:scale-103 
            hover:shadow-2xl hover:shadow-purple-500/40
            flex flex-col h-[500px] bg-white/8 backdrop-blur-md" // Added fixed height and flex
          >
            {/* Image with fixed height */}
            <div className="shrink-0 mb-4">
              <img
                className="w-full h-[180px] object-cover object-bottom rounded-2xl" // Fixed image height
                src={image}
                alt=""
              />
            </div>

            {/* Content container */}
            <div className="flex flex-col grow">
              {/* Title with fixed height */}
              <h1 className="text-xl font-bold mb-3 text-white text-center line-clamp-2 min-h-12">
                {title}
              </h1>

              {/* Description with scroll */}
              <div className="grow mb-3 overflow-y-auto">
                <div className="Description-inshort text-sm text-zinc-300 leading-relaxed">
                  <ShinyText
                    text={
                      description.slice(0, 120) +
                      (description.length > 120 ? "..." : "")
                    }
                    disabled={false}
                    speed={3}
                    className="text-sm italic font-normal"
                  />
                  <small className="text-blue-600 hover:text-blue-400 opacity-100 font-medium cursor-alias ml-1">
                    more
                  </small>
                </div>
              </div>

              {/* Chef section at bottom */}
              <div className="shrink-0 mt-auto">
                <h4 className="text-sm font-semibold text-right text-white italic">
                  {chef}
                </h4>
                <h4 className="text-sm font-semibold text-right text-red-400 italic">
                  — Chef
                </h4>
              </div>
            </div>
          </Link>
          {/* this is main card */}
          {/* <Link
            to={`details/${id}`}
            className=" w-[30vw] p-10 m-3 overflow-hidden rounded-2xl 
           cursor-pointer 
           shadow-xl shadow-white/30 
           transition-all duration-300 ease-out 
           hover:scale-103 
           hover:shadow-2xl hover:shadow-purple-500/40 flex flex-col h-[500px]"
          >
            <img
              className=" w-full h-[35vh] object-cover object-bottom   overflow-hidden rounded-2xl"
              src={image}
              alt=""
            />
            <h1
              className="text-2xl font-bold mb-2 text-white text-center p-3 tracking-tight leading-snug
      "
            >
              {title}
            </h1>

            <div className="Description-inshort flex flex-wrap items-baseline  text-sm text-zinc-500 mb-2 leading-relaxed">
              <ShinyText
                text={description.slice(0, 100)}
                disabled={false}
                speed={3}
                className="text-sm italic font-normal"
              />

              <small className="text-blue-600 hover:text-blue-400 opacity-100 font-medium cursor-alias ml-1">
                more
              </small>
            </div>

            <h4 className="text-sm font-semibold text-right text-white mt-4 italic">
              {chef}
            </h4>
            <h4 className="text-sm font-semibold text-right text-red-400  italic">
              — Chef
            </h4>
          </Link> */}
        </div>
      </Magnet>
    </BlurCard>
  );
};

export default Recipecard;
