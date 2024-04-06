import React, { useEffect, useState } from 'react'
import ProductImage from '../../../Assets/Images/ButterflyChair.jpg'
import arrivedIcon from '../../../Assets/Icons/arrived_icon.svg'
import deliveringIcon from '../../../Assets/Icons/delivering_icon.svg'
import addCommentIcon from '../../../Assets/Icons/add_comment_icon.svg'
import submittedCommentIcon from '../../../Assets/Icons/finished_icon.svg'
import smallStarEmptyIcon from '../../../Assets/Icons/small_star_empty.svg'
import smallStarFilledIcon from '../../../Assets/Icons/small_star_filled.svg'
import './Order.css'

export const Order = ({order}) => {
    const orderItems = order.orderitem
    // console.log(orderItems)
    return (
        <div class="order-history-item">
            <OrderInfo order={order}/>
            <div class="order-product-list">
                {orderItems && orderItems.map((i)=>
                <OrderItem key={i.productId} id={i.id} price={i.price} quantity={i.quantity}/>)}
            </div>
        </div>
    )
}

const OrderInfo = ({order}) => {

    const formatTime = (t) => {
        const time = new Date(t)
        return time.toLocaleString()
    }

    return (
        <div class="order-info">
            <p class="order-info-field">ORDER ID</p><p>{order.id}</p>
            <p class="order-info-field">ORDER TIME</p><p>{formatTime(order.ordertime)}</p>
            <p class="order-info-field">RECEIVER NAME</p><p>{order.firstName} {order.lastName}</p>
            <p class="order-info-field">ORDER TOTAl</p><p>{order.ordertotal}</p>
            <p class="order-info-field">PAYMENT METHOD</p><p>{order.paymentMethod}</p>
            <p class="order-info-field">EXPECTED ARRIVAL</p><p>{formatTime(order.deliverytime)}</p>

            <p class="order-info-field">DELIVERY STATUS</p>
            <div class="order-info-delivery-status">
                <p>{order.status}</p>
                &nbsp;
                {order.status == "in delivery" && <img src={deliveringIcon} alt="delivering_icon"></img>}
                {order.status == "completed" && <img src={arrivedIcon} alt="arrived_icon"></img>}
            </div>
        </div>
    )
}

const OrderItem = ({id, price, quantity}) => {
    const [comment, setComment] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // const getProductName = () => {
    //     fetch('http://localhost:8080/api/product/'+id, {method:'GET'})
    //     // const res = await res.json();
    //     // console.log(res)
    //     return "product name"
    // }
    // const name = getProductName()

    return (
        <div class="order-product">
            <div class="order-product-bar">
                <img class="cart-product-img" src={ ProductImage } alt="product img"></img>
                <p>product name</p>
                <p>{price}</p>
                <p>{quantity}</p>
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
