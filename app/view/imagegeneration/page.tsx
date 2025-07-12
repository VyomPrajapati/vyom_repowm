"use client";

import React, { useState } from 'react';
import Header from './compo/Header'; 
import Input from './compo/Input'; 
import ImagePreview from './compo/ImagePreview'; 
import NavigationFull from '../Core/NavigationFull'; 
import ProtectedRoute from '@/app/utils/ProtectedRoute';
import Footer from '../Core/Footer';

const ImageGenMain = () => {
    const [images, setImages] = useState<string[]>([]);

    const handleImageGenerated = (imageUrls: string[]) => {
        setImages(imageUrls); // Replace previous images with the new set
    };

    return (
    <>
    <ProtectedRoute>
        <div className='bg-black min-h-screen flex relative'>
            {/* Main Content */}
            <div className="flex-1">
                <NavigationFull />
                <Header />
                <Input onImageGenerated={handleImageGenerated} /> 
                <ImagePreview images={images} />
            </div>
        </div>
        <Footer />
        </ProtectedRoute>
        
        </>
    );
};

export default ImageGenMain;
