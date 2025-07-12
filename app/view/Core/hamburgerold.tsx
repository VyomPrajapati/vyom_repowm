"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, X, Settings, LogOut, Home,  FileText, Bookmark } from 'lucide-react';
import { auth } from "@/database/firebase";
import { signOut } from "firebase/auth";
import { getImageUrl } from "@/routes/imageroute";
import SettingNavigation from "./Setting";

import {
  IconBrandBlogger,
  IconBrandX,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import Link from "next/link";
import { NAV_ROUTES } from "@/routes/routes";
import { useTokenUpdate } from "@/app/utils/tokenManager";

// Removed unused interface NavbarProps


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
  { label: "Home", href: "/view/home/${userSlug}", icon: <Home className="w-6 h-6" /> },
  // { label: "Apps", href: "/apps", icon: <Grid className="w-5 h-5" /> },
  // { label: "Models", href: "/models", icon: <Boxes className="w-5 h-5" /> },
  {
    label: "Templates",
    href: NAV_ROUTES.TEMPLATES,
    icon: <FileText className="w-6 h-6" />,
  },
  // {
  //   label: "Projects",
  //   href: "/projects",
  //   icon: <FolderKanban className="w-6 h-6" />,
  // },
  {
    label: "Bookmark",
    href: NAV_ROUTES.BOOKMARK,
    icon: <Bookmark className="w-6 h-6" />,
  },
]

const plansetting: NavItem[] = [
  {
    label: "Plans",
    href: NAV_ROUTES.PRICING,
    icon: <Image src={getImageUrl("core", "diamond") || "/placeholder.svg"} alt="User" width={20} height={20} className="" />,
  },
  {
    label: "Settings",
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
    hoverColor: "hover:text-pink-800",
    borderHoverColor: "hover:border-pink-800",
    glowColor: "hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]",
  },
  {
    icon: IconBrandYoutube,
    href: "Youtube",
    hoverColor: "hover:text-red-700",
    borderHoverColor: "hover:border-red-700",
    glowColor: "hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]",
  },
  {
    icon: IconBrandBlogger,
    href: "Blogger",
    hoverColor: "hover:text-green-500",
    borderHoverColor: "hover:border-green-500",
    glowColor: "hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]",
  },
]

export default function Hamburger({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(true);
  // Removed unused state variable activeItem
  
  const [username, setUsername] = useState("");
  const availableTokens = useTokenUpdate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSettingsClick = () => {
    setIsSettingsOpen(!isSettingsOpen)
  }

  // Function to handle settings close
  const handleSettingsClose = () => {
    setIsSettingsOpen(false)
  }

  // Close settings when hamburger closes
  useEffect(() => {
    if (!isOpen && isSettingsOpen) {
      setIsSettingsOpen(false)
    }
  }, [isOpen, isSettingsOpen])

  // Prevent body scrolling when hamburger menu is open
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

  // Handle scroll to show/hide close button
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      if (scrollContainer.scrollTop > 50) {
        setShowCloseButton(false)
      } else {
        setShowCloseButton(true)
      }
    }

    scrollContainer.addEventListener("scroll", handleScroll)
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      
      // Preserve user tokens by only removing auth-related items
      localStorage.removeItem("otpUser");
      localStorage.removeItem("username");
      localStorage.removeItem("slug");
      
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => {
            onClose();
            setIsSettingsOpen(false);
          }}
        />
      )}

      <nav
        className={`fixed top-0 left-0 bottom-0 mobile:w-[90vw] max-w-[280px] min-w-[250px] bg-[#171717] border-r border-gray-800 transform transition-transform duration-300 ease-in-out z-40 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col overflow-hidden font-poppins pt-4">
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto overflow-x-hidden p-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
          >
            {/* Close */}
            {showCloseButton && (
              <button onClick={onClose} className="absolute top-4 right-4 mt-[18%] rounded-lg">
                <X className="w-8 h-8" />
              </button>
            )}

            {/* Profile Section */}
            <div className="relative mt-[30%]">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-full flex items-center justify-between px-3 py-3 rounded-lg bg-[#252525] hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3 ml-[2%]">
                  <Image src={getImageUrl("core", "profile") || "/placeholder.svg"} alt="User" width={28} height={28} className="rounded-full object-cover" />
                  <span>Profile</span>
                </div>
                <ChevronDown className={`w-6 h-6 transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown */}
              {isProfileOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-[#252525] rounded-lg border border-gray-800 shadow-xl z-50">
                  <div className="p-2">
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-[#1e1e1e]">
                      <Image
                        src={getImageUrl("core", "profile") || "/placeholder.svg"}
                        alt="User"
                        width={28}
                        height={28}
                        className="rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm">
                          <span>{username || "User"}</span>
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <Image src={getImageUrl("core", "coins") || "/placeholder.svg"} alt="coins" width={16} height={16} />
                          <div className="bg-gray-800 rounded px-1 text-xs">{availableTokens}</div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-800 my-2" />

                    <button
                      onClick={handleSettingsClick}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-500/20 transition-colors"
                    >
                      <Settings className="w-5 h-5" />
                      <span className="text-sm">Settings</span>
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-500/20 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

              <div className="flex items-center  bg-gray rounded-lg px-4 ml-auto md:ml-7 py-1 w-full max-w-[220px] md:max-w-[300px] mt-2">
                            {/* "20" Coin Badge */}
                <div className="flex items-center gap-1 border-2 border-[#484848] bg-black text-white rounded-full px-2 pr-6 py-1 text-xs">
                  <Image
                    src={getImageUrl("core", "coins") || "/placeholder.svg"}
                    alt="coins"
                    width={20}
                    height={20}
                  />
                  <span>{availableTokens}</span>
                </div>

                {/* Upgrade Button */}
                <button
                  onClick={() => router.push(NAV_ROUTES.PRICING)}
                  className="flex items-center bg-gradient-to-b from-[#5AD7FF] to-[#656BF5] text-white text-xs px-3 py-[0.3rem] rounded-full gap-1 whitespace-nowrap -ml-5"
                >
                  <Image
                    src={getImageUrl("core", "diamond") || "/placeholder.svg"}
                    alt="diamond"
                    width={16}
                    height={14}
                  />
                  Upgrade
                </button>
              </div>



             {/* Current Plan Text */}
             <div className="text-[11px] ml-[26%] text-white mt-[1%]">Current Plan {">"} Basic</div>

              <div className="border-b-2 border-[#5A5A5A] bg-[#252525] w-[100vw] mt-[2%] -ml-[6%]"></div>

            {/* Navigation Items */}
            <div className="flex flex-col gap-1 mt-[4%] w-[200%] -ml-[6%] font-poppins">
              {sidebarItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 p-3 py-[2.5%] transition-colors pl-[6%] text-white hover:bg-gradient-to-b from-[#5AD7FF] to-[#656BF5]"
                  onClick={() => {
                    onClose()
                    setIsSettingsOpen(false)
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
            <div className="border-b-2 border-[#5A5A5A] bg-[#252525] w-[100vw] mt-[5%] -ml-[6%]"></div>



            {/* Plans and Settings Section - Now Scrollable */}
            <div className="flex flex-col gap-1 mt-[6%] w-[200%] -ml-[6%] font-poppins max-h-[30vh] overflow-y-auto">
              {plansetting.map((item) =>
                item.label === "Settings" ? (
                  <button
                    key={item.label}
                    className="flex items-center gap-4 p-3 py-[2.5%] transition-colors pl-[6%] text-white hover:bg-gradient-to-b from-[#5AD7FF] to-[#656BF5] text-left"
                    onClick={() => {
                      handleSettingsClick()
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 p-3 py-[2.5%] transition-colors pl-[6%] text-white hover:bg-gradient-to-b from-[#5AD7FF] to-[#656BF5]"
                    onClick={() => {
                      onClose()
                      setIsSettingsOpen(false)
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ),
              )}
            </div>

            {/* WildMind Footer - Fixed at bottom */}
          <div className="bg-[#171717] p-[0%] font-poppins border-t border-gray-800 pt-4 w-[100vw] -ml-[6%] mt-auto"></div>
            <div className="flex flex-col items-start">
              {/* Logo */}
              <div className="flex items-center gap-[3%] pb-4 justify-center pl-[0vw]">
                <Image src={getImageUrl("core", "logo") || "/placeholder.svg"} alt="WildMind Logo" width={36} height={36} className="" />
                <span className="text-white font-bold text-3xl">WildMind</span>
              </div>

              {/* Tagline */}
              <p className="flex items-center justify-center -mt-[1vh] text-xs text-gray-400 mb-[5%]">
                We growing up your business with personal AI manager
              </p>

              {/* Links */}
              <div className="flex text-xs text-gray-500 mb-4">
                <a href="#" className="hover:text-gray-300 flex-nowrap">
                  Terms of uses
                </a>
                <a href="#" className="hover:text-gray-300 flex-nowrap ml-3 md:ml-[0.6vw]">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-gray-300 flex-nowrap ml-3 md:ml-[1vw]">
                  DMCA
                </a>
              </div>

              {/* Social Icons */}
              <div className="flex justify-center w-full gap-4 -ml-1">
                {socialLinks.map((social, index) => (
                  <div key={index} className="relative group">
                    {/* Social Icon */}
                    <Link
                      href={social.href}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border border-[#545454] bg-[#1E1E1E] 
                      transition-transform duration-200 ease-in-out transform-gpu will-change-transform hover:scale-110 
                      ${social.hoverColor} ${social.borderHoverColor} ${social.glowColor}`}
                    >
                      <social.icon className="w-5 h-5 transition-transform duration-100 ease-in-out" />
                    </Link>
                    
                  </div>
                ))}
              </div>
            </div>
          


          </div>

          {/* Settings UI */}
          <SettingNavigation
            isOpen={isSettingsOpen}
            onClose={handleSettingsClose}
          />
        </div>
      </nav>
    </>
  );
}
