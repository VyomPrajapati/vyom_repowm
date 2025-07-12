"use client"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { User, X, ChevronDown, ChevronUp, LogOut } from "lucide-react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth, db } from "@/database/firebase"
import { doc, getDoc } from "firebase/firestore"
import { APP_ROUTES, NAV_ROUTES, FEATURE_ROUTES } from "../../../../routes/routes"
import { getImageUrl } from "@/routes/imageroute";

const NAV_LAND = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userSlug, setUserSlug] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [userEmail, setUserEmail] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    // check auth state on mount
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true)
        setUserEmail(user.email || "")
        const docRef = doc(db, "users", user.email || "")
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = docSnap.data()
          if (data?.slug) {
            setUserSlug(data.slug) // get the unique slug
          }
        }

        // Get username from localStorage if available
        const storedUsername = localStorage.getItem("username")
        if (storedUsername) {
          setUsername(storedUsername)
        }
      } else {
        const otpEmail = localStorage.getItem("otpUser")
        if (otpEmail) {
          setUserEmail(otpEmail)
          const storedUsername = localStorage.getItem("username")
          if (storedUsername) {
            setUsername(storedUsername)
          }
        } else {
          setIsLoggedIn(false)
          setUserSlug("")
          setUserEmail("")
          setUsername("")
        }
      }
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    // Handle clicks outside the menu to close it
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobileMenuOpen])

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const handleGetStarted = () => {
    if (isLoggedIn && userSlug) {
      router.push(`/view/home/${userSlug}`)
    } else {
      router.push(APP_ROUTES.SIGNUP)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch {}
    
    // Preserve user tokens by only removing auth-related items
    localStorage.removeItem("otpUser")
    localStorage.removeItem("username")
    localStorage.removeItem("slug")
    
    setUserEmail("")
    setUsername("")
    setIsLoggedIn(false)
    setUserSlug("")
    setIsUserDropdownOpen(false)
    router.push("/")
  }

  return (
    <>
      {/* Desktop Navigation */}
      <div
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-[1000] items-center justify-between p-2 rounded-[50px] 
        border-[1px] border-white/20 w-[90vw] sm-laptop:w-[55vw] md:w-[45vw] lg:w-[45vw] text-white
        ${
          scrolled ? "backdrop-blur-xl bg-black/30 shadow-lg" : "backdrop-blur-xl bg-black/10 shadow-lg"
        } transition-all duration-300 hidden md:flex`}
      >
        {/* Logo */}
        <div className="flex">
              <Image src={getImageUrl("core", "logo")} width={40} height={24} alt="logo" onClick={() => router.push("/")} />
            </div>

        {/* Features Dropdown */}
        <div className="relative">
          <span
            onClick={() => toggleDropdown("features")}
            className="cursor-pointer px-3 py-1 flex items-center gap-1 hover:bg-gradient-to-l hover:bg-clip-text font-poppins bg-transparent hover:text-[#dbdbdb]"
          >
            Features
            <Image
              width={12}
              height={12}
              src={activeDropdown === "features" ? "/Core/arrowup.svg" : "/Core/arrowdown.svg"}
              alt="dropdown-arrow"
              className="ml-1"
            />
          </span>

          {activeDropdown === "features" && (
            <ul className="absolute left-1/2 -translate-x-1/2 mt-4 w-80 bg-black text-white rounded-lg border border-[#5f5e5e] shadow-[6px_6px_10px_rgba(0,0,0,0.6)] p-3 pr-4 flex flex-col items-center overflow-hidden whitespace-nowrap">
              <li
                className="w-full px-3 py-2 cursor-pointer text-center hover:text-[#dbdbdb] hover:bg-gradient-to-l hover:bg-clip-text"
                onClick={() => router.push(FEATURE_ROUTES.IMAGE_GENERATION)}
              >
                Text to image
              </li>
              <li className="w-full px-3 py-2 cursor-pointer text-center hover:text-[#dbdbdb] hover:bg-gradient-to-l hover:bg-clip-text">
                Text to video (coming soon)
              </li>
              <li className="w-full px-3 py-2 cursor-pointer text-center hover:text-[#dbdbdb] hover:bg-gradient-to-l hover:bg-clip-text">
                Sketch to image (coming soon)
              </li>
              <li className="w-full px-1 py-2 cursor-pointer text-center hover:text-[#dbdbdb] hover:bg-gradient-to-l hover:bg-clip-text">
                Real-time generation (coming soon)
              </li>
            </ul>
          )}
        </div>

        <div>
          <span
            className="px-3 py-1 hover:bg-gradient-to-l hover:bg-clip-text cursor-pointer hover:text-[#dbdbdb]"
            onClick={() => router.push(NAV_ROUTES.TEMPLATES)}
          >
            Templates
          </span>
        </div>

        {/* Other Links */}
        <div>
          <span
            className="px-3 py-1 hover:bg-gradient-to-l hover:bg-clip-text cursor-pointer hover:text-[#dbdbdb]"
            onClick={() => router.push(NAV_ROUTES.PRICING)}
          >
            Pricing
          </span>
        </div>
        <div>
          <span
            className="px-3 py-1 hover:bg-gradient-to-l hover:bg-clip-text cursor-pointer hover:text-[#dbdbdb] flex-nowrap"
            onClick={() => router.push(NAV_ROUTES.ART_STATION)}
          >
            Art Station
          </span>
        </div>

        {/* Get Started Button */}
        <div>
          <button
            className="hidden md:block md:flex-nowrap  relative bg-black/20 border border-white/20 rounded-full px-5 py-2 text-base font-medium border-t-[#acacac] border-b-[#6A0DAD] hover:border-t-[#6A0DAD] hover:border-b-[#acacac] 
                      text-transparent bg-clip-text bg-gradient-to-r from-[#5AD7FF] to-[#656BF5] shadow-[inset_0px_0px_8px_rgba(255,255,255,0.2)] 
                      transition-all duration-500 ease-in-out hover:text-white"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="hidden fixed top-0 left-0 w-full z-[1000] mb:block md:hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-black/30 backdrop-blur-xl">
          {/* Menu Button */}
          <div className="flex">

          
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-white p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          {/* Logo and Name */}
          <div className="flex items-center">
          <Image src={getImageUrl("core", "logo")} width={32} height={20} alt="logo" onClick={() => router.push("/")} />
          <span className="text-white text-xl font-bold">WildMind</span>
          </div>

          </div>

          {/* User Profile Button */}
          <button onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} className="hidden text-white p-1">
            <User className="w-6 h-6" />
          </button>
        </div>

        {/* User Dropdown */}
        {isUserDropdownOpen && (
          <div className="absolute right-4 top-16 w-[180px] bg-black/90 backdrop-blur-xl rounded-md shadow-lg z-30 animate-in fade-in slide-in-from-top-5 duration-300">
            <div className="py-2 flex flex-col">
              <div className="px-4 py-2 text-white flex flex-col items-start">
                <span className="text-sm font-semibold">{username || "Guest"}</span>
                <span className="text-xs text-gray-400">{userEmail || "Not signed in"}</span>
              </div>
              <button onClick={handleLogout} className="px-4 py-2 text-white hover:text-blue-400 flex items-center">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu Sidebar */}
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <div className="hiddden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)}></div>

            {/* Sidebar */}
            <div
              ref={menuRef}
              className="fixed inset-y-0 left-0 w-80 bg-black z-50 transform transition-transform duration-300 ease-in-out animate-in slide-in-from-left"
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-800">
                <div className="flex items-center">
                <Image src={getImageUrl("core", "logo")} width={32} height={20} alt="logo" onClick={() => router.push("/")} />
                <span className="text-white text-xl font-bold">WildMind</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-1">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-4 flex flex-col space-y-4">
                {/* Features Dropdown */}
                <div className="border-b border-gray-800 pb-3">
                  <div
                    className="flex justify-between items-center py-2 cursor-pointer"
                    onClick={() => toggleDropdown("features")}
                  >
                    <span className="text-white text-lg">Features</span>
                    {activeDropdown === "features" ? (
                      <ChevronUp className="w-5 h-5 text-white" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white" />
                    )}
                  </div>

                  {activeDropdown === "features" && (
                    <div className="pl-0 py-2 space-y-2 text-sm animate-in slide-in-from-left duration-300">
                      <div
                        className="py-1 text-gray-300 hover:text-white cursor-pointer"
                        onClick={() => {
                          router.push(FEATURE_ROUTES.IMAGE_GENERATION)
                          setIsMobileMenuOpen(false)
                        }}
                      >
                        Text to image
                      </div>
                      <div className="py-1 text-gray-300 hover:text-white cursor-pointer">
                        Text to video (coming soon)
                      </div>
                      <div className="py-1 text-gray-300 hover:text-white cursor-pointer">
                        Sketch to image (coming soon)
                      </div>
                      <div className="py-1 text-gray-300 hover:text-white cursor-pointer">
                        Real-time generation (coming soon)
                      </div>
                    </div>
                  )}
                </div>

                {/* Templates */}
                <div
                  className="py-2 text-lg text-white border-b border-gray-800 pb-3 cursor-pointer"
                  onClick={() => {
                    router.push(NAV_ROUTES.TEMPLATES)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Templates
                </div>

                {/* Pricing */}
                <div
                  className="py-2 text-lg text-white border-b border-gray-800 pb-3 cursor-pointer"
                  onClick={() => {
                    router.push(NAV_ROUTES.PRICING)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Pricing
                </div>

                {/* Art Station */}
                <div
                  className="py-2 text-lg text-white border-b border-gray-800 pb-3 cursor-pointer"
                  onClick={() => {
                    router.push(NAV_ROUTES.ART_STATION)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Art Station
                </div>

                
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default NAV_LAND
