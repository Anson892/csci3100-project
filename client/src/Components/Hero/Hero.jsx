import React, { useEffect, useRef } from 'react'
import './Hero.css'
import hero_section_iamge from '../../Assets/Images/hero_section_image.png'
import learn_more from '../../Assets/UI/learn_more.svg'
import collection_description from '../../Assets/UI/new_collection_description.svg'
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion'

export const Hero = ({}) => {
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

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start']
    })
    const newTextOffset = useTransform(useTransform(scrollYProgress, [0, 1], [0, -20]), (v) => `${v}vh`)
    const collectionTextOffset = useTransform(useTransform(scrollYProgress, [0, 1], [0, -60]), (v) => `${v}vh`)
    const descriptionOffset = useTransform(useTransform(scrollYProgress, [0, 1], [0, 40]), (v) => `${v}vh`)
    const learnMoreOffset = useTransform(useTransform(scrollYProgress, [0, 1], [0, 30]), (v) => `${v}vh`)
    const verticalLineOffset = useTransform(useTransform(scrollYProgress, [0, 1], [35, 0]), (v) => `${v}%`)
    const imageOffset = useTransform(useTransform(scrollYProgress, [0, 1], [0, 40]), (v) => `${v}vh`)


    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        console.log("Page scroll: ", latest)
      })

    return (
        <div className="hero" ref={containerRef}>
            <motion.img {...imageAnim} style={{y: imageOffset}} className='image' src={hero_section_iamge} alt="" />
            <motion.div {...newTextAnim} style={{y: newTextOffset}} className="new-text">
                <u>NEW</u>
            </motion.div>
            <motion.div {...collectionTextAnim} style={{y: collectionTextOffset}} className="collection-text">
                COLLECTION
            </motion.div>
            <motion.div {...verticalLineAnim} style={{height: verticalLineOffset}} className="vertical-line"/>
            <motion.img {...descriptionAnim} style={{y: descriptionOffset}} src={ collection_description } alt="" className="collection-description" />
            <motion.img {...learnMoreAnim} style={{y: learnMoreOffset}} src={ learn_more } alt="" className="learn-more-button" />
        </div>
    )
}
