"use client"

import { useState, useEffect, useRef } from "react"
import { User, ChevronDown, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import Hamburger from "./Hamburger"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "@/database/firebase"
import { NAV_ROUTES } from "@/routes/routes"
import { getImageUrl } from "@/routes/imageroute"
import ImageGeneration from "./feature-categories/ImageGeneration"
import BrandingKit from "./feature-categories/BrandingKit"
import VideoGeneration from "./feature-categories/VideoGeneration"
import AudioGeneration from "./feature-categories/AudioGeneration"
import FilmingTools from "./feature-categories/FilmingTools"
import ThreeDDesign from "./feature-categories/ThreeDDesign"
import { useTokenUpdate } from "@/app/utils/tokenManager"

export default function NavigationFull() {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState<boolean>(false)
  const [userEmail, setUserEmail] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [showUsernamePrompt, setShowUsernamePrompt] = useState<boolean>(false)
  const availableTokens = useTokenUpdate()

  const headerRef = useRef<HTMLElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUserEmail(firebaseUser.email || "")
        const storedUsername = localStorage.getItem("username")
        if (storedUsername) {
          setUsername(storedUsername)
        } else {
          setShowUsernamePrompt(true)
        }
      } else {
        const otpEmail = localStorage.getItem("otpUser")
        if (otpEmail) {
          setUserEmail(otpEmail)
          const storedUsername = localStorage.getItem("username")
          if (storedUsername) {
            setUsername(storedUsername)
          } else {
            setShowUsernamePrompt(true)
          }
        }
      }
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch { }

    localStorage.removeItem("otpUser")
    localStorage.removeItem("username")
    localStorage.removeItem("slug")

    setUserEmail("")
    setUsername("")
    router.push("/")
  }

  const handleLogoutFromPrompt = () => {
    handleLogout()
    setShowUsernamePrompt(false)
  }

  const handleSettings = () => {
    console.log("Settings clicked")
    // Implement settings functionality
    setIsUserDropdownOpen(false)
  }

  const handleUpgradePlan = () => {
    router.push(NAV_ROUTES.PRICING)
    setIsUserDropdownOpen(false)
  }

  const toggleDropdown = (dropdown: string): void => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(dropdown)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
        setIsUserDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const needsUsername = localStorage.getItem("needsUsername")
    if (needsUsername === "true") {
      setShowUsernamePrompt(true)
      localStorage.removeItem("needsUsername")
    }
  }, [])

  const backgroundStyle = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundBlendMode: "overlay",
  }

  return (
    <div className="bg-[#000000] text-white">
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-3xl shadow-lg"
        style={backgroundStyle}
      >
        <div className="flex items-center justify-between px-4 lg:px-6 xl:px-8 py-2 lg:py-2 ">
          {/* Left Section - Logo and Brand */}
          <div className="flex items-center space-x-2 lg:space-x-2">
            <button
              onClick={() => {
                setIsNavOpen((prev) => !prev)
                setIsUserDropdownOpen(false)
                setActiveDropdown(null)
              }}
              className="p-2 rounded-lg duration-200"
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lg:w-6 lg:h-6"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>

            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push("/")}>
              <Image
                src={getImageUrl("core", "logo") || "/placeholder.svg"}
                width={28}
                height={28}
                alt="logo"
                className="lg:w-10 lg:h-10"
              />
            </div>
          </div>

          {/* Center Section - Navigation */}
          <nav className="hidden md:flex items-center space-x-6 md:space-x-20 ml-10 font-poppins ">
            <div className="relative">
              <button
                onClick={() => {
                  toggleDropdown("features")
                  setIsNavOpen(false)
                }}
                className="flex items-center space-x-1 hover:text-gray-300 transition-colors duration-200 py-2"
              >
                <span className="text-sm xl:text-base">Features</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === "features" ? "rotate-180" : ""
                    }`}
                />
              </button>
            </div>

            <Link
              href={NAV_ROUTES.TEMPLATES}
              className="hover:text-gray-300 transition-colors duration-200 text-sm xl:text-base py-2"
            >
              Templates
            </Link>

            <Link
              href={NAV_ROUTES.PRICING}
              className="hover:text-gray-300 transition-colors duration-200 text-sm xl:text-base py-2"
            >
              Pricing
            </Link>

            <Link
              href={NAV_ROUTES.ART_STATION}
              className="hover:text-gray-300 transition-colors duration-200 text-sm xl:text-base py-2"
            >
              Art Station
            </Link>
          </nav>

          {/* Right Section - Tokens and User */}
          <div className="flex items-center space-x-3 lg:space-x-4">
            {/* Token Display */}
            <div className="flex items-center space-x-0 bg-gradient-to-b from-[#6C3BFF] to-[#412399] backdrop-blur-sm border-none rounded-lg px-3 py-1.5 lg:px-4 lg:py-1.5">
              <Image src="/core/newToken.png" alt="" width={20} height={20} className="mr-2" />
              <span className="text-xs lg:text-sm font-normal text-blue-100">
                <span>{availableTokens}</span>
              </span>
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                className="p-2 rounded-full hover:bg-gray-800/50 transition-colors duration-200 border border-[#6A6A6A] hover:bg-gradient-to-b from-[#6C3BFF] to-[#412399] hover:ease-in-out"
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              >
                <User className="w-5 h-5 lg:w-5 lg:h-5" />
              </button>

              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-auto md:w-80 bg-white/30 md:bg-white/10 backdrop-blur-xl rounded-2xl shadow-3xl border border-white/20 z-50 animate-in slide-in-from-top-2 duration-200">
                  {/* Profile Header */}
                  <div className="p-2 py-4 md:p-6">
                    <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-6">
                      {/* Profile Photo */}
                      <div className="w-6 h-6 md:w-10 md:h-10 rounded-full overflow-hidden bg-gray-600 flex-shrink-0">
                        <Image
                          src={getImageUrl("core", "profile") || "/placeholder.svg"}
                          alt="Profile"
                          width={48}
                          height={48}
                          className="w-auto h-auto object-cover"
                        />
                      </div>
                      {/* User Info */}
                      <div className="flex-1">
                        <h2 className="text-xs md:text-sm font-semibold text-white ">{username || "aryan"}</h2>
                        <p className="text-xs md:text-xs text-gray-400">{userEmail || "aryan@gmail.com"}</p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/10 mb-2 md:mb-4"></div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      {/* Settings Button */}
                      <button
                        onClick={handleSettings}
                        className="w-full flex items-center gap-2 py-3 md:p-2  pl-4 bg-[#3A3A3A] hover:bg-[#4A4A4A] rounded-lg transition-colors duration-200"
                      >
                        <Settings className="w-5 h-5 text-white" />
                        <span className="text-sm md:text-lg font-normal font-sm text-white">Setting</span>
                      </button>

                      {/* Upgrade Plan Button */}
                      <button
                        onClick={handleUpgradePlan}
                        className="w-full flex items-center gap-2 py-3 md:p-2 pl-4 bg-gradient-to-r from-[#6C3BFF] to-[#412399] hover:from-[#5A2FE6] hover:to-[#3A1F8A] rounded-lg transition-all duration-200"
                      >
                        <Image
                          src={getImageUrl("core", "diamond") || "/placeholder.svg"}
                          alt="Diamond"
                          width={16}
                          height={16}
                          className=""
                        />
                        <span className="text-sm md:text-lg font-normal font-sm text-white">Upgrade Your Plan</span>
                      </button>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/10  my-3 md:my-4"></div>

                    {/* Logout Button */}
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsUserDropdownOpen(false)
                      }}
                      className="w-full flex items-center gap-2 p-2 justify-center bg-gradient-to-r from-[#DC2626] to-[#B91C1C] hover:from-[#EF4444] hover:to-[#DC2626] rounded-lg transition-all duration-200"
                    >
                      <LogOut className="w-4 h-4 md:w-6 md:h-6 text-white" />
                      <span className="text-sm md:text-lg font-medium text-white">Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Features Dropdown */}
        {activeDropdown === "features" && (
          <div
            ref={dropdownRef}
            className="absolute left-0 right-0 top-full z-50 bg-black/95 backdrop-blur-xl shadow-lg border-t border-gray-800/50 animate-in slide-in-from-top-2 duration-300"
            style={backgroundStyle}
          >
            <div className="container mx-auto px-8 md:px-6 xl:px-8 py-6 lg:py-8">
              <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 gap-6 lg:gap-8 max-w-auto mx-auto font-poppins">
                <div className="col-span-1">
                  <ImageGeneration />
                </div>
                <div className="col-span-1">
                  <BrandingKit />
                </div>
                <div className="col-span-1">
                  <VideoGeneration />
                </div>
                <div className="col-span-1">
                  <AudioGeneration />
                </div>
                <div className="col-span-1">
                  <FilmingTools />
                </div>
                <div className="col-span-1">
                  <ThreeDDesign />
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <Hamburger isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />

      {/* Updated User Profile Modal */}
      {showUsernamePrompt && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#2A2A2A] backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 text-white w-full max-w-sm">
            {/* Profile Header */}
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                {/* Profile Photo */}
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-600 flex-shrink-0">
                  <Image
                    src={getImageUrl("core", "profile") || "/placeholder.svg"}
                    alt="Profile"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* User Info */}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white mb-1">{username || "Annette Black"}</h2>
                  <p className="text-sm text-gray-400">{userEmail || "Annette.Black@example.com"}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-600 mb-6"></div>

              {/* Action Buttons */}
              <div className="space-y-4">
                {/* Settings Button */}
                <button
                  onClick={handleSettings}
                  className="w-full flex items-center gap-4 p-4 bg-[#3A3A3A] hover:bg-[#4A4A4A] rounded-xl transition-colors duration-200"
                >
                  <Settings className="w-6 h-6 text-white" />
                  <span className="text-lg font-medium text-white">Setting</span>
                </button>

                {/* Upgrade Plan Button */}
                <button
                  onClick={handleUpgradePlan}
                  className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-[#6C3BFF] to-[#412399] hover:from-[#5A2FE6] hover:to-[#3A1F8A] rounded-xl transition-all duration-200"
                >
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 3h2l.4 2H19a1 1 0 0 1 .98 1.2l-1 5A1 1 0 0 1 18 12H9.4l.6 3H18v2H8a1 1 0 0 1-.98-1.2L9.8 5H6V3zm2.5 7h8.1l.5-2.5H8.1L8.5 10z" />
                  </svg>
                  <span className="text-lg font-medium text-white">Upgrade Your Plan</span>
                </button>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-600 my-6"></div>

              {/* Logout Button */}
              <button
                onClick={handleLogoutFromPrompt}
                className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] hover:from-[#EF4444] hover:to-[#DC2626] rounded-xl transition-all duration-200"
              >
                <LogOut className="w-6 h-6 text-white" />
                <span className="text-lg font-medium text-white">Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
