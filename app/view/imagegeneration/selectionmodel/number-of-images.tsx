"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface NumberOfImagesProps {
  onNumberOfImagesSelect?: (number: number) => void;
  selectedNumberOfImages?: number;
}

export default function NumberOfImages({ onNumberOfImagesSelect, selectedNumberOfImages = 1 }: NumberOfImagesProps) {
  const [selectedNumber, setSelectedNumber] = useState<number>(selectedNumberOfImages);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const numbers = [1, 2, 3, 10];

  const handleSelect = (number: number) => {
    setSelectedNumber(number);
    if (onNumberOfImagesSelect) {
      onNumberOfImagesSelect(number);
    }
  };

  return (
    <div>
      <h3 className="text-white text-lg font-medium mb-0">Number of image</h3>
      <div className="flex items-center gap-x-3">
        {numbers.map((number) => (
          <div
            key={number}
            className={`w-10 h-10 flex items-center justify-center border border-gray-700 cursor-pointer transition-all
              ${
                number === selectedNumber
                  ? "bg-[#4a90e2] text-white border-[#4a90e2]" // Selected state
                  : "text-white bg-transparent" // Default state
              }
              ${
                number === isHovered
                  ? "border-[2px] border-transparent bg-transparent text-white hover:[border-image:linear-gradient(0deg,#5AD7FF_0%,#656BF5_97%)_1]"
                  : ""
              }`}
            onClick={() => handleSelect(number)}
            onMouseEnter={() => setIsHovered(number)}
            onMouseLeave={() => setIsHovered(null)}
          >
            {number}
          </div>
        ))}
        {/* ChevronDown with same hover effect */}
        <div
          className="w-10 h-10 flex items-center justify-center border border-gray-700 cursor-pointer transition-all 
          hover:border-[2px] hover:border-transparent hover:bg-transparent
          hover:[border-image:linear-gradient(0deg,#5AD7FF_0%,#656BF5_97%)_1]"
        >
          <ChevronDown className="text-white h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
