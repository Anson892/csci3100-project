import React from 'react';
import { Navbar } from '../../Components/Navbar/Navbar';
import { Hero } from '../../Components/Hero/Hero';
import { PromotionEvent } from '../../Components/PromotionEvent/PromotionEvent';
import { HomeRecommendation } from '../../Components/HomeRecommendation/HomeRecommendation';

export const Home = () => {
  return (
    <div className='Home'>
        <Navbar/>
        <Hero/>
        <PromotionEvent/>
        <HomeRecommendation/>
    </div>
  )
}