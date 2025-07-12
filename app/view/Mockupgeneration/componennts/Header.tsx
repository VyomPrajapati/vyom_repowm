import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Header() {
  return (
    <header className="text-center py-8 lg:py-12 xl:py-16 ">
      <div className="flex items-center justify-center gap-4 md:gap-60 mb-6 lg:mb-8 mt-[10rem]">
        
      <button className="p-3 lg:p-4 bg-[#221F26]/50 hover:bg-gray-700/50 rounded-xl transition-colors  ">
          <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>
        <div className="flex-1 max-w-4xl ">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-[#5AD7FF] to-[#656BF5] text-transparent bg-clip-text transition-colors">Mockup Generations</h1>
          <p className="text-[#A39FA8] text-sm lg:text-base xl:text-lg leading-relaxed ">
            Create awe-inspiring masterpieces effortlessly and explore the endless possibilities of AI generated art.
            Enter a prompt, choose a style, and watch Imagine - AI art generator bring your ideas to life!
          </p>
        </div>

        <button className="p-3 lg:p-4 bg-[#221F26]/50 hover:bg-gray-700/50 rounded-xl transition-colors">
          <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>
      </div>
    </header>
  )
}
