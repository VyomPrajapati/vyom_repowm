"use client";
import React from "react";
import { motion } from "framer-motion";
import { getImageUrl } from "@/routes/imageroute";

const SlideImage = () => {
  // Define your text rows: each sub-array is a row, each string is a word
  const textRows = [
    ["Shrek renaissance", "स्वप्न लूप होटल", "ચુંબકીય દિશાદર્શક ચાંદની હેઠળ ફરે ", "Glitchface", "Le piano joue doucement tout seul", "Jollitown","Beepzone","Gloombot","बबलगम बादल कुकीज़ की बारिश करते हैं","Zoom call with ghosts","Blender dreaming of freedom", "Potion shop in cloud","जेली से बना फ़ायरवॉल", "Black cat reads tarot ", " Chrome roses on rooftop", "Hacker dreams in neon"],
    ["Upside-down circus in swamp", "Sandcastle hiding lost city", "Books rearrange at night", "Grandma's house feels alive", "Rocking chair keeps rocking", "Unicorn floats above hospital","રસ્તાની લાઈટ ધૂંધળી થાય છે અને પછી અદૃશ્ય થઈ જાય છે", "Printer jammed with thought", "ધુમ્મસ ખાલી શહેરને ગ્રસે છે ", "Parque infantil con niebla","Abogado plátano", "Esqueleto haciendo twerking"," La luz parpadea en bucle","Centro comercial olvidado al anochecer","Fantasma de arcade bebiendo refresco","Fantasmas amigables con sudaderas"],
    ["Árboles de malvavisco cerca del lago ", "Orquesta de gatos bajo la luz de la luna", " भूतिया दफ़्तर | उदास वेंडिंग मशीन", "Voidlight", "चीख़ता हुआ आईना", "खाली आर्केड","TikTok demon doing taxes","Black cat reads tarot","साइबर कौआ बाइट्स खा रहा है","शहर पर डेटा तूफ़ान | खंडहर में एआई मंदिर","Le tiroir du bureau mène sous terre","Wyrmhole","La forêt bourdonne de lumière"],
    ["Le parapluie attrape des étoiles filantes", "La peinture cligne des yeux en regardant ", "Rainbow highway to nowhere", "માર્ગ કાચમાં સમાપ્ત થાય છે", "Bleedscape", "Baño de neón ","સુગંધ શાંત લાઇબ્રેરીમાં ફેલાય છે"," Electric owl guards vault", "Cyborg street poet sings , | खंडहर में एआई मंदिर","Le tiroir du bureau mène sous terre","Wyrmhole","La forêt bourdonne de lumière" ,  "खंडहर में एआई मंदिर Le tiroir du bureau mène sous terre","Wyrmhole","La forêt bourdonne de lumière"],
    
  ];

return (
  <div className="relative w-full h-full overflow-hidden md:pt-0 lg:pt-4">

    {/* Background SVG that sits behind everything */}
<div className="absolute top-12 md:top-0 lg:top-0 left-0 w-full  md:h-[50vh] z-0 pointer-events-none mb:translate-y-[20px] translate-y-[50px] opacity-50 ">
      <img 
        src="/Core/line.svg" 
        alt="Background Lines"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Foreground content */}
    <div className="text-white flex w-full relative z-10 mt-14 mb:items-center mb:gap-2 mb:mt-8">

      {/* Left Side - Text Animation */}
      <div className="flex flex-col gap-12 mt-14 w-[38vw] overflow-hidden mb:gap-1 mb:w-full mb:mt-0">
        {textRows.map((row, index) => (
          <motion.div
            key={index}
            className="flex whitespace-nowrap mb:justify-center"
            initial={{ x: "-1500%" }}
            animate={{ x: "0%" }}
            transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
          >
            {[...row, ...row].map((name, i) => (
              <span
                key={i}
                className="text-4xl mx-4 mb:text-[10px] mb:mx-2"
              >
                {name}
              </span>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Center - Logo with glow */}
      <div className="w-1/4 flex items-center justify-center relative mb:w-full mb:justify-center mb:items-center">
        <div 
          className="absolute z-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-white opacity-10 blur-3xl mb:opacity-5 mb:h-[111px] mb:w-[111px] mb:blur-xl mb:bg-white"
          style={{ boxShadow: '80 0 80px 40px rgba(255, 255, 255, 0.6)' }}
        />
        <img
          src="/Core/logosquare.png"
          alt="Logo"
          className="relative z-10 h-[380px] w-[400px] mb:h-[111px] mb:w-[111px]"
          style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))' }}
        />
      </div>

      {/* Right Side - Image Animation */}
      <div className="w-[40vw] overflow-hidden flex items-center justify-center mb:w-full mb:h-[150px] ">
        <div className="w-full overflow-hidden relative">
          <motion.div
            className="flex min-w-max"
            animate={{ x: ["-90%", "0%"] }}
            transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          >
            <img
              src={getImageUrl("landingpage", "horizonalimage")}
              alt="Scrolling Banner"
              className="h-[400px] w-auto mb:h-[160px] mb:w-auto"
            />
            <img
              src={getImageUrl("landingpage", "horizonalimage")}
              alt="Scrolling Banner Duplicate"
              className="h-[400px] w-auto mb:h-[160px] mb:w-auto"
            />
          </motion.div>
        </div>
      </div>
    </div>

    {/* Global animation style */}
    <style jsx global>{`
      @keyframes pulse {
        0% { opacity: 0.4; transform: scale(0.97); }
        50% { opacity: 0.6; transform: scale(1.03); }
        100% { opacity: 0.4; transform: scale(0.97); }
      }
    `}</style>
  </div>
);

};

export default SlideImage;