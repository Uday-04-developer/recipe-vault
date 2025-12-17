import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";






// Using your generic wrapper
import SplashCursor from "@/components/SplashCursor";
import ShinyText from "@/components/ShinyText";
import TiltedCard from "@/components/TiltedCard";
import FreeSplitText from "@/components/FreeSplitText";
import Magnet from "@/components/Magnet";
import StarBorder from "@/components/StarBorder";
import AnimateOnLoad from "@/components/AnimateOnLoad";

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden selection:bg-purple-500/30">
      <SplashCursor />

      {/* Background Ambient Glows */}
      <div className="fixed top-20 left-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-pink-900/10 rounded-full blur-[128px] pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <Magnet padding={50} magnetStrength={5}>
          <div className="inline-block px-4 py-1.5 mb-6 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm text-sm text-zinc-400 font-medium tracking-wide uppercase">
            Established 2025
          </div>
        </Magnet>

        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6">
          <ShinyText
            text="The Recipe Vault"
            speed={4}
            className="text-white"
          />
        </h1>

        <div className="max-w-2xl mx-auto">
          <FreeSplitText
            tag="p"
            text="Where flavors find their forever home. A digital sanctuary for the art of cooking."
            splitBy="words"
            className="text-lg md:text-2xl text-zinc-400 font-light leading-relaxed"
            delay={30}
            from={{ opacity: 0, y: 20 }}
          />
        </div>
      </div>

      {/* --- MISSION SECTION --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* Left: Interactive Visual */}
          <div className="w-full md:w-1/2 flex justify-center">
            <TiltedCard
              imageSrc="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1000&auto=format&fit=crop"
              altText="Cooking Art"
              captionText="The Art of Creation"
              containerHeight="450px"
              containerWidth="400px"
              imageHeight="450px"
              imageWidth="400px"
              rotateAmplitude={10}
              scaleOnHover={1.05}
              displayOverlayContent={true}
              overlayContent={
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-3xl font-bold text-white drop-shadow-lg">
                    Craft.
                  </h3>
                  <h3 className="text-3xl font-bold text-white/70 drop-shadow-lg">
                    Collect.
                  </h3>
                </div>
              }
              className="rounded-2xl shadow-2xl shadow-purple-900/20"
            />
          </div>

          {/* Right: The Story */}
          <div className="w-full md:w-1/2 space-y-8">
            <AnimateOnLoad delay={0.2} from={{ opacity: 0, x: 50 }}>
              <h2 className="text-4xl font-bold text-white mb-4">
                Preserving <span className="text-purple-500">Culinary Legacy</span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                Food is more than just sustenance; it's memory, culture, and love. 
                But too often, great recipes are lost in scattered notes or forgotten bookmarks.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                <strong>Recipe Vault</strong> was built to solve this. It's a premium, distraction-free space 
                designed to honor your culinary creations. With a focus on aesthetics and 
                fluid user experience, we ensure that browsing your cookbook feels as good as 
                tasting the food itself.
              </p>
            </AnimateOnLoad>
          </div>
        </div>
      </div>

      {/* --- TECH STACK SECTION (Showcasing your skills) --- */}
      <div className="relative z-10 py-32 text-center bg-white/5 backdrop-blur-sm border-y border-white/10">
        <h2 className="text-3xl font-bold mb-12">
          Powered by <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">Modern Engineering</span>
        </h2>
        
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto px-4">
          {["React.js", "Tailwind v4", "Framer Motion", "GSAP", "WebGL", "Context API"].map((tech, i) => (
            <Magnet key={i} padding={20} magnetStrength={5}>
              <div className="px-8 py-3 rounded-full border border-white/10 bg-black/40 text-zinc-300 font-medium hover:bg-white/10 hover:border-white/30 hover:text-white transition-all cursor-default">
                {tech}
              </div>
            </Magnet>
          ))}
        </div>
      </div>

      {/* --- FOOTER CTA --- */}
      <div className="relative z-10 py-40 flex flex-col items-center text-center">
        <h2 className="text-4xl font-bold text-white mb-8">
          Ready to start cooking?
        </h2>
        
        <Magnet padding={50} magnetStrength={30}>
          <StarBorder 
            as={Link} 
            to="/recipes" 
            color="rgb(168 85 247)" // Purple
            speed="3s"
            className="group"
          >
            <span className="flex items-center gap-3 text-lg font-bold px-8 py-2">
              Open My Cookbook
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2} 
                stroke="currentColor" 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </StarBorder>
        </Magnet>
      </div>

    </div>
  );
};

export default About;