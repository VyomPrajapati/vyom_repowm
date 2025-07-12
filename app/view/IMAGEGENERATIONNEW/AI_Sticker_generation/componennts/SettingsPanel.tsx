"use client"

import { X } from "lucide-react"
import StickerType from "./StickerType"
import NumberOfImages from "./NumberOfImages"

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  stickerType: string | null
  setStickerType: (type: string | null) => void
  numberOfStickers: number
  setNumberOfStickers: (number: number) => void
}

export default function SettingsPanel({
  isOpen,
  onClose,
  stickerType,
  setStickerType,
  numberOfStickers,
  setNumberOfStickers,
}: SettingsPanelProps) {
  const handleSave = () => {
    // Handle save logic here
    console.log("Settings saved:", {
      stickerType,
      numberOfStickers,
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
            {/* Number of Stickers Section */}
            
            
            <div className="mb-6">
              <NumberOfImages onNumberSelect={setNumberOfStickers} selectedNumber={numberOfStickers} />
            </div>
            
            
            {/* Sticker Type Section */}
            <div className="mb-6">
              <StickerType onStickerTypeSelect={setStickerType} selectedStickerType={stickerType} />
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
                <div>Sticker Type : {stickerType || "Default"}</div>
                <div>Number of Stickers : {numberOfStickers}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
