import React, { useState } from "react";
import './ProductCard.css';
import  ProductIcon from '../../Assets/Images/ProductIcon.jpg'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom';

export const ProductCard = () => {
    const cardAnim = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: {
                delay: 1.5,
                duration: 0.5,
                ease: [0.65, 0, 0.35, 1],
            }
        },
        whileHover: {
            scale: 1.1,
            transition: {
                duration: 0.3,
                ease: [0.65, 0, 0.35, 1],
            }
        }
    }
    return(
        <motion.div {...cardAnim} className='ProductCardContainer'>
            <Link to={'/product/'+ 22 } onClick={()=>{window.scrollTo({top: (0, 0), behavior: 'instant'})}}>
                <div>
                <img src={ProductIcon} alt=""/>
                </div>
            </Link>
            <div className='ProductInfoContainer'>
                <div>
                <p className='ProductNameCard'>ProductName</p>
                <p className='ProductPrice'>$15</p>
                </div>
                <div className='ProductTagCard'>
                    <p className='onsale'>ON SALE</p>
                </div>
            </div>
        </motion.div>
    )
}