import Link from "next/link"

interface FeatureItem {
  title: string
  href: string
  icon: string
  coming?: boolean
}

const videoFeatures: FeatureItem[] = [
  { title: "Text to Video", href: "/features/text-to-video", icon: "🎬" },
  { title: "Image to Video", href: "/features/image-to-video", icon: "🎞️" },
  { title: "VFX AI", href: "/features/vfx-ai", icon: "✨" },
  { title: "Face Swap", href: "/features/face-swap", icon: "🔄" },
  { title: "Live Portrait", href: "/features/live-portrait-video", icon: "📹" },
  { title: "Character Swap", href: "/features/character-swap-video", icon: "👥" },
  { title: "Video Enhancement", href: "/features/video-enhancement", icon: "⚡" },
]

export default function VideoGeneration() {
  return (
    <div className="space-y-4">
      <h3 className="text-white font-semibold text-base lg:text-lg mb-4">Video Generation</h3>
      <div className="space-y-3">
        {videoFeatures.map((feature, index) => (
          <Link
            key={index}
            href={feature.href}
            className="flex items-center text-gray-300 hover:text-white transition-all duration-200 text-sm group"
          >
            <div className="w-8 h-8  rounded-md flex items-center border border-gray-700 justify-center mr-3 group-hover:bg-gray-100 transition-colors duration-200">
            <span className="text-sm">{feature.icon}</span>
            </div>
            <span className="flex-1 font-normal   ">{feature.title}</span>
            {feature.coming && <span className="text-xs text-yellow-400 ml-2">(Soon)</span>}
          </Link>
        ))}
      </div>
    </div>
  )
}
