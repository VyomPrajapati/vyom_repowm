"use client";
import { motion } from "motion/react";
import { Highlight } from "../ui/hero-highlight";

export function HeroHighlightDemo() {
  return (
    // <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
           ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-[1.5rem] px-4 md:text-3xl lg:text-4xl font-bold md:font-extrabold text-neutral-700 text-white max-w-6xl leading-relaxed lg:leading-snug text-center md:mt-24 lg:pt-12  "
        
      >
        From your vision to Stunning Creations    {" "} <br/> 
        <Highlight className="text-black dark:text-white"> 
        Crafted by Wildmind Ai
        </Highlight>
      </motion.h1>
    //  </HeroHighlight>
  );
}
