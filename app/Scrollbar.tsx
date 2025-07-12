"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"

interface CardProps {
  title: string
  description: string
  imageSrc: string
  scrollYProgress: MotionValue<number>
  index: number
  total: number
}

function Card({ title, description, imageSrc, scrollYProgress, index, total }: CardProps) {
  const gap = 10 * index
  const startProgress = index / total - 0.04
  const endProgress = (index + 0.6) / total - 0.04

  const opacity = useTransform(scrollYProgress, [startProgress, endProgress], [0, 1])
  const y = useTransform(scrollYProgress, [startProgress, endProgress], [100 + gap, 0 + gap])

  return (
    <motion.div
      className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10"
      style={{ 
        opacity, 
        y,
        background: 'linear-gradient(to right, rgba(24, 26, 27, 0.2), rgba(18, 18, 18, 0.8))',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div 
        className="h-full p-8 md:p-12 flex gap-6 md:gap-8"
        style={{
          background: 'linear-gradient(105deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))'
        }}
      >
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center ml-10">
          <h2 className="text-[40px] md:text-5xl font-extralight text-white mb-4 md:mb-6 -mt-44">{title}</h2>
          <p className="text-[16px] md:text-base text-white font-light leading-relaxed max-w-xl">
            {description}
          </p>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full aspect-square rounded-2xl overflow-hidden">
            <Image 
              src={imageSrc} 
              alt={title}
              layout="responsive"
              width={500}
              height={500}
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Progress Bar Component
interface ProgressBarProps {
  scrollYProgress: MotionValue<number>
}

function ProgressBar({ scrollYProgress }: ProgressBarProps) {
  return (
    <motion.div 
      className="absolute left-8 md:left-4 top-1/2 -translate-y-1/2 z-50"
      style={{
        opacity: useTransform(scrollYProgress, [0, 0.95, 1], [1, 1, 0])
      }}
    >
      {/* Progress bar background with glow effect */}
      <div className="relative h-[50vh] w-1.5 mt-10 ml-5">
        <div className="absolute inset-0 bg-white/10 rounded-full overflow-hidden blur-[2px]" />
        <div className="absolute inset-0 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 w-full bg-white"
            style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "120%"]) }}
          />
        </div>
      </div>
    </motion.div>
  )
}

// Main Component
export default function ScrollbarContainer() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  }) as { scrollYProgress: MotionValue<number> }

  const cardData = [
    {
      title: "Food and Cuisine",
      description: "Immerse yourself in artistic representations of food, drinks, and culinary creations. Perfect for chefs, food enthusiasts, or anyone inspired by gastronomy, these designs are visually stunning and capture the essence of global cuisines.",
      imageSrc: "/Landingpage/Cards/img1.png"
    },
    {
      title: "Games & Entertainment",
      description: "Transform your gaming concepts into visually engaging realities with tailored assets, characters, and immersive worlds. From vibrant characters to intricate game environments, these designs bring interactivity and storytelling to life.",
      imageSrc: "/Landingpage/Cards/img2.png"
    },
    {
      title: "Artisan Patterns",
      description: "Elevate your designs with hand-crafted patterns, decorative motifs, and unique textures. Ideal for textiles, wallpapers, packaging, or branding projects, these artisan creations add a touch of elegance and sophistication.",
      imageSrc: "/Landingpage/Cards/img3.png"
    },
    {
      title: "Cartoon Cosmos",
      description: "Step into a playful world filled with animated characters and lively designs. This category captures the charm of cartoons, offering vibrant, character-driven art for comics, animations, and children's stories.",
      imageSrc: "/Landingpage/Cards/img4.png"
    },
    {
      title: "Product Branding",
      description: "Build a powerful brand identity with custom visuals tailored to your product. From logos to packaging and promotional materials, this category focuses on creating eye-catching designs that resonate with your audience.",
      imageSrc: "/Landingpage/Cards/img5.png"
    },
    {
      title: "Inspired",
      description: "Experience the charm of hand-drawn sketches and bespoke illustrations. These designs embody creativity, authenticity, and a personal touch, making them perfect for book covers, artistic projects, or any endeavor.",
      imageSrc: "/Landingpage/Cards/img6.png"
    }
  ]

  return (
    <div className="bg-black">
      {/* Cards Section */}
      <div ref={containerRef} className="relative h-[700vh]">
        <motion.div
          className="fixed inset-0 flex items-center justify-center"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.95, 1], [1, 1, 0])
          }}
        >
          <div className="relative w-[80vw] aspect-[3/2] h-[70vh]">
            {/* Cards */}
            {cardData.map((card, index) => (
              <Card
                key={index}
                scrollYProgress={scrollYProgress}
                index={index}
                total={cardData.length}
                {...card}
              />
            ))}
            
            {/* Progress Bar */}
            <ProgressBar scrollYProgress={scrollYProgress} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
