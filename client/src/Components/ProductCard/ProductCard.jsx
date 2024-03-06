import React from "react";
import './ProductCard.css';
import { Link } from 'react-router-dom';
import  ProductIcon from '../../Assets/Icons/ProductIcon.jpg'


// get icon
// const product_icon = () => {
//     return(

//     )
// }

export const ProductCard = () => {
    return(
        <div className='ProductCardContainer'>
            <img src={ProductIcon} alt=""/>
            <div className='ProductInfoContainer'>
                <div>
                <p className='ProductName'>ProductName</p>
                <p className='ProductPrice'>$15</p>
                <div className='ProductTag'>
                    <p className='onsale'>ON SALE</p>
                </div>
                </div>
            </div>
        </div>
    )
}