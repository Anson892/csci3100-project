import React from 'react'
import './Hero.css'
import hero_section_iamge from '../../Assets/Images/hero_section_image.png'

export const Hero = () => {
    return (
    <div className="hero">
        <img src={hero_section_iamge} alt="" />
        <div className="new-text">
            <u>NEW</u>
        </div>
        <div className="collection-text">
            COLLECTION
        </div>
        <div className="vertical-line"/>
        <div className="collection-description">
            <p>Moder and</p>
            <p>cozy live</p>
            <p>start from</p>
            <p>now</p>
        </div>
        <div className="learn-more-button">
            <p>Learn More</p>
        </div>
    </div>
    )
}
