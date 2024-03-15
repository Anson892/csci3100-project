import React from 'react'
import './Hero.css'
import hero_section_iamge from '../../Assets/Images/hero_section_image.png'
import learn_more from '../../Assets/UI/learn_more.svg'
import collection_description from '../../Assets/UI/new_collection_description.svg'
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
        <img src={ collection_description } alt="" className="collection-description" />
        <img src={ learn_more } alt="" className="learn-more-button" />
    </div>
    )
}
