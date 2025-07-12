"use client"

import { useState } from "react"

interface NumberOfImagesProps {
  onNumberSelect?: (number: number) => void
  selectedNumber?: number
}

export default function NumberOfImages({ 
  onNumberSelect, 
  selectedNumber = 1 
}: NumberOfImagesProps) {
  const [selected, setSelected] = useState<number>(selectedNumber)

  const handleSelect = (number: number) => {
    setSelected(number)
    if (onNumberSelect) {
      onNumberSelect(number)
    }
  }

  const options = [1, 2, 3, 50]

  return (
<div><div className="mx-2 md:mx-6 border-t border-white/15 mb-2 "></div>
      <h3 className="text-white text-lg font-medium mb-4 px-2 md:px-6">Number of Images</h3>
      <div className="grid grid-cols-4 gap-2 md:gap-4 px-2 md:px-6">
        {options.map((number) => (
          <div
            key={number}
            className={`w-full h-[60px] border rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all 
              ${selected === number 
                ? "border-[#6C3BFF] text-[#6C3BFF] bg-white/10 " 
                : "border-gray-700 text-white hover:border-[#6C3BFF] bg-white/10 "
              }`}
            onClick={() => handleSelect(number)}
          >
            <span className="text-sm">{number}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
