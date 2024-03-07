import React from 'react';
import { Navbar } from '../../Components/Navbar/Navbar';
import { Hero } from '../../Components/Hero/Hero';
import { PromotionEvent } from '../../Components/PromotionEvent/PromotionEvent';

export const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <PromotionEvent/>
    </div>
  )
}