import Image from "next/image"

interface GeneratedResultsProps {
  results: string[]
}

export default function GeneratedResults({ results }: GeneratedResultsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto">
      {results.map((result, index) => (
        <div
          key={index}
          className="bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:bg-gray-700/20 transition-colors cursor-pointer"
        >
          <div className="aspect-square bg-gray-900/50 rounded-lg lg:rounded-xl overflow-hidden">
            <Image
              src={result || "/placeholder.svg"}
              alt={`Generated mockup ${index + 1}`}
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
