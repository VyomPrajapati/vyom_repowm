import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Header() {
  return (
    <header className="text-center pt-2  lg:py-12 xl:py-16">
      <div className="flex items-center justify-center gap-4 md:gap-60 mb-6 lg:mb-8 mt-[6rem] md:mt-[4rem] lg:mt-[10rem]">
        
        <button className="hidden md:block p-3 md:p-4 bg-[#221F26]/50 hover:bg-gray-700/50 rounded-xl transition-colors">
          <ChevronLeft className="w-10 h-10 md:w-14 md:h-14" />
        </button>
        
        <div className="flex-1 max-w-4xl px-4 md:px-0">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-[#5AD7FF] to-[#656BF5] text-transparent bg-clip-text transition-colors">
            Text to image with AI Art Generator
          </h1>
          <p className="text-[#A39FA8] text-xs md:text-normal xl:text-lg leading-relaxed px-2 md:px-0">
            Create awe-inspiring masterpieces effortlessly and explore the endless possibilities of AI generated art.
            Enter a prompt, choose a style, and watch Imagine - AI art generator bring your ideas to life!
          </p>
        </div>

        <button className="hidden md:block p-3 lg:p-4 bg-[#221F26]/50 hover:bg-gray-700/50 rounded-xl transition-colors">
          <ChevronRight className="w-5 h-5 md:w-14 md:h-14" />
        </button>
      </div>
    </header> 
  )
}
