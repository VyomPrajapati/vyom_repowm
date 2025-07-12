"use client"
import Image from "next/image"
import { X } from "lucide-react"

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  image: {
    title: string
    image: string
  }
}

export default function ImageModal({ isOpen, onClose, image }: ImageModalProps) {
  if (!isOpen) return null

  return ( <>
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 md:p-10"
      onClick={onClose}
    >
      <div
        className="bg-[#121212] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left side - Image */}
        {/* Left side - Image */}
<div className="p-4 sm:p-6 md:p-8">
  <div className="w-[330px] h-[405px] sm:h-[330px] md:h-[405px] relative bg-transparent ml-4 md:ml-6 mt-4 md:mt-6">
    <Image
      src={image.image || "/placeholder.svg"}
      alt={image.title}
      fill
      className="object-cover rounded-[8px]"
      sizes="(max-width: 768px) 100vw, 400px"
    />
  </div>
</div>


          {/* Right side - Content */}
          <div className="flex-1 p-5 sm:p-6 md:p-8 text-white">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{image.title}</h2>

            <div className="border-t border-gray-700 my-3 sm:my-4"></div>

            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-medium mb-2">Description</h3>
              <p className="text-sm sm:text-base text-gray-300">
                {image.title} is a high-speed text-to-image generation model that creates high-quality images from text
                descriptions quickly (in 1-4 steps). It uses advanced techniques to improve efficiency and quality while
                reducing computation time.
              </p>
            </div>

            <button className="w-full sm:w-auto bg-[#357AFF] hover:bg-[#000000] text-white rounded-full py-2.5 sm:py-3 px-5 sm:px-6 font-medium transition-all duration-300 flex items-center justify-center">
                Generate with this Model
                {/* Use img to reference your SVG */}
                <Image
                    src="/home/star.svg"  // Path to your SVG file in the public folder
                    alt="Arrow Icon"
                    className="ml-1 w-4 h-4"
                    width={4}
                    height={4}  // You can adjust the size using Tailwind classes
                />
            </button>

          </div>
        </div>
{/* Bottom section - Sample images */}
<div className="p-5 sm:p-6 md:p-8 flex justify-center">
  <div className="w-full max-w-screen-xl flex flex-col items-center">
    <h3 className="text-white text-lg sm:text-xl font-medium mb-3 sm:mb-4 text-center">
      Images created with this model
    </h3>

    {/* Centered Image Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 justify-center">
      {[...Array(9)].map((_, index) => (
        <div key={index} className="w-[213px] h-[213px] relative overflow-hidden">
          <Image
            src={
              index % 3 === 0
                ? "/home/car.svg?height=213&width=213"
                : index % 3 === 1
                ? "/home/dog.svg?height=213&width=213"
                : "/home/cup.svg?height=213&width=213"
            }
            alt="Sample image"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 213px"
          />
        </div>
      ))}
    </div>
  </div>
</div>

      </div>
    </div>
    </>
  )
}