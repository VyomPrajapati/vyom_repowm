"use client"

import { useState } from "react"
import Image from "next/image"
import { getImageUrl } from "@/routes/imageroute"

const RatingSection = () => {
  const [rating, setRating] = useState<number>(0)

  const handleRatingClick = (star: number) => {
    if (rating === star) {
      setRating(0) // If the same star is clicked, reset to 0 (unselect)
    } else {
      setRating(star) // Otherwise, update to the clicked star
    }
  }

  return (
    <div
      className="relative mt-20 md:mt-40 text-center text-white w-full"
      style={{
        backgroundImage: `url(${getImageUrl("contactus", "bg_rating")})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        height: "70vh",
        maxHeight: "100vh",
      }}
    >
      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Glowing Effect for Icon */}
        <div className="inline-block rounded-full mb-0 p-4">
          <Image
            src={getImageUrl("contactus", "rateicon") || "/placeholder.svg"}
            alt="Mobile App"
            width={80} // Smaller for mobile
            height={80}
            className="w-20 h-20 md:w-32 md:h-32 object-contain rounded-full"
          />
        </div>

        {/* Rating Heading */}
        <h3 className="text-xl md:text-2xl mb-10">
          How do you rate
          <br />
          Your app experience?
        </h3>

        {/* Star Rating */}
        <div className="-mt-12 flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRatingClick(star)}
              className={`text-[3rem] md:text-[4rem] transition-all duration-200 ${
                star <= rating ? "text-yellow-400" : "text-gray-500"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* Background Overlay to Improve Visibility */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>
    </div>
  )
}

export default RatingSection
