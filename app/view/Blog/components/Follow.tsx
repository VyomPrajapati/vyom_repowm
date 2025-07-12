"use client"

import { useState, useEffect } from "react"

export default function FollowSection() {
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

  const socialItems = [
    {
      name: "YouTube",
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-auto text-red-600" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      description: "Subscribe to join a community of creative developers and learn the latest in Google technology.",
    },
    {
      name: "Instagram",
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-auto text-pink-500" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
      description: "Follow and discover developer resources, community events, and inspirational stories.",
    },
    {
      name: "LinkedIn",
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-auto text-blue-600" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      description: "Join a community of creative developers and learn how to use the latest in technology.",
    },
  ]

  return (
    <div className="md:max-w-5xl mx-10 md:mx-auto  md:py-20  rounded-lg mb-20">
      <h2 className="text-4xl md:text-5xl font-thin text-center text-white mb-6 md:mb-16">Follow txt</h2>

      {/* Responsive grid - 1 column on mobile, 2 columns on tablet, 3 columns on desktop */}
      <div className={`grid grid-cols-1 ${isMobile ? "" : isTablet ? "md:grid-cols-2" : "md:grid-cols-3"} gap-6`}>
        {/* Social Media Sections */}
        {socialItems.map((social) => (
          <div key={social.name} className="bg-black py-8 px-6 rounded-lg shadow-sm border border-[#DADCE0]">
            <div className="flex justify-start mb-6">{social.icon}</div>
            <p className="text-white text-start font-extralight">{social.description}</p>
            <div className="flex justify-start mt-8">
              <button className="border bg-white rounded-md py-2 px-8 text-[#1A73E8] hover:border-[#1A73E8]">
                Learn more
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Email Subscription */}
      <div className="mt-10">
        <div className="bg-black py-8 pl-8 pr-4 rounded-lg shadow-sm max-w-[300px] mx-auto border border-[#DADCE0] h-auto">
          <div className="flex justify-start mb-6">
            <svg
              viewBox="0 0 24 24"
              className="w-10 h-auto text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <p className="text-white text-start mb-10">
            Subscribe to Google for Developers news. Your information will be used in accordance with Google&apos;s
            privacy policy.
          </p>
          <div className="flex justify-start">
            <button className="border bg-white rounded-md py-2 px-8 text-[#1A73E8] hover:border-[#1A73E8]">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
