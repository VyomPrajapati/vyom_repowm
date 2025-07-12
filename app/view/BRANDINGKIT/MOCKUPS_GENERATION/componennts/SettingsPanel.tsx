"use client"

import { useState } from "react"
import { ExternalLink } from "lucide-react"
// import ModelsPresetPanel from "./ModelsPresetPanel"
import CameraAngle from "./camera_angle"
import SelectBackground from "./SelectBackground"
import Image from "next/image"
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

export default function SettingsPanel(props: SettingsPanelProps) {
  // State for all new sections
  const [selectedBackground, setSelectedBackground] = useState("/Blog/blog1.png")
  const [uploadedBackground, setUploadedBackground] = useState<string | null>(null)
  const [selectedFont, setSelectedFont] = useState("Inter")
  const [isFontOpen, setIsFontOpen] = useState(true)
  const [privateMode, setPrivateMode] = useState(false)
  const [isCollectionOpen, setIsCollectionOpen] = useState(true)
  const [collections, setCollections] = useState<string[]>([])
  const [isAdvanceOpen, setIsAdvanceOpen] = useState(true)
  const [photoReal, setPhotoReal] = useState(false)
  const [negativePrompt, setNegativePrompt] = useState(false)
  const [transparency, setTransparency] = useState(false)
  const [tiling, setTiling] = useState(false)
  const [fixedSeed, setFixedSeed] = useState(false)
  const [promptEnhance, setPromptEnhance] = useState("Auto")
  const promptEnhanceOptions = ["Auto", "Standard", "Creative"]
  const [isPromptEnhanceOpen, setIsPromptEnhanceOpen] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [isBannerPreviewOpen, setIsBannerPreviewOpen] = useState(true)
  // ... (other states for toggles, collections, etc. to be added)

  const backgrounds = [
    { src: "/Blog/blog1.png", label: "Background 1" },
    { src: "/Blog/blog2.png", label: "Background 2" },
    { src: "/Blog/blog3.png", label: "Background 3" },
    { src: "/Blog/blog4.png", label: "Background 4" },
  ]
  const handleBackgroundUpload = (file: File) => {
    const url = URL.createObjectURL(file)
    setUploadedBackground(url)
    setSelectedBackground(url)
  }

  // Add this function inside the SettingsPanel component
  const handleReset = () => {
    setSelectedBackground("/Blog/blog1.png");
    setUploadedBackground(null);
    setSelectedFont("Inter");
    setIsFontOpen(true);
    setPrivateMode(false);
    setIsCollectionOpen(true);
    setCollections([]);
    setIsAdvanceOpen(true);
    setPhotoReal(false);
    setNegativePrompt(false);
    setTransparency(false);
    setTiling(false);
    setFixedSeed(false);
    setPromptEnhance("Auto");
    setIsPromptEnhanceOpen(false);
    setShowSummary(false);
    // Optionally reset model, style, aspect ratio, quality, number of images if you want:
    // props.setSelectedModel("");
    // props.setSelectedStyle(null);
    // props.setSelectedAspectRatio("");
    // props.setSelectedQuality("");
    // props.setNumberOfImages(1);
  };

  // Font options for Font Select section
  const fontOptions = ["Poppins", "Inter", "Jost", "Outfit"]

  return (
    <>
      {/* Backdrop */}
      {props.isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={props.onClose} />}
      {/* Settings Panel */}
      <div className={`fixed top-0 left-0 h-full w-[90%] md:w-[560px] bg-transparent backdrop-blur-lg shadow-3xl transform transition-transform duration-300 ease-in-out z-50 ${props.isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-end p-4">
            <button onClick={props.onClose} className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
              <span className="text-white text-2xl">×</span>
            </button>
          </div>
          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 space-y-6 scrollbar-hide pb-6">
            <style jsx>{`
              .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
              .scrollbar-hide::-webkit-scrollbar { display: none; }
            `}</style>
            {/* Number of Images Section - at the top */}
            <NumberOfImages
              selectedNumber={props.numberOfImages}
              onNumberSelect={props.setNumberOfImages}
            />
            {/* Font Select Section - move here below Number of Images */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2 px-2 md:px-6 cursor-pointer" onClick={() => setIsFontOpen((v) => !v)}>
                <h3 className="text-white text-lg md:text-xl font-medium">Font Select</h3>
                <span className={`transition-transform ${isFontOpen ? "rotate-180" : ""}`} style={{ display: 'inline-block' }}>
                  <Image src="/mockupgeneration/dropdownicon.svg" alt="Dropdown" width={18} height={18} />
                </span>
              </div>
              {isFontOpen && (
                <div className="space-y-2 px-2 md:px-6">
                  {fontOptions.map((font) => (
                    <button
                      key={font}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 text-left bg-black/30 hover:bg-white/10 border-white/10 ${
                        selectedFont === font ? "border-[#6C3BFF] ring-2 ring-[#6C3BFF]" : ""
                      }`}
                      onClick={() => setSelectedFont(font)}
                    >
                      <span className={`text-white text-base font-medium flex-1`} style={{ fontFamily: font }}>{font}</span>
                      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedFont === font ? "border-[#6C3BFF]" : "border-gray-500"}`}>
                        {selectedFont === font && <span className="block w-3 h-3 rounded-full bg-[#6C3BFF]" />}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Select Background Section */}
            <SelectBackground
              selectedBackground={selectedBackground}
              setSelectedBackground={setSelectedBackground}
              onUpload={handleBackgroundUpload}
              backgrounds={uploadedBackground ? [{ src: uploadedBackground, label: "Custom Upload" }, ...backgrounds] : backgrounds}
            />
            {/* Camera Angle Section - move here after Select Background */}
            <CameraAngle
              selectedStyle={props.selectedStyle}
              onStyleSelect={props.setSelectedStyle}
            />
            {/* Banner Preview Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2 px-2 md:px-6 cursor-pointer" onClick={() => setIsBannerPreviewOpen((v) => !v)}>
                <h3 className="text-white text-lg md:text-xl font-medium">Banner Preview</h3>
                <span className={`transition-transform ${isBannerPreviewOpen ? "rotate-180" : ""}`} style={{ display: 'inline-block' }}>
                  <Image src="/mockupgeneration/dropdownicon.svg" alt="Dropdown" width={18} height={18} />
                </span>
              </div>
              {isBannerPreviewOpen && (
                <div className="px-2 md:px-6">
                  <div className="flex items-center justify-between bg-white/10 rounded-lg px-6 py-4 cursor-pointer">
                    <span className="text-white text-base">Banner Preview</span>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                  </div>
                </div>
              )}
            </div>
            {/* Frame Size Section */}
            {/* (Remove the AspectRatio component and its container div for Frame Size section) */}

            {/* Select Color Section */}
            {/* (Remove the Select Color section and its container div and all related code) */}

            {/* Private Mode Section */}
            <div className="mb-6 flex items-center justify-between px-2 md:px-6">
              <div className="flex items-center gap-2">
                <span className="text-white text-lg font-medium">Private Mode</span>
                <Image src="/BRANDINGKIT/Iicon.svg" alt="Info" width={18} height={18} />
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center">
                  <Image src="/mockupgeneration/diamondicon.svg" alt="Premium" width={32} height={30} />
                </span>
                <button
                  className={`relative w-12 h-6 flex items-center rounded-full transition-colors duration-200 ${privateMode ? 'bg-[#6C3BFF]' : 'bg-gray-700'}`}
                  onClick={() => setPrivateMode(v => !v)}
                  aria-label="Toggle Private Mode"
                >
                  <span
                    className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200 ${privateMode ? 'translate-x-6' : ''}`}
                  />
                </button>
              </div>
            </div>

            {/* Add To Collection Section */}
            <div className="mb-6">
              <div className="flex items-center mb-2 px-2 md:px-6 cursor-pointer" onClick={() => setIsCollectionOpen((v) => !v)}>
                <h3 className="text-white text-lg md:text-xl font-medium mr-2">Add To Collection</h3>
                <Image src="/mockupgeneration/Iicon.svg" alt="Info" width={18} height={18} />
                <span className={`transition-transform ml-auto ${isCollectionOpen ? "rotate-180" : ""}`} style={{ display: 'inline-block' }}>
                  <Image src="/mockupgeneration/dropdownicon.svg" alt="Dropdown" width={18} height={18} />
                </span>
              </div>
              {isCollectionOpen && (
                <div className="space-y-3 px-2 md:px-6">
                  <button
                    className="flex items-center gap-3 p-0 bg-transparent border-none shadow-none focus:outline-none"
                    onClick={() => setCollections([...collections, `Collection ${collections.length + 1}`])}
                  >
                    <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-black/40 border border-white/10 mr-2">
                      <Image src="/BRANDINGKIT/Frame.svg" alt="Add Collection" width={24} height={24} />
                    </span>
                    <span className="text-white text-base font-medium">Add New Collection</span>
                  </button>
                  <button
                    className="w-full flex items-center justify-between p-3 rounded-lg border-2 border-[#6C3BFF] bg-black/30 hover:bg-white/10 transition-all text-white text-base font-medium mt-2"
                  >
                    <span>View All</span>
                    <ExternalLink className="w-5 h-5 text-white ml-2" />
                  </button>
                </div>
              )}
            </div>

            {/* Advance Setting Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2 px-2 md:px-6 cursor-pointer" onClick={() => setIsAdvanceOpen((v) => !v)}>
                <div className="flex items-center gap-2">
                  <h3 className="text-white text-lg md:text-xl font-medium">Advance Setting</h3>
                  <Image src="/mockupgeneration/Iicon.svg" alt="Info" width={18} height={18} />
                </div>
                <span className={`transition-transform ${isAdvanceOpen ? 'rotate-180' : ''}`} style={{ display: 'inline-block' }}>
                  <Image src="/mockupgeneration/dropdownicon.svg" alt="Dropdown" width={18} height={18} />
                </span>
              </div>
              {isAdvanceOpen && (
                <div className="space-y-3 w-full min-w-full">
                  {/* Photo Real Toggle */}
                  <div className="flex items-center justify-between w-full bg-white/5 rounded-lg px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-base">Photo Real</span>
                      <Image src="/mockupgeneration/Iicon.svg" alt="Info" width={18} height={18} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center">
                        <Image src="/mockupgeneration/diamondicon.svg" alt="Premium" width={28} height={26} />
                      </span>
                      <button
                        className={`relative w-12 h-6 flex items-center rounded-full transition-colors duration-200 ${photoReal ? 'bg-[#6C3BFF]' : 'bg-gray-700'}`}
                        onClick={() => setPhotoReal(v => !v)}
                        aria-label="Toggle Photo Real"
                      >
                        <span
                          className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200 ${photoReal ? 'translate-x-6' : ''}`}
                        />
                      </button>
                    </div>
                  </div>
                  {/* Negative Prompt Toggle */}
                  <div className="flex items-center justify-between w-full bg-white/5 rounded-lg px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-base">Negative Prompt</span>
                      <Image src="/mockupgeneration/Iicon.svg" alt="Info" width={18} height={18} />
                    </div>
                    <button
                      className={`relative w-12 h-6 flex items-center rounded-full transition-colors duration-200 ${negativePrompt ? 'bg-[#6C3BFF]' : 'bg-gray-700'}`}
                      onClick={() => setNegativePrompt(v => !v)}
                      aria-label="Toggle Negative Prompt"
                    >
                      <span
                        className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200 ${negativePrompt ? 'translate-x-6' : ''}`}
                      />
                    </button>
                  </div>
                  {/* Transparency Toggle */}
                  <div className="flex items-center justify-between w-full bg-white/5 rounded-lg px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-base">Transparency</span>
                      <Image src="/mockupgeneration/Iicon.svg" alt="Info" width={18} height={18} />
                    </div>
                    <button
                      className={`relative w-12 h-6 flex items-center rounded-full transition-colors duration-200 ${transparency ? 'bg-[#6C3BFF]' : 'bg-gray-700'}`}
                      onClick={() => setTransparency(v => !v)}
                      aria-label="Toggle Transparency"
                    >
                      <span
                        className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200 ${transparency ? 'translate-x-6' : ''}`}
                      />
                    </button>
                  </div>
                  {/* Tilling Toggle */}
                  <div className="flex items-center justify-between w-full bg-white/5 rounded-lg px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-base">Tilling</span>
                      <Image src="/mockupgeneration/Iicon.svg" alt="Info" width={18} height={18} />
                    </div>
                    <button
                      className={`relative w-12 h-6 flex items-center rounded-full transition-colors duration-200 ${tiling ? 'bg-[#6C3BFF]' : 'bg-gray-700'}`}
                      onClick={() => setTiling(v => !v)}
                      aria-label="Toggle Tilling"
                    >
                      <span
                        className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200 ${tiling ? 'translate-x-6' : ''}`}
                      />
                    </button>
                  </div>
                  {/* Use Fixed Seed Toggle */}
                  <div className="flex items-center justify-between w-full bg-white/5 rounded-lg px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-base">Use Fixed Seed</span>
                      <Image src="/mockupgeneration/Iicon.svg" alt="Info" width={18} height={18} />
                    </div>
                    <button
                      className={`relative w-12 h-6 flex items-center rounded-full transition-colors duration-200 ${fixedSeed ? 'bg-[#6C3BFF]' : 'bg-gray-700'}`}
                      onClick={() => setFixedSeed(v => !v)}
                      aria-label="Toggle Use Fixed Seed"
                    >
                      <span
                        className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200 ${fixedSeed ? 'translate-x-6' : ''}`}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Reset to Defaults Button */}
            <div className="mb-4 px-2 md:px-6">
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-base transition-all"
                onClick={handleReset}>
                <Image src="/mockupgeneration/reply.svg" alt="Reset" width={22} height={22} />
                Reset to Defaults
              </button>
            </div>

            {/* Prompt Enhance Dropdown */}
            <div className="mb-4 px-2 md:px-6" style={{ position: 'relative', zIndex: 50 }}>
              <div className="relative z-50">
                <button
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-base transition-all flex-col items-start"
                  onClick={() => setIsPromptEnhanceOpen(v => !v)}
                  style={{ alignItems: 'stretch' }}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="flex items-center gap-2">
                      <Image src="/mockupgeneration/stars.svg" alt="Prompt Enhance" width={22} height={22} />
                      <span className="text-xs text-white/80">Prompt Enhance</span>
                    </span>
                    <span className={`transition-transform ${isPromptEnhanceOpen ? 'rotate-180' : ''}`} style={{ display: 'inline-block' }}>
                      <Image src="/mockupgeneration/dropdownicon.svg" alt="Dropdown" width={18} height={18} />
                    </span>
                  </div>
                  <span className="block mt-1 ml-7 text-white text-base font-bold text-left">{promptEnhance}</span>
                </button>
                {isPromptEnhanceOpen && (
                  <div className="absolute left-0 right-0 mt-1 bg-[#18181b] rounded-lg shadow-lg z-50" style={{ minWidth: '100%' }}>
                    {promptEnhanceOptions.map(option => (
                      <button
                        key={option}
                        className={`w-full text-left px-4 py-2 text-white hover:bg-[#23232a] rounded-lg transition-all ${promptEnhance === option ? 'bg-[#6C3BFF]/20' : ''}`}
                        onClick={() => { setPromptEnhance(option); setIsPromptEnhanceOpen(false); }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Save Button */}
            <div className="mb-6 px-2 md:px-6">
              <button className="w-full flex items-center justify-center gap-2 py-4 rounded-lg bg-gradient-to-r from-[#6C3BFF] to-[#412399] hover:from-[#5A2FE6] hover:to-[#3A1F8A] text-white font-semibold text-lg transition-all"
                onClick={() => setShowSummary(true)}>
                Save
                <span className="flex items-center ml-2 text-base font-medium">
                  (
                  <Image src="/BRANDINGKIT/coins.svg" alt="Tokens" width={24} height={24} className="mx-1" />
                  100
                  )
                </span>
              </button>
            </div>

            {/* Summary Section */}
            <div className="bg-white/10 backdrop-blur-3xl rounded-lg p-4 space-y-2 text-sm text-gray-300 mt-2 mb-6 mx-2 md:mx-6">
              <div className="flex justify-between">
                <span className="font-semibold text-white">Number of Image :</span>
                <span className="text-white">{showSummary ? props.numberOfImages : ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-white">Font Select :</span>
                <span className="text-white">{showSummary ? selectedFont : ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-white">Background Select :</span>
                <span className="text-white">{showSummary ? selectedBackground : ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-white">Camera Angle :</span>
                <span className="text-white">{showSummary ? props.selectedStyle : ''}</span>
              </div>
            </div>

            {/* Model & Preset Button */}
            {/* <div className="mb-6 px-2 md:px-6">
              <ModelsPresetPanel
                isOpen={isModelsOpen}
                onClose={() => setIsModelsOpen(false)}
                selectedModel={props.selectedModel}
                onModelSelect={props.setSelectedModel}
              />
            </div> */}
            {/* Font Select, Color Select, and other sections will be added next */}
          </div>
        </div>
      </div>

      {/* Desktop Models Panel */}
      {/* <div className="hidden md:block">
        <ModelsPresetPanel
          isOpen={isModelsOpen}
          onClose={() => setIsModelsOpen(false)}
          selectedModel={props.selectedModel}
          onModelSelect={handleModelSelect}
        />
      </div> */}
    </>
  )
}
