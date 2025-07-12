"use client"

import Image from "next/image"
import { getImageUrl } from "@/routes/imageroute"
import SignInForm from "./sign-up-form"

export default function SignUp() {
  // const [imageSrc, setImageSrc] = useState("/placeholder.svg?height=800&width=600")

  

  return (
    <main className="flex min-h-screen bg-background overflow-hidden">
      {/* Left Side - Form */}
      <div className="lg:w-[420px] min-w-[320px] lg:min-w-[420px] relative z-10 flex justify-center items-center">
        <SignInForm />
      </div>

      {/* Right Side - Image */}
      <div className="lg:block flex-1 relative">
        <div className="absolute inset-0 border-black border-4">
          <Image src={getImageUrl('sign','signup')} alt="Artistic warriors" fill className="object-cover" priority />
        </div>
      </div>
    </main>
  )
}
