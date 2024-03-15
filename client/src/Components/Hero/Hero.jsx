import React, { useEffect } from 'react'
import './Hero.css'
import hero_section_iamge from '../../Assets/Images/hero_section_image.png'
import learn_more from '../../Assets/UI/learn_more.svg'
import collection_description from '../../Assets/UI/new_collection_description.svg'
import { motion } from 'framer-motion'
export const Hero = () => {
    const newTextAnim = {
        initial: {
            opacity: 0,
            y: "10vh",
        },
        animate: {
            opacity: 1,
            y: "0vh",
            transition: {
                delay: 0.5,
                duration: 0.8,
            }
        }
    }

    const collectionTextAnim = {
        initial: {
            opacity: 0,
            y: "10vh",
        },
        animate: {
            opacity: 1,
            y: "0vh",
            transition: {
                delay: 1.0,
                duration: 0.8,
            }
        }
    }

    const imageAnim = {
        initial: {
            height: 0
        },
        animate: {
            height: "75vh",
            transition: {
                delay: 2.0,
                duration: 1.0,
                ease: [0.65, 0, 0.35, 1],
            }
        }
    }

    const verticalLineAnim = {
        initial: {
            height: "0%",
        },
        animate: {
            height: "35%",
            transition: {
                delay: 2.2,
                duration: 0.7,
                ease: [0.65, 0, 0.35, 1],
            }
        }
    }

    const descriptionAnim = {
        initial: {
            width: "0%",
        },
        animate: {
            width: "20%",
            transition: {
                delay: 3.0,
                duration: 0.7,
                ease: [0.65, 0, 0.35, 1],
            }
        }
    }

    const learnMoreAnim = {
        initial: {
            scale: 0
        },
        animate: {
            scale: 1,
            transition: {
                delay: 3.5,
                duration: 0.8,
                ease: [0.65, 0, 0.35, 1],
            }
        }
    }

    return (
    <div className="hero">
        <motion.img {...imageAnim} className='image' src={hero_section_iamge} alt="" />
        <motion.div {...newTextAnim} className="new-text">
            <u>NEW</u>
        </motion.div>
        <motion.div {...collectionTextAnim} className="collection-text">
            COLLECTION
        </motion.div>
        <motion.div {...verticalLineAnim} className="vertical-line"/>
        <motion.img {...descriptionAnim} src={ collection_description } alt="" className="collection-description" />
        <motion.img {...learnMoreAnim} src={ learn_more } alt="" className="learn-more-button" />
    </div>
    )
}
