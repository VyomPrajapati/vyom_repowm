"use client"

import { useState } from "react"

interface AspectRatioProps {
  onAspectRatioSelect?: (ratio: string) => void
  selectedAspectRatio?: string
}

export default function AspectRatio({ 
  onAspectRatioSelect, 
  selectedAspectRatio = "1:1" 
}: AspectRatioProps) {
  const [selected, setSelected] = useState<string>(selectedAspectRatio)

  const handleSelect = (ratio: string) => {
    setSelected(ratio)
    if (onAspectRatioSelect) {
      onAspectRatioSelect(ratio)
    }
  }

  const ratios = [
    { label: "2:3", icon: "▬" },
    { label: "1:1", icon: "⬜" },
    { label: "16:9", icon: "▭" },
    { label: "Custom", icon: "⚏" }
  ]

  return (
<div><div className="mx-2 md:mx-6 border-t border-white/15 mb-2 ">

</div>      <h3 className="text-white text-lg md:text-xl font-medium mb-4 px-2 md:px-6 ">Frame Size</h3>
      <div className="grid grid-cols-4  gap-2 md:gap-4 px-2 md:px-6">
        {ratios.map((ratio) => (
          <button
            key={ratio.label}
            className={`h-[60px] border-2 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all ${
              selected === ratio.label 
              ? "border-[#6C3BFF] text-white bg-white/10 " 
              : " text-gray-300 border border-none bg-white/10 backdrop-blur-3xl hover:border-[#6C3BFF] hover:text-white"
            }`}
            onClick={() => handleSelect(ratio.label)}
          >
            <div className="text-lg mb-1">{ratio.icon}</div>
            <span className="text-xs md:text-sm font-medium">{ratio.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
