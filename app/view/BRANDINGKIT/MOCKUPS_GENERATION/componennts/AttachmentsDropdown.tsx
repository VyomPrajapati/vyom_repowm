"use client"

import { useState, useRef, useEffect } from "react"
import { Plus, FolderOpen, Upload } from "lucide-react"

interface AttachmentsDropdownProps {
  onChooseFromLibrary: () => void
  onUploadFromDevices: () => void
}

export default function AttachmentsDropdown({ onChooseFromLibrary, onUploadFromDevices }: AttachmentsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleChooseFromLibrary = () => {
    onChooseFromLibrary()
    setIsOpen(false)
  }

  const handleUploadFromDevices = () => {
    onUploadFromDevices()
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {/* Plus Button */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className={`p-1 md:p-3 rounded-lg md:rounded-xl transition-all duration-300 ease-in-out hover:bg-gradient-to-b from-[#6C3BFF] to-[#412399] transition-colors ease-in-out border border-[#8E8E8E] ${
          isOpen
            ? "bg-gradient-to-b from-[#6C3BFF] to-[#412399] text-white"
            : "bg-white/10  text-gray-300 hover:text-white"
        }`}
      >
        <Plus
          className={`w-6 h-6 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-45" : "rotate-0"}`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        ref={dropdownRef}
        className={`absolute bottom-full left-0 mb-6 w-56 md:w-64 backdrop-blur-3xl bg-white/20 md:bg-white/15 shadow-3xl border border-[#8E8E8E] rounded-2xl  z-50 overflow-hidden transition-all duration-300 ease-in-out transform origin-bottom ${
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-700/30">
          <h3 className="text-white font-medium font-poppins text-sm">Attachments</h3>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          <button
            onClick={handleChooseFromLibrary}
            className="w-full flex items-center gap-3 px-2 md:px-4 py-1 text-white hover:bg-gray-800/50 transition-colors duration-200"
          >
            <div className="p-2 bg-gray-800/50 rounded-lg">
              <FolderOpen className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">Choose From library</span>
          </button>

          <button
            onClick={handleUploadFromDevices}
            className="w-full flex items-center gap-3 px-2 md:px-4 py-1 text-white hover:bg-gray-800/50 transition-colors duration-200"
          >
            <div className="p-2 bg-gray-800/50 rounded-lg">
              <Upload className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">Upload From Devices</span>
          </button>
        </div>
      </div>
    </div>
  )
}
