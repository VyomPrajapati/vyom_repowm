"use client"

import type React from "react"
import { forwardRef, useRef, useEffect } from "react"

interface ScrollableContainerProps {
  children: React.ReactNode
}

const ScrollableContainer = forwardRef<HTMLDivElement, ScrollableContainerProps>(({ children }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const touchStartX = useRef(0)

  useEffect(() => {
    const container = containerRef.current

    // Mouse events for desktop
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true
      startX.current = e.pageX - (container?.offsetLeft || 0)
      scrollLeft.current = container?.scrollLeft || 0
      container?.classList.add("cursor-grabbing")
    }

    const handleMouseUp = () => {
      isDragging.current = false
      container?.classList.remove("cursor-grabbing")
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      const x = e.pageX - (container?.offsetLeft || 0)
      const walk = (x - startX.current) * 1
      if (container) {
        container.scrollLeft = scrollLeft.current - walk
      }
    }

    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
      scrollLeft.current = container?.scrollLeft || 0
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!container) return
      const touchCurrentX = e.touches[0].clientX
      const walk = (touchStartX.current - touchCurrentX) * 0.8 // smoother swipe feel

      container.scrollLeft = scrollLeft.current + walk
    }

    container?.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mousemove", handleMouseMove)

    container?.addEventListener("touchstart", handleTouchStart)
    container?.addEventListener("touchmove", handleTouchMove)

    return () => {
      container?.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mousemove", handleMouseMove)

      container?.removeEventListener("touchstart", handleTouchStart)
      container?.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  return (
    <div
      ref={(node) => {
        containerRef.current = node
        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      }}
      className="flex overflow-x-auto scrollbar-hide cursor-grab pb-2 -mx-4 px-4"
      style={{
        scrollBehavior: "smooth",
        WebkitOverflowScrolling: "touch",
        scrollSnapType: "x mandatory",
      }}
    >
      <div className="flex gap-4 sm:gap-6 pb-4 snap-x snap-mandatory">{children}</div>

    </div>
  )
})

ScrollableContainer.displayName = "ScrollableContainer"

export default ScrollableContainer
