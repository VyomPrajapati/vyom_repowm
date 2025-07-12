"use client"

import Footer from "../Core/Footer"
import NavigationFull from "../Core/NavigationFull"
import ProtectedRoute from "@/app/utils/ProtectedRoute"
import ContactHeader from "./components/contact-header"
import ContactForm from "./components/contact-form"
import RatingSection from "./components/rating-section"
import NewsletterSection from "./components/newsletter-section"


const ContactPage = () => {
  return (
    <>
      <ProtectedRoute>
        <NavigationFull />
        <div className="min-h-screen bg-gradient-to-br from-black to-black pt-16">
          {/* Main Contact Section */}
          <div className="flex flex-col md:flex-row justify-evenly px-4 md:pt-12">
            {/* Left Section */}
            <ContactHeader />

            {/* Right Section - Contact Form */}
            <ContactForm />
          </div>

          {/* Rating Section */}
          <RatingSection />

          {/* Newsletter Section */}
          <NewsletterSection />

          {/* Bottom Border */}
          <div className="border-t border-[#FFFFFF52] w-[90%] md:w-[90%] lg:w-[93%] mx-auto"></div>
        </div>
        <Footer />
      </ProtectedRoute>
    </>
  )
}

export default ContactPage
