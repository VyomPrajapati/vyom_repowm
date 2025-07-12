'use client';
import React from 'react';
import Image from 'next/image';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['400', '700'] 
});

const galleryImages = [
  { id: 1, src: '/Landingpage/ArtGallery/img1.png' },
  { id: 2, src: '/Landingpage/ArtGallery/img2.png' },
  { id: 3, src: '/Landingpage/ArtGallery/img3.png' },
  { id: 4, src: '/Landingpage/ArtGallery/img4.png' },
  { id: 5, src: '/Landingpage/ArtGallery/img5.png' },
  { id: 6, src: '/Landingpage/ArtGallery/img6.png' },
  { id: 7, src: '/Landingpage/ArtGallery/img7.png' },
  { id: 8, src: '/Landingpage/ArtGallery/img8.png' },
  { id: 9, src: '/Landingpage/ArtGallery/img9.png' },
];

const ANIMATION_SPEED = 15;

const ArtGallery = () => {
  return (
    <div className=" flex flex-col items-center overflow-hidden bg-black">
      {/* Title */}
      <h1
        className={`text-white text-3xl sm:text-4xl md:text-6xl font-bold mt-10 md:mt-24 lg:mt-20 z-40 text-center ${poppins.className}`}
      >
        Art Gallery
      </h1>

      {/* Top Decorative Image */}
      <div className="w-full h-auto z-30 -mt-24 -mb-40 md:-mt-[30rem] md:-mb-72 lg:-mt-[40rem] lg:-mb-80">
        <Image
          src="/Landingpage/ArtGallery/topimage.png"
          alt="Top Decorative Path"
          width={1920}
          height={1080}
          className="w-full h-auto"
        />
      </div>

      {/* Infinite Scrolling Gallery */}
      <div className="w-full  md:my-10 overflow-hidden relative z-10 -mt-40 md:-mt-[48rem] md:-mb-[40rem] lg:-mt-[1025px] lg:-mb-[1260px] ">
        <div
          className="flex gap-1 md:gap-2 lag:gap-4 animate-scroll"
          style={{
            animation: `scrollAnimation ${ANIMATION_SPEED}s linear infinite`,
            width: 'max-content'
          }}
        >
          {[...galleryImages, ...galleryImages].map((image, index) => (
            <div
              key={`image-${index}`}
              className="flex-shrink-0 relative w-[200px] h-[450px] sm:w-[250px] sm:h-[500px] md:w-[400px] md:h-[530px] lg:w-[600px] lg:h-[1050px]"
            >
              <Image
                src={image.src}
                alt={`Artwork ${image.id}`}
                fill
                className="object-cover shadow-2xl rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Decorative Image */}
      <div className="w-full h-auto z-30 -mb-0 -mt-80 md:-mb-[370px] md:-mt-[410px] lg:-mb-[500px] lg:-mt-[340px]">
        <Image
          src="/Landingpage/ArtGallery/bottomimage.png"
          alt="Bottom Decorative Path"
          width={1920}
          height={1080}
          className="w-full h-auto"
        />
      </div>

      {/* Keyframe Animation */}
      <style jsx>{`
        @keyframes scrollAnimation {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default ArtGallery;
