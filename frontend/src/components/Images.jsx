import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";
// import img1 from "../../public/images/shop.io-images/black_white_suit.jpg.webp"
// import img2 from "../../public/images/shop.io-images/MENS_CLASSIC_BLACK_SUIT.webp"
// import img3 from "../../public/images/shop.io-images/NAVY_BLUE_SUIT.webp"
// import img4 from "../assets/pexels-terje-sollie-298863.jpg"
const Images = () => {

    const images = [
        // { url: img1 },
        // { url: img2 },
        // { url: img3 },
        // { url: img4 },

    ];
    const sliderStyle = {
        width: '100%',
        height: '0',
        paddingTop: '56.25%', // 16:9 aspect ratio
        position: 'relative',
    };
    const sliderImageStyle = {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: 'auto',
        maxHeight: '100%',
    };

    const responsive = [
        {
            breakpoint: 768,
            settings: {
                dots: true,
                arrows: false,
            },
        },
    ];
    return (
        <div >
            <SimpleImageSlider
                // style={sliderImageStyle}
                responsive={responsive}
                // infinite
                width={1500}
                height={904}
                images={images}
                showBullets={true}
                showNavs={true}
                autoPlay={true}
                loop={true}
                slideDuration={0.9}
                autoPlayDelay={4}
            />
        </div>
    )
}

export default Images