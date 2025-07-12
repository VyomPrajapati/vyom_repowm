"use client";

import { useState } from "react";

interface AspectRatioProps {
  onAspectRatioSelect?: (ratio: string) => void;
  selectedAspectRatio?: string;
}

export default function AspectRatio({ onAspectRatioSelect, selectedAspectRatio = "1:1" }: AspectRatioProps) {
  const [selectedRatio, setSelectedRatio] = useState<string>(selectedAspectRatio);

  const handleSelect = (ratio: string) => {
    setSelectedRatio(ratio);
    if (onAspectRatioSelect) {
      onAspectRatioSelect(ratio);
    }
  };

  return (
    <div>
      <h3 className="text-white text-lg font-medium mb-0">Aspect ratio</h3>
      <div className="grid grid-cols-2 gap-3  mb:gap-6">
        {/* Individual Aspect Ratio Buttons */}
        <div
          className={`w-[109px] h-[43px] border rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all 
            ${
              selectedRatio === "16:9"
                ? "border-[#4a90e2] text-[#4a90e2]"
                : "border-gray-700 text-white hover:border-[#4a90e2]"
            }`}
          onClick={() => handleSelect("16:9")}
        >
          <span>▭</span>
          <span className="text-sm">16:9</span>
        </div>

        <div
          className={`w-[109px] h-[43px] border rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all
            ${
              selectedRatio === "9:16"
                ? "border-[#4a90e2] text-[#4a90e2]"
                : "border-gray-700 text-white hover:border-[#4a90e2]"
            } -ml-8`}
          onClick={() => handleSelect("9:16")}
        >
          <span>▯</span>
          <span className="text-sm">9:16</span>
        </div>

        <div
          className={`w-[109px] h-[43px] border rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all mb:-mt-4
            ${
              selectedRatio === "1:1"
                ? "border-[#4a90e2] text-[#4a90e2]"
                : "border-gray-700 text-white hover:border-[#4a90e2]"
            }`}
          onClick={() => handleSelect("1:1")}
        >
          <span>□</span>
          <span className="text-sm">1:1</span>
        </div>

        <div
          className={`w-[109px] h-[43px] border rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all mb:-mt-4
            ${
              selectedRatio === "4:3"
                ? "border-[#4a90e2] text-[#4a90e2]"
                : "border-gray-700 text-white hover:border-[#4a90e2]"
            } -ml-8`}
          onClick={() => handleSelect("4:3")}
        >
          <span>▭</span>
          <span className="text-sm">4:3</span>
        </div>
      </div>
    </div>
  );
}
