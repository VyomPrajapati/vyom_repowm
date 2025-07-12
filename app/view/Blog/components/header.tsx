"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Globe, ChevronDown } from "lucide-react";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  // Languages list
  const languages = [
    "English",
    "Español",
    "Français",
    "Deutsch",
    "日本語",
    "中文",
  ];

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLanguageDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle language dropdown
  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  // Select language
  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <header className="md:fixed top-0 left-0 w-full z-50  md:bg-[#353535] border-b border-gray-800 py-3 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center flex-1">
        <div className="relative flex-1 max-w-[700px]">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5F6368]"
            size="1.2rem"
          />
          <input
            type="text"
            placeholder="Search all articles..."
            className="w-full py-2 pl-10 pr-3 rounded-md bg-[#353535] md:bg-[#F1F3F4] text-black border border-gray-700 focus:outline-none focus:border-gray-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          className=" 
            bg-gradient-to-b from-[#5AD7FF] to-[#656BF5]  text-white py-2 px-4 md:px-8 rounded-md transition-colors ml-4"
        >
          Search
        </button>
      </div>
      <div className="hidden md:block   items-center mr-10">
        <div className="relative" ref={languageDropdownRef}>
          <button
            onClick={toggleLanguageDropdown}
            className="border border-gray-700 rounded-md py-2 px-4 flex items-center bg-white  transition-colors cursor-pointer"
          >
            <Globe className="mr-2 text-[#5F6368]" size={16} />
            <span className="mr-1 text-[#3C4043]">{selectedLanguage}</span>
            <ChevronDown
              size={16}
              className={`text-[#3C4043] transition-transform duration-200 ${
                isLanguageDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isLanguageDropdownOpen && (
            <div className="absolute md:block right-0 mt-1 bg-white text-black border border-gray-700 rounded-md shadow-lg overflow-hidden z-50">
              <ul className="py-1">
                {languages.map((language) => (
                  <li
                    key={language}
                    className={`px-4 py-2 bg-white hover:bg-gray-200 cursor-pointer ${
                      selectedLanguage === language ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleLanguageSelect(language)}
                  >
                    {language}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
