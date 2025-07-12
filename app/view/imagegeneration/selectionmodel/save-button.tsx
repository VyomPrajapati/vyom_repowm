"use client"

interface SaveButtonProps {
  onClick?: () => void;
}

export default function SaveButton({ onClick }: SaveButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-[#5AD7FF] to-[#656BF5] text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity"
    >
      Save
    </button>
  )
}
  
  