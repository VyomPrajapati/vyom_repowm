"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FeaturesCard from "./features-card";
import ScrollableContainer from "./scrollable-container";
import { IMAGEGENERATION } from "@/routes/routes";

export default function FeaturesSection() {
  const route = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const features = [
    {
      id: 1,
      imageSrc: "/home/imagegeneration.png",
      label: "run" as const,
      onClick: () => route.push(IMAGEGENERATION.IMAGE_GENERATION),
    },
    {
      id: 2,
      imageSrc: "/home/videogeneratiin.png",
      label: "run" as const,
      onClick: () => route.push(IMAGEGENERATION.STICKER_GENERATION),
    },
    {
      id: 3,
      imageSrc: "/home/musicgeneration.png",
      label: "coming" as const,
      onClick: () => {},
    },
    {
      id: 4,
      imageSrc: "/home/3d.png",
      label: "coming" as const,
      onClick: () => {},
    },
    {
      id: 5,
      imageSrc: "/home/media.png",
      label: "coming" as const,
      onClick: () => {},
    },
    {
      id: 6,
      imageSrc: "/home/story.png",
      label: "coming" as const,
      onClick: () => {},
    },
  ];

  return (
    <section className="mb-2 md:mb-24">
      <div className="flex flex-col  md:flex-row items-start md:items-center gap-2 md:gap-4 mb-4 md:mb-8 px-4 md:px-0">
        <button className="md:ml-20 w-[110px] h-[35px] md:w-[169px] md:h-[43px] bg-slate-400 text-black text-[18px] md:text-[30px] font-bold rounded-[10px] flex items-center justify-center">
          Features
        </button>

        <p className="text-white text-xs md:text-base font-thin">
          {isMobile 
            ? "Turn words into stunning visuals, whether it's ancient video art or hyper-detailed 3D worlds."
            : "Create and explore image, video and audio AI powered tools"}
        </p>
      </div>

      {isMobile ? (
        // Mobile layout - horizontal scrolling
        <div className="px-4 overflow-hidden">
          <ScrollableContainer>
            {features.map((feature) => (
              <div key={feature.id} className="snap-center min-w-[260px] md:min-w-[400px]">
                <FeaturesCard
                  onClick={feature.onClick}
                  imageSrc={feature.imageSrc}
                  label={feature.label}
                />
              </div>
            ))}
          </ScrollableContainer>
        </div>
      ) : (
        // Desktop layout - grid
        <div className="flex flex-wrap gap-10 justify-center">
          {features.map((feature) => (
            <FeaturesCard
              key={feature.id}
              onClick={feature.onClick}
              imageSrc={feature.imageSrc}
              label={feature.label}
            />
          ))}
        </div>
      )}
    </section>
  );
}
