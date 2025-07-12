"use client"

import Image from "next/image"
import { Play } from "lucide-react"
// import ImageModal from "./image-modal"

interface ImageCardProps {
  title: string
  image: string
}

export default function ImageCard({ title, image }: ImageCardProps) {
  return (
    <>
      <div
        className=" snap-start
          rounded-[24px] md:rounded-[45px] overflow-hidden
          w-[240px] h-[300px] md:w-[354px] md:h-[488px] aspect-[3/4] mx-1 md:mx-auto transition-all duration-100
          border-b-4 border-b-[#B1B1B1]
          cursor-pointer
        "
      >
        {/* Image container */}
        <div className="snap-start relative w-full h-full overflow-hidden">
          <Image
            src={image || "/home/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 280px, 354px"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

          {/* Title */}
          <div className="absolute top-4 left-4">
            <h3 className="text-white font-semibold text-sm md:text-lg">{title}</h3>
          </div>

          {/* Run button */}
          <div className="absolute bottom-4 left-4">
            <button
              className="
                bg-[#357AFF] hover:bg-[#252525] text-white 
                rounded-[10px] flex items-center px-4 md:px-5 py-1.5 md:py-2 
                text-xs md:text-sm font-medium transition-all duration-300
                shadow-md w-[70px] md:w-[83px] h-[30px] md:h-[34px]
              "
              onClick={(e) => {
                e.stopPropagation()
                // Handle run action
              }}
            >
              <Play size={14} className="fill-current" />
              <span className="ml-1">Run</span>
            </button>
          </div>
        </div>
      </div>

      {/* <ImageModal isOpen={isModalOpen} onClose={closeModal} image={{ title, image }} /> */}
    </>
  )
}
