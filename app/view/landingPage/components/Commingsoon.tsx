"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { getImageUrl } from "@/routes/imageroute";
import { initParticlesEngine } from "@tsparticles/react";


const HoverEffectText = ({
  text1,
  text2,
  imageSrc,
  isVisible,
  index
}: {
  text1: string;
  text2: string;
  imageSrc: string;
  isVisible: boolean;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [glowComplete, setGlowComplete] = useState(false);

  const imageWidth = 384;
  const hoverGap = imageWidth / 2 - 200;

  const desktopFirstPartVariants = {
    initial: { x: 0 },
    hover: { x: -hoverGap },
    idle: { x: 0 }
  };

  const desktopSecondPartVariants = {
    initial: { x: 0 },
    hover: { x: hoverGap },
    idle: { x: 0 }
  };

  const getMobileTextVariants = (glow: boolean) => ({
    hidden: {
      x: -200,
      opacity: 0,
      filter: "blur(1px)",
      textShadow: "0 0 0px rgba(0, 255, 255, 0)"
    },
    visible: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      textShadow: glow
        ? `
        0 0 6px rgba(0, 255, 255, 0.1),
        0 0 12px rgba(0, 255, 255, 0.2),
        0 0 20px rgba(0, 200, 255, 0.3),
        0 0 30px rgba(0, 180, 255, 0.4)
      `
        : "none"
    }
  });

  const imageContainerVariants = {
    closed: { width: 0 },
    open: { width: imageWidth - 80 }
  };

  const staggerDelay = 0.3 * index;

  useEffect(() => {
    if (isVisible) {
      setGlowComplete(false);
    }
  }, [isVisible]);

  return (
    <div
      className="flex items-center cursor-pointer mb:-mt-20 relative space-x-[10px] mb:space-x-[6px] mb:justify-center mb:items-center mb:scale-[0.9] mb:origin-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* First Text - Desktop */}
      <motion.span
        className="hidden md:block"
        initial="initial"
        animate={isHovered ? "hover" : "idle"}
        variants={desktopFirstPartVariants}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {text1}
      </motion.span>

      {/* First Text - Mobile */}
      <motion.span
        className="block md:hidden"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={getMobileTextVariants(!glowComplete)}
        onAnimationComplete={() => setGlowComplete(true)}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: staggerDelay
        }}
        key={`first-${isVisible ? "visible" : "hidden"}-${index}`}
      >
        {text1}
      </motion.span>

      {/* Image on Hover - Desktop */}
      <motion.div
        className=" items-center justify-center overflow-hidden md:block hidden"
        initial="closed"
        animate={isHovered ? "open" : "closed"}
        variants={imageContainerVariants}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <AnimatePresence>
          {isHovered && (
            <motion.img
              src={imageSrc}
              alt="Preview"
              className="w-96 h-28 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Second Text - Desktop */}
      <motion.span
        className="hidden md:block"
        initial="initial"
        animate={isHovered ? "hover" : "idle"}
        variants={desktopSecondPartVariants}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {text2}
      </motion.span>

      {/* Second Text - Mobile */}
      <motion.span
        className="block md:hidden mb:text-[40px]"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={getMobileTextVariants(!glowComplete)}
        onAnimationComplete={() => setGlowComplete(true)}
        transition={{
          duration: 1,
          ease: "easeOut",
          delay: staggerDelay + 0.2
        }}
        key={`second-${isVisible ? "visible" : "hidden"}-${index}`}
      >
        {text2}
      </motion.span>
    </div>
  );
};

const ComingSoon = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  const textItems = [
    { text1: "Real", text2: "Gen", imageSrc: getImageUrl("landingpage", "realtimegen") },
    { text1: "Text to", text2: "Video", imageSrc: getImageUrl("landingpage", "realtimegen") },
    { text1: "3D", text2: "Creations", imageSrc: getImageUrl("landingpage", "realtimegen") },
    { text1: "Sketch to", text2: "Image", imageSrc: getImageUrl("landingpage", "sketchtoimage") }
  ];

  useEffect(() => {
    // Correct way to load the particles engine
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  
    // Setup the intersection observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: "100px 0px"
      }
    );
  
    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);
  
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);
  

  return (
    <div
      ref={sectionRef}
      className="relative  h-screen flex flex-col items-center justify-center text-white font-semibold bg-gradient-to-br from-[#050505] via-[#0f0f25] to-[#121212] overflow-hidden"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />

      {/* Particles */}
      {/* <Particles
        id="tsparticles"
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          particles: {
            color: { value: "#ffffff" },
            number: { value: 50 },
            size: { value: 2 },
            move: { enable: true, speed: 0.3 },
            opacity: { value: 0.2 }
          }
        }}
        className="absolute inset-0 z-0"
      /> */}

      {/* Content */}
      <div className="z-10 flex flex-col items-center justify-center space-y-20 text-center text-6xl text-[100px] mb:text-[35px]">
        {textItems.map((item, index) => (
          <HoverEffectText
            key={`text-${index}`}
            text1={item.text1}
            text2={item.text2}
            imageSrc={item.imageSrc}
            isVisible={isInView}
            index={index}
          />
        ))}
      </div>

      {/* Gradient Fades */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-transparent to-transparent z-20" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-transparent to-transparent z-20" />
    </div>
  );
};

export default ComingSoon;
