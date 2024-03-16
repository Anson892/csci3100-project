import React, { useEffect } from 'react'
import Scrollbar from 'smooth-scrollbar';
import './SmoothScroll.css'

export const SmoothScroll = ( { children, offset = "0px" }) => {
    const options = {
        damping: 0.05,
        thumbMinSize: 20,
        renderByPixels: true,
        alwaysShowTracks: false,
        continuousScrolling	: true,
    }
    
    useEffect(() => {
        Scrollbar.init(document.querySelector('.smooth-scroll'), options);
    })


    return (
        <div className="smooth-scroll" style={{top: `${offset}`, height: `calc(100vh - ${offset})`}}>
            {children}
        </div>
    )
}
