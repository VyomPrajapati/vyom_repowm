"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"

const scriptURL =
  "https://script.google.com/macros/s/AKfycbz0dKO8m-4_vrGpnaPI4zP01OkoN5uXxo1DrJ9jY_oz5tsoNUYvtxxNKgvdYMiZUGsWBw/exec"

interface FormData {
  fullName: string
  email: string
  phone: string
  option: string
  message: string
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    option: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [hasSelectedOption, setHasSelectedOption] = useState(false)
  const [formErrors, setFormErrors] = useState<{
    email?: string
    phone?: string
  }>({})

  const dropdownRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccessMessage(null)
    setFormErrors({})

    const errors: { email?: string; phone?: string } = {}
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = "Enter a valid email address."
    }
    if (formData.phone.length !== 10) {
      errors.phone = "Phone number must be exactly 10 digits."
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      setIsSubmitting(false)
      return
    }

    try {
      const form = new FormData()
      form.append("Name", formData.fullName)
      form.append("Email", formData.email)
      form.append("Phone", formData.phone)
      form.append(
        "Option",
        formData.option === "option1"
          ? "General Inquiry"
          : formData.option === "option2"
            ? "Support Request"
            : formData.option === "option3"
              ? "Feature Suggestion"
              : formData.option === "option4"
                ? "Business Collaboration"
                : "",
      )
      form.append("Message", formData.message)
      form.append("FormType", "Contact")

      console.log("Submitting contact form with data:", {
        Name: formData.fullName,
        Email: formData.email,
        Phone: formData.phone,
        Option: formData.option,
        Message: formData.message,
        FormType: "Contact",
      })

      const response = await fetch(scriptURL, {
        method: "POST",
        body: form,
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      setSuccessMessage("Your form has been submitted successfully! Our team will reach out to you soon.")
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        option: "",
        message: "",
      })
    } catch (error) {
      setError("Something went wrong. Please try again.")
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className={`backdrop-blur-3xl bg-gradient-to-br from-[#262B30] via-[#3B4C5E] to-[#262B30] 
      rounded-2xl md:rounded-[3rem] p-6 md:p-14 md:mt-6 shadow-[0_0_100px_40px_rgba(35,46,50,0.8)] md:shadow-[0_0_300px_80px_rgba(35,46,50,0.8)] 
      w-full md:w-[36rem] ${isDropdownOpen ? "h-[100%]" : "h-[95%]"}`}
    >
      <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-1">Contact Form</h3>
      <p className="text-gray-300 text-xs md:text-sm lg:text-sm mb-4">
        Fill out the form below, and our team will get back to you promptly. Let&apos;s connect and create solutions
        together!
      </p>

      <form ref={formRef} onSubmit={handleContactSubmit} className="space-y-2" name="submit-to-google-sheet">
        <input type="hidden" name="FormType" value="Contact" />
        {successMessage && (
          <div className="bg-green-500/10 border border-green-500 text-green-500 p-3 rounded-md mb-4">
            {successMessage}
          </div>
        )}
        {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-md">{error}</div>}

        <div className="mb-2">
          <label className="text-white text-xs md:text-sm">
            Full name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="Name"
            className="w-full h-10 md:h-12 bg-[#111111] text-white rounded-lg p-2 pl-4 text-xs md:text-sm placeholder:text-[#FFFFFF99] mt-2 focus:outline-none focus:ring-2 focus:ring-[#444c55] text-[13px] md:text-[15px] opacity-90 transition-all duration-300"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>

        <div className="mb-2">
          <label className="text-white text-xs md:text-sm">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="Email"
            className="w-full h-10 md:h-12 bg-[#111111] text-white rounded-lg p-2 pl-4 text-xs md:text-sm placeholder:text-[#FFFFFF99] mt-2 focus:outline-none focus:ring-2 focus:ring-[#444c55] text-[13px] md:text-[15px] opacity-90 transition-all duration-300"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {formErrors.email && <p className="text-red-500 text-xs md:text-sm mt-1">{formErrors.email}</p>}
        </div>

        <div className="mb">
          <label className="text-white text-xs md:text-sm">Phone</label>
          <div className="flex gap-2">
            <select
              className="w-24 md:w-40 mt-2 bg-[#111111] text-white rounded-lg px-2 text-xs md:text-sm 
              max-h-60 focus:outline-none focus:ring-2 focus:ring-[#444c55] text-[13px] md:text-[15px] opacity-90 
              transition-all duration-300 overflow-y-auto scrollbar-none h-10 md:h-12"
              size={1}
            >
              <option value="+91">+91 (India)</option>
              <option value="+1">+1 (USA/Canada)</option>
              <option value="+44"> +44 (UK)</option>
              <option value="+61"> +61 (Australia)</option>
              <option value="+971"> +971 (UAE)</option>
              <option value="+49">+49 (Germany)</option>
              <option value="+33">+33 (France)</option>
              <option value="+81"> +81 (Japan)</option>
              <option value="+86"> +86 (China)</option>
              <option value="+7"> +7 (Russia)</option>
              <option value="+39"> +39 (Italy)</option>
              <option value="+55"> +55 (Brazil)</option>
              <option value="+34">+34 (Spain)</option>
              <option value="+27">+27 (South Africa)</option>
              <option value="+62">+62 (Indonesia)</option>
              <option value="+82">+82 (South Korea)</option>
              <option value="+52"> +52 (Mexico)</option>
              <option value="+31">+31 (Netherlands)</option>
              <option value="+46"> +46 (Sweden)</option>
              <option value="+41"> +41 (Switzerland)</option>
              <option value="+65"> +65 (Singapore)</option>
              <option value="+20"> +20 (Egypt)</option>
            </select>

            <input
              type="tel"
              name="Phone"
              className="w-full flex-1 h-10 md:h-12 bg-[#111111] text-white rounded-lg p-2 pl-4 text-xs md:text-sm 
              placeholder:text-[#FFFFFF99] mt-2 focus:outline-none focus:ring-2 focus:ring-[#444c55] 
              text-[13px] md:text-[15px] opacity-90 transition-all duration-300"
              placeholder="Enter your contact number"
              value={formData.phone}
              onChange={(e) => {
                const newValue = e.target.value.replace(/\D/g, "") // Remove non-numeric characters
                if (newValue.length <= 10) {
                  setFormData({ ...formData, phone: newValue })
                }
              }}
              required
            />
          </div>
          {formErrors.phone && <p className="text-red-500 text-xs md:text-sm mt-1">{formErrors.phone}</p>}
        </div>

        <div className="mt-2">
          <div
            ref={dropdownRef}
            className={`w-full md:w-[50%] h-10 md:h-10 bg-[#111111] text-white border border-gray-300 rounded-lg p-2 pl-4 text-xs md:text-sm mt-2 transition-all duration-200 ${
              isDropdownOpen ? "mb-48" : "mb-2"
            }`}
            onClick={(e) => {
              e.stopPropagation()
              if (!isDropdownOpen && !hasSelectedOption) {
                setIsDropdownOpen(true)
              } else {
                setIsDropdownOpen(false)
                setHasSelectedOption(false)
              }
            }}
          >
            <div className="flex justify-between items-center">
              <span>
                {formData.option === ""
                  ? "Pick an option"
                  : formData.option === "option1"
                    ? "General Inquiry"
                    : formData.option === "option2"
                      ? "Support Request"
                      : formData.option === "option3"
                        ? "Feature Suggestion"
                        : "Business Collaboration"}
              </span>
              <span>▼</span>
            </div>

            {isDropdownOpen && (
              <div className="absolute w-[80%] md:w-[40%] bg-[#111111] border border-gray-300 rounded-lg mt-4 z-10 -ml-4">
                <div
                  className="p-2 pl-4 hover:bg-[#222222] cursor-pointer border-b border-gray-700"
                  onClick={(e) => {
                    e.stopPropagation()
                    setFormData({ ...formData, option: "" })
                    setHasSelectedOption(true)
                    setIsDropdownOpen(false)
                  }}
                >
                  Pick an option
                </div>
                <div
                  className="p-2 pl-4 hover:bg-[#222222] cursor-pointer border-b border-gray-700"
                  onClick={(e) => {
                    e.stopPropagation()
                    setFormData({ ...formData, option: "option1" })
                    setHasSelectedOption(true)
                    setIsDropdownOpen(false)
                  }}
                >
                  General Inquiry
                </div>
                <div
                  className="p-2 pl-4 hover:bg-[#222222] cursor-pointer border-b border-gray-700"
                  onClick={(e) => {
                    e.stopPropagation()
                    setFormData({ ...formData, option: "option2" })
                    setHasSelectedOption(true)
                    setIsDropdownOpen(false)
                  }}
                >
                  Support Request
                </div>
                <div
                  className="p-2 pl-4 hover:bg-[#222222] cursor-pointer border-b border-gray-700"
                  onClick={(e) => {
                    e.stopPropagation()
                    setFormData({ ...formData, option: "option3" })
                    setHasSelectedOption(true)
                    setIsDropdownOpen(false)
                  }}
                >
                  Feature Suggestion
                </div>
                <div
                  className="p-2 pl-4 hover:bg-[#222222] cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    setFormData({ ...formData, option: "option4" })
                    setHasSelectedOption(true)
                    setIsDropdownOpen(false)
                  }}
                >
                  Business Collaboration
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className={`mb-4 transition-all duration-300 ${
            hasSelectedOption ? "mt-0" : isDropdownOpen ? "mt-36" : "mt-0"
          }`}
        >
          <label className="text-white text-xs md:text-sm transition-all">How can we help you?</label>
          <textarea
            className="w-full h-20 md:h-24 bg-[#111111] text-white rounded-lg p-2 pl-4 text-xs md:text-sm placeholder:text-[#FFFFFF99] mt-2 focus:outline-none focus:ring-2 focus:ring-[#444c55] text-[13px] md:text-[15px] opacity-90 transition-all duration-300"
            placeholder="Enter your message here"
            value={formData.message}
            name="Message"
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-auto h-10 md:h-12 bg-gradient-to-r from-[#5AD7FF] to-[#656BF5] 
            text-white rounded-full py-2 px-6 transition-all 
            hover:opacity-100 hover:shadow-[0_0_10px_5px_rgba(101,107,245,0.8)]
            ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
