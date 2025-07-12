"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Heart, Bookmark, Share2 } from 'lucide-react'

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

interface MasonryLayoutProps {
  images: ArtImage[]
  onImageClick: (image: ArtImage) => void
  onLikeToggle?: (image: ArtImage) => void
  onBookmarkToggle?: (image: ArtImage) => void
  isMobile?: boolean
  isTablet?: boolean
}

export default function MasonryLayout({
  images,
  onImageClick,
  onLikeToggle,
  onBookmarkToggle,
  isMobile = false,
  isTablet = false,
}: MasonryLayoutProps) {
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(null)
  const [imageDimensions, setImageDimensions] = useState<Record<string, { width: number; height: number }>>({})
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [modifiedImages, setModifiedImages] = useState<ArtImage[]>(images)
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const loadImageDimensions = async () => {
      const dimensions: Record<string, { width: number; height: number }> = {}

      const promises = images.map((image) => {
        return new Promise<void>((resolve) => {
          const imgElement = document.createElement("img")
          imgElement.crossOrigin = "anonymous"
          imgElement.onload = () => {
            dimensions[image.id] = {
              width: imgElement.width,
              height: imgElement.height,
            }
            resolve()
          }
          imgElement.onerror = () => {
            dimensions[image.id] = { width: 500, height: 500 }
            resolve()
          }
          imgElement.src = image.src
        })
      })

      await Promise.all(promises)
      setImageDimensions(dimensions)
      setImagesLoaded(true)
    }

    loadImageDimensions()
  }, [images])

  useEffect(() => {
    // Update modifiedImages when images prop changes
    setModifiedImages(images)
  }, [images])

  // Determine number of columns based on screen size
  const getColumns = () => {
    if (isMobile) return 1
    if (isTablet) return 2
    return 3 // Default for desktop
  }

  const columns = getColumns()

  const getColumnImages = () => {
    if (!imagesLoaded) return Array.from({ length: columns }, () => [])

    const columnHeights = Array(columns).fill(0)
    const columnImages: ArtImage[][] = Array.from({ length: columns }, () => [])

    modifiedImages.forEach((image) => {
      const dimensions = imageDimensions[image.id] || { width: 1, height: 1 }
      const ratio = dimensions.height / dimensions.width

      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))

      columnImages[shortestColumnIndex].push(image)
      columnHeights[shortestColumnIndex] += ratio
    })

    return columnImages
  }

  const handleLikeToggle = (image: ArtImage, e: React.MouseEvent) => {
    e.stopPropagation()
    const updatedImages = modifiedImages.map((img) => (img.id === image.id ? { ...img, liked: !img.liked } : img))
    setModifiedImages(updatedImages)

    if (onLikeToggle) {
      onLikeToggle(image)
    }
  }

  const handleBookmarkToggle = (image: ArtImage, e: React.MouseEvent) => {
    e.stopPropagation()
    const updatedImages = modifiedImages.map((img) =>
      img.id === image.id ? { ...img, bookmarked: !img.bookmarked } : img,
    )
    setModifiedImages(updatedImages)

    if (onBookmarkToggle) {
      onBookmarkToggle(image)
    }
  }

  const handleShareClick = (image: ArtImage, e: React.MouseEvent) => {
    e.stopPropagation()
    // Implement share functionality here
    if (navigator.share) {
      navigator.share({
        title: image.alt,
        text: `Check out this artwork: ${image.prompt}`,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      console.log('Web Share API not supported');
      // Fallback - perhaps copy to clipboard
    }
  }

  if (!imagesLoaded) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading gallery...</p>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="flex w-full gap-2 md:gap-2 ">
      {getColumnImages().map((column, columnIndex) => (
        <div key={`column-${columnIndex}`} className="flex-1">
          {column.map((image) => {
            const dimensions = imageDimensions[image.id] || { width: 1, height: 1 }

            return (
              <div
                key={image.id}
                className="relative w-full cursor-pointer border border-[#222222] rounded-2xl md:border-hidden mb-4 md:mb-6"
                onMouseEnter={() => !isMobile && !isTablet && setHoveredImageId(image.id)}
                onMouseLeave={() => !isMobile && !isTablet && setHoveredImageId(null)}
                onClick={() => onImageClick(image)}
              >
                {/* Image container */}

                <div className=" md:hidden py-4 md:py-0 flex items-center text-[#777777] mb-2">
                      <div className="mr-2 flex items-center justify-center pl-4">
                        <Image src="/artstation/usr.png" alt="user" width={24} height={24} />
                      </div>
                      <span className="text-sm">{image.username}</span>
                    </div>

                <div
                  className="relative -mt-4 w-auto mx-4 mb-4 md:mx-0 md:mb-0"
                  style={{ paddingBottom: `${(dimensions.height / dimensions.width) * 100}%` }}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* Desktop hover overlay */}
                {!isMobile && !isTablet && hoveredImageId === image.id && (
                  <div
                    className="absolute inset-0 top-0 bg-black bg-opacity-70 flex flex-col justify-between p-4 transition-opacity duration-300 rounded-lg"
                    onClick={(e) => {
                      e.stopPropagation()
                      onImageClick(image)
                    }}
                  >
                    <div className="flex  justify-center space-x-4 mt-[26vh]">
                      <Heart
                        onClick={(e) => handleLikeToggle(image, e)}
                        className={`
                          w-8 h-8 
                          ${image.liked ? "text-[#FF4444] fill-current scale-125" : "text-white hover:scale-110"}
                          transform transition-all duration-300 ease-out
                          hover:drop-shadow-lg 
                          ${image.liked ? "animate-bounce-once" : "active:scale-90"}
                        `}
                      />
                      <Bookmark
                        onClick={(e) => handleBookmarkToggle(image, e)}
                        className={`
                          w-8 h-8 
                          ${image.bookmarked ? "text-[#FFA800] fill-current scale-125" : "text-white hover:scale-110"}
                          transform transition-all duration-300 ease-out
                          hover:drop-shadow-lg 
                          ${image.bookmarked ? "animate-bounce-once" : "active:scale-90"}
                        `}
                      />
                    </div>

                    <div className="text-white mt-auto">
                      <div className="flex items-center mb-2">
                        <div className="mr-2 flex items-center justify-center">
                          <Image src="/artstation/usr.png" alt="user" width={28} height={28} />
                        </div>
                        <span>{image.username}</span>
                      </div>
                      <div className="text-sm">
                        <p>
                          <span className="font-semibold">Model:</span> {image.model}
                        </p>
                        <p>
                          <span className="font-semibold">Prompt:</span> {image.prompt}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile and tablet info section below image */}
                {(isMobile || isTablet) && (
                  <div className="w-full text-white -mt-2  rounded-lg mb-2">
                    
                    {/* <div className="text-xs mb-2">
                      <p>
                        <span className="font-semibold pl-4">Model:</span> {image.model}
                      </p>
                      <p className="pl-4">
                        <span className="font-semibold ">Prompt:</span> {image.prompt}
                      </p>
                    </div> */}
                    <div className="flex justify-between items-center mt-0">
                      <div className="flex  pl-4 justify-between  ">
                        <Heart
                          onClick={(e) => handleLikeToggle(image, e)}
                          className={` border border-[#222222] rounded-3xl  p-1
                            w-12 h-8 
                            ${image.liked ? "text-[#FF4444] fill-current" : "text-[#777777]"}
                            transform transition-all duration-300 ease-out
                          `}
                        />

                      </div>
                        <div className="flex pr-4  gap-1 text-[#777777]">
                          <div className="flex border border-[#222222] rounded-full items-center px-2 gap-1 text-sm">
                        <Bookmark
                          onClick={(e) => handleBookmarkToggle(image, e)}
                          className={`  
                            w-5 h-5 
                            ${image.bookmarked ? "text-[#FFA800] fill-current" : "text-[#777777]"}
                            transform transition-all duration-300 ease-out
                          `}
                        />
                        </div>
                        <Share2
                          onClick={(e) => handleShareClick(image, e)}
                          className="border  border-[#222222] rounded-full px-2  w-9 h-9  text-[#777777] transform transition-all duration-300 ease-out"
                        /> </div>
                        
                      
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}