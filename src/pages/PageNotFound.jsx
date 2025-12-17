import React from "react";
import { Link } from "react-router-dom";
import ShinyText from "@/components/ShinyText";
import Magnet from "@/components/Magnet";
import StarBorder from "@/components/StarBorder";
import TiltedCard from "@/components/TiltedCard";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import FreeSplitText from "@/components/FreeSplitText";



// A thematic "messy" image for the 404 state
const ERROR_IMAGE = "https://images.unsplash.com/photo-1516746924756-eef3960775b7?q=80&w=800&auto=format&fit=crop";

const PageNotFound = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden text-white p-6">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="z-10 flex flex-col items-center text-center gap-10 max-w-4xl">
        
        {/* 1. The Interactive 404 Card */}
        <div className="relative">
          <TiltedCard
            imageSrc={ERROR_IMAGE}
            altText="404 Mess"
            containerHeight="320px"
            containerWidth="320px"
            imageHeight="320px"
            imageWidth="320px"
            rotateAmplitude={15}
            scaleOnHover={1.05}
            displayOverlayContent={true}
            overlayContent={
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-[160px] font-black text-white/20 select-none mix-blend-overlay tracking-tighter">
                  404
                </h1>
              </div>
            }
            className="rounded-full overflow-hidden border border-white/10 shadow-2xl shadow-purple-900/20"
          />
        </div>

        {/* 2. The Animated Text */}
        <div className="space-y-4">
          <ShinyText 
            text="Oops! The Recipe Got Burnt." 
            speed={7} 
            className="text-4xl md:text-6xl font-bold tracking-tight" 
          />
          
          <div className="text-zinc-400 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
             <FreeSplitText
              tag="p"
              text="We looked in the fridge, the oven, and even under the table. But this page seems to be missing from our cookbook."
              splitBy="words"
              delay={30}
              from={{ opacity: 0, y: 20 }}
            />
          </div>
        </div>

        {/* 3. The Magnetic Button */}
       
        <Magnet padding={50} magnetStrength={30} className=" hover:cursor-pointer hover:scale-101 shadow-2xl  rounded-2xl">
         <StarBorder 
            as={Link} 
            to="/" 
            color="#3275F8" // Matching your purple theme
            speed="4s"
            className="group bg-transparent"
          >
         <HoverBorderGradient
                containerClassName="rou"
                as="button"
                className=" text-white bg-linear-to-b  from-gray-950 to-gray-900 flex items-center space-x-2 group:"
              >
                <span className="flex items-center gap-3 text-lg font-medium text-gray-500 hover:text-white transition-all hover:cursor-pointer ">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2} 
                stroke="currentColor" 
                className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
             
          Back to Kitchen

              
              
            </span>
              </HoverBorderGradient> 
              </StarBorder>
              </Magnet>
             

      </div>
    </div>
  );
};

export default PageNotFound;