import React from "react";
import { ArrowRight } from "lucide-react";
import { div } from "framer-motion/client";

const Hero = () => {
  return (
    <div>
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/heroVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0  bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-4 z-10">
        <h1 className="text-4xl md:text-6xl font-extralight font-serif drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
          Stylish Furniture for Your Home
        </h1>

        <p className="text-lg md:text-xl mb-4">
          Explore our premium collection now.
        </p>
        <button className="btn group bg-[#776b4e] font-sans border-none font-semibold rounded-full text-white flex items-center justify-center gap-0 overflow-hidden px-6 py-2">
          <span className="transition-all duration-300 group-hover:mr-2">
            SHOP NOW
          </span>
          <span className="overflow-hidden w-0 group-hover:w-5 transition-all duration-300">
            <ArrowRight />
          </span>
        </button>
      </div>
    </div>
    <div className="bg-blue-400/10 h-full w-full"></div>
    </div>
  );
};

export default Hero;
