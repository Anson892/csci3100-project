import React from 'react';
import { Navbar } from '../../Components/Navbar/Navbar';
import { useParams } from 'react-router-dom';

export const ProductInfo = () => {
    const { productId } = useParams();
    return (
        <div>
            <Navbar/>
            ProductInfo ID: {productId}
        </div>
    )
}
