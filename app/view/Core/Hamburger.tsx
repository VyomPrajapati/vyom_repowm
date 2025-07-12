"use client"

import type React from "react"

import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, X, Settings, LogOut, Home, FileText, Bookmark } from "lucide-react"
import { auth } from "@/database/firebase"
import { signOut } from "firebase/auth"
import { getImageUrl } from "@/routes/imageroute"
import SettingNavigation from "./Setting"
import { IconBrandBlogger, IconBrandX, IconBrandYoutube, IconBrandInstagram } from "@tabler/icons-react"
import Link from "next/link"
import { NAV_ROUTES } from "@/routes/routes"
import { useTokenUpdate } from "@/app/utils/tokenManager"

interface NavItem {
  label: string
  href: string
  icon?: React.ReactNode
}

interface SocialLink {
  icon: React.ElementType
  href: string
  hoverColor: string
  borderHoverColor: string
  glowColor: string
}

const sidebarItems: NavItem[] = [
  { label: "Home", href: "/view/home/${userSlug}", icon: <Home className="w-5 h-5" /> },
  {
    label: "Templates",
    href: NAV_ROUTES.TEMPLATES,
    icon: <FileText className="w-5 h-5" />,
  },
  {
    label: "Bookmark",
    href: NAV_ROUTES.BOOKMARK,
    icon: <Bookmark className="w-5 h-5" />,
  },
]

const plansetting: NavItem[] = [
  {
    label: "Plans",
    href: NAV_ROUTES.PRICING,
    icon: (
      <Image
        src={getImageUrl("core", "diamond") || "/placeholder.svg"}
        alt="Diamond"
        width={20}
        height={20}
        className=""
      />
    ),
  },
  {
    label: "Setting",
    href: "NAV_ROUTES",
    icon: <Settings className="w-5 h-5" />,
  },
]

const socialLinks: SocialLink[] = [
  {
    icon: IconBrandX,
    href: "/X",
    hoverColor: "hover:text-blue-500",
    borderHoverColor: "hover:border-blue-500",
    glowColor: "hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]",
  },
  {
    icon: IconBrandInstagram,
    href: "Instagram",
    hoverColor: "hover:text-pink-500",
    borderHoverColor: "hover:border-pink-500",
    glowColor: "hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]",
  },
  {
    icon: IconBrandBlogger,
    href: "Blogger",
    hoverColor: "hover:text-green-500",
    borderHoverColor: "hover:border-green-500",
    glowColor: "hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]",
  },
  {
    icon: IconBrandYoutube,
    href: "Youtube",
    hoverColor: "hover:text-red-500",
    borderHoverColor: "hover:border-red-500",
    glowColor: "hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]",
  },
]

export default function Hamburger({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [username, setUsername] = useState("")
  const availableTokens = useTokenUpdate()
  // const scrollRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleSettingsClick = () => {
    setIsSettingsOpen(!isSettingsOpen)
  }

  const handleSettingsClose = () => {
    setIsSettingsOpen(false)
  }

  useEffect(() => {
    if (!isOpen && isSettingsOpen) {
      setIsSettingsOpen(false)
    }
  }, [isOpen, isSettingsOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    const storedUsername = localStorage.getItem("username")
    if (storedUsername) {
      setUsername(storedUsername)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem("otpUser")
      localStorage.removeItem("username")
      localStorage.removeItem("slug")
      router.push("/")
    } catch (err) {
      console.error("Logout failed:", err)
    }
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => {
            onClose()
            setIsSettingsOpen(false)
          }}
        />
      )}
      <nav
        className={`fixed top-0 left-0 bottom-0 w-[90vw] max-w-[320px] bg-[#101011] transform transition-transform duration-300 ease-in-out z-40 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        
        <div className="h-full flex flex-col font-poppins bg-[#101011] overflow-y-auto">
          {/* Header with Close Button */}
          <div className="flex justify-end p-4 bg-[#101011]">
            <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="flex-1 px-4 pb-4 space-y-4 bg-[#101011] ">
            {/* Profile Section */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-full flex items-center justify-between p-4 rounded-lg bg-[#272727] hover:bg-[#333] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full  flex items-center justify-center">
                    <Image
                      src={getImageUrl("core", "profile") || "/placeholder.svg"}
                      alt="Profile"
                      width={24}
                      height={24}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <span className="text-white font-medium">Profile</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-white transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isProfileOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-[#272727] rounded-lg border border-gray-700 shadow-xl z-50">
                  <div className="p-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1e1e1e]">
                      <Image
                        src={getImageUrl("core", "profile") || "/placeholder.svg"}
                        alt="User"
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm text-white">
                          <span>{username || "User"}</span>
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <Image
                            src={getImageUrl("core", "coins") || "/placeholder.svg"}
                            alt="coins"
                            width={16}
                            height={16}
                          />
                          <div className="bg-gray-800 rounded px-2 py-0.5 text-xs">{availableTokens}</div>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-700 my-3" />
                    <button
                      onClick={handleSettingsClick}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-700 transition-colors text-white"
                    >
                      <Settings className="w-5 h-5" />
                      <span className="text-sm">Settings</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-700 transition-colors text-white"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              )}
                          <div className="border-b border-[#272727] w-[97%] mt-[5%] mx-auto"></div>

            </div>

            {/* Token Display */}
            <div className="bg-[#272727] rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2  ">
                  <Image src={getImageUrl("core", "coins") || "/placeholder.svg"} alt="coins" width={20} height={20} />
                  <span className="text-white font-medium">{availableTokens}</span>
                </div>
                <button
                  onClick={() => router.push(NAV_ROUTES.PRICING)}
                  className="flex items-center bg-gradient-to-b from-[#6C3BFF] to-[#412399] text-white text-sm px-4 py-2 rounded-xl gap-2 font-medium"
                >
                  <Image
                    src={getImageUrl("core", "diamond") || "/placeholder.svg"}
                    alt="diamond"
                    width={16}
                    height={16}
                  />
                  Upgrade
                </button>
              </div>
              <div className="text-sm text-[#00F0FF]">
                Current Plan <span className="text-gray-400">{">"}</span> <span className="text-white">Basic</span>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="space-y-3">
            <div className="border-b border-[#272727] w-[97%] mt-[5%] mx-auto"></div>

              {sidebarItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 p-4 rounded-lg bg-[#2a2a2a] hover:bg-gradient-to-r hover:from-[#5AD7FF] hover:to-[#656BF5] transition-all duration-200 text-white"
                  onClick={() => {
                    onClose()
                    setIsSettingsOpen(false)
                  }}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
                          <div className="border-b border-[#272727] w-[97%] mt-[5%] mx-auto"></div>

            </div>
              
            {/* Plans and Settings */}
            <div className="space-y-3">
              {plansetting.map((item) =>
                item.label === "Setting" ? (
                  <button
                    key={item.label}
                    className="w-full flex items-center gap-4 p-4 rounded-lg bg-[#272727] hover:bg-gradient-to-r hover:from-[#5AD7FF] hover:to-[#656BF5] transition-all duration-200 text-white text-left"
                    onClick={() => {
                      handleSettingsClick()
                    }}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-lg bg-[#2a2a2a] hover:bg-gradient-to-r hover:from-[#5AD7FF] hover:to-[#656BF5] transition-all duration-200 text-white"
                    onClick={() => {
                      onClose()
                      setIsSettingsOpen(false)
                    }}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ),
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#272727]">
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Image
                  src={getImageUrl("core", "logo") || "/placeholder.svg"}
                  alt="WildMind Logo"
                  width={32}
                  height={32}
                />
                <span className="text-white font-bold text-4xl">WildMind</span>
              </div>
              <p className="text-xs text-[#9F9F9F] mb-4">We growing up your business with personal AI manager</p>
            </div>

            {/* Footer Links */}
            <div className="flex justify-center gap-4 text-xs text-white mb-4">
              <a href="#" className="hover:text-gray-300">
                Terms of uses
              </a>
              <span>•</span>
              <a href="#" className="hover:text-gray-300">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-gray-300">
                DMCA
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center gap-3">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border border-[#525252] bg-[#1B1B1C] 
                  transition-all duration-200 hover:scale-110 ${social.hoverColor} ${social.borderHoverColor} ${social.glowColor}`}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Settings UI */}
        <SettingNavigation isOpen={isSettingsOpen} onClose={handleSettingsClose} />
      </nav>
    </>
  )
}
