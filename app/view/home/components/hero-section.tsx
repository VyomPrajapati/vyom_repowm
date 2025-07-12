"use client"
import { useRef, useEffect } from "react"

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Play video
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video autoplay failed:", error)
      })
    }
  }, [])

  return (
    <section className="relative w-full overflow-hidden bg-[#0a0f1a]">
      {/* Background glow gradient */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2b2f51] via-[#1d223e] to-[#0a0f1a]" />

      {/* Bottom fade into black */}
      <div className="absolute bottom-0 left-0 w-full h-48 z-10 bg-gradient-to-b from-transparent via-[#1d223e] to-black" />

      {/* Hero video section */}
      <div className="relative z-20 w-auto   md:max-w-[1286px] h-[160px] md:h-[269px] mt-[4.5rem] md:mt-24 mb-6 md:mb-24  mx-2 md:mx-auto overflow-hidden rounded-[15px] md:rounded-[25px] shadow-xl">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          width="1286"
          height="269"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/home/cosmic-clouds.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30" />

        {/* Text */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1 className="text-xl md:text-4xl lg:text-6xl font-bold text-white z-10 text-center">
            Introducing <span className="text-amber-400">Text to Image</span>
          </h1>
        </div>
      </div>
    </section>
  )
}
