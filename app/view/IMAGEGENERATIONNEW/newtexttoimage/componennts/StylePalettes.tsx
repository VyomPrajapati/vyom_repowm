"use client"

import { useState } from "react"
import { ChevronDown } from 'lucide-react'

interface StylePalettesProps {
  onStyleSelect?: (style: string) => void
  selectedStyle?: string | null
}

export default function StylePalettes({
  onStyleSelect,
  selectedStyle,
}: StylePalettesProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(selectedStyle ?? null)

  const options = [
    "3d Render",
    "Bokeh",
    "Cinematic",
    "Creative",
    "Graphic Design Pop Art",
    "Graphic Design Vector",
    "Illustration",
    "Pro B&W Photography",
  ]

  const handleStyleSelect = (option: string) => {
    setSelectedOption(option)
    if (onStyleSelect) {
      onStyleSelect(option)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 px-2 md:px-6">
        <h3 className="text-white text-lg md:text-xl font-medium">Style Palettes</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1"
        >
          <ChevronDown className={`text-white h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </div>
      
      {isOpen && (
        <div className="space-y-4 mb-4 px-2 md:px-6">
          {options.map((option, index) => (
            <button
              key={index}
              className={`w-full p-3 rounded-lg text-left text-white text-sm md:text-lg transition-all duration-200 ${
                selectedOption === option 
                   ? "bg-white/10 border-2 border-[#6C3BFF]"
                  : "bg-white/10 hover:bg-[#3A3A3A] border-2 border-transparent"
              }`}
              onClick={() => handleStyleSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
