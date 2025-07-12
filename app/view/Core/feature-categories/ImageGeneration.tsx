import Link from "next/link"
import { IMAGEGENERATION } from "@/routes/routes"

interface FeatureItem {
  title: string
  href: string
  icon: string
  coming?: boolean
}

const imageGenerationFeatures: FeatureItem[] = [
  { title: "Text to Image", href: IMAGEGENERATION.IMAGE_GENERATION, icon: "🎨" },
  { title: "Image to Image", href: IMAGEGENERATION.STICKER_GENERATION, icon: "🖼️" },
  { title: "AI Sticker Generation", href: IMAGEGENERATION.STICKER_GENERATION, icon: "🏷️" },
  { title: "Character Generation", href: "/features/character-generation", icon: "👤" },
  { title: "Live Portrait", href: "/features/live-portrait", icon: "📸" },
  { title: "Character Swap", href: "/features/character-swap", icon: "🔄" },
  { title: "In Paint", href: "/features/in-paint", icon: "🎭" },
  { title: "Facial Expression", href: "/features/facial-expression", icon: "😊" },
  { title: "Image Upscale", href: "/features/image-upscale", icon: "⬆️" },
  { title: "Remove Background", href: "/features/remove-background", icon: "🗑️" },
]

export default function ImageGeneration() {
  return (
    <div className="space-y-4">
      <h3 className="text-white font-semibold text-base lg:text-lg mb-4">Image Generation</h3>
      <div className="space-y-3">
        {imageGenerationFeatures.map((feature, index) => (
          <Link
            key={index}
            href={feature.href}
            className="flex items-center text-gray-300 hover:text-white transition-all duration-200 text-sm group"
          >
            <div className="w-8 h-8  rounded-md flex items-center border border-gray-700 justify-center mr-3 group-hover:bg-gray-100 transition-colors duration-200">
            <span className="text-sm">{feature.icon}</span>
            </div>
            <span className="flex-1 font-normal">{feature.title}</span>
            {feature.coming && <span className="text-xs text-yellow-400 ml-2">(Soon)</span>}
          </Link>
        ))}
      </div>
    </div>
  )
}
