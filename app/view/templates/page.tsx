"use client"

import { useState } from "react"
import { Settings } from "lucide-react"
import Image from "next/image"
import NavigationFull from "../Core/NavigationFull"
import Footer from "../Core/Footer"
import SelectionModel from "../imagegeneration/selectionmodel/app-container"
import ProtectedRoute from "@/app/utils/ProtectedRoute"
// import { APP_ROUTES, NAV_ROUTES, FEATURE_ROUTES } from "../../../routes/routes"

// Sample data for the templates
const templates = [
  {
    id: 1,
    image: "/templates/t1.png",
    model: "FLUX.1 Schnell",
    tokenUse: "45 Credits",
    time: "18 seconds",
    prompt:
      "A fierce cyberpunk warrior woman with glowing blue eyes and silver hair, holding neon-etched swords. Wears sleek futuristic armor, standing in a vibrant neon-lit city street at night. Highly detailed, dynamic pose, sci-fi atmosphere with a dark, edgy aesthetic.",
  },
  {
    id: 2,
    image: "/templates/t2.png",
    model: "Flux - dev",
    tokenUse: "30 credits",
    time: "20 seconds",
    prompt:
      "A vibrant 3D animated scene of joyful kids and cute animal characters in colorful, glowing outfits. Features a tiger, rabbit, bird, and monkey with big expressive eyes and playful poses. Bright blue sky, fluffy clouds, dynamic, fun atmosphere, highly detailed and stylized.",
  },
  {
    id: 3,
    image: "/templates/t3.png",
    model: "Stable Diffusion large",
    tokenUse: "30 credits",
    time: "17 seconds",
    prompt:
      "A luxurious glass dropper bottle filled with golden serum, surrounded by fresh orange slices and green leaves. The scene is vibrant and natural, highlighting the citrus ingredients and purity of the product. Bright, high-quality, minimal composition with a focus on skincare and wellness.",
  },
]

export default function TextGenerationTemplate() {
  // State to store the current prompt in the input field

  const [showSelectionModel, setShowSelectionModel] = useState(false);

  const [inputPrompt, setInputPrompt] = useState("")

  // Function to handle template selection
  const handleTemplateSelect = (prompt: string) => {
    setInputPrompt(prompt)
  }

  return (<>
    <div className="pb-10 w-full min-h-screen bg-gradient-to-b from-black via-black to-black text-white relative overflow-hidden">
      <NavigationFull />
      {showSelectionModel && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex">
          <div className="absolute left-0 top-0 h-full w-[380px]">
            <SelectionModel onClose={() => setShowSelectionModel(false)} />
          </div>
        </div>
      )}
      {/* Main content container */}
      <div className="w-full max-w-[100%] mx-auto pt-[10vh] px-[5vw]">
        {/* Header section with background image and input */}
        <div className="hidden md:block w-full relative mb-[5vh] rounded-[2vw] overflow-hidden"

          style={{
            boxShadow: "0px 10px 120px 5px #399FC0",
          }}
         >
          {/* Background image */}
          <div className="w-full h-[30vh] relative rounded-[2vw] overflow-hidden shadow-lg">
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"></div>

            {/* Background Image */}
            <Image src="/templates/maintemp.png" alt="AI Robot" fill className="w-[100%] h-auto" />

            {/* Center txt logo */}
            <div className="absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] text-[8vh] font-bold text-white/80 pointer-events-none z-10">
              txt
            </div>
          </div>
        </div>

        <div className="absolute font-poppins mt-0 md:-mt-[8vh] lg:-mt-[8vh] px-[30%] lg:px-0 md:px-0 md:left-[45%] lg:left-[42%] transform -translate-x-[50%] w-[60%] max-w-[800px] flex items-center gap-[1vw] z-10">
          {/* Input Wrapper */}
          <div
            className="hidden mb:block mobile:block relative flex-1 rounded-full md:rounded-full lg:rounded-full"
            style={{
              boxShadow: "",
            }}
          >
            <input
              type="text"
              placeholder="Type a prompt..."
              className="w-[90vw]  md:w-[60vw] bg-[#262626] text-white rounded-2xl my-auto px-4 md:rounded-full h-[6vh] md:h-[6vh] md:py-[1.5vh] md:px-[1vw] md:pr-[11rem]  lg:pr-[11rem]  outline-none border-none backdrop-blur-md placeholder-gray-500"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
            />

            {/* Generate Button (Inside Input) */}
            <button className=" hidden md:block absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-b from-[#5AD7FF] to-[#656BF5] transition-all rounded-full py-[0.9vh] px-[1.8vw]  items-center gap-[0.5vw]">
              <span className="text-xl">Generate</span>
            </button>
          </div>
          

          {/* Settings Button */}
          <button 
                  onClick={() => setShowSelectionModel(true)}

          className="hidden md:block bg-[#262626] hover:bg-black/70 transition-colors backdrop-blur-md rounded-full p-[1.5vh]  items-center justify-center">
            <Settings className="w-[3vh] h-[3vh]" />
          </button>
        </div>

        <div className="md:hidden lg:hidden mt-[7vh]  flex  gap-0 ">
        {/* Settings Button */}
          <button 
                            onClick={() => setShowSelectionModel(true)}
                            className="bg-[#262626] hover:bg-black/70 transition-colors backdrop-blur-md  rounded-xl p-2 flex items-center justify-center my-auto ml-auto">
            <Settings className="my-auto  w-7 h-7 text-white" />
          </button>

        {/* Generate Button */}
        <button className="bg-gradient-to-b from-[#5AD7FF]  to-[#656BF5] transition-all rounded-xl my-auto py-3  px-2 text-white font-medium text-sm flex items-center gap-1">
          <span>Generate</span>
          <Image
            src="/navigationSetting/coins.png"
            width={20}
            height={20}
            alt="credits"
            className="inline-block brightness-0 invert"

          />
          <span>40</span>
            </button>
        </div>


        
        {/* Heading */}
        <div className="mb-[5vh] mt-[4vh] font-poppins md:mt-[10vh]">
          <h1 className="mobile:text-2xl text-[4vh] font-bold mb-[1vh]">Explore. Copy. Generate.</h1>
          <p className="mobile:text-sm font-thin text-[2vh] text-gray-300">
            Professional-quality results, no guesswork—just pick, prompt, and create
          </p>
        </div>

        {/* Templates grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[3vh] w-full">
          {/* First row - 2 templates */}
          <TemplateCard template={templates[0]} onSelect={handleTemplateSelect} />
          <TemplateCard template={templates[1]} onSelect={handleTemplateSelect} />

          {/* Second row - 1 template centered */}
          <div className="md:col-span-2 flex justify-center">
            <div className="w-full md:w-[50%]">
              <TemplateCard template={templates[2]} onSelect={handleTemplateSelect} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}

// Template card component
interface TemplateCardProps {
  template: {
    id: number
    image: string
    model: string
    tokenUse: string
    time: string
    prompt: string
  }
  onSelect: (prompt: string) => void
}

function TemplateCard({ template, onSelect }: TemplateCardProps) {
  return (
    <ProtectedRoute>
    <div
      className="bg-black/30 backdrop-blur-md rounded-[0.5vw] overflow-hidden border border-[#969696] relative cursor-pointer hover:border-[#4FD4E6] transition-colors"
      onClick={() => onSelect(template.prompt)}
    >
      {/* Diamond badge */}
      <div
        className="absolute top-0 right-0 bg-gradient-to-br from-blue-500 to-indigo-500 p-[4vh] z-30"
        style={{
          width: "6vh",
          height: "6vh",
          clipPath: "polygon(100% 0, 0 0, 100% 100%)", // Triangle shape
        }}
      >
        <div className="absolute top-[16%] right-[10%] w-[3vh] h-[3vh]">
          <Image
            src="/templates/diamond.png"
            alt="diamond"
            width={16} // Adjust size as needed
            height={16}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Image section */}
        <div className="mobile:w-full w-[55%] aspect-square relative overflow-hidden p-[3%]">
          <div className="w-full h-full relative">
            <Image
              src={template.image || "/placeholder.svg"}
              alt={`Template ${template.id}`}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content section */}
        <div className="w-full md:w-[60%] p-[2vh] pt-[3vh] font-poppins">
          {/* Model info */}
          <div className="mb-[1vh]">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-[2vh]">Model: {template.model}</h3>
            </div>
            <div className="items-center text-[1.6vh] text-gray-300 mt-[0.5vh]">
              <div className="flex">
                Token use: {template.tokenUse}
                <Image src="/templates/star.png" alt="stars" width={12} height={12} className="ml-2 mb-1" />
              </div>
              <div>Time - {template.time}</div>
            </div>
          </div>

          {/* Prompt */}
          <div className="font-poppins">
            <h4 className="font-bold text-[1.8vh] mb-[1vh]">Prompt</h4>
            <p className="text-[1.8vh] text-gray-300 leading-[1.4] pr-[4vw]">{template.prompt}</p>
          </div>
        </div>
      </div>
     

      {/* Click to use indicator */}
      <div className="absolute bottom-3 right-3 bg-[#4FD4E6]/80 text-white text-xs py-1 px-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        Click to use
      </div>
      
    </div>
    </ProtectedRoute>
  
   
  )
}

