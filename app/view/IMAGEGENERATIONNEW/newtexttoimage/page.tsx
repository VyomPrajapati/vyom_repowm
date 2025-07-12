"use client"

import { useState } from "react"
import Header from "./componennts/Header"
import InputSection from "./componennts/InputSection"
import SettingsPanel from "./componennts/SettingsPanel"
// import BackgroundShapes from "./componennts/BackgroundShapes"
import Image from 'next/image'
import NavigationFull from "../../Core/NavigationFull"
import Footer from "../../Core/Footer"

export default function NewText2Image() {
  const [prompt, setPrompt] = useState("")
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedModel, setSelectedModel] = useState("Stable Diffusion 3.5 Large")
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [selectedAspectRatio, setSelectedAspectRatio] = useState("1:1")
  const [selectedQuality, setSelectedQuality] = useState("HD")
  const [numberOfImages, setNumberOfImages] = useState(1)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    
    try {
      // Prepare the final prompt with style if selected
      const finalPrompt = selectedStyle ? `${prompt}, ${selectedStyle} style` : prompt
      
      // Get resolution based on aspect ratio and quality
      const resolutionMap: Record<string, Record<string, [number, number]>> = {
        "1:1": {
          SD: [512, 512],
          HD: [768, 768],
          FullHD: [1024, 1024],
          "2K": [2048, 2048],
        },
        "16:9": {
          SD: [640, 360],
          HD: [1280, 720],
          FullHD: [1920, 1080],
          "2K": [2560, 1440],
        },
        "9:16": {
          SD: [360, 640],
          HD: [720, 1280],
          FullHD: [1080, 1920],
          "2K": [1440, 2560],
        },
        "4:3": {
          SD: [512, 384],
          HD: [768, 576],
          FullHD: [1024, 768],
          "2K": [2048, 1536],
        },
      }

      let [width, height] = resolutionMap[selectedAspectRatio]?.[selectedQuality] || [768, 768]
      // Ensure width and height are divisible by 16
      width = width - (width % 16)
      height = height - (height % 16)

      // Call the API
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: finalPrompt,
          width,
          height,
          num_images: numberOfImages,
          model: selectedModel,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate images')
      }

      const data = await response.json()
      setGeneratedImages(data.image_urls || [])
    } catch (error) {
      console.error('Generation failed:', error)
      // Fallback to placeholder images for demo
      const placeholderImages = Array(numberOfImages).fill("/placeholder.svg?height=400&width=400")
      setGeneratedImages(placeholderImages)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSettingsToggle = () => {
    setIsSettingsOpen(!isSettingsOpen)
  }

  return (
    <>
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image src="/newt2image/bg.png" alt="background" width={1920} height={1080} className="w-auto h-auto  md:-mt-48  object-contain " />
      </div>
      <NavigationFull />
      {/* <BackgroundShapes /> */}

      <div className="relative z-10">
        <Header />

        <main className="container mx-auto  lg:px-8 xl:px-12 2xl:px-16">
          <InputSection
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={handleGenerate}
            onSettingsToggle={handleSettingsToggle}
            isGenerating={isGenerating}
            generatedImages={generatedImages}
            selectedModel={selectedModel}
            selectedStyle={selectedStyle}
            selectedQuality={selectedQuality}
            selectedAspectRatio={selectedAspectRatio}
            numberOfImages={numberOfImages}
          />
        </main>

        
      </div>
      

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        selectedStyle={selectedStyle}
        setSelectedStyle={setSelectedStyle}
        selectedAspectRatio={selectedAspectRatio}
        setSelectedAspectRatio={setSelectedAspectRatio}
        selectedQuality={selectedQuality}
        setSelectedQuality={setSelectedQuality}
        numberOfImages={numberOfImages}
        setNumberOfImages={setNumberOfImages}
      />
      
    </div>
    <Footer />
    </>
  )
}
