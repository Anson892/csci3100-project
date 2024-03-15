import React from 'react'
import scrolling_circles from '../../Assets/UI/scrolling_circles.svg'
import recommend_title from '../../Assets/UI/recommend_title.svg'
import product_image_test from '../../Assets/Images/product_image_test.png'
import './HomeRecommendation.css'
import { motion, useMotionValue, useScroll, useSpring, useVelocity } from 'framer-motion'

// const InfiniteMarguee = ( { childern, velocity = 50 } ) => {
//     const offset = useMotinoValue(0);
//     const { scrollY } = useScroll;
//     const scrollVelocity = useVelocity(scrollY)
//     const smoothVelocity = useSpring(scrollVelocity, {damping:50, stiffness: 400})


//     return (
//         <div className="infinite-marguee">
//             <div className="text" ></div>
//                 <span>{ childern }</span>
//                 <span>{ childern }</span>
//                 <span>{ childern }</span>
//                 <span>{ childern }</span>
//                 <span>{ childern }</span>
//                 <span>{ childern }</span>
//                 <span>{ childern }</span>
//                 <span>{ childern }</span>
//         </div>
//     )
// }

const ProductItemLeft = () => {
    return (
        <div className="product-item-left">
            <div className="vertical-line-left"/>
            <img src={ product_image_test } alt="" />
            <div className="product-text">
                <h1 className="product-name">PRODUCT NAME</h1>
                <p className="product-description">Lorem ipsum dolor sit amet consectetur. Risus sed lacinia aliquet pulvinar nascetur netus molestie nisi. Duis habitant cursus arcu turpis. Viverra enim malesuada eget dictumst lacus sed enim volutpat ante. At quis velit neque enim elementum nullam purus ipsum risus. Sit nunc orci dictumst habitasse. Quis potenti senectus lacus nisl massa sit orci potenti vulputate. Aliquet lobortis sit diam dui duis id lectus sed pellentesque.</p>
            </div>
            <div className="vertical-line-right"/>
        </div>
    )
}

const ProductItemRight = () => {
    return (
        <div className="product-item-right">
            <div className="vertical-line-left"/>
            <img src={ product_image_test } alt="" />
            <div className="product-text">
                <h1 className="product-name">PRODUCT NAME</h1>
                <p className="product-description">Lorem ipsum dolor sit amet consectetur. Risus sed lacinia aliquet pulvinar nascetur netus molestie nisi. Duis habitant cursus arcu turpis. Viverra enim malesuada eget dictumst lacus sed enim volutpat ante. At quis velit neque enim elementum nullam purus ipsum risus. Sit nunc orci dictumst habitasse. Quis potenti senectus lacus nisl massa sit orci potenti vulputate. Aliquet lobortis sit diam dui duis id lectus sed pellentesque.</p>
            </div>
            <div className="vertical-line-right"/>
        </div>
    )
}


export const HomeRecommendation = () => {
  return (
    <div className="HomeRecommendation">
        <div className="title-container">
            <img src={ scrolling_circles } alt="" className='top-scrolling-circles'/>
            <img src={ recommend_title } alt="" className="recommend_title" />
            <img src={ scrolling_circles } alt="" className='bottom-scrolling-circles'/>
        </div>
        <div className="lower-part-container">
            <div className="products-container">
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
