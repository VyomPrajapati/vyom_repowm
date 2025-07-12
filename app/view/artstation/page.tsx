"use client"

import { useState, useEffect } from "react"
import ImageOverlay from "./components/image-overlay"
import Footer from "../Core/Footer"
import NavigationFull from "../Core/NavigationFull"
import Navigation from "../landingPage/components/Navigation"
import MasonryLayout from "./components/masorny-layout"
import { bookmarkStore } from "../../utils/bookmarkUtils"
import { Bookmark } from "lucide-react"
import { useRouter } from "next/navigation"
import { NAV_ROUTES } from "@/routes/routes"

// Define the image data structure
interface ArtImage {
  id: string
  src: string
  alt: string
  username: string
  model: string
  prompt: string
  liked?: boolean
  bookmarked?: boolean
}

// Sample images without hardcoded dimensions
const sampleImages: ArtImage[] = [
  {
    id: "1",
    src: "/artstation/Card.png",
    alt: "Eiffel Tower with burger",
    username: "Aryan",
    model: "Flux.1 Dev",
    prompt: "A giant burger in front of the Eiffel Tower with trees",
    liked: false,
    bookmarked: false,
  },
  {
    id: "2",
    src: "/artstation/Card1.png",
    alt: "Mystical forest",
    username: "Ayush",
    model: "stable-XL",
    prompt: "Dogs and family",
    liked: false,
    bookmarked: false,
  },
  {
    id: "3",
    src: "/artstation/Card.png",
    alt: "Lighthouse",
    username: "Hiamnshu",
    model: "stable-turbo",
    prompt: "A lighthouse on rocky shore",
    liked: false,
    bookmarked: false,
  },
  {
    id: "4",
    src: "/artstation/Card.png",
    alt: "Abstract art",
    username: "Vyom",
    model: "Flux.1 Dev",
    prompt: "Abstract digital art",
    liked: false,
    bookmarked: false,
  },
  {
    id: "5",
    src: "/artstation/Card2.png",
    alt: "Nature scene",
    username: "Parth",
    model: "stable-XL",
    prompt: "Beautiful nature landscape",
    liked: false,
    bookmarked: false,
  },
  {
    id: "6",
    src: "/artstation/Card1.png",
    alt: "Urban cityscape",
    username: "jehan",
    model: "stable-turbo",
    prompt: "Futuristic cityscape at night",
    liked: false,
    bookmarked: false,
  },
  {
    id: "7",
    src: "/artstation/Card1.png",
    alt: "Portrait",
    username: "kavy",
    model: "Flux.1 Dev",
    prompt: "Artistic portrait",
    liked: false,
    bookmarked: false,
  },
  {
    id: "8",
    src: "/artstation/Card.png",
    alt: "Space scene",
    username: "radhika",
    model: "stable-turbo",
    prompt: "Nebula in deep space",
    liked: false,
    bookmarked: false,
  },
  {
    id: "9",
    src: "/artstation/Card2.png",
    alt: "Mountain landscape",
    username: "Aryan",
    model: "stable-XL",
    prompt: "Mountain landscape at sunset",
    liked: false,
    bookmarked: false,
  },
  {
    id: "10",
    src: "/artstation/Card1.png",
    alt: "Wide panorama",
    username: "kevin",
    model: "stable-turbo",
    prompt: "Wide panoramic landscape",
    liked: false,
    bookmarked: false,
  },
  {
    id: "11",
    src: "/artstation/Card.png",
    alt: "Eiffel Tower with burger",
    username: "gwen",
    model: "Flux.1 Dev",
    prompt: "A giant burger in front of the Eiffel Tower with trees",
    liked: false,
    bookmarked: false,
  },
  {
    id: "12",
    src: "/artstation/Card2.png",
    alt: "Mountain landscape",
    username: "suiiii",
    model: "Flux.1 Dev",
    prompt: "Mountain landscape at sunset",
    liked: false,
    bookmarked: false,
  },
]

export default function ArtStation() {
  const [selectedImage, setSelectedImage] = useState<ArtImage | null>(null)
  const [images, setImages] = useState<ArtImage[]>([])
  const router = useRouter()

  useEffect(() => {
    // Initialize images with bookmark status from store
    const initialImages = sampleImages.map((img) => ({
      ...img,
      bookmarked: bookmarkStore.isBookmarked(img.id),
    }))
    setImages(initialImages)

    // Listen for bookmark updates
    const handleBookmarkUpdate = () => {
      setImages((prev) =>
        prev.map((img) => ({
          ...img,
          bookmarked: bookmarkStore.isBookmarked(img.id),
        })),
      )
    }

    window.addEventListener("bookmarkUpdated", handleBookmarkUpdate)

    return () => {
      window.removeEventListener("bookmarkUpdated", handleBookmarkUpdate)
    }
  }, [])

 
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }

    // Initial check
    checkScreenSize()

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize)

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const handleLikeToggle = (image: ArtImage) => {
    const updatedImages = images.map((img) => (img.id === image.id ? { ...img, liked: !img.liked } : img))
    setImages(updatedImages)
  }

  // Handle image bookmark toggle
  const handleBookmarkToggle = (image: ArtImage) => {
    const newBookmarkedState = !image.bookmarked

    const updatedImages = images.map((img) => (img.id === image.id ? { ...img, bookmarked: newBookmarkedState } : img))
    setImages(updatedImages)

    if (newBookmarkedState) {
      bookmarkStore.addBookmark({
        id: image.id,
        src: image.src,
        alt: image.alt,
        username: image.username,
        model: image.model,
        prompt: image.prompt,
      })
    } else {
      bookmarkStore.removeBookmark(image.id)
    }

    // Dispatch event to notify bookmark component
    window.dispatchEvent(new Event("bookmarkUpdated"))
  }

  return (
    <>
      {/* Conditional rendering based on screen size */}
      {isMobile || isTablet ? <Navigation /> : <NavigationFull />}

      <div className="w-full min-h-screen bg-black text-white  p-2 md:p-5">
        <div className="max-w-full md:max-w-[90%] mx-auto mt-16 md:mt-16">
          <h1 className="text-2xl md:text-3xl font-bold mb-0 md:mb-2 ml-4 md:ml-0">ArtStation </h1>
          <div className="flex items-center justify-between"> 
            <p className="md:text-xl mb-2 md:mb-10 ml-4 md:ml-0">Explore AI-generated artwork</p>
          <button
             onClick={() => router.push(NAV_ROUTES.BOOKMARK)}
              className=" flex rounded-md mb-4 mr-4  gap-1 px-2 py-1 md:py-2 md:px-4 bg-gradient-to-b from-[#5AD7FF] to-[#656BF5] transition-colors"
            >
              <Bookmark className="w-3 h-4 md:w-5 md:h-7" />
              <span className="text-xs md:text-lg">Bookmarks</span>
            </button>
            </div>
          {/* Use the MasonryLayout component */}
          <MasonryLayout
            images={images}
            onImageClick={setSelectedImage}
            onLikeToggle={handleLikeToggle}
            onBookmarkToggle={handleBookmarkToggle}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        </div>

        {/* Image Overlay Modal */}
        {selectedImage && (
          <ImageOverlay
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
            onLike={handleLikeToggle}
            onBookmark={handleBookmarkToggle}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        )}
      </div>

      <Footer />
    </>
  )
}