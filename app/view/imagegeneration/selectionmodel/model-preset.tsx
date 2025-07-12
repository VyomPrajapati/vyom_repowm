"use client"

import { ChevronRight } from "lucide-react"

interface ModelPresetProps {
  isOpen: boolean;
  toggle: () => void;
  selectedModel: string;
}

export default function ModelPreset({ isOpen, toggle, selectedModel }: ModelPresetProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggle();
  };

  return (
    <div
      className="relative rounded-lg overflow-hidden cursor-pointer w-[362px] h-[99px] flex items-center"
      onClick={handleClick}
      style={{
        backgroundImage: `url('/Rectangle39.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center justify-center relative">
        <div className="bg-[#292929]/95 w-[337px] h-[80px] flex flex-col justify-center px-4 rounded-[7px] mb:w-[250px]">
          <p className="text-[20px] text-[#4B91F1] font-semibold">Models/Preset</p>
          <p className="text-white text-[16px]">{selectedModel}</p>
        </div>
        <ChevronRight
          className={`absolute right-10 text-white transition-transform ${isOpen ? 'rotate-90' : ''}`} 
        />
      </div>
    </div>
  )
}
