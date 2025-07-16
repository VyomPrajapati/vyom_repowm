"use client";

import type React from "react";

import Link from "next/link";
import {
  IconBrandBlogger,
  IconBrandYoutube,
  IconBrandInstagram,
  IconBrandX,
} from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";
import { NAV_ROUTES, FEATURE_ROUTES } from "../../../routes/routes";
import Image from "next/image";
import { getImageUrl } from "@/routes/imageroute";
import { useState, useEffect } from "react";
import Aurora from "./Aurora";

// Define types for navigation links
interface NavigationLinks {
  [key: string]: { [key: string]: string };
}

// Define types for social links
interface SocialLink {
  title: string;
  icon: Icon;
  href: string;
  hoverColor: string;
  borderHoverColor: string;
  glowColor: string;
}

// Define types for legal links
interface LegalLink {
  name: string;
  href: string;
}

const navigationLinks: NavigationLinks = {
  Home: {
    Plans: NAV_ROUTES.PRICING,
    Features: "",
    Templets: NAV_ROUTES.TEMPLATES,
    "Art station": NAV_ROUTES.ART_STATION,
    
  },
  Features: {
    "Text to Image": FEATURE_ROUTES.IMAGE_GENERATION,
    "Text to Video (soon)": "#",
    "Sketch to Image (soon)": "#",
    "Real Time Generation (soon)": "#",
  },
  Company: {
    Blog: NAV_ROUTES.BLOG,
    ContactUs: NAV_ROUTES.CONTACT,
    Support: NAV_ROUTES.SUPPORT,
    "About us": "",
  },
};

const legalLinks: LegalLink[] = [
  { name: "Terms of use", href: "" },
  { name: "Privacy Policy", href: "" },
  { name: "Cookies", href: "" },
  { name: "Legal Notice", href: "" },
  { name: "DMCA", href: "" },
];

const socialLinks: SocialLink[] = [
  {
    title: "X",
    icon: IconBrandX,
    href: "#",
    hoverColor: "hover:text-blue-500",
    borderHoverColor: "hover:border-blue-500",
    glowColor: "hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]",
  },
  {
    title: "Instagram",
    icon: IconBrandInstagram,
    href: "#",
    hoverColor: "hover:text-pink-800",
    borderHoverColor: "hover:border-pink-800",
    glowColor: "hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]",
  },
  {
    title: "Youtube",
    icon: IconBrandYoutube,
    href: "#",
    hoverColor: "hover:text-red-700",
    borderHoverColor: "hover:border-red-700",
    glowColor: "hover:shadow-[0_0_15px_rgba(220,38,38,0.5)]",
  },
  {
    title: "Blog",
    icon: IconBrandBlogger,
    href: "#",
    hoverColor: "hover:text-green-500",
    borderHoverColor: "hover:border-green-500",
    glowColor: "hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]",
  },
];

const Footer: React.FC = () => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const checkScreenSize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Only modify below 768px (md breakpoint)
  const isMobile = screenWidth > 0 && screenWidth < 768;
  // Tablet is between 768px and 1023px
  const isTablet = screenWidth >= 768 && screenWidth < 1024;

  return (
    <footer className="relative bg-[#000] text-gray-300 py-8 w-full overflow-x-hidden">
      <div className="max-w-full px-4 md:px-16 lg:px-12">
          {/* Desktop Layout - Using original code for desktop/laptop */}
          <div
            className={`${isMobile ? "hidden" : "flex"} ${
              isTablet
                ? "gap-12"
                : "sm:gap-[7.5rem] md:gap-[8.5rem] lg:gap-[13.3rem]"
            } mb-0`}
          >
            {/* Logo and Description */}
            <div className="space-y-4">
              <div className="flex flex-col items-start space-y-2 -mb-2">
                {/* Logo Placeholder */}
                <div className="">
                  <Image
                    src={getImageUrl("core", "logo") || "/placeholder.svg"}
                    alt="logo"
                    width={50}
                    height={20}
                  ></Image>
                </div>

                {/* Brand Name */}
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-[#6C3BFF] to-[#412399] bg-clip-text text-transparent">
                    WildMind
                  </span>
                </h1>
              </div>
              <p className="sm:text-sm md:text-[1.120rem] lg:text-[1.2rem] lg:leading-6 text-nowrap">
                WildMind Studios uses advanced AI to turn <br /> imagination into
                high-quality, creative visuals.
              </p>

              {/* Social Media Icons */}
              <div className="flex gap-6">
                {socialLinks.map((social, index) => (
                  <div key={index} className="relative group">
                    <Link
                      href={social.href}
                      className={`w-10 h-10 md:w-12 md:h-12 md:mt-6 lg:w-12 lg:h-12 rounded-full flex items-center justify-center border-2 border-[#545454] bg-[#1E1E1E] 
                    transition-transform duration-200 ease-in-out transform-gpu will-change-transform hover:scale-125 hover:-translate-y-2 mt-4
                    ${social.hoverColor} ${social.borderHoverColor} ${social.glowColor}`}
                    >
                      <social.icon className="w-5 h-5 md:w-7 md:h-7 lg:w-6 lg:h-6 transition-transform duration-100 ease-in-out hover:scale-110" />
                    </Link>
                    {/* Tooltip */}
                    <span className="absolute left-1/2 -translate-x-1/2 -top-5 bg-[#1E1E1E] text-white text-xs md:text-xs lg:text-sm px-2 py-1 rounded-md opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      {social.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Links - keeping as is for desktop */}
            {Object.entries(navigationLinks).map(([category, links]) => (
              <div
                key={category}
                className={`md:mt-8 mb-4 mr-10 lg:mr-16 ${
                  isTablet ? "" : "md:-ml-5"
                }`}
              >
                <h2 className="font-semibold text-[#00F0FF] md:text-lg lg:text-xl mb-4 ">
                  {category}
                </h2>
                <ul className="space-y-2">
                  {Object.entries(links).map(([name, href]) => (
                    <li key={name} className="pb-2 mb-2">
                      <Link
                        href={href}
                        className="text-[#616161] md:text-[16px] hover:text-white transition-colors text-nowrap"
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile Layout - Improved but maintaining your design approach */}
          {isMobile && (
            <div className="flex flex-col space-y-8">
              {/* Logo and Description */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-2">
                  <Image
                    src={getImageUrl("core", "logo") || "/placeholder.svg"}
                    alt="logo"
                    width={40}
                    height={16}
                  ></Image>
                </div>
                <h1 className="text-3xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-[#6C3BFF] to-[#412399] bg-clip-text text-transparent">
                    WildMind
                  </span>
                </h1>
                <p className="text-sm text-gray-400 px-4">
                  WildMind Studios uses advanced AI to turn imagination into
                  high-quality, creative visuals.
                </p>
              </div>

              {/* Mobile Navigation Links - Optimized for better display */}
              <div className="grid grid-cols-1 gap-x-4 gap-y-4">
                {Object.entries(navigationLinks).map(([category, links], idx) => (
                  <div key={idx} className={idx === 1 ? "col-span-1 mt-2" : ""}>
                    <h2 className="font-semibold text-[#00F0FF] text-base mb-3">
                      {category}
                    </h2>
                    <ul className="space-y-2">
                      {Object.entries(links).map(([name, href]) => (
                        <li key={name}>
                          <Link
                            href={href}
                            className="text-[#616161] text-sm hover:text-white transition-colors"
                          >
                            {name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Social Media Icons */}
              <div className="flex justify-center gap-4">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 border-[#545454] bg-[#1E1E1E] 
                  ${social.hoverColor} ${social.borderHoverColor}`}
                  >
                    <social.icon className="w-6 h-6" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Section - Fixed for responsiveness */}
          <div className="border-t border-[#FFFFFF52] pt-4 mt-2 ">
            
            <div
              className={`flex ${
                isMobile ? "flex-col space-y-4" : "flex-col md:flex-row"
              } justify-start items-center`}
            >
              <p className="text-sm sm-laptop:text-xs md-laptop:text-[0.875rem] lg:text-[0.875rem] text-[#616161] mb-4 md:mb-0 text-center">
                Copyright © 2025 WildMind Pvt Ltd. All rights reserved.
              </p>
              <div
                className={`flex flex-wrap ${
                  isMobile
                    ? "gap-4 justify-center"
                    : isTablet
                    ? "gap-6 justify-center md:ml-auto"
                    : "sm:gap-4 sm-laptop:gap-[2rem]  md-laptop:gap-[2.5rem] lg-laptop:gap-[4rem] justify-center sm-laptop:ml-[35%] md-laptop:ml-[28%] lg-laptop:ml-[33.5%] "
                }`}
              >
                {legalLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-xs sm-laptop:text-xs md-laptop:text-sm lg:text-sm text-[#616161] hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      {/* Aurora Animation as a subtle, transparent background, flipped 180 degrees */}
      <div className="pointer-events-none absolute left-0 top-0 w-full h-full z-0" style={{ opacity: 0.6, transform: 'rotate(180deg)' }}>
        <Aurora
          colorStops={["#6C3BFF", "#00F0FF", "#A4C48C","99EDC3",]}
          blend={1.5}
          amplitude={8.0}
          speed={1}
        />
      </div>
    </footer>
  );
};

export default Footer;
