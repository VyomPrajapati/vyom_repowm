'use client';
import React from 'react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['400', '700'] 
});

const ArtGallery = ({ curveHeight = 120, curveLineColor = 'white' }) => {
  const galleryImages = [
    { id: 1, src: 'Landingpage/ArtGallery/img1.png' },
    { id: 2, src: 'Landingpage/ArtGallery/img2.png' },
    { id: 3, src: 'Landingpage/ArtGallery/img3.png' },
    { id: 4, src: 'Landingpage/ArtGallery/img4.png' },
    { id: 5, src: 'Landingpage/ArtGallery/img5.png' },
    { id: 6, src: 'Landingpage/ArtGallery/img6.png' },
    { id: 7, src: 'Landingpage/ArtGallery/img7.png' },
    { id: 8, src: 'Landingpage/ArtGallery/img8.png' },
    { id: 9, src: 'Landingpage/ArtGallery/img9.png' },
  ];

  const CARD_WIDTH = 300;
  const CARD_HEIGHT = 550;
  const GAP = 32;
  const ANIMATION_SPEED = 15; // Adjust speed (lower = faster)

  return (
    <div 
      className="min-h-screen relative flex flex-col items-center overflow-hidden"
      style={{ background: 'linear-gradient(to right, #222354, #3b3c9b)' }}
    >
      {/* Title */}
      <h1 className={`text-5xl font-medium text-center text-white tracking-wide py-8 z-20 -mb-20 ${poppins.className}`}>
        Art Gallery
      </h1>

      {/* Curved Section */}
      <div className="relative w-full h-[850px] flex items-center justify-center">
        
        {/* Top Curve */}
        <div className="absolute top-0 left-0 w-full overflow-hidden mt-[150px] z-50">
          <svg className="w-full" height={curveHeight} viewBox={`0 0 1440 ${curveHeight}`} preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#222354" />
                <stop offset="100%" stopColor="#3b3c9b" />
              </linearGradient>
            </defs>
            <path fill="url(#gradient)" d={`M0,0 C480,${curveHeight} 960,${curveHeight} 1440,0`} />
            <path d={`M0,2 C480,${curveHeight} 960,${curveHeight} 1440,2`} stroke={curveLineColor} strokeWidth="4" fill="none" />
          </svg>
        </div>

        {/* Infinite Scrolling Gallery */}
        <div className="w-full overflow-hidden relative z-10 my-8">
          <div
            className="flex gap-4 relative z-20 animate-scroll"
            style={{
              width: 'max-content',
              display: 'flex',
              animation: `scrollAnimation ${ANIMATION_SPEED}s linear infinite`,
            }}
          >
            {[...galleryImages, ...galleryImages].map((image, index) => (
              <div
                key={`image-${index}`}
                className="flex-shrink-0 relative z-10"
                style={{ width: `${CARD_WIDTH}px` }}
              >
                <div className="relative" style={{ height: `${CARD_HEIGHT}px` }}>
                  <img
                    src={image.src}
                    alt={`Artwork ${image.id}`}
                    className="w-full h-full object-cover shadow-2xl rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Curve */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden mb-[150px] z-50">
          <svg className="w-full" height={curveHeight} viewBox={`0 0 1440 ${curveHeight}`} preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="url(#gradient)" d={`M0,${curveHeight} C480,0 960,0 1440,${curveHeight}`} />
            <path d={`M0,${curveHeight - 2} C480,2 960,2 1440,${curveHeight - 2}`} stroke={curveLineColor} strokeWidth="4" fill="none" />
          </svg>
        </div>

      </div>

      {/* Smooth Scrolling Keyframes */}
      <style jsx>{`
        @keyframes scrollAnimation {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default ArtGallery;
