import Link from "next/link"

interface FeatureItem {
  title: string
  href: string
  icon: string
  coming?: boolean
}

const audioFeatures: FeatureItem[] = [
  { title: "Text to Music", href: "/features/text-to-music", icon: "🎼" },
  { title: "Audio to Music", href: "/features/audio-to-music", icon: "🎧" },
  { title: "Lyrics to Music", href: "/features/lyrics-to-music", icon: "📝" },
  { title: "Image to Music Suggestion", href: "/features/image-to-music", icon: "🖼️" },
  { title: "Video to Music Suggestion", href: "/features/video-to-music", icon: "🎥" },
]

export default function AudioGeneration() {
  return (
    <div className="space-y-4">
      <h3 className="text-white font-semibold text-base lg:text-lg mb-4 font-poppins ">Audio generation</h3>
      <div className="space-y-3">
        {audioFeatures.map((feature, index) => (
          <Link
            key={index}
            href={feature.href}
            className="font-poppins flex items-center text-gray-300 hover:text-white transition-all duration-200 text-sm group"
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
