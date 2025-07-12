"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { format } from "date-fns"
import NavigationFull from "../Core/NavigationFull"
import { BookmarkedImage, bookmarkStore, groupBookmarksByDate } from "../../utils/bookmarkUtils"
import { useRouter } from "next/navigation"
import { NAV_ROUTES } from "@/routes/routes"
import ProtectedRoute from "@/app/utils/ProtectedRoute"


export default function Bookmark() {
  const [dateGroups, setDateGroups] = useState<{ date: Date; images: BookmarkedImage[] }[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router=useRouter();
  
  useEffect(() => {
    // Load bookmarks
    const bookmarks = bookmarkStore.getBookmarks()
    setDateGroups(groupBookmarksByDate(bookmarks))
    setIsLoading(false)
    
    // Setup event listener for bookmark changes
    const handleStorageChange = () => {
      const bookmarks = bookmarkStore.getBookmarks()
      setDateGroups(groupBookmarksByDate(bookmarks))
    }
    
    window.addEventListener("bookmarkUpdated", handleStorageChange)
    
    return () => {
      window.removeEventListener("bookmarkUpdated", handleStorageChange)
    }
  }, [])
  
  return (
    <>
    <ProtectedRoute>

    <NavigationFull />
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto mt-16 md:mt-20">
          
        <h1 className="text-2xl md:text-5xl font-bold text-center mb-8 overflow-hidden">#Bookmark</h1>
         
        <div className="mb-0 md:mb-4">
          <p className="text-white text-center md:text-left">Recent Bookmarks</p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : dateGroups.length > 0 ? (
          dateGroups.map(group => (
            <div key={group.date.toISOString()} className="mb-12">
              <h2 className="text-lg md:text-xl font-thin md:font-medium mb-2 text-center md:text-left">{format(group.date, "EEEE, d MMMM yyyy")}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {group.images.map(image => (
                  <div 
                    key={`${image.id}-${image.bookmarkedAt}`}
                    className="relative aspect-square rounded-lg overflow-hidden bg-gray-800"
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-400">No bookmarks yet</p>
            <button
             onClick={() => router.push(NAV_ROUTES.ART_STATION)}
             className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Explore ArtStation
            </button>
          </div>
        )}
        
        {/* Loading indicator */}
        <div className="flex flex-col items-center justify-center py-10">
          <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-b-2 border-t-[#5AD7FF] border-b-[#656BF5] animate-spin"></div>
          <div className="absolute inset-2 rounded-full bg-gradient-to-b from-[#5AD7FF] to-[#656BF5] "></div>
          </div>
          <p className="mt-4 text-gray-400">Loading more...</p>
        </div>
      </div>
    </div>
    </ProtectedRoute>
    </>
  )
}