// app/utils/bookmarkUtils.ts
import { format } from "date-fns"

export interface BookmarkedImage {
  id: string
  src: string
  alt: string
  username: string
  model: string
  prompt: string
  bookmarkedAt: string
}

// Create a simple in-memory store for bookmarks
let bookmarkedImages: BookmarkedImage[] = []

// Bookmark store functions
export const bookmarkStore = {
  getBookmarks: () => {
    // Try to load from localStorage on client
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("bookmarkedImages")
      if (stored) {
        bookmarkedImages = JSON.parse(stored)
      }
    }
    return bookmarkedImages
  },
  
  addBookmark: (image: Omit<BookmarkedImage, "bookmarkedAt">) => {
    // Don't add if already bookmarked
    if (bookmarkStore.isBookmarked(image.id)) return
    
    const newBookmark = {
      ...image,
      bookmarkedAt: new Date().toISOString()
    }
    
    bookmarkedImages = [...bookmarkedImages, newBookmark]
    
    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("bookmarkedImages", JSON.stringify(bookmarkedImages))
    }
    
    return newBookmark
  },
  
  removeBookmark: (imageId: string) => {
    bookmarkedImages = bookmarkedImages.filter(img => img.id !== imageId)
    
    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("bookmarkedImages", JSON.stringify(bookmarkedImages))
    }
  },
  
  isBookmarked: (imageId: string) => {
    return bookmarkedImages.some(img => img.id === imageId)
  }
}

// Group bookmarks by date
export const groupBookmarksByDate = (bookmarks: BookmarkedImage[]) => {
  const grouped: Record<string, BookmarkedImage[]> = {}
  
  bookmarks.forEach(bookmark => {
    const dateStr = format(new Date(bookmark.bookmarkedAt), "yyyy-MM-dd")
    
    if (!grouped[dateStr]) {
      grouped[dateStr] = []
    }
    
    grouped[dateStr].push(bookmark)
  })
  
  // Convert to array of date groups sorted by date (newest first)
  return Object.entries(grouped)
    .map(([dateStr, images]) => ({
      date: new Date(dateStr),
      images
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
}