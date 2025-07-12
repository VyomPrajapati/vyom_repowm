"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Check } from "lucide-react"
import Image from "next/image"
import Footer from "../Core/Footer"
import NavigationFull from "../Core/NavigationFull"
import ProtectedRoute from "@/app/utils/ProtectedRoute"

type BillingPeriod = "monthly" | "yearly"

interface PlanFeature {
  text: string
}

interface PricingPlan {
  name: string
  monthlyPrice: number
  yearlyPrice: number
  features: PlanFeature[]
  isCurrent?: boolean
  fastGenerations: string
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Basic Plan",
    monthlyPrice: 0,
    yearlyPrice: 0,
    fastGenerations: "30h",
    isCurrent: true,
    features: [
      { text: "Unlimited Relaxed generations" },
      { text: "General commercial terms" },
      { text: "Access to member gallery" },
      { text: "Optional credit top ups" },
      { text: "3 concurrent fast jobs" },
      { text: "12 concurrent fast jobs" },
      { text: "Access to member gallery" },
      { text: "Optional credit top ups" },
    ],
  },
  {
    name: "Stander Plan",
    monthlyPrice: 30,
    yearlyPrice: 24,
    fastGenerations: "30h",
    features: [
      { text: "Unlimited Relaxed generations" },
      { text: "General commercial terms" },
      { text: "Access to member gallery" },
      { text: "Optional credit top ups" },
      { text: "3 concurrent fast jobs" },
      { text: "12 concurrent fast jobs" },
      { text: "Access to member gallery" },
      { text: "Optional credit top ups" },
    ],
  },
  {
    name: "Pro Plan",
    monthlyPrice: 60,
    yearlyPrice: 48,
    fastGenerations: "30h",
    features: [
      { text: "Unlimited Relaxed generations" },
      { text: "General commercial terms" },
      { text: "Access to member gallery" },
      { text: "Optional credit top ups" },
      { text: "3 concurrent fast jobs" },
    ],
  },
  {
    name: "Unlimited Plan",
    monthlyPrice: 120,
    yearlyPrice: 96,
    fastGenerations: "60h",
    features: [
      { text: "Unlimited Relaxed generations" },
      { text: "General commercial terms" },
      { text: "Access to member gallery" },
      { text: "Optional credit top ups" },
      { text: "3 concurrent fast jobs" },
      { text: "12 concurrent fast jobs" },
    ],
  },
]

export default function SubscriptionToggle() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly")
  const [animateToggle, setAnimateToggle] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // Swipe threshold (in px)
  const minSwipeDistance = 50

  const cardsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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

  const handleToggle = (period: BillingPeriod) => {
    if (period !== billingPeriod) {
      setAnimateToggle(true)
      setBillingPeriod(period)
    }
  }

  useEffect(() => {
    if (animateToggle) {
      const timer = setTimeout(() => {
        setAnimateToggle(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [animateToggle])

  // Touch event handlers that allow vertical scrolling
  const onTouchStart = (e: React.TouchEvent) => {
    // Store both X and Y coordinates
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
    // Don't prevent default to allow vertical scrolling
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
    // Don't prevent default to allow vertical scrolling
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      // Next slide
      setCurrentSlide((prev) => (prev === pricingPlans.length - 1 ? prev : prev + 1))
    }

    if (isRightSwipe) {
      // Previous slide
      setCurrentSlide((prev) => (prev === 0 ? 0 : prev - 1))
    }
  }

  // Mouse drag handlers that allow vertical scrolling
  const onMouseDown = (e: React.MouseEvent) => {
    if (!cardsContainerRef.current || !(isMobile || isTablet)) return

    setIsDragging(true)
    setStartX(e.pageX - cardsContainerRef.current.offsetLeft)
    setScrollLeft(cardsContainerRef.current.scrollLeft)
    // Don't prevent default to allow vertical scrolling
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !cardsContainerRef.current || !(isMobile || isTablet)) return

    // Don't prevent default here to allow vertical scrolling
    const x = e.pageX - cardsContainerRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed multiplier
    cardsContainerRef.current.scrollLeft = scrollLeft - walk
  }

  const onMouseUp = () => {
    setIsDragging(false)

    if (!cardsContainerRef.current || !(isMobile || isTablet)) return

    // Calculate which slide to snap to based on scroll position
    const cardWidth = cardsContainerRef.current.scrollWidth / pricingPlans.length
    const newSlide = Math.round(cardsContainerRef.current.scrollLeft / cardWidth)
    setCurrentSlide(Math.max(0, Math.min(newSlide, pricingPlans.length - 1)))

    // Smooth scroll to the selected slide
    cardsContainerRef.current.scrollTo({
      left: newSlide * cardWidth,
      behavior: "smooth",
    })
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (

    <>
    <ProtectedRoute>
      <NavigationFull />

      <div className="min-h-screen relative text-white p-4 md:p-10 flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black"></div>
          <Image
            src="/plans/IMAGE.png"
            alt="Background gradient"
            className="w-full h-full object-cover opacity-50"
            width={1920}
            height={1080}
          />
        </div>

        <div className="relative z-10 w-full max-w-[90%] mt-16 md:mt-0">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 mt-10">Purchase a subscription</h1>
            <p className="text-lg md:text-xl text-[#FFFFFF]">Choose the plan that works for you.</p>
          </div>

          {/* Toggle Switch */}
          <div className="flex justify-center mb-8 md:mb-16">
            <div className="relative bg-[#FFFFFF] rounded-full p-1 flex w-[74%] md:w-[25%] h-[3rem] md:h-[3.8rem]">
              {/* Animated Background */}
              <div
                className={`absolute top-1 bottom-1 rounded-full bg-gradient-to-b from-[#5AD7FF] to-[#656BF5] transition-all duration-300 ease-in-out ${
                  billingPeriod === "monthly" ? "left-1 right-[calc(55%+1px)]" : "left-[calc(45%+1px)] right-1"
                }`}
              ></div>

              {/* Monthly Button */}
              <button
                onClick={() => handleToggle("monthly")}
                className={`flex-1 relative z-10 py-2 rounded-full text-center text-base md:text-lg transition-colors ${
                  billingPeriod === "monthly" ? "text-white" : "text-[#1D2127]"
                }`}
              >
                Monthly
              </button>

              {/* Yearly Button */}
              <button
                onClick={() => handleToggle("yearly")}
                className={`flex-1 relative z-10 py-2 rounded-full text-center text-base md:text-lg transition-colors ${
                  billingPeriod === "yearly" ? "text-white" : "text-[#1D2127]"
                }`}
              >
                Yearly <span className="text-xs md:text-sm text-black">-20% off</span>
              </button>
            </div>
          </div>

          {/* Desktop Pricing Cards */}
          {!isMobile && !isTablet && (
            <div className="m-4 p-4 rounded-3xl w-full bg-[linear-gradient(to_bottom,black_60%,gray_100%,white_100%)]">
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 relative z-10">
                {pricingPlans.map((plan, index) => (
                  <div
                    key={index}
                    className={`bg-black text-white backdrop-blur-sm border rounded-3xl p-6 flex flex-col h-full transition-all duration-300 ${
                      selectedPlan === index ? "border-white" : "border-none"
                    }`}
                    onClick={() => setSelectedPlan(index)}
                  >
                    <div className="mb-6">
                      <h2 className="text-xl font-bold mb-2 mt-2">{plan.name}</h2>
                      <div className="flex mt-4">
                        <span className="text-4xl font-bold">
                          ${billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                        </span>
                        <span className="mt-0 ml-2 text-sm text-gray-400">
                          per editor/
                          {billingPeriod === "monthly" ? "month" : "month"}
                          <br />
                          billed {billingPeriod}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 flex-grow">
                      <div className="flex items-start gap-2">
                        <div className="mt-1 flex-shrink-0 rounded-full bg-[#35F148] p-1">
                          <Check className="h-3 w-3 text-black" />
                        </div>
                        <span className="text-sm">{plan.fastGenerations} Fast generations</span>
                      </div>

                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-2 ">
                          <div className="mt-1 flex-shrink-0 rounded-full bg-[#35F148] p-1">
                            <Check className="h-3 w-3 text-black" />
                          </div>
                          <span className="text-sm font-poppins font-thin mt-1 ">{feature.text}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      className={`mt-6 py-3 px-4 rounded-xl text-center text-lg w-full ${
                        plan.isCurrent
                          ? "bg-gradient-to-b from-[#5AD7FF] to-[#656BF5]"
                          : "bg-gradient-to-b from-[#5AD7FF] to-[#656BF5] text-white transition-colors"
                      }`}
                    >
                      {plan.isCurrent ? "Current Plan" : "Choose Plan"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mobile and Tablet Pricing Cards with Swipe Functionality */}
          {(isMobile || isTablet) && (
            <div className="relative w-full">
              {/* Pagination Dots at the top */}
              <div className="flex justify-center mb-4 space-x-2">
                {pricingPlans.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentSlide === index ? "bg-white" : "bg-gray-500"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Card Slider with Peek Effect */}
              <div className="overflow-hidden">
                <div
                  ref={cardsContainerRef}
                  className="flex snap-x snap-mandatory touch-pan-x touch-action-pan-y"
                  style={{
                    transform: `translateX(calc(-${currentSlide * 95}% + ${currentSlide > 0 ? "10%" : "0%"}))`,
                    transition: "transform 0.3s ease-out",
                    width: "100%",
                    touchAction: "pan-y" /* This allows vertical scrolling */,
                  }}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                  onMouseDown={onMouseDown}
                  onMouseMove={onMouseMove}
                  onMouseUp={onMouseUp}
                  onMouseLeave={onMouseUp}
                >
                  {pricingPlans.map((plan, index) => (
                    <div
                      key={index}
                      className={`flex-shrink-0 w-[90%] mx-[1%] snap-center bg-black border border-gray-800 rounded-3xl p-6 flex flex-col ${
                        currentSlide === index ? "opacity-100" : "opacity-70"
                      }`}
                    >
                      <div className="mb-4">
                        <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
                        <div className="flex items-center">
                          <span className="text-4xl font-bold">
                            ${billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                          </span>
                          <span className="ml-2  text-sm text-gray-400">
                            per editor/month
                            <br />
                            billed {billingPeriod}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3 flex-grow">
                        <div className="flex items-start gap-2">
                          <div className="mt-1 flex-shrink-0 rounded-full bg-[#35F148] p-1">
                            <Check className="h-3 w-3 text-black" />
                          </div>
                          <span className="text-sm">{plan.fastGenerations} Fast generations</span>
                        </div>

                        {plan.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start gap-2">
                            <div className="mt-1 flex-shrink-0 rounded-full bg-[#35F148] p-1">
                              <Check className="h-3 w-3 text-black" />
                            </div>
                            <span className="text-sm font-poppins font-thin mt-1">{feature.text}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        className={`mt-6 py-3 px-4 rounded-xl text-center text-base w-full bg-gradient-to-b from-[#5AD7FF] to-[#656BF5] text-white`}
                      >
                        {plan.isCurrent ? "Current Plan" : "Choose Plan"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Swipe Instruction */}
              <p className="text-center text-sm text-gray-400 mt-4">Swipe left or right to view more plans</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
      </ProtectedRoute>
    </>
  )
}
