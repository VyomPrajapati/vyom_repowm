"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

// Define section IDs as a type for type safety
type SectionId = "image-creation" | "video-animations" | "sound-designing" | "product-branding"

// Category sections data
const categorySections = [
  {
    id: "image-creation" as SectionId,
    title: "Image Creation",
    articles: [
      {
        title: "The Art of AI: How AI-Generated Images are Changing Digital Creativity",
        image: "https://placehold.co/320x200/gray/white",
      },
      {
        title: "Stable Diffusion vs. MidJourney: Which AI Image Tool is Best for You?",
        image: "https://placehold.co/320x200/gray/white",
      },
      {
        title: "From Text to Masterpiece: The Best AI Prompt Strategies for Stunning Images",
        image: "https://placehold.co/320x200/gray/white",
      },
      {
        title: "AI Image Generators: A Comprehensive Comparison for 2025",
        image: "https://placehold.co/320x200/gray/white",
      },
      {
        title: "Creating Photorealistic Portraits with AI: Tips and Techniques",
        image: "https://placehold.co/320x200/gray/white",
      },
      {
        title: "The Future of AI in Image Generation: What's Next?",
        image: "https://placehold.co/320x200/gray/white",
      },
      {
        title: "The Future of AI in Image Generation: What's Next?",
        image: "https://placehold.co/320x200/gray/white",
      },
    ],
  },
  {
    id: "video-animations" as SectionId,
    title: "Video & Animations",
    articles: [
      {
        title: "How AI is Revolutionizing Video Production in 2025",
        image: "https://placehold.co/400x200/gray/white",
      },
      {
        title: "AI-Generated Animations: The Future of Motion Graphics",
        image: "https://placehold.co/400x200/gray/white",
      },
      {
        title: "From Text to Short Film: How AI Can Create a 15-Second Video in Minutes",
        image: "https://placehold.co/400x200/gray/white",
      },
      {
        title: "Character Animation with AI: Creating Lifelike Digital Actors",
        image: "https://placehold.co/400x200/gray/white",
      },
      {
        title: "AI Video Editing Tools: Automating Post-Production Workflows",
        image: "https://placehold.co/400x200/gray/white",
      },
      {
        title: "The Future of AI in Image Generation: What's Next?",
        image: "https://placehold.co/400x200/gray/white",
      },
      {
        title: "The Future of AI in Image Generation: What's Next?",
        image: "https://placehold.co/400x200/gray/white",
      },
      {
        title: "The Future of AI in Image Generation: What's Next?",
        image: "https://placehold.co/400x200/gray/white",
      },
    ],
  },
  {
    id: "sound-designing" as SectionId,
    title: "Sound Designing",
    articles: [
      {
        title: "From Concept to Reality: AI's Role in 3D Asset Creation",
        image: "https://placehold.co/320x200/gray/white",
      },
      {
        title: "AI and Virtual Environments: How Studios Are Using AI for Film and Game Worlds",
        image: "https://placehold.co/320x200/gray/white",
      },
      {
        title: "The Best AI Tools for 3D Artists: A Complete Guide",
        image: "https://placehold.co/320x200/gray/white",
      },
      {
        title: "AI-Generated Product Designs: Revolutionizing Brand Identity",
        image: "https://placehold.co/320x200/gray/white",
      },
      {
        title: "Creating Brand Consistency with AI: Tools and Techniques",
        image: "https://placehold.co/320x200/gray/white",
      },
      {
        title: "The Future of AI in Image Generation: What's Next?",
        image: "https://placehold.co/320x200/gray/white",
      },
      {
        title: "The Future of AI in Image Generation: What's Next?",
        image: "https://placehold.co/320x200/gray/white",
      },
      {
        title: "The Future of AI in Image Generation: What's Next?",
        image: "https://placehold.co/320x200/gray/white",
      },
    ],
  },
  {
    id: "product-branding" as SectionId,
    title: "Product Branding",
    articles: [
      {
        title: "From Concept to Reality: AI's Role in 3D Asset Creation",
        image: "https://placehold.co/320x200/gray/white",
      },
      {
        title: "AI and Virtual Environments: How Studios Are Using AI for Film and Game Worlds",
        image: "https://placehold.co/320x200/gray/white",
      },
      {
        title: "The Best AI Tools for 3D Artists: A Complete Guide",
        image: "https://placehold.co/320x200/gray/white",
      },
      {
        title: "AI-Generated Product Designs: Revolutionizing Brand Identity",
        image: "https://placehold.co/320x200/gray/white",
      },
      {
        title: "Creating Brand Consistency with AI: Tools and Techniques",
        image: "https://placehold.co/320x200/gray/white",
      },
      {
        title: "The Future of AI in Image Generation: What's Next?",
        image: "https://placehold.co/320x200/gray/white",
      },
      {
        title: "The Future of AI in Image Generation: What's Next?",
        image: "https://placehold.co/320x200/gray/white",
      },
      {
        title: "The Future of AI in Image Generation: What's Next?",
        image: "https://placehold.co/320x200/gray/white",
      },
    ],
  },
]

export default function CategorySections() {
  // State for category sections with proper typing
  const [scrollPositions, setScrollPositions] = useState<Record<SectionId, number>>({
    "image-creation": 0,
    "video-animations": 0,
    "sound-designing": 0,
    "product-branding": 0,
  })

  // Properly type the ref objects
  const touchStartX = useRef<Record<string, number>>({})
  const touchEndX = useRef<Record<string, number>>({})
  const isMobile = useRef<boolean>(false)
  const isTablet = useRef<boolean>(false)
  const isMediumScreen = useRef<boolean>(false)

  // Check if device is mobile, tablet, or medium-sized screen
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      isMobile.current = width < 768
      isTablet.current = width >= 768 && width < 1024
      isMediumScreen.current = width >= 1024 && width < 1280
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)

    return () => {
      window.removeEventListener("resize", checkDevice)
    }
  }, [])

  // Generic scroll functions for category sections
  const scrollRight = (sectionId: SectionId, maxLength: number) => {
    setScrollPositions((prev) => ({
      ...prev,
      [sectionId]: Math.min(prev[sectionId] + 1, maxLength - 3),
    }))
  }

  const scrollLeft = (sectionId: SectionId) => {
    setScrollPositions((prev) => ({
      ...prev,
      [sectionId]: Math.max(prev[sectionId] - 1, 0),
    }))
  }

  // Touch handlers for swiping
  const handleTouchStart = (e: React.TouchEvent, sectionId: string) => {
    touchStartX.current[sectionId] = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent, sectionId: string) => {
    touchEndX.current[sectionId] = e.touches[0].clientX
  }

  const handleTouchEnd = (sectionId: SectionId, maxLength: number) => {
    if (touchStartX.current[sectionId] - touchEndX.current[sectionId] > 50) {
      // Swipe left
      scrollRight(sectionId, maxLength)
    } else if (touchEndX.current[sectionId] - touchStartX.current[sectionId] > 50) {
      // Swipe right
      scrollLeft(sectionId)
    }
    touchStartX.current[sectionId] = 0
    touchEndX.current[sectionId] = 0
  }

  return (
    <div className="pt-2 md:pt-60  pb-0">
      {categorySections.map((section) => (
        <div
          key={section.id}
          className="macbook:max-w-[1100px] md:max-w-[1200px] md:min-w-[1000px] lg:max-w-[1600px] mb-8 md:mb-20 md:px-10 lg:px-12"
        >
          <div className="flex flex-col md:flex-row items-start gap-8 pl-4 md:pl-10">
            <div className="flex flex-col items-start -mb-4 md:mb-4 w-full md:w-64 flex-shrink-0">
              <h2 className="text-2xl font-bold mb-3">{section.title}</h2>
              <button className="flex items-center justify-center bg-[#FFFFFF] hover:bg-[#DADCE0] text-[#1A73E8] hover:text-[#1474F1] py-2 px-6 rounded-md transition-colors">
                <span className="mr-2">See posts</span>
                <ChevronRight size="1rem" />
              </button>
            </div>

            <div className="relative w-full font-poppins">
              <div className="overflow-hidden font-poppins">
                <div
                  className="flex gap-4 transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${scrollPositions[section.id as SectionId] * 320}px)`,
                  }}
                  onTouchStart={(e) => handleTouchStart(e, section.id)}
                  onTouchMove={(e) => handleTouchMove(e, section.id)}
                  onTouchEnd={() => handleTouchEnd(section.id as SectionId, section.articles.length)}
                >
                  {section.articles.map((article, index) => (
                    <div key={index} className="w-[300px] flex-shrink-0 font-poppins">
                      <h3 className="text-sm md:text-lg font-semibold h-14 md:h-[6rem] line-clamp-3 overflow-hidden font-poppins mb-0">
                        {article.title}
                      </h3>
                      <Image
                        src={article.image || "/placeholder.svg?height=200&width=300" || "/placeholder.svg"}
                        alt={article.title}
                        width={300}
                        height={200}
                        className="h-[200px] w-[300px] object-cover rounded-lg bg-gray-700"
                        quality={85}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation arrows - now visible on medium and large screens */}
              {scrollPositions[section.id as SectionId] > 0 && !(isMobile.current || isTablet.current) && (
                <button
                  onClick={() => scrollLeft(section.id as SectionId)}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 text-black z-10 shadow-lg hidden md:block"
                  aria-label="Scroll left"
                >
                  <ChevronLeft size="1.5rem" />
                </button>
              )}

              {section.articles.length > 3 &&
                scrollPositions[section.id as SectionId] < section.articles.length - 3 &&
                !(isMobile.current || isTablet.current) && (
                  <button
                    onClick={() => scrollRight(section.id as SectionId, section.articles.length)}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 text-black z-10 shadow-lg hidden md:block"
                    aria-label="Scroll right"
                  >
                    <ChevronRight size="1.5rem" />
                  </button>
                )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
