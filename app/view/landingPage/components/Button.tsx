"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { APP_ROUTES } from "../../../../routes/routes";

const Button = () => {
  const router = useRouter();

  return (
    <div className="md:hidden flex justify-center mt-20">
      <button
        // style={{
        //   boxShadow: '10px 0px 100px 20px rgba(255, 255, 255, 0.35)',
        // }}
        className="group bg-blue-600 text-white flex w-[200px] md:w-[260px] h-10 justify-center items-center gap-3 rounded-full relative overflow-hidden 
        mb:bg-black/20 mb:border mb:border-white/20 mb:rounded-full mb:px-5 mb:py-2 mb:text-base mb:font-medium 
        mb:border-t-[#acacac] mb:border-b-[#6A0DAD] mb:hover:border-t-[#6A0DAD] mb:hover:border-b-[#acacac] 
        mb:text-transparent mb:bg-clip-text mb:bg-gradient-to-r mb:from-[#5AD7FF] mb:to-[#656BF5] 
        mb:shadow-[inset_0px_0px_8px_rgba(255,255,255,0.2)] mb:transition-all mb:duration-500 mb:ease-in-out 
        mb:hover:text-white mb:w-[133px] mb:h-[40px] "
        onClick={() => router.push(APP_ROUTES.SIGNUP)}
      >
        {/* Mobile Text */}
        <span className="mb:text-[12px]  mb:font-normal md:hidden">Get Started</span>
        
        {/* Desktop Image */}
        
        <Image
          src="/Landingpage/Header/Group.png"
          alt="Group Icon"
          width={24}
          height={24}
          className="absolute left-6 transition-all duration-500 ease-in-out group-hover:left-1/2 group-hover:-translate-x-1/2 hidden md:block z-10 "
        />

        {/* Desktop Text */}
        <span className="text-[16px] transition-opacity duration-500 ease-in-out group-hover:opacity-0 ml-8 hidden md:hidden z-10" 
        >
          Start creating now!
        </span>
      </button>
    </div>
  );
};

export default Button;
