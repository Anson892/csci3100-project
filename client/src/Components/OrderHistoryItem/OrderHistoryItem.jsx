import React, { useState } from 'react'
import ProductImage from '../../Assets/Images/ButterflyChair.jpg'
import arrivedIcon from '../../Assets/Icons/arrived_icon.svg'
import deliveringIcon from '../../Assets/Icons/delivering_icon.svg'
import addCommentIcon from '../../Assets/Icons/add_comment_icon.svg'
import submittedCommentIcon from '../../Assets/Icons/finished_icon.svg'
import smallStarEmptyIcon from '../../Assets/Icons/small_star_empty.svg'
import smallStarFilledIcon from '../../Assets/Icons/small_star_filled.svg'
import './OrderHistoryItem.css'

const OrderInfo = () => {
    const orderID = "AD21187920"
    const orderTimestamp = "03/24/2020 21:34:25"
    const deliverDate = "3/26/2020"
    const receiverName = "CHRIS WONG"
    const totalPrice = "$600"
    const paymentMethod = "CREDIT CARD"
    const deliveryStatus = "DELIVERING"

    return (
        <div class="order-info">
            <p class="order-info-field">ORDER ID</p><p>{orderID}</p>
            <p class="order-info-field">ORDER TIME</p><p>{orderTimestamp}</p>
            <p class="order-info-field">RECEIVER NAME</p><p>{receiverName}</p>
            <p class="order-info-field">ORDER TOTAl</p><p>{totalPrice}</p>
            <p class="order-info-field">PAYMENT METHOD</p><p>{paymentMethod}</p>
            <p class="order-info-field">EXPECTED ARRIVAL</p><p>{deliverDate}</p>

            <p class="order-info-field">DELIVERY STATUS</p>
            <div class="order-info-delivery-status">
                <p>{deliveryStatus}</p>&nbsp;
                <img src={deliveringIcon} alt="delivering_icon"></img>
                &nbsp;||&nbsp;
                <p>ARRIVED</p>&nbsp;
                <img src={arrivedIcon} alt="arrived_icon"></img>
            </div>
        </div>
    )
}

const OrderProduct = ({addComment=false}) => {
    const [comment, setComment] = useState(addComment);
    const [submitted, setSubmitted] = useState(false);

    return (
        <div class="order-product">
            <div class="order-product-bar">
                <img class="cart-product-img" src={ ProductImage } alt="product img"></img>
                <p>Butterfly Chair</p>
                <p>$30</p>
                <p>x5</p>
                {
                submitted ? 
                <img src={submittedCommentIcon} alt="add_comment_icon"></img> :
                <button class="add-comment-button" onClick={()=>setComment(true)}>
                    <img src={addCommentIcon} alt="add_comment_icon"></img>
                </button>
                }
            </div>
            {comment && 
            <div class="order-product-comment">
                <p>Your review</p>
                <Rating/>
                <textarea placeholder="Write a review"></textarea>
                <button onClick={()=>{setSubmitted(true);setComment(false);}}>SUBMIT</button>
            </div>
            }
        </div>

    )
}

const Rating = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return (
        <div class="rating">
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label
                        class="star"
                        onClick={() => setRating(ratingValue)}
                        onMouseEnter={() => setHover(ratingValue)}
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

export const OrderHistoryItem = () => {
    return (
        <div class="order-history-item">
            <OrderInfo/>
            <div class="order-product-list">
                {/* <OrderProduct addComment={true}/> */}
                <OrderProduct/>
                <OrderProduct/>
                <OrderProduct/>
            </div>
        </div>
    )
}