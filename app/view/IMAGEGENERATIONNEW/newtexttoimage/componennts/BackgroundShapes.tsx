export default function BackgroundShapes() {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-red-500 rotate-45 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-purple-500 rounded-full animate-bounce" />
        <div className="absolute bottom-1/3 left-1/3 w-5 h-5 bg-green-500 rotate-45 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-4 h-4 bg-pink-500 rounded-full animate-bounce" />
        <div className="absolute top-1/2 left-1/6 w-3 h-3 bg-yellow-500 rotate-45 animate-pulse" />
        <div className="absolute top-2/3 right-1/6 w-5 h-5 bg-blue-500 rounded-full animate-bounce" />
  
        {/* Additional decorative elements */}
        <div className="absolute top-1/5 right-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
        <div className="absolute bottom-1/5 left-1/2 w-3 h-3 bg-orange-400 rotate-45 animate-pulse" />
      </div>
    )
  }
  