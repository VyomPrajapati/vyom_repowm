"use client"

import { useState } from "react"
import { ChevronDown } from 'lucide-react'

interface CameraAngleProps {
  onStyleSelect?: (style: string) => void
  selectedStyle?: string | null
}

export default function CameraAngle({
  onStyleSelect,
  selectedStyle,
}: CameraAngleProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(selectedStyle ?? null)

  const options = [
    "Front View",
    "Back View",
    "Left Side View",
    "Right Side View",
    "Top (Bird’s-Eye) View",
    "Bottom (Worm’s-Eye) View",
    "Three-Quarter (45°) View",
    "Isometric View",
    "Close-Up Detail Shot",
    "Context Shot",
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
        <h3 className="text-white text-lg md:text-xl font-medium">Camera Angle</h3>
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
