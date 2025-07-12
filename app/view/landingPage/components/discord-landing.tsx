"use client";
import { useState } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { getImageUrl } from "@/routes/imageroute";

// Initialize Poppins font
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500"] });

export default function DiscordLanding() {
  const [discordIcon, setDiscordIcon] = useState("/Landingpage/DiscordView/discord.svg"); // Default icon

  return (
    <div className="relative w-full h-[404px] mt-auto  overflow-hidden z-40 mb:h-auto mb:pt-10  ">
      {/* Background Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, 
            rgba(54, 95, 174, 0.5) 50%, 
            rgba(0, 0, 0, 1) 100%)`,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex items-center justify-between w-full h-full px-10 mb:flex-col mb:items-center">
        {/* Left Content */}
        <div className="max-w-lg absolute left-[200px] mb:static mb:text-center">
        <h1 className={`text-[36px] font-medium text-white mb-6 text-left ${poppins.className} mb:text-[30px] mb:px-4 mb:text-center`}>
          Be part of a  
          creative  
          community!
        </h1>

          <button
            className="flex items-center justify-center gap-2 w-[245px] h-[51px] rounded-[18px] text-white bg-[#5865F2] hover:bg-white hover:text-[#5865F2] hover:shadow-none transition duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5865F2] mb:mx-auto mb:mb-6"
            onMouseEnter={() => setDiscordIcon(getImageUrl('landingpage', 'discorddark'))} 
            onMouseLeave={() => setDiscordIcon(getImageUrl('landingpage', 'discord'))} 
          >
            <Image src={discordIcon} alt="Discord Icon" width={24} height={24} />
            <span className="text-base font-medium">Join Discord Server</span>
          </button>
        </div>

        {/* Right Content - GIF */}
        <div className="block w-[299px] h-[291px] absolute right-[200px] mb:static mb:w-[250px] mb:h-[250px] mb:flex mb:justify-center mb:mt-6">
          <Image
            src={getImageUrl('landingpage', 'discordimage')}
            alt="Creative visual effect"
            width={262}
            height={255}
            className="rounded-[56px] mb:rounded-[32px]"
          />
        </div>
      </div>
    </div>
  );
}
