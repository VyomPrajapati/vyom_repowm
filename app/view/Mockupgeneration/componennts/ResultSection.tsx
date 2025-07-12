"use client"

import { Sparkles } from "lucide-react"
import Image from "next/image"

interface ResultSectionProps {
  prompt: string
  generatedImage: string
  onNewGeneration: () => void
  onSettingsToggle: () => void
}

export default function ResultSection({
  prompt,
  generatedImage,
  onNewGeneration,
  onSettingsToggle,
}: ResultSectionProps) {
  return (
    <div className="space-y-6 lg:space-y-8 pb-10">
      {/* Navigation Arrows */}
      <div className="flex items-center justify-between absolute left-4 right-4 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
        
      </div>

      {/* Input Section */}
      <div className="flex items-center gap-4 w-full max-w-5xl mx-auto">
        <div className="flex-1 relative">
          <div className="flex items-center bg-[#1F1F1F] backdrop-blur-sm border border-[#8E8E8E] rounded-2xl lg:rounded-3xl p-4 md:p-4">
            <input
              type="text"
              placeholder="Type a prompt..."
              value={prompt}
              readOnly
              className="flex-1 bg-transparent text-white placeholder-white outline-none text-sm lg:text-base xl:text-lg"
            />
            <div className="flex items-center gap-3 lg:gap-4">
              <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />
              </button>
              <button
                onClick={onNewGeneration}
                className="flex bg-gradient-to-b from-[#5AD7FF] to-[#656BF5] transition-colors text-white px-6 md:px-12 py-2.5 md:py-3 rounded-xl lg:rounded-2xl font-medium text-sm lg:text-base"
              >
                Generate
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={onSettingsToggle}
          className="p-4 md:p-3 bg-[#1F1F1F] backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:bg-gradient-to-b from-[#5AD7FF] to-[#656BF5] transition-colors"
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
      <div className="flex items-center justify-center gap-2 lg:gap-3">
        {[...Array(7)].map((_, i) => (
          <div key={i} className={`w-1 h-1 md:w-2 md:h-2 rounded-full ${i === 5 ? "bg-white" : "bg-[#463F51]"}`} />
        ))}
        <span className="ml-4 lg:ml-6 text-sm lg:text-base text-gray-300">Mockup Generations</span>
      </div>

      {/* Prompt Display */}
      <div className="flex items-start gap-3 md:gap-4 max-w-9xl ">
        <div className="p-2 lg:p-3 bg-gray-800/50 rounded-lg flex-shrink-0 mt-1">
          <Sparkles className="w-4 h-4 lg:w-5 lg:h-5" />
        </div>
        <p className="text-gray-300 mt-3 text-sm lg:text-base leading-relaxed">{prompt}</p>
      </div>

      {/* Generated Result Container */}
      <div className="max-w-8xl mx-auto ">
        <div className="relative bg-transparent backdrop-blur-sm border border-gray-700/30 rounded-2xl md:rounded-3xl p-6 lg:p-8 min-h-[400px] md:min-h-[400px] overflow-hidden">
          {/* Generated Image - Left Side */}
          <div className="absolute left-6 lg:left-8 top-6 lg:top-8 w-64 md:w-80 xl:w-80">
            <div className="aspect-square bg-gray-900/50 rounded-xl lg:rounded-2xl overflow-hidden">
              <Image
                src={generatedImage || "/placeholder.svg"}
                alt="Generated mockup"
                width={200}
                height={200}
                className="w-40 h-40 object-cover"
              />
            </div>
          </div>

          
        </div>
      </div>
    </div>
  )
}
