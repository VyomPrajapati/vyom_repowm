"use client"

import type React from "react"

import { useState } from "react"

const scriptURL =
  "https://script.google.com/macros/s/AKfycbz0dKO8m-4_vrGpnaPI4zP01OkoN5uXxo1DrJ9jY_oz5tsoNUYvtxxNKgvdYMiZUGsWBw/exec"

const NewsletterSection = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newsletterMessage, setNewsletterMessage] = useState<string | null>(null)
  const [newsletterError, setNewsletterError] = useState<string | null>(null)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setNewsletterError(null)
    setNewsletterMessage(null)

    if (!newsletterEmail.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setNewsletterError("Please enter a valid email address.")
      setIsSubmitting(false)
      return
    }

    try {
      const formData = new FormData()
      formData.append("NewsletterEmail", newsletterEmail)
      formData.append("FormType", "Newsletter")

      console.log("Submitting newsletter with data:", {
        Email: newsletterEmail,
        FormType: "Newsletter",
      })

      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to submit to Google Sheets")
      }

      setNewsletterMessage("You have successfully subscribed to our newsletter!")
      setNewsletterEmail("")
    } catch (err) {
      setNewsletterError("Failed to subscribe. Please try again.")
      console.error("Error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full md:w-[86%] lg:w-[95%] bg-black  md:py-12 mt-10 md:mt-10 lg:mt-10 md:mb-0 lg:mb-4 px-4 md:ml-16 lg:-ml-28">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 lg:gap-16">
        {/* Left side - Heading */}
        <div className="text-center md:text-left lg:text-left lg:self-start lg:mr-auto">
          <h2 className="text-white text-xl md:text-3xl lg:text-3xl font-semibold leading-tight lg:leading-1.2">
            Join our newsletter to
            <br />
            keep up to date with us!
          </h2>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-auto lg:w-auto lg:-mr-[19rem]">
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col md:flex-row gap-4 md:gap-12 lg:gap-14 w-full max-w-2xl"
            name="submit-to-google-sheet"
          >
            <input type="hidden" name="FormType" value="Newsletter" />
            <div className="flex-grow relative w-full md:w-[22rem] lg:w-[28rem]">
              <input
                type="email"
                name="NewsLetterEmail"
                placeholder="Enter your email"
                className="w-full md:w-[110%] bg-transparent border border-[#414141] rounded-full py-3 px-12 text-white placeholder-gray-400 
                  focus:outline-none focus:ring-2 focus:ring-[#444c55] text-sm md:text-[15px] lg:text-[1rem] opacity-90 transition-all duration-300"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-gray-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 w-[90vw] ml-1 md:w-auto lg:w-[10rem] rounded-full font-medium text-white transition-colors 
                bg-gradient-to-b from-[#5AD7FF] to-[#656BF5] 
                hover:bg-white hover:text-black hover:from-white hover:to-white
                ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      {/* Message Display */}
      <div className="flex justify-center md:justify-end md:mr-[6.2rem] text-xs md:text-sm sm:mr-[7rem] lg:mr-[3.4rem] mt-2">
        {newsletterMessage && <div className="bg-green-500/0 text-green-500 text-center">{newsletterMessage}</div>}
        {newsletterError && (
          <div className="md:mr-[2rem] lg:mr-[4.5rem] bg-green-500/0 text-red-500 text-center">{newsletterError}</div>
        )}
      </div>
    </div>
  )
}

export default NewsletterSection
