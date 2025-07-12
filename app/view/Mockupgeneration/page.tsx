"use client"

import { useState } from "react"
import Header from "./componennts/Header"
import InputSection from "./componennts/InputSection"
import ResultSection from "./componennts/ResultSection"
import SettingsPanel from "./componennts/SettingsPanel"
// import BackgroundShapes from "./componennts/BackgroundShapes"
import NavigationFull from "../Core/NavigationFull"
import Image from 'next/image'

export default function MockupGenerationPage() {
  const [prompt, setPrompt] = useState("")
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedCameraAngle, setSelectedCameraAngle] = useState("Back View")
  const [selectedBackground, setSelectedBackground] = useState("Presets 2")

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      setGeneratedImage("/placeholder.svg?height=400&width=400")
      setIsGenerating(false)
    }, 3000)
  }

  const handleSettingsToggle = () => {
    setIsSettingsOpen(!isSettingsOpen)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image src="/mockupgeneration/bg.png" alt="background" width={1920} height={1080} className="w-full h-full object-cover " />
      </div>
      <NavigationFull />
      {/* <BackgroundShapes /> */}

      <div className="relative z-10">
        <Header />

        <main className="container mx-auto px-4 lg:px-8 xl:px-12 2xl:px-16">
          {!generatedImage ? (
            <InputSection
              prompt={prompt}
              setPrompt={setPrompt}
              onGenerate={handleGenerate}
              onSettingsToggle={handleSettingsToggle}
              isGenerating={isGenerating}
            />
          ) : (
            <ResultSection
              prompt={prompt}
              generatedImage={generatedImage}
              onNewGeneration={() => {
                setGeneratedImage(null)
                setPrompt("")
              }}
              onSettingsToggle={handleSettingsToggle}
            />
          )}
        </main>
      </div>

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        selectedCameraAngle={selectedCameraAngle}
        setSelectedCameraAngle={setSelectedCameraAngle}
        selectedBackground={selectedBackground}
        setSelectedBackground={setSelectedBackground}
      />
    </div>
  )
}
