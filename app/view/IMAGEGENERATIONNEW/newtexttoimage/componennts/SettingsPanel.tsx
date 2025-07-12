"use client"

import { useState } from "react"
import { X, ChevronDown } from "lucide-react"
import ModelsPresetPanel from "./ModelsPresetPanel"
import StylePalettes from "./StylePalettes"
import AspectRatio from "./AspectRatio"
import Quality from "./Quality"
import NumberOfImages from "./NumberOfImages"

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  selectedModel: string
  setSelectedModel: (model: string) => void
  selectedStyle: string | null
  setSelectedStyle: (style: string | null) => void
  selectedAspectRatio: string
  setSelectedAspectRatio: (ratio: string) => void
  selectedQuality: string
  setSelectedQuality: (quality: string) => void
  numberOfImages: number
  setNumberOfImages: (number: number) => void
}

export default function SettingsPanel({
  isOpen,
  onClose,
  selectedModel,
  setSelectedModel,
  selectedStyle,
  setSelectedStyle,
  selectedAspectRatio,
  setSelectedAspectRatio,
  selectedQuality,
  setSelectedQuality,
  numberOfImages,
  setNumberOfImages,
}: SettingsPanelProps) {
  const [isModelsOpen, setIsModelsOpen] = useState(false)

  const toggleModels = () => {
    setIsModelsOpen((prev) => !prev);
  }

  const handleModelSelect = (model: string) => {
    setSelectedModel(model)
  }

  const handleSave = () => {
    // Handle save logic here
    console.log("Settings saved:", {
      model: selectedModel,
      style: selectedStyle,
      quality: selectedQuality,
      aspectRatio: selectedAspectRatio,
      numberOfImages,
    })
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />}

      {/* Settings Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-[90%] md:w-[560px] bg-transparent backdrop-blur-lg shadow-3xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-end p-4">
            <button onClick={onClose} className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 space-y-6 scrollbar-hide pb-6">
            <style jsx>{`
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
              .scrollbar-hide::-webkit-scrollbar { 
                display: none;
              }
            `}</style>

            {/* Model & Preset Section */}
            <div>
              <button
                onClick={toggleModels}
                className="px-6 md:px-10 w-full py-6 md:py-8 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg border border-white/10 cursor-pointer hover:from-gray-700 hover:to-gray-600 transition-all mb-4 text-left relative overflow-hidden"
                style={{
                  backgroundImage: "url('/placeholder.svg?height=80&width=400')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h3 className="text-white text-lg md:text-xl font-bold">
                      Model & <span className="text-[#6C3BFF]">Preset</span>
                    </h3>
                  </div>
                  <ChevronDown
                    className={`text-white text-xl md:text-3xl transition-transform duration-300 ${
                      isModelsOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Models Dropdown for Mobile/Tablet */}
              <div className="md:hidden">
                <ModelsPresetPanel
                  isOpen={isModelsOpen}
                  onClose={() => setIsModelsOpen(false)}
                  selectedModel={selectedModel}
                  onModelSelect={handleModelSelect}
                />
              </div>
            </div>

            {/* Style Palettes Section */}
            <div className="mb-6">
              <StylePalettes onStyleSelect={setSelectedStyle} selectedStyle={selectedStyle} />
            </div>

            {/* Quality Section */}
            <div className="mb-6">
              <Quality onQualitySelect={setSelectedQuality} selectedQuality={selectedQuality} />
            </div>

            {/* Aspect Ratio Section */}
            <div className="mb-6">
              <AspectRatio onAspectRatioSelect={setSelectedAspectRatio} selectedAspectRatio={selectedAspectRatio} />
            </div>

            {/* Number of Images Section */}
            <div className="mb-6">
              <NumberOfImages onNumberSelect={setNumberOfImages} selectedNumber={numberOfImages} />
            </div>

            {/* Save Button */}
            <div className="mb-6 px-2 md:px-6">
              <button
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-[#6C3BFF] to-[#412399] hover:from-[#5A2FE6] hover:to-[#3A1F8A] text-white py-4 rounded-lg font-medium text-lg transition-all"
              >
                Save
              </button>
              <div className="bg-white/10 backdrop-blur-3xl hover:bg-white/20 rounded-lg p-4 space-y-2 text-sm text-gray-300 mt-6">
                <div>Model Selection : {selectedModel}</div>
                <div>Style Palette : {selectedStyle || "Bokeh"}</div>
                <div>Image Quality : {selectedQuality}</div>
                <div>Frame Size : {selectedAspectRatio}</div>
                <div>Number of Image : {numberOfImages}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Models Panel */}
      <div className="hidden md:block">
        <ModelsPresetPanel
          isOpen={isModelsOpen}
          onClose={() => setIsModelsOpen(false)}
          selectedModel={selectedModel}
          onModelSelect={handleModelSelect}
        />
      </div>
    </>
  )
}
