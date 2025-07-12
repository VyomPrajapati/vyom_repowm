"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

import ModelPreset from "./model-preset"
import StylePalettes from "./style-palettes"
import AspectRatio from "./aspect-ratio"
import NumberOfImages from "./number-of-images"
import SaveButton from "./save-button"
import Models from "./phoenix-models"
import Logo from "./logo"
import Quality from "./quality"

interface SelectionModelProps {
  onClose?: () => void;
  onSave?: (settings: {
    model: string;
    tokenCost: number;
    style: string | null;
    aspectRatio: string;
    numberOfImages: number;
    quality: string;
  }) => void;
}

export default function SelectionModel({ onClose, onSave }: SelectionModelProps) {
  const [isModelsOpen, setIsModelsOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState("Stable Diffusion 3.5 Large")
  const [selectedTokenCost, setSelectedTokenCost] = useState(22)
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [selectedAspectRatio, setSelectedAspectRatio] = useState("1:1")
  const [selectedNumberOfImages, setSelectedNumberOfImages] = useState(1)
  const [selectedQuality, setSelectedQuality] = useState("HD")

  const sidebarRef = useRef<HTMLDivElement>(null)
  const presetRef = useRef<HTMLDivElement>(null)
  const appContainerRef = useRef<HTMLDivElement>(null)

  const toggleModels = () => {
    setIsModelsOpen(!isModelsOpen)
  }

  const handleModelSelect = (model: string, tokenCost: number) => {
    setSelectedModel(model)
    setSelectedTokenCost(tokenCost)
  }

  const handleSave = () => {
    if (onSave) {
      onSave({
        model: selectedModel,
        tokenCost: selectedTokenCost,
        style: selectedStyle,
        aspectRatio: selectedAspectRatio,
        numberOfImages: selectedNumberOfImages,
        quality: selectedQuality,
      })
    }
    if (onClose) {
      onClose()
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        appContainerRef.current &&
        !appContainerRef.current.contains(event.target as Node)
      ) {
        if (onClose) {
          onClose();
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  return (
    <div 
      ref={appContainerRef}
      className="absolute left-0 top-0 w-[380px] h-screen overflow-hidden z-50 mb:w-[300px]"
    >
      <div className="absolute inset-0 h-full bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg"></div>
      <div className="relative w-full h-full flex flex-col bg-[#121212] p-4">
        <button 
          onClick={() => {
            if (onClose) onClose();
          }} 
          className="self-end text-white mb-4"
        >
          Close
        </button>
        <Logo />
        <div className="mt-4" ref={presetRef}>
          <ModelPreset isOpen={isModelsOpen} toggle={toggleModels} selectedModel={selectedModel} />
        </div>
        <div className="mt-6">
          <StylePalettes onStyleSelect={setSelectedStyle} selectedStyle={selectedStyle} />
        </div>
        <div className="mt-6">
          <Quality onQualitySelect={setSelectedQuality} selectedQuality={selectedQuality} />
        </div>
        <div className="mt-6">
          <AspectRatio onAspectRatioSelect={setSelectedAspectRatio} selectedAspectRatio={selectedAspectRatio} />
        </div>
        <div className="mt-6">
          <NumberOfImages onNumberOfImagesSelect={setSelectedNumberOfImages} selectedNumberOfImages={selectedNumberOfImages} />
        </div>
        <div className="mt-8 flex justify-start mb:justify-end">
          <SaveButton onClick={handleSave} />
        </div>
      </div>

      <AnimatePresence>
        {isModelsOpen && (
          <motion.div
            ref={sidebarRef}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-[380px] w-[724px] h-screen overflow-auto mb:left-0 mb:w-[350px]"
          > 
            <div>
              <Models setSelectedModel={handleModelSelect} toggleModels={toggleModels} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
