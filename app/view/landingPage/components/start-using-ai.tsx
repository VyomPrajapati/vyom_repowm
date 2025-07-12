"use client";
import Image from "next/image";
import type React from "react";

import { Poppins } from "next/font/google";
import { getImageUrl } from "@/routes/imageroute";
import { useState } from "react";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500"] });

// Add the Google Sheets script URL
const scriptURL =
  "https://script.google.com/macros/s/AKfycbz0dKO8m-4_vrGpnaPI4zP01OkoN5uXxo1DrJ9jY_oz5tsoNUYvtxxNKgvdYMiZUGsWBw/exec";

export default function StartUsingAi() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState<string | null>(
    null
  );
  const [newsletterError, setNewsletterError] = useState<string | null>(null);

  // Handle Newsletter Subscription
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNewsletterError(null);
    setNewsletterMessage(null);

    if (!newsletterEmail.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setNewsletterError("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("NewsletterEmail", newsletterEmail)
      formData.append("FormType", "Newsletter")

      console.log("Submitting newsletter with data:", {
        Email: newsletterEmail,
        FormType: "Newsletter",
      })
      
      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit to Google Sheets");
      }

      setNewsletterMessage(
        "You have successfully subscribed to our newsletter!"
      );
      setNewsletterEmail("");
    } catch (err) {
      setNewsletterError("Failed to subscribe. Please try again.");
      console.error("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative w-full h-[500px] flex items-center mb:flex-col mb:h-auto mb:-mt-10 mb:pb-6"
        style={{
          background: `linear-gradient(to bottom, 
            rgba(0, 0, 0, 1) 20%, 
            rgba(10, 20, 40, 1) 100%)`,
        }}
      >
        {/* Text & CTA */}
        <div className="w-1/2 pl-24 pr-8 mb:w-full mb:px-6 mb:text-center">
          <h1
            className={`text-white text-[40px] font-semibold leading-tight ${poppins.className} mb:text-[22px] mb:leading-snug`}
          >
            Where Words Get Wild,
            <br /> And AI Makes the Magic Real!
          </h1>

          <button
            className="mt-6 px-6 py-2 rounded-full bg-black/20 border border-white/20 text-base font-medium border-t-[#acacac] border-b-[#6A0DAD] hover:border-t-[#6A0DAD] hover:border-b-[#acacac] 
              text-transparent bg-clip-text bg-gradient-to-r from-[#5AD7FF] to-[#656BF5] shadow-[inset_0px_0px_8px_rgba(255,255,255,0.2)] 
              transition-all duration-500 ease-in-out hover:text-white mb:mt-4 mb:px-5 mb:py-1.5 mb:text-sm mb:text-white"
          >
            Start using AI →
          </button>
        </div>

        {/* Desktop Image */}
        <div className="absolute right-0 bottom-0 h-[484px] w-[610px] hidden md:block">
          <Image
            src={getImageUrl("landingpage", "usingai") || "/placeholder.svg"}
            alt="Creative AI Visual"
            fill
            className="object-contain object-right h-52 w-10"
          />
        </div>

        {/* Mobile Image */}
        <div className="hidden mb:block w-full px-6 mt-6">
          <Image
            src={getImageUrl("landingpage", "usingai") || "/placeholder.svg"}
            alt="Creative AI Visual"
            width={1600}
            height={800}
            className="w-full h-auto"
          />
        </div>
      </div>


      {/* Newsletter Section */}
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
          {newsletterMessage && (
            <div className="bg-green-500/0 text-green-500 text-center">
              {newsletterMessage}
            </div>
          )}
          {newsletterError && (
            <div className="md:mr-[2rem] lg:mr-[4.5rem] bg-green-500/0 text-red-500 text-center">
              {newsletterError}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Border */}
      <div className="border-t border-[#FFFFFF52] w-[90%] md:w-[90%] lg:w-[93%] mx-auto"></div>
    </div>
  );
}
