"use client"

import { useState } from "react"

interface QualityProps {
  onQualitySelect?: (quality: string) => void
  selectedQuality?: string
}

export default function Quality({ 
  onQualitySelect, 
  selectedQuality = "Full HD" 
}: QualityProps) {
  const [selected, setSelected] = useState<string>(selectedQuality)

  const handleSelect = (quality: string) => {
    setSelected(quality)
    if (onQualitySelect) {
      onQualitySelect(quality)
    }
  }

  const qualities = ["SD", "HD", "Full HD", "2K", "4K"]

  return (
<div><div className="mx-2 md:mx-6 border-t border-white/15 mb-2 ">

</div>      <h3 className="text-white text-lg md:text-xl font-medium mb-4 px-2 md:px-6">Image Quality</h3>
      <div className="grid grid-cols-5 gap-2  md:gap-4 px-2 md:px-6">
        {qualities.map((quality) => (
          <button
            key={quality}
            className={`h-[50px] border-2 rounded-lg flex items-center justify-center cursor-pointer transition-all ${
              selected === quality 
                ? "border-[#6C3BFF] text-white bg-white/10 " 
                : " text-gray-300 border border-none bg-white/10 backdrop-blur-3xl hover:border-[#6C3BFF] hover:text-white"
            }`}
            onClick={() => handleSelect(quality)}
          >
            <span className="text-xs md:text-sm font-medium">{quality}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
