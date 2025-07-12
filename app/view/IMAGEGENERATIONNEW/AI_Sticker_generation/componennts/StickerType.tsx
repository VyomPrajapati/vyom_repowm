"use client"

import { useState } from "react"
import { ChevronDown } from 'lucide-react'

interface StickerTypeProps {
  onStickerTypeSelect?: (stickerType: string) => void
  selectedStickerType?: string | null
}

export default function StickerType({
  onStickerTypeSelect,
  selectedStickerType,
}: StickerTypeProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [selectedOption, setSelectedOption] = useState<string | null>(selectedStickerType ?? null)

  const options = [
    "Illustration",
    "Clipart",
    "Photo",
    "Ink Sketch",
    "Doodle",
    "Realistic",
    "Low Poly",
    "Pop Art",
    "3d",
    "Comics",
    "Drawing",
    "Oil Painting",
    "Cartoon",
    "Cyberpunk",
    "Psychedelic",
    "Digital",
  ]

  const handleStickerTypeSelect = (option: string) => {
    setSelectedOption(option)
    if (onStickerTypeSelect) {
      onStickerTypeSelect(option)
    }
    // Keep the dropdown close after selection
    setIsOpen(false)
  }

  return (
    <div><div className="mx-2 md:mx-6 border-t border-white/15 mb-4 "></div>
      <div className="flex items-center justify-between mb-4 px-2 md:px-6">
        <h3 className="text-white text-lg md:text-xl font-medium">Sticker Type</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1"
        >
          <ChevronDown className={`text-white h-6 w-6 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </div>
      
      {isOpen && (
        <div className="space-y-2 mb-4 px-2 md:px-6">
          {options.map((option, index) => (
            <button
              key={index}
              className={`w-full px-3 py-2 rounded-lg text-left text-white text-sm md:text-sm transition-all duration-200 ${
                selectedOption === option 
                   ? "bg-white/10 border-2 border-[#6C3BFF]"
                  : "bg-white/10 hover:bg-[#3A3A3A] border-2 border-transparent"
              }`}
              onClick={() => handleStickerTypeSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
