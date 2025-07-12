"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Search, ChevronDown, ChevronUp } from "lucide-react"
import Footer from "../Core/Footer"
import NavigationFull from "../Core/NavigationFull"

// FAQ data
const faqs = [
  {
    id: "01",
    question: "How does Wild Mind's text-to-image generation work?",
    answer:
      "WildMind uses advanced AI models to convert text descriptions into high-quality images. Simply enter a detailed prompt, and our AI will generate stunning visuals based on your input.",
  },
  {
    id: "02",
    question: "Do I need a subscription to use Wild Mind?",
    answer:
      "WildMind offers both free and premium plans. The free plan includes a limited number of image generations per day, while our subscription plans provide faster processing, higher resolution images, and more customization options.",
  },
  {
    id: "03",
    question: "What types of images can I generate?",
    answer:
      "You can generate a wide range of images, including realistic photos, digital art, anime-style illustrations, and more. Our AI is designed to adapt to various artistic styles based on your prompt.",
  },
  {
    id: "04",
    question: "Can I use the generated images for commercial purposes?",
    answer:
      "Yes! With a premium subscription, you get full commercial usage rights for your generated images. Free-tier users may have limitations, so check our terms of use for more details.",
  },
  {
    id: "05",
    question: "How long does it take to generate an image?",
    answer:
      "We optimize our AI models for fast image generation. On average, it takes 10-15 seconds to generate an image for premium users. Free users may experience slightly longer wait times.",
  },
]

export default function SupportPage() {
  const [openQuestion, setOpenQuestion] = useState("01") // First question open by default
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }

    // Initial check
    checkScreenSize()

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize)

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  return (
    <>
      <div className="min-h-screen bg-black text-white px-4 md:px-6 lg:px-8 pt-20">
        <NavigationFull />
        {/* Grid Container */}
        <div className="max-w-[90vw] mx-auto">
          {/* Images Grid - Desktop */}
          {!isMobile && !isTablet && (
            <>
              {/* Top Row */}
              <div className="flex flex-wrap justify-center md:justify-between lg:justify-evenly gap-3 md:gap-0 lg:gap-0 mb-3 md:mb-4 lg:mb-5">
                <div className="relative w-[48%] md:w-[34%] lg:w-[33%] aspect-[6/3] rounded-2xl overflow-hidden">
                  <Image src="/supportus/support1.png" alt="3D Characters" fill className="object-fit" />
                </div>
                <div className="relative w-[48%] md:w-[18%] lg:w-[18%] aspect-[6/3] rounded-2xl overflow-hidden">
                  <Image src="/supportus/support2.png" alt="Kids Playing Soccer" fill className="object-fit" />
                </div>
                <div className="relative w-[48%] md:w-[29%] lg:w-[28%] aspect-[6/3] rounded-2xl overflow-hidden">
                  <Image src="/supportus/support3.png" alt="Neon Coffee Sign" fill className="object-fit" />
                </div>
                <div className="relative w-[48%] md:w-[15%] lg:w-[15%] aspect-[6/3] rounded-2xl overflow-hidden">
                  <Image src="/supportus/support4.png" alt="Neon Coffee Sign" fill className="object-fit" />
                </div>
              </div>

              {/* Bottom Row */}
              <div className="flex flex-wrap justify-center md:justify-between lg:justify-evenly gap-3 md:gap-0 lg:gap-0 mb-3 md:mb-4 lg:mb-5">
                <div className="relative w-[48%] md:w-[18%] lg:w-[18%] aspect-[6/3] rounded-2xl overflow-hidden">
                  <Image src="/supportus/support5.png" alt="3D Characters" fill className="object-fit" />
                </div>
                <div className="relative w-[48%] md:w-[34%] lg:w-[33%] aspect-[6/3] rounded-2xl overflow-hidden">
                  <Image src="/supportus/support8.png" alt="Kids Playing Soccer" fill className="object-fit" />
                </div>
                <div className="relative w-[48%] md:w-[18%] lg:w-[18%] aspect-[6/3] rounded-2xl overflow-hidden">
                  <Image src="/supportus/support6.png" alt="Neon Coffee Sign" fill className="object-fit" />
                </div>
                <div className="relative w-[48%] md:w-[26%] lg:w-[25%] aspect-[6/3] rounded-2xl overflow-hidden">
                  <Image src="/supportus/support7.png" alt="Neon Coffee Sign" fill className="object-fit" />
                </div>
              </div>
            </>
          )}

          {/* Images Grid - Tablet (3 images per row, 2 rows) */}
          {isTablet && (
            <>
              {/* Top Row */}
              <div className="flex flex-wrap justify-between gap-3 mb-3">
                <div className="relative w-[32%] aspect-[6/4] rounded-2xl overflow-hidden">
                  <Image src="/supportus/support1.png" alt="3D Characters" fill className="object-cover" />
                </div>
                <div className="relative w-[32%] aspect-[6/4] rounded-2xl overflow-hidden">
                  <Image src="/supportus/support2.png" alt="Kids Playing Soccer" fill className="object-cover" />
                </div>
                <div className="relative w-[32%] aspect-[6/4] rounded-2xl overflow-hidden">
                  <Image src="/supportus/support3.png" alt="Neon Coffee Sign" fill className="object-cover" />
                </div>
              </div>

              {/* Bottom Row */}
              <div className="flex flex-wrap justify-between gap-3 mb-3">
                <div className="relative w-[32%] aspect-[6/4] rounded-2xl overflow-hidden">
                  <Image src="/supportus/support4.png" alt="Neon Coffee Sign" fill className="object-cover" />
                </div>
                <div className="relative w-[32%] aspect-[6/4] rounded-2xl overflow-hidden">
                  <Image src="/supportus/support5.png" alt="3D Characters" fill className="object-cover" />
                </div>
                <div className="relative w-[32%] aspect-[6/4] rounded-2xl overflow-hidden">
                  <Image src="/supportus/support6.png" alt="Kids Playing Soccer" fill className="object-cover" />
                </div>
              </div>
            </>
          )}

          {/* Images Grid - Mobile (2 images per row, 2 rows) */}
          {isMobile && (
            <>
              {/* Top Row */}
              <div className="flex flex-wrap  gap-0 mb-2">
                <div className="relative w-[60%] aspect-[6/4] rounded-xl overflow-hidden mr-2">
                  <Image src="/supportus/support1.png" alt="3D Characters" fill className="object-cover" />
                </div>
                <div className="relative w-[36%] aspect-[6/4] rounded-xl overflow-hidden">
                  <Image src="/supportus/support2.png" alt="Kids Playing Soccer" fill className="object-cover" />
                </div>
              </div>

              {/* Bottom Row */}
              <div className="flex flex-wrap  gap-0 mb-3">
                <div className="relative w-[36%] aspect-[6/4] rounded-xl overflow-hidden mr-2">
                  <Image src="/supportus/support3.png" alt="Neon Coffee Sign" fill className="object-cover" />
                </div>
                <div className="relative w-[60%] aspect-[6/4] rounded-xl overflow-hidden">
                  <Image src="/supportus/support4.png" alt="Neon Coffee Sign" fill className="object-cover" />
                </div>
              </div>
            </>
          )}

          {/* Text Content */}
          <div className="text-center mb-4 md:mb-14 md:mt-10 lg:mb-16 lg:mt-10">
            <h1
              className="text-3xl md:text-5xl lg:text-5xl font-bold mb-2 md:mb-5 lg:mb-2 transition-colors 
            bg-gradient-to-b from-[#5AD7FF] to-[#656BF5] text-transparent bg-clip-text"
            >
              We&apos;re Ready to Help!
            </h1>
            <p className="text-white text-sm md:text-lg lg:text-lg max-w-full mx-auto">
              Got a question or need help? Browse our FAQs or contact our support team for fast assistance.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 text-[#FFFFFF] h-5 w-5 md:h-6 md:w-5" />
              <input
                type="text"
                placeholder="Search for articles..."
                className="w-full pl-12 md:pl-16 pr-4 py-3 md:py-4 rounded-full bg-[#343434] text-white placeholder-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="max-w-[60rem] mx-auto mt-6 md:mt-36 lg:mt-36 px-4 md:px-8 lg:px-8">
            <h2 className="text-2xl md:text-6xl lg:text-7xl font-bold text-center mb-6 md:mb-12 lg:mb-14">
              Frequently Asked <br /> Questions
            </h2>

            <div className="space-y-2 md:space-y-8 lg:space-y-8 pb-10">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="border border-[#152329] mobile:rounded-xl md:rounded-xl md:border-[3px] lg:rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenQuestion(openQuestion === faq.id ? "" : faq.id)}
                    className="w-full flex items-center justify-between pl-2 py-2 md:p-0 lg:pt-0 lg:pl-0 text-left hover:bg-gray-900/50 transition-colors"
                    aria-expanded={openQuestion === faq.id}
                    aria-controls={`faq-${faq.id}`}
                  >
                    <div className="flex items-center md:space-x-8 lg:space-x-10 ml-2 md:ml-8 lg:ml-8">
                      <span className="text-sm md:text-xl lg:text-2xl ml-0 font-semibold">{faq.question}</span>
                    </div>
                    {/* Different button styles for mobile/tablet vs desktop */}
                    {isMobile || isTablet ? (
                      <div
                        className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-r-lg flex-shrink-0 transition-colors`}
                      >
                        {openQuestion === faq.id ? (
                          <ChevronUp className="w-6 h-6 text-[#4D96FF] transition-transform duration-300" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-[#4D96FF] transition-transform duration-300" />
                        )}
                      </div>
                    ) : (
                      <div
                        className={`w-12 h-12 md:w-20 md:h-20 lg:w-20 lg:h-20 flex items-center justify-center rounded-r-lg flex-shrink-0 transition-colors 
                        ${openQuestion === faq.id ? "bg-gradient-to-b from-[#5AD7FF] to-[#656BF5]" : "bg-[#152329]"}`}
                      >
                        {openQuestion === faq.id ? (
                          <span className="text-2xl font-bold text-white">−</span>
                        ) : (
                          <span className="text-2xl font-bold text-white">+</span>
                        )}
                      </div>
                    )}
                  </button>

                  <div
                    id={`faq-${faq.id}`}
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openQuestion === faq.id ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="p-4 md:ml-[1.0rem] md:pt-4  lg:-mt-2 pt-0 text-white leading-relaxed mobile:text-sm font-thin md:text-[1.2rem] lg:text-[1.2rem] lg:ml-[1.2rem]">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
