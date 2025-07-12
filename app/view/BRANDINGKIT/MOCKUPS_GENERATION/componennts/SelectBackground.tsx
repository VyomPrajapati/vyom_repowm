import Image from "next/image"
import { useRef } from "react"

interface SelectBackgroundProps {
  selectedBackground: string
  setSelectedBackground: (bg: string) => void
  onUpload: (file: File) => void
  backgrounds: { src: string; label: string }[]
}

export default function SelectBackground({
  selectedBackground,
  setSelectedBackground,
  onUpload,
  backgrounds,
}: SelectBackgroundProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0])
    }
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4 px-2 md:px-6">
        <h3 className="text-white text-lg md:text-xl font-medium">Select Background</h3>
      </div>
      <div className="space-y-3 mb-4 px-2 md:px-6">
        {backgrounds.map((bg) => (
          <button
            key={bg.src}
            className={`w-full flex items-center gap-4 p-2 rounded-xl border transition-all duration-200 text-left bg-black/30 hover:bg-white/10 border-white/10 ${
              selectedBackground === bg.src ? "border-[#6C3BFF] ring-2 ring-[#6C3BFF]" : ""
            }`}
            onClick={() => setSelectedBackground(bg.src)}
          >
            <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
              <Image src={bg.src} alt={bg.label} width={56} height={56} className="object-cover w-full h-full" />
            </div>
            <span className="text-white text-base font-medium">{bg.label}</span>
          </button>
        ))}
      </div>
      <div className="px-2 md:px-6">
        <label className="block w-full cursor-pointer border-2 border-dashed border-white/20 rounded-xl p-4 text-center text-gray-300 hover:bg-white/5 transition-all">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 mb-1">
              <Image src="/BRANDINGKIT/upload.svg" alt="Upload" width={28} height={28} />
            </span>
            <span className="text-sm">Browse and choose the files you want to upload from your Image & Video</span>
          </div>
        </label>
      </div>
    </div>
  )
} 