import React from 'react';
import { Navbar } from '../../Components/Navbar/Navbar';
import { Hero } from '../../Components/Hero/Hero';
import { PromotionEvent } from '../../Components/PromotionEvent/PromotionEvent';
import { HomeRecommendation } from '../../Components/HomeRecommendation/HomeRecommendation';
import { SmoothScroll } from '../../Components/Animations/SmoothScroll/SmoothScroll'

export const Home = () => {
  return (
    <div className='Home'>
        <Navbar/>
        <SmoothScroll offset={"60px"}>
            <Hero/>
            <PromotionEvent/>
            <HomeRecommendation/>
        </SmoothScroll>
    </div>
  )
}