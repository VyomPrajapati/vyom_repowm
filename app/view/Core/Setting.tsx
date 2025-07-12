"use client";

import type React from "react";
import { useState, useEffect } from "react";
// import Image from "next/image"; // Removed unused import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { NAV_ROUTES } from "@/routes/routes";
import { useTokenUpdate } from "@/app/utils/tokenManager";
import Image from "next/image";
import { getImageUrl } from "@/routes/imageroute";

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = "Profile" | "Account management";

export default function SettingNavigation({ isOpen, onClose }: SettingsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Profile");
  const [username, setUsername] = useState("");
  const availableTokens = useTokenUpdate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);
  const [showAgeError, setShowAgeError] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const isValid = /^[A-Za-z][A-Za-z0-9_@#$%^&+=!?.-]{2,}$/.test(username);

  // Check for mobile or tablet viewport
  useEffect(() => {
    const checkViewport = () => {
      setIsMobileOrTablet(window.innerWidth <= 1024);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("otpUser");
    if (storedUsername) setUsername(storedUsername);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  // Hide success message after 3 seconds
  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  if (!isOpen) return null;

  // Mobile/tablet specific styles
  const mobileStyles = isMobileOrTablet ? {
    left: "0px",
    width: "calc(100vw - 0px)",
    height: "100%",
    zIndex: "100"
  } : {
    left: "320px",
    width: "calc(100vw - 250px)"
  };

  return (
    <div
      className="font-poppins fixed top-0 right-0 h-full bg-[#111111] border-l border-gray-800 z-50 transform transition-all duration-300 ease-in-out overflow-y-auto"
      style={mobileStyles}
    >
      {/* Close button for mobile */}
      {isMobileOrTablet && (
        <button 
          onClick={onClose}
          className="absolute top-12 right-4 text-white p-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}

      {/* Content area */}
      <div className={`pl-2 pr-4 md:p-8 overflow-y-auto h-full ${isMobileOrTablet ? 'pt-6' : ''}`}>
        <div className={`${isMobileOrTablet ? 'max-w-full' : 'max-w-3xl'} ml-2`}>
          <div className="text-[1.5rem] md:text-[3.5rem] font-bold bg-gradient-to-b from-[#5AD7FF] to-[#656BF5] bg-clip-text text-transparent mt-[4vh] mb-0 md:mb-8">
            Settings
          </div>

          {/* Tab navigation */}
          <div className="mb-2 md:mb-8">
            <div className="flex space-x-10 border-b border-gray-800 pb-3">
              <button
                onClick={() => setActiveTab("Profile")}
                className={`text-lg ${
                  activeTab === "Profile"
                    ? "text-white border-b-2 border-blue-500"
                    : "text-gray-400"
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab("Account management")}
                className={`text-lg ${
                  activeTab === "Account management"
                    ? "text-white border-b-2 border-blue-500"
                    : "text-gray-400"
                }`}
              >
                Account management
              </button>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === "Profile" && (
            <div className="">
              <div className="mb-4">
                <h3 className="text-md md:text-lg mb-0">Your email</h3>
                <p className="text-[#757575] mb-0 md:mb-2 text-sm md:text-md">
                  This cannot be changed.
                </p>
                <input
                  type="email"
                  value={email}
                  disabled
                  className={`${isMobileOrTablet ? 'w-full' : 'w-[40vw]'} bg-[#111111] border border-gray-700 rounded-lg p-2 md:p-3 text-gray-300`}
                />
              </div>

              <div className="mb-6">
                <h3 className="text-md md:text-lg mb-1">Your username</h3>
                <p className="text-[#757575] mb-1 md:mb-2 text-sm md:text-md">
                  Automatically saves as you change it to a valid username.
                </p>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                    @
                  </span>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (showUsernameError) setShowUsernameError(false);
                    }}
                    className={`${isMobileOrTablet ? 'w-full' : 'w-[40vw]'} bg-[#111111] border border-gray-700 rounded-lg p-2 md:p-3 pl-8 md:pl-8 text-gray-300 focus:outline-none`}
                  />
                </div>
                {showUsernameError && (
                  <p className="text-xs md:text-md text-red-500 mt-2">
                    Username must start with a letter and must have atleast
                    three characters.
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-4 cursor-pointer pl-2">
                <label className="flex items-center space-x-4 cursor-pointer">
                  <div className="relative -mt-6 md:mt-0">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={isAgeConfirmed}
                      onChange={(e) => {
                        setIsAgeConfirmed(e.target.checked);
                        if (showAgeError) setShowAgeError(false);
                      }}
                    />
                    <div className="w-16 h-7 bg-gray-400 rounded-full peer-checked:bg-blue-500 transition-colors"></div>
                    <div className="dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-all duration-300 peer-checked:left-10"></div>
                  </div>
                  <div className="pl-2">
                    <h3 className="text-xs md:text-md">
                      I confirm that I am over 18 and want to show explicit
                      content by default
                    </h3>
                    <p className="text-gray-400 text-xs md:text-md">
                      Automatically saves on toggle.
                    </p>
                  </div>
                </label>
              </div>
              {showAgeError && (
                <p className="text-xs md:text-md text-red-500 mt-2 ml-2">
                  You must confirm you are over 18 to save changes.
                </p>
              )}

              <button
                onClick={() => {
                  let hasError = false;
                  if (!isValid) {
                    setShowUsernameError(true);
                    hasError = true;
                  }
                  if (!isAgeConfirmed) {
                    setShowAgeError(true);
                    hasError = true;
                  }
                  if (!hasError) {
                    localStorage.setItem("username", username);
                    setShowSuccessMessage(true);
                  }
                }}
                className={`mt-4 flex ${isMobileOrTablet ? 'w-full' : 'w-[15vw]'} items-center justify-center gap-2 py-3 rounded-lg border transition-all group hover:bg-black
${
  isValid && isAgeConfirmed
    ? "bg-black text-blue-500 border-gray-600"
    : "bg-[#0B0B0B] text-[#757575] border-gray-600"
}
${isValid && isAgeConfirmed ? "hover:bg-black hover:border-gray-700" : ""}`}
              >
                <FontAwesomeIcon icon={faUserCheck} className="w-4 h-4" />
                Save Changes
              </button>
              {showSuccessMessage && (
                <div className="bg-green-900/3 text-green-400 py-2 mt-2">
                  Changes saved successfully!
                </div>
              )}
            </div>
          )}

          {activeTab === "Account management" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-md md:text-lg mb-1">Plans & Billing</h3>
                <p className="text-[#757575] mb-4 text-sm md:text-md">
                  Keep track of your subscription details, update your plans &
                  billing information, and control account &apos;s payment.
                </p>

                <div className={`flex items-center justify-between border border-[#2D2D2D] bg-[#171717] rounded-full ${isMobileOrTablet ? 'w-full flex-row p-0' : 'w-[70%]'}`}>
                  <div className={`flex ${isMobileOrTablet ? 'flex-row w-full items-center mb-0' : ''}`}>
                    <div className="px-4 py-3 text-xs md:text-[0.9rem] ">Current plan: Basic</div>
                     <div className="h-6 md:h-8 w-[2px] md:text-md mt-0 md:mt-1 bg-gray-500"></div>
                    
                    <div className={`flex items-center px-4 py-3 rounded-lg text-xs md:text-[0.9rem] ${isMobileOrTablet ? 'mt-0' : ''}`}>
                      <span className="mr-2"><Image
                    src={getImageUrl("core", "coins") || "/placeholder.svg"}
                    alt="coins"
                    width={20}
                    height={20}
                  /></span>
                      Available credits: {availableTokens}
                    </div>
                  </div>
                  <button className="mobile:hidden  md:flex items-center gap-2 bg-gradient-to-b from-[#5AD7FF] to-[#656BF5] px-6 py-3 rounded-full text-white" onClick={() => router.push(NAV_ROUTES.PRICING)}>
                    <span className="mr-2">
                    <Image
                    src={getImageUrl("core", "diamond") || "/placeholder.svg"}
                    alt="diamond"
                    width={16}
                    height={14}
                  />
                    </span>
                    Upgrade
                  </button>
                </div>

                <button onClick={() => router.push(NAV_ROUTES.PRICING)}
                 className=" md:hidden ml-1 text-sm mobile:flex items-center gap-0 bg-gradient-to-b from-[#5AD7FF] to-[#656BF5] px-4 py-2 rounded-full text-white mt-2">
                    <span className="mr-2"><Image
                    src={getImageUrl("core", "diamond") || "/placeholder.svg"}
                    alt="diamond"
                    width={16}
                    height={14}
                  /></span>
                    Upgrade
                  </button>


              </div>

              <div>
                <h3 className="text-md md:text-lg mb-1">Delete Account</h3>
                <p className="text-[#757575] mb-4 text-sm md:text-md">
                  Deleting your account will remove all of your information from
                  our database. This cannot be undone.
                </p>

                <button className="flex items-center text-sm gap-2 bg-[#252525] hover:bg-gray-600 px-4 py-2 rounded-lg text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}