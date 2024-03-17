import React, { useEffect, useState } from 'react';
import { Navbar } from '../../Components/Navbar/Navbar';
import { Hero } from '../../Components/Hero/Hero';
import { PromotionEvent } from '../../Components/PromotionEvent/PromotionEvent';
import { HomeRecommendation } from '../../Components/HomeRecommendation/HomeRecommendation';
import { ReactLenis } from '@studio-freight/react-lenis'

export const Home = () => {

    const options = {
        lerp: 0.05,
        inifinite: true,
    }

    return (
        <div className='Home' options={options}>
            <ReactLenis root>
                <Navbar/>
                <Hero/>
                <PromotionEvent/>
                <HomeRecommendation/>
            </ReactLenis>
        </div>
    )
}