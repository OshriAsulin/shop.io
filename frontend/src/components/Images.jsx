import React from 'react'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import img1 from "../assets/shop.io-images/black_white_suit.jpg.webp"
import img2 from "../assets/shop.io-images/MENS_CLASSIC_BLACK_SUIT.webp"
import img3 from "../assets/shop.io-images/NAVY_BLUE_SUIT.webp"


const Images = () => {

const imgStyle = {
    // maxWidth: "50%"
    width: "600px",
    height: "600px"
}

const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ];
    return (
    
        <ImageGallery autoPlay items={images} showIndex={false} showPlayButton={false} showNav={false} showThumbnails={false} showFullscreenButton={false}/>
        // <div><img src={img1} style={imgStyle} /></div>
        // <div><img src={img2} style={imgStyle} /></div>
        // <div><img src={img3} style={imgStyle} /></div>
    )
}

export default Images