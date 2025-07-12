"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { X, Heart, Bookmark, Download, ChevronDown, ChevronUp, Share2 } from "lucide-react"
import { bookmarkStore } from "@/app/utils/bookmarkUtils"

interface ArtImage {
  id: string
  src: string
  alt: string
  username: string
  model: string
  prompt: string
  aspectRatio?: number
  liked?: boolean
  bookmarked?: boolean
}

interface ImageOverlayProps {
  image: ArtImage
  onClose: () => void
  onLike?: (image: ArtImage) => void
  onBookmark?: (image: ArtImage) => void
  isMobile?: boolean
  isTablet?: boolean
}

export default function ImageOverlay({
  image,
  onClose,
  onLike,
  onBookmark,
  isMobile = false,
  isTablet = false,
}: ImageOverlayProps) {
  const [showOriginal, setShowOriginal] = useState(false)
  const [isRemixMode, setIsRemixMode] = useState(false)
  const [promptText, setPromptText] = useState("")
  const [currentImage, setCurrentImage] = useState(image)
  const [originalImage, setOriginalImage] = useState(image)
  const [liked, setLiked] = useState(image.liked || false)
  const [bookmarked, setBookmarked] = useState(image.bookmarked || false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Prevent body scrolling when overlay is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  // Handle scrolling behavior
  useEffect(() => {
    if (showOriginal && contentRef.current && overlayRef.current) {
      // Scroll the overlay content, not the entire page
      contentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }, [showOriginal])

  const toggleOriginal = () => {
    setShowOriginal(!showOriginal)
  }

  const handleRemixClick = () => {
    if (promptText.trim()) {
      if (!isRemixMode) {
        setIsRemixMode(true)
        setOriginalImage(currentImage)
      }

      const newImage = {
        ...currentImage,
        src: "/artstation/remix1.png", // Replace with actual remix logic
        prompt: promptText,
      }
      setCurrentImage(newImage)
      setPromptText("")
    }
  }

  const handleLikeToggle = () => {
    const newLikedState = !liked
    setLiked(newLikedState)

    // Call parent component's like handler if provided
    if (onLike) {
      onLike({
        ...currentImage,
        liked: newLikedState,
      })
    }
  }

  const handleBookmarkToggle = () => {
    const newBookmarkedState = !bookmarked
    setBookmarked(newBookmarkedState)

    // Call parent component's bookmark handler if provided
    if (onBookmark) {
      onBookmark({
        ...currentImage,
        bookmarked: newBookmarkedState,
      })
    }
    
    // Directly integrate with bookmarkStore
    if (newBookmarkedState) {
      // Add to bookmarks
      bookmarkStore.addBookmark({
        id: currentImage.id,
        src: currentImage.src,
        alt: currentImage.alt,
        username: currentImage.username,
        model: currentImage.model,
        prompt: currentImage.prompt,
      })
    } else {
      // Remove from bookmarks
      bookmarkStore.removeBookmark(currentImage.id)
    }

    // Dispatch event to notify bookmark component
    window.dispatchEvent(new Event("bookmarkUpdated"))
  }

  

  const handleShareClick = (image: ArtImage, e: React.MouseEvent) => {
    e.stopPropagation()
    // Implement share functionality here
    if (navigator.share) {
      navigator
        .share({
          title: image.alt,
          text: `Check out this artwork: ${image.prompt}`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      console.log("Web Share API not supported")
      // Fallback - perhaps copy to clipboard
    }
  }

  // Download functionality
  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation()

    // Get the image to download - we need to be more specific about which image to download
    // If we're in the original image section (showOriginal is true), download the original
    // Otherwise, download the current image (which could be the remixed version)
    const imageToDownload = showOriginal ? originalImage : currentImage

    // Create a descriptive filename
    const filename = `${imageToDownload.alt || "artwork"}-${imageToDownload.id}${isRemixMode && !showOriginal ? "-remixed" : ""}.jpg`

    // Create a link element
    const link = document.createElement("a")

    // Set the download attributes
    link.href = imageToDownload.src
    link.download = filename

    // For images that might be protected or cross-origin, we need to fetch and convert to blob
    fetch(imageToDownload.src)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a blob URL
        const blobUrl = URL.createObjectURL(blob)

        // Update the link to use the blob URL
        link.href = blobUrl

        // Append to body, click and remove
        document.body.appendChild(link)
        link.click()

        // Clean up
        setTimeout(() => {
          document.body.removeChild(link)
          URL.revokeObjectURL(blobUrl)
        }, 100)
      })
      .catch((error) => {
        console.error("Error downloading image:", error)

        // Fallback to direct download if fetch fails
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
  }

  const isRemixButtonDisabled = promptText.trim() === ""

  // Mobile/Tablet Layout
  if (isMobile || isTablet) {
    return (
      <div
        ref={overlayRef}
        className="fixed inset-0 top-14 z-50 bg-black overflow-y-auto"
        style={{
          overscrollBehavior: "contain",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Header with action buttons */}
        <div className="sticky z-10 flex justify-between items-center p-4 bg-black">
          {/* Close button */}
          <button onClick={onClose} className="p-1">
            <X className="w-6 h-6 text-white bg-zinc-800 rounded-full" />
          </button>

          {/* Action buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={(e) => handleShareClick(currentImage, e)}
              className="flex items-center space-x-1 bg-zinc-800 rounded-md px-2 py-1"
            >
              <Share2 className="w-4 h-4 text-white" />
              <span className="text-white text-sm">Share</span>
            </button>

            <button onClick={handleBookmarkToggle} className={`${bookmarked ? "text-[#FFA800]" : "text-white"}`}>
              <Bookmark className={`w-5 h-5 ${bookmarked ? "fill-current" : ""}`} />
            </button>

            <button onClick={handleLikeToggle} className={`${liked ? "text-[#FF4444]" : "text-white"}`}>
              <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
            </button>

            <button onClick={handleDownloadClick} className="text-white hover:text-blue-400 transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* User info */}
        <div className="px-8 py-0">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-3 bg-zinc-800 flex items-center justify-center">
              <Image src="/artstation/usr.png" alt="User" width={32} height={32} />
            </div>
            <span className="text-base font-semibold text-white">{currentImage.username}</span>
          </div>
        </div>

        {/* Image */}
        <div className="px-4 py-2">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden">
            <Image
              src={currentImage.src || "/placeholder.svg"}
              alt={currentImage.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>

        {/* Prompt */}
        <div className="px-6 py-2">
          <div className="mb-2">
            <p className="text-gray-300 text-sm">
              <span className="font-semibold">Model:</span> {currentImage.model}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-gray-300 text-sm font-semibold">Prompt:</p>
            <p className="text-gray-200 text-sm">{currentImage.prompt}</p>
          </div>
        </div>

        {/* Remix input */}
        <div className="px-6 py-0 sticky bottom-0 bg-black">
          <div className="relative">
            <input
              type="text"
              placeholder="Type a prompt..."
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="w-full p-3 pr-24 rounded-full bg-zinc-800 text-white text-sm focus:outline-none"
            />
            <button
              onClick={handleRemixClick}
              disabled={isRemixButtonDisabled}
              className={`absolute right-1 top-1/2 transform -translate-y-1/2 text-white px-4 py-1.5 rounded-full flex items-center text-sm ${
                isRemixButtonDisabled ? "bg-blue-500 opacity-50 cursor-not-allowed" : "bg-blue-500"
              }`}
            >
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4.01 7.58 4.01 12C4.01 16.42 7.58 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z"
                  fill="currentColor"
                />
              </svg>
              Remix
            </button>
          </div>
        </div>

        {/* Original image toggle */}
        {isRemixMode && (
          <div className="px-4 py-2">
            <button
              onClick={toggleOriginal}
              className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-zinc-800 transition-colors"
            >
              {showOriginal ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              <span>Original image</span>
            </button>
          </div>
        )}

        {/* Original image section */}
        {isRemixMode && showOriginal && (
          <div ref={contentRef} className="px-4 py-2 border-t border-gray-800 mt-4">
            <div className="py-4">
              <div className="relative w-full aspect-square">
                <Image
                  src={originalImage.src || "/placeholder.svg"}
                  alt={originalImage.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              <div className="mt-4">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                    <Image src="/artstation/usr.png" alt="User" width={32} height={32} />
                  </div>
                  <span className="text-base font-semibold text-white">{originalImage.username}</span>
                </div>

                <div className="mb-2">
                  <p className="text-gray-300 text-sm">
                    <span className="font-semibold">Model:</span> {originalImage.model}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-gray-300 text-sm font-semibold">Prompt:</p>
                  <p className="text-gray-200 text-sm">{originalImage.prompt}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Desktop Layout
  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black bg-opacity-90 overflow-y-auto"
      style={{
        overscrollBehavior: "contain",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div
        className="relative bg-[#1F1F1F] rounded-lg w-[75%] max-w-7xl mx-auto mt-[15vh] mb-[5vh]"
        style={{
          overscrollBehavior: "none",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white hover:bg-opacity-70 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Main content area */}
        <div className="flex flex-col md:flex-row">
          {/* Left side - Image */}
          <div className="w-full md:w-1/2 relative">
            <div className="relative aspect-square md:aspect-auto md:h-[70vh]">
              <Image
                src={currentImage.src || "/placeholder.svg"}
                alt={currentImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "contain" }}
                className="pt-10 pb-10 pl-0"
              />
            </div>
          </div>

          {/* Right side - Info */}
          <div className="w-full md:w-1/2 p-6 flex flex-col">
            {/* User info */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center font-thin">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <Image src="/artstation/usr.png" alt="User" width={40} height={40} />
                </div>
                <span className="text-lg font-thin text-white">{currentImage.username}</span>
              </div>

              <div className="flex space-x-8">
                <button
                  onClick={(e) => handleShareClick(currentImage, e)}
                  className="flex items-center space-x-2 px-3 py-1 rounded-md border border-[#919191] bg-[#1f1f1f] hover:bg-[#3D3D3D] hover:border-white transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
                <button
                  onClick={handleBookmarkToggle}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-md transition-colors ${
                    bookmarked ? "bg-[#FFA800] text-white" : "hover:bg-[#3D3D3D]"
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  <span>Bookmark</span>
                </button>
                <button
                  onClick={handleLikeToggle}
                  className={`text-${liked ? "[#FF4444]" : "[#777777]"} hover:text-red-600 transition-colors`}
                >
                  <Heart className={`w-6 h-6 ${liked ? "fill-current" : ""}`} />
                </button>
                <button onClick={handleDownloadClick} className="text-[#777777] hover:text-white transition-colors">
                  <Download className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Model info */}
            <div className="mb-4">
              <p className="text-gray-300">
                <span className="font-semibold">Model:</span> {currentImage.model}
              </p>
            </div>

            {/* Prompt */}
            <div className="mb-6">
              <p className="text-gray-300 mb-1 font-semibold">Prompt:</p>
              <p className="text-gray-200 text-sm leading-relaxed">{currentImage.prompt}</p>
            </div>

            {/* Remix section */}
            <div className="mt-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type a prompt..."
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  className="w-full p-4 pr-24 rounded-full bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleRemixClick}
                  disabled={isRemixButtonDisabled}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-white px-4 py-2 rounded-full flex items-center transition-colors ${
                    isRemixButtonDisabled
                      ? "bg-blue-500 opacity-50 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  <span className="mr-2">Remix</span>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17.65 6.35C16.2 4.9 14.21 4 12 4C7.58 4 4.01 7.58 4.01 12C4.01 16.42 7.58 20 12 20C15.73 20 18.84 17.45 19.73 14H17.65C16.83 16.33 14.61 18 12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C13.66 6 15.14 6.69 16.22 7.78L13 11H20V4L17.65 6.35Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Original image button */}
            {isRemixMode && (
              <div className="w-[20vw] mt-4">
                <button
                  onClick={toggleOriginal}
                  className="flex items-center gap-2 w-full p-3 rounded-md hover:bg-zinc-700 transition-colors"
                >
                  {showOriginal ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  <span>Original image</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Original image section */}
        {isRemixMode && showOriginal && (
          <div
            ref={contentRef}
            className="flex flex-col md:flex-row w-full pl-[7%] pb-6 mt-8 max-h-[70vh] overflow-y-auto"
            style={{
              overscrollBehavior: "contain",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* User info */}
            <div className="w-full md:w-1/2 pr-0 md:pr-4 pt-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <Image src="/artstation/usr.png" alt="User" width={40} height={40} />
                </div>
                <span className="text-sm font-thin text-white">{originalImage.username}</span>

                <div className="flex space-x-8 pl-20">
                  <button
                    onClick={(e) => handleShareClick(originalImage, e)}
                    className="flex items-center space-x-2 px-3 py-1 rounded-md border border-[#919191] bg-[#1f1f1f] hover:bg-[#3D3D3D] hover:border-white transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                  <button
                    onClick={() => handleBookmarkToggle()}
                    className="flex items-center space-x-2 px-3 py-1 rounded-md hover:bg-[#3D3D3D] transition-colors"
                  >
                    <Bookmark className="w-4 h-4" />
                    <span>Bookmark</span>
                  </button>
                  <button
                    onClick={() => handleLikeToggle()}
                    className="text-[#777777] hover:text-red-600 transition-colors"
                  >
                    <Heart className="w-6 h-6" />
                  </button>
                  <button onClick={handleDownloadClick} className="text-[#777777] hover:text-white transition-colors">
                    <Download className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-300">
                  <span className="font-semibold">Model:</span> {originalImage.model}
                </p>
              </div>

              <div className="mb-6">
                <p className="text-gray-300 mb-1 font-semibold">Prompt:</p>
                <p className="text-gray-200 text-sm leading-relaxed">{originalImage.prompt}</p>
              </div>
            </div>

            {/* Original image */}
            <div className="w-full md:w-1/2 relative">
              <div className="relative aspect-square md:aspect-auto md:h-[70vh]">
                <Image
                  src={originalImage.src || "/placeholder.svg"}
                  alt={originalImage.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "contain" }}
                  className="pt-10 pb-10"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
