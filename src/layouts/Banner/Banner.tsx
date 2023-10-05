import React from 'react';
// import { Carousel } from 'antd';
import './Banner.css';

const contentStyle: React.CSSProperties = {
    overflow: 'hidden',
    height: '650px'
};
const Banner = () => {
    return (
        <div className="Banner">
            <div className="img-banner relative" style={contentStyle}>
                <div className="video">
                <video width="100%" src="https://res.cloudinary.com/dv0hg6oi2/video/upload/v1693735432/samples/hai/0903_cvqcwg.mp4" autoPlay loop muted></video>
            <div className="video-overlay"></div>
          </div>
            </div>
        </div>
    );
};


export default Banner;