"use client";

import { useState } from "react";

interface QualityProps {
  onQualitySelect?: (quality: string) => void;
  selectedQuality?: string;
}

export default function Quality({ onQualitySelect, selectedQuality = "HD" }: QualityProps) {
  const [selected, setSelected] = useState<string>(selectedQuality);

  const handleSelect = (quality: string) => {
    setSelected(quality);
    if (onQualitySelect) {
      onQualitySelect(quality);
    }
  };

  return (
    <div>
      <h3 className="text-white text-lg font-medium mb-0">Quality</h3>
      <div className="grid grid-cols-2 gap-3  mb:gap-6">
        {/* SD */}
        <div
          className={`w-[109px] h-[43px] border rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all 
            ${selected === "SD" ? "border-[#4a90e2] text-[#4a90e2]" : "border-gray-700 text-white hover:border-[#4a90e2]"}`}
          onClick={() => handleSelect("SD")}
        >
          <span className="text-sm">SD</span>
        </div>
        {/* HD */}
        <div
          className={`w-[109px] h-[43px] border rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all -ml-8
            ${selected === "HD" ? "border-[#4a90e2] text-[#4a90e2]" : "border-gray-700 text-white hover:border-[#4a90e2]"}`}
          onClick={() => handleSelect("HD")}
        >
          <span className="text-sm">HD</span>
        </div>
        {/* FullHD */}
        <div
          className={`w-[109px] h-[43px] border rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all mb:-mt-4
            ${selected === "FullHD" ? "border-[#4a90e2] text-[#4a90e2]" : "border-gray-700 text-white hover:border-[#4a90e2]"}`}
          onClick={() => handleSelect("FullHD")}
        >
          <span className="text-sm">FullHD</span>
        </div>
        {/* 2K */}
        <div
          className={`w-[109px] h-[43px] border rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all mb:-mt-4 -ml-8
            ${selected === "2K" ? "border-[#4a90e2] text-[#4a90e2]" : "border-gray-700 text-white hover:border-[#4a90e2]"}`}
          onClick={() => handleSelect("2K")}
        >
          <span className="text-sm">2K</span>
        </div>
      </div>
    </div>
  );
} 