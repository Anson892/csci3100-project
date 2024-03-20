import React, { useRef } from 'react'
import scrolling_circles from '../../Assets/UI/scrolling_circles.svg'
import recommend_title from '../../Assets/UI/recommend_title.svg'
import product_image_test from '../../Assets/Images/product_image_test.png'
import './HomeRecommendation.css'
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring  } from 'framer-motion'

const ProductItemLeft = () => {

    const productContainerRef = useRef(null);

    // exit
    const { scrollYProgress: productExitAlpha } = useScroll({
        target: productContainerRef,
        offset: ['start start', '70% start']
    })
    const productOpacity = useTransform(productExitAlpha, [0, 1], [1, 0])

    // enter
    const { scrollYProgress: productEnterAlpha } = useScroll({
        target: productContainerRef,
        offset: ['start end', '60% end']
    })
    const productImageExpand = useTransform(useTransform(productEnterAlpha, [0, 1], [0, 30]), (v) => `${v}vw`)
    const productTextExpand = useTransform(useTransform(productEnterAlpha, [0, 1], [0, 30]), (v) => `${v}vw`)
    
    // Aniamte
    const { scrollYProgress: productAnimAlpha } = useScroll({
        target: productContainerRef,
        offset: ['start end', 'end start']
    })
    const leftLineOffset = useTransform(useTransform(productAnimAlpha, [0, 1], [0, 10]), (v) => `${v}vw`)
    const imageOffset = useTransform(useTransform(productAnimAlpha, [0, 1], [5, -5]), (v) => `${v}vw`)
    const textOffset = useTransform(useTransform(productAnimAlpha, [0, 1], [-5, 5]), (v) => `${v}vw`)
    const rightLineOffset = useTransform(useTransform(productAnimAlpha, [0, 1], [0, -10]), (v) => `${v}vw`)

    return (
        <motion.div 
             className="product-item-left" 
             ref={productContainerRef}
             style={{ opacity: productOpacity }}
        >
            <motion.div
                className="vertical-line-left"
                style={{ y: leftLineOffset }}    
            />
            <motion.img
                src={ product_image_test }
                alt=""
                style={{
                    width: productImageExpand,
                    y: imageOffset,
                }}
            />
            <motion.div
                className="product-text-container"
                style={{
                    width: productTextExpand,
                    y: textOffset,
                }}
            >
                <div className="product-text" >
                    <h1 className="product-name">PRODUCT NAME</h1>
                    <p className="product-description">Lorem ipsum dolor sit amet consectetur. Risus sed lacinia aliquet pulvinar nascetur netus molestie nisi. Duis habitant cursus arcu turpis. Viverra enim malesuada eget dictumst lacus sed enim volutpat ante. At quis velit neque enim elementum nullam purus ipsum risus. Sit nunc orci dictumst habitasse. Quis potenti senectus lacus nisl massa sit orci potenti vulputate. Aliquet lobortis sit diam dui duis id lectus sed pellentesque.</p>
                </div>
            </motion.div>
            <motion.div
                className="vertical-line-right"
                style={{
                    y: rightLineOffset,
                }}
            />
        </motion.div>
    )
}

const ProductItemRight = () => {

    const productContainerRef = useRef(null);

    // exit
    const { scrollYProgress: productExitAlpha } = useScroll({
        target: productContainerRef,
        offset: ['start start', '70% start']
    })
    const productOpacity = useTransform(productExitAlpha, [0, 1], [1, 0])

    // enter
    const { scrollYProgress: productEnterAlpha } = useScroll({
        target: productContainerRef,
        offset: ['start end', '60% end']
    })
    const productImageExpand = useTransform(useTransform(productEnterAlpha, [0, 1], [0, 30]), (v) => `${v}vw`)
    const productTextExpand = useTransform(useTransform(productEnterAlpha, [0, 1], [0, 30]), (v) => `${v}vw`)
    
    // Aniamte
    const { scrollYProgress: productAnimAlpha } = useScroll({
        target: productContainerRef,
        offset: ['start end', 'end start']
    })
    const leftLineOffset = useTransform(useTransform(productAnimAlpha, [0, 1], [0, -10]), (v) => `${v}vw`)
    const imageOffset = useTransform(useTransform(productAnimAlpha, [0, 1], [5, -5]), (v) => `${v}vw`)
    const textOffset = useTransform(useTransform(productAnimAlpha, [0, 1], [-5, 5]), (v) => `${v}vw`)
    const rightLineOffset = useTransform(useTransform(productAnimAlpha, [0, 1], [0, 10]), (v) => `${v}vw`)

    return (
        <motion.div 
             className="product-item-right" 
             ref={productContainerRef}
             style={{ opacity: productOpacity }}
        >
            <motion.div
                className="vertical-line-right"
                style={{ y: rightLineOffset }}    
            />
            <motion.img
                src={ product_image_test }
                alt=""
                style={{
                    width: productImageExpand,
                    y: imageOffset,
                }}
            />
            <motion.div
                className="product-text-container"
                style={{
                    width: productTextExpand,
                    y: textOffset,
                }}
            >
                <div className="product-text" >
                    <h1 className="product-name">PRODUCT NAME</h1>
                    <p className="product-description">Lorem ipsum dolor sit amet consectetur. Risus sed lacinia aliquet pulvinar nascetur netus molestie nisi. Duis habitant cursus arcu turpis. Viverra enim malesuada eget dictumst lacus sed enim volutpat ante. At quis velit neque enim elementum nullam purus ipsum risus. Sit nunc orci dictumst habitasse. Quis potenti senectus lacus nisl massa sit orci potenti vulputate. Aliquet lobortis sit diam dui duis id lectus sed pellentesque.</p>
                </div>
            </motion.div>
            <motion.div
                className="vertical-line-left"
                style={{
                    y: leftLineOffset,
                }}
            />
        </motion.div>
    )
}

export const HomeRecommendation = () => {

    const titleContainerRef = useRef(null);
    const { scrollYProgress: titleAlpha } = useScroll({
        target: titleContainerRef,
        offset: ['start end', 'end start']
    })
    const titleOffset = useTransform(useTransform(titleAlpha, [0, 1], [-30, 15]), (v) => `${v}vh`)
    const topCirclesOffset = useTransform(useTransform(titleAlpha, [0, 1], [-25, 15]), (v) => `${v}vh`)
    const bottomCirclesOffset = useTransform(useTransform(titleAlpha, [0, 1], [-25, 25]), (v) => `${v}vh`)

   

    return (
        <div className="HomeRecommendation">
            <div className="title-container"  ref={titleContainerRef}>
                <motion.img
                    src={ scrolling_circles }
                    alt=""
                    className='top-scrolling-circles'
                    style={{y: topCirclesOffset}}
                />
                <motion.img 
                    src={ recommend_title }
                    alt=""
                    className="recommend_title"
                    style={{y: titleOffset}}
                />
                <motion.img
                    src={ scrolling_circles }
                    alt=""
                    className='bottom-scrolling-circles'
                    style={{y: bottomCirclesOffset}}
                />
            </div>
            <div className="lower-part-container">
                <div className="products-container">
                    <ProductItemLeft/>
                    <ProductItemRight/>
                    <ProductItemLeft/>
                    <ProductItemRight/>
                    <ProductItemLeft/>
                    <ProductItemRight/>
                </div>
                <div className="vertical-line"/>
            </div>
        </div>
    )
}
