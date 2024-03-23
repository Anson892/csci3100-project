import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import ProductImage from '../../Assets/Images/ButterflyChair.jpg'
import arrivedIcon from '../../Assets/Icons/arrived_icon.svg'
import deliveringIcon from '../../Assets/Icons/delivering_icon.svg'
import addCommentIcon from '../../Assets/Icons/add_comment_icon.svg'
import smallStarEmptyIcon from '../../Assets/Icons/small_star_empty.svg'
import smallStarFilledIcon from '../../Assets/Icons/small_star_filled.svg'
import './OrderHistoryItem.css'

const Rating = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label
                        class="star"
                        onClick={() => setRating(ratingValue)}
                        onMouseEnter={() => {console.log(ratingValue);setHover(ratingValue)}}
                        onMouseLeave={() => setHover(null)}
                    >
                        <input class="star-radio" type="radio" value={ratingValue} />
                        {ratingValue <= (hover || rating) ?
                            <img class="star" src={smallStarFilledIcon} alt=""></img> :
                            <img class="star" src={smallStarEmptyIcon} alt=""></img>
                        }
                    </label>
                )
            })}
        </div>
    )
}
const OrderProduct = () => {
    return (
        <div>
            <div class="order-product-bar">
                <img class="cart-product-img" src={ ProductImage } alt="product img"></img>
                <p>product name</p>
                <p>$30</p>
                <p>x5</p>
                <button class="add-comment-button"><img src={addCommentIcon} alt="add_comment_icon"></img></button>
            </div>
            <div class="order-product-comment">
                <p>Your Review</p>
                <Rating />
            </div>
        </div>

    )
}
export const OrderHistoryItem = () => {
    const orderTimestamp = "03/24/2020 21:34:25"
    const deliverDate = "3/26/2020"
    const receiverName = "3/26/2020"
    const totalPrice = "$600"
    const paymentMethod = "CREDIT CARD"
    const deliveryStatus = "DELIVERING"
    
    return (
        <div class="order-history-item">
            <div class="order-info">
                <p>ORDER DATE/TIME</p><p>{orderTimestamp}</p>
                <p>DELIVER DATE</p><p>{deliverDate}</p>
                <p>RECEIVER NAME</p><p>{receiverName}</p>
                <p>TOTAL PRICE</p><p>{totalPrice}</p>
                <p>PAYMENT METHOD</p><p>{paymentMethod}</p>
                <p>DELIVERY STATUS</p>
                <div>
                    <p>{deliveryStatus}</p>
                    <img src={arrivedIcon} alt="aarived_icon"></img>
                    <img src={deliveringIcon} alt="delivering_icon"></img>
                </div>
            </div>
            <div class="order-product-list">
                <OrderProduct />
                <OrderProduct />
                <OrderProduct />
            </div>
        </div>
    )
}