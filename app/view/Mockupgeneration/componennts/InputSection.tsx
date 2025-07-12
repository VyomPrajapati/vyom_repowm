"use client"

import {  Sparkles } from "lucide-react"
import Image from "next/image"

interface InputSectionProps {
  prompt: string
  setPrompt: (prompt: string) => void
  onGenerate: () => void
  onSettingsToggle: () => void
  isGenerating: boolean
}

export default function InputSection({
  prompt,
  setPrompt,
  onGenerate,
  onSettingsToggle,
  isGenerating,
}: InputSectionProps) {
  return (
    <div className="flex flex-col items-center space-y-8 lg:space-y-12">
      {/* Input Section */}
      <div className="flex items-center gap-4 w-full max-w-5xl">
        <div className="flex-1 relative">
          <div className="flex items-center bg-[#1F1F1F] backdrop-blur-sm border border-[#8E8E8E] rounded-2xl lg:rounded-3xl p-4 md:p-4">
            <input
              type="text"
              placeholder="Type a prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-white  outline-none text-sm lg:text-base xl:text-lg "
              onKeyDown={(e) => e.key === "Enter" && onGenerate()}
            />
            <div className="flex items-center gap-3 lg:gap-4">
              <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />
              </button>
              <button
                onClick={onGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="bg-gradient-to-b from-[#5AD7FF] to-[#656BF5] transition-colors text-white px-6 md:px-12 py-2.5 md:py-3 rounded-xl lg:rounded-2xl font-medium text-sm lg:text-base transition-colors"
              >
                {isGenerating ? "Generating..." : "Generate"}
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={onSettingsToggle}
          className="p-4 md:p-3 bg-[#1F1F1F] backdrop-blur-sm border border-gray-700/50  rounded-2xl hover:bg-gradient-to-b from-[#5AD7FF] to-[#656BF5] transition-colors transition-colors"
        >
          <Image
            src="/mockupgeneration/setting.png"
            alt="Settings"
            width={32}
            height={32}
            className="w-8 h-8 md:w-12 md:h-12"
          />
        </button>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center gap-2 lg:gap-3">
        {[...Array(7)].map((_, i) => (
          <div key={i} className={`w-1 h-1 md:w-2 md:h-2 rounded-full ${i === 5 ? "bg-[#463F51]" : "bg-[#463F51]"}`} />
        ))}
        <span className="ml-4 lg:ml-6 text-sm lg:text-base text-gray-300">Mockup Generations</span>
      </div>

      {/* Loading State */}
      {isGenerating && (
        <div className="flex items-center justify-center py-12 lg:py-16">
          <div className="animate-spin rounded-full h-12 w-12 lg:h-16 lg:w-16 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  )
}
  
