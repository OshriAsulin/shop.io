import React from 'react'
import { useState, useEffect } from 'react';
// import image1 from "../../public/images/p1.jpg"
// import image2 from "../../public/images/p2.jpg"
// import image3 from "../../public/images/p3.jpg"
const ImagesSlides = () => {

    const images = [
        // `${image1}`,
        // `${image2}`,
        // `${image3}`
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((currentImageIndex + 1) % images.length);
        }, 10000);

        return () => clearInterval(timer);
    }, [currentImageIndex]);

    const handlePrevClick = () => {
            const newIndex = (currentImageIndex - 1 + images.length) % images.length;
            setCurrentImageIndex(newIndex);
    };

    const handleNextClick = () => {
            const newIndex = (currentImageIndex + 1) % images.length;
            setCurrentImageIndex(newIndex);
            
    };


    return (
        <div className='.slider-container'>
            <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex}`} className="image-slider" />
            <div className="slider-controls">
                <button onClick={handlePrevClick}>Prev</button>
                <button onClick={handleNextClick}>Next</button>
            </div>
        </div>
    )
}

export default ImagesSlides