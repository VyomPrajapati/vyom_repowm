"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function StylePalettes({
  onStyleSelect,
  selectedStyle,
}: {
  onStyleSelect?: (style: string) => void;
  selectedStyle?: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(selectedStyle ?? null);

  const options = [
    "3D Render",
    "Bokeh",
    "Cinematic",
    "Creative",
    "Graphic Design Pop Art",
    "Graphic Design Vector",
    "Illustration",
    "Minimalist",
    "Portrait",
    "Pro B&W photography",
  ];

  const handleStyleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onStyleSelect) {
      onStyleSelect(option);
    }
  };

  return (
    <div className="relative w-[180px] mb:w-[150px]">
      <h3 className="text-white text-sm font-medium mb-2">Style Palettes</h3>
      <div
        className="flex justify-between items-center bg-[#050505] rounded-md p-2 w-[180px] h-[32px] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-300 text-sm">{selectedOption ?? "Pick an option"}</span>
        <ChevronDown className={`text-gray-300 h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-[180px] bg-[#050505] rounded-md shadow-lg">
          {options.map((option, index) => (
            <div
              key={index}
              className={`p-2 cursor-pointer text-white text-sm transition-colors duration-200  mb:p-2 mb:cursor-pointer mb:text-white mb:text-sm mb:transition-colors mb:duration-200 
                ${selectedOption === option ? "bg-[#4a90e2]" : "hover:bg-white hover:text-black mb:hover:bg-white mb:hover:text-black"}`}
              onClick={() => handleStyleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
