import React from "react";
import './ProductCard.css';
import  ProductIcon from '../../Assets/Images/ProductIcon.jpg'
import { Link } from 'react-router-dom';
// get icon
// const product_icon = () => {
//     return(

//     )
// }

export const ProductCard = () => {
    return(
        <div className='ProductCardContainer'>
            <Link to={'/product/:1'} onClick={()=>{window.scrollTo({top: (0, 0), behavior: 'instant'})}}>
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
        </div>
    )
}