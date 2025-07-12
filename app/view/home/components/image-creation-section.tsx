"use client"
import { useState, useEffect } from "react"
import ImageCard from "./image-card"
import ScrollableContainer from "./scrollable-container"
import { getImageUrl } from "@/routes/imageroute"

const images = [
  {
    id: 1,
    title: "Flux.1 Schnell",
    image: getImageUrl("home", "fluxshanell"),
  },
  {
    id: 2,
    title: "Flux.1 Dev",
    image: getImageUrl("home", "fluxdev"),
  },
  {
    id: 3,
    title: "Google's Imagen",
    image: getImageUrl("home", "imagin"),
  },
  {
    id: 4,
    title: "Stable Diffusion 3.5 Large",
    image: getImageUrl("home", "large"),
  },
  {
    id: 5,
    title: "Flux.1 Schnell",
    image: getImageUrl("home", "medium"),
  },
  {
    id: 6,
    title: "Stable Diffusion 3.5 Medium",
    image: getImageUrl("home", "xl"),
  },
]

export default function ImageCreationSection() {
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <section className="mb-24 px-4 md:px-6 md:ml-20">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 mb-4 md:mb-8">
        <div className="w-auto px-2 md:w-[268px] h-[43px] bg-slate-400 text-black text-[18px] md:text-[30px] font-bold rounded-[10px] flex items-center justify-center">
          Image Creation
        </div>
        <p className="text-white text-xs md:text-base font-thin">
          {isMobile
            ? "One Platform, Infinite Visual Possibilities."
            : "Create and explore image, video and audio AI powered tools"}
        </p>
      </div>

      <div className="relative">
        <ScrollableContainer>
          {images.map((image) => (
            <div key={image.id} className="snap-center w-[240px] md:min-w-[360px] md:min-w-auto">
              <ImageCard title={image.title} image={image.image} />
            </div>
          ))}
        </ScrollableContainer>
      </div>

      <div className="mt-8 md:mt-16">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
          <div className="bg-blue-300 text-blue-900 px-4 py-1 rounded-full font-medium text-center md:text-left">
            See what others are creating
          </div>
          <p className="text-white text-sm md:text-base">Create and explore image, video and audio AI powered tools</p>
        </div>
      </div>
    </section>
  )
}
