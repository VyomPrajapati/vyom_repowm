"use client"

import { useState } from "react"
import { X, ChevronDown } from "lucide-react"
// import Image from "next/image"
import UploadComponent from "./UploadComponent"

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  selectedCameraAngle: string
  setSelectedCameraAngle: (angle: string) => void
  selectedBackground: string
  setSelectedBackground: (bg: string) => void
}

const cameraAngles = [
  "Front View",
  "Back View",
  "Left Side View",
  "Right Side View",
  "Top (Bird's-Eye) View",
  "Bottom (Worm's-Eye) View",
  "Three-Quarter (45°) View",
  "Isometric View",
  "Close-Up Detail Shot",
  "Context Shot",
]

const backgroundPresets = [
  { id: "Presets 1", name: "Presets 1", image: "/placeholder.svg?height=60&width=60" },
  { id: "Presets 2", name: "Presets 2", image: "/placeholder.svg?height=60&width=60" },
  { id: "Presets 3", name: "Presets 3", image: "/placeholder.svg?height=60&width=60" },
  { id: "Presets 4", name: "Presets 4", image: "/placeholder.svg?height=60&width=60" },
  { id: "Presets 5", name: "Presets 5", image: "/placeholder.svg?height=60&width=60" },
]

export default function SettingsPanel({
  isOpen,
  onClose,
  selectedCameraAngle,
  setSelectedCameraAngle,
  selectedBackground,
  setSelectedBackground,
}: SettingsPanelProps) {
  const [isCameraAngleOpen, setIsCameraAngleOpen] = useState(true)
  const [isBackgroundTypeOpen, setIsBackgroundTypeOpen] = useState(true)
  const [backgroundName, setBackgroundName] = useState("")

  const handleFilesSelected = (files: File[]) => {
    console.log("Files uploaded:", files)
    // Here you can handle the uploaded files (e.g., upload to server, process, etc.)
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/50  z-40" onClick={onClose} />}

      {/* Settings Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-80 lg:w-96 bg-black/70 backdrop-blur-3xl transform transition-transform duration-300 ease-in-out z-50 ${
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
          <div className="flex-1 overflow-y-auto px-4 space-y-6 scrollbar-hide pb-10">
            <style jsx>{`
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
              .scrollbar-hide::-webkit-scrollbar { 
                display: none;
              }
            `}</style>
            {/* Camera Angle Section */}
            <div>
              <button
                onClick={() => setIsCameraAngleOpen(!isCameraAngleOpen)}
                className="w-full flex items-center justify-between mb-4 text-white"
              >
                <h3 className="text-lg font-medium">Camera Angle</h3>
                <ChevronDown className={`w-5 h-5 transition-transform ${isCameraAngleOpen ? "rotate-180" : ""}`} />
              </button>

              {isCameraAngleOpen && (
                <div className="space-y-2">
                {cameraAngles.map((angle) => (
                  <div
                    key={angle}
                    className={`rounded-lg w-full transition-all ${
                      selectedCameraAngle === angle
                        ? "p-[1px] bg-gradient-to-b from-[#5AD7FF] to-[#656BF5]"
                        : ""
                    }`}
                  >
                    <button
                      onClick={() => setSelectedCameraAngle(angle)}
                      className={`w-full flex items-center justify-between p-4 rounded-lg transition-all
                        ${selectedCameraAngle === angle
                          ? "bg-gray-800"
                          : "bg-gray-600/20 hover:bg-gray-700/30"
                        }`}
                    >
                      <span className="text-white text-left">{angle}</span>
                      <div className="relative">
                        <div
                          className={`w-5 h-5 rounded-full border ${
                            selectedCameraAngle === angle
                              ? "border-transparent"
                              : "border-gray-500"
                          }`}
                        >
                          {selectedCameraAngle === angle && (
                            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#5AD7FF] to-[#656BF5] border border-gray-800 transition-colors" />
                          )}
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
              
              )}
            </div>

            {/* Upload Section */}
            <UploadComponent onFilesSelected={handleFilesSelected} />


            {/* Background Type Section */}
            <div>
              <button
                onClick={() => setIsBackgroundTypeOpen(!isBackgroundTypeOpen)}
                className="w-full flex items-center justify-between mb-4 text-white"
              >
                <h3 className="text-lg font-medium">Background Type</h3>
                <ChevronDown className={`w-5 h-5 transition-transform ${isBackgroundTypeOpen ? "rotate-180" : ""}`} />
              </button>

              {isBackgroundTypeOpen && (
                <div className="space-y-3">
                  {backgroundPresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => setSelectedBackground(preset.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                        selectedBackground === preset.id
                        ? "bg-gray-800  border border-blue-500"
                        : "bg-gray-600/20 hover:bg-gray-700/30"
                      }`}
                    >
                      {/* <Image
                        src={preset.image || "/placeholder.svg"}
                        alt={preset.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-lg object-cover"
                      /> */}
                      <span className="text-white text-left flex-1">{preset.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Background Name Input */}
            <div>
              <input
                type="text"
                placeholder="Enter Background Name"
                value={backgroundName}
                onChange={(e) => setBackgroundName(e.target.value)}
                className="w-full bg-gray-600/30 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pb-2">
              <button className="w-full bg-gradient-to-b from-[#5AD7FF] to-[#656BF5] transition-colors  text-white py-3 rounded-lg font-medium transition-all">
                Generate Background
              </button>
              <button
                className="w-full bg-gradient-to-b from-[#5AD7FF] to-[#656BF5] transition-colors text-white py-2 rounded-lg font-medium transition-all"
                onClick={() => {
                  // Place your save logic here if needed
                  onClose();
                }}
              >
                Save
              </button>
            </div>

            {/* Settings Summary */}
            <div className=" bg-gray-600/30 rounded-lg p-4 space-y-2 text-sm text-gray-300 h-20 ">
              <div>Camera Angle : {selectedCameraAngle}</div>
              <div>Background Type : {selectedBackground}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
