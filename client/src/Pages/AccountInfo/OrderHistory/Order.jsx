import React, { useContext, useEffect, useState } from 'react'
import ProductImage from '../../../Assets/Images/ProductIcon.jpg'
import arrivedIcon from '../../../Assets/Icons/arrived_icon.svg'
import deliveringIcon from '../../../Assets/Icons/delivering_icon.svg'
import addCommentIcon from '../../../Assets/Icons/add_comment_icon.svg'
import submittedCommentIcon from '../../../Assets/Icons/finished_icon.svg'
import smallStarEmptyIcon from '../../../Assets/Icons/small_star_empty.svg'
import smallStarFilledIcon from '../../../Assets/Icons/small_star_filled.svg'
import { AuthContext } from '../../../Context/AuthContext.jsx'
import './Order.css'

export const Order = ({order}) => {
    const orderItems = order.orderitem

    return (
        <div class="order-history-item">
            <OrderInfo order={order}/>
            <div class="order-product-list">
                {orderItems && orderItems.map((i)=>
                <OrderItem 
                    key={order.id} 
                    orderid = {order.id}
                    productid={i.productId} 
                    productname={i.productname} 
                    price={i.price} 
                    quantity={i.quantity}
                />)}
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

const OrderItem = ({orderid, productid, productname, price, quantity}) => {
    const { userAuth } = useContext(AuthContext)
    const [writeReview, setWriteReview] = useState();
    const [submitted, setSubmitted] = useState();
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [comment, setComment] = useState(null);
    const [photo, setPhoto] = useState(ProductImage);

    const ReviewExist = async () => {
        const url = "http://localhost:8080/api/comment/check/";
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "userId": userAuth.id,
                "orderId": orderid,
                "productId": productid
            }),
          })
        const data = await res.json()
        setSubmitted(data.exist)
    }
    
    const SubmitReview = async() => {
        const url = "http://localhost:8080/api/comment/add/";
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "userId": userAuth.id,
                "rating": rating,
                "content": comment,
                "orderId": orderid,
                "productId": productid
            }),
          });
        setSubmitted(true);
        setWriteReview(false);
    }

    const GetProductImg = async () => {
        const res = await fetch(`http://localhost:8080/api/product/${productid}`);
        const data = await res.json();
        if (data.data.product_images[0] != undefined) {
            setPhoto("http://localhost:8080/images/" + data.data.product_images[0].path);
        }
    }

    useEffect(() => {GetProductImg(); ReviewExist()}, [])

    return (
        <div class="order-product">
            <div class="order-product-bar">
                <img class="cart-product-img" src={ photo } alt="product img"></img>
                <p>{productname}</p>
                <p>{price}</p>
                <p>{quantity}</p>
                { /* disable add review function after submission*/
                submitted ? 
                <img src={submittedCommentIcon} alt="add_comment_icon"></img> :
                <button class="add-comment-button" onClick={()=>setWriteReview(true)}>
                    <img src={addCommentIcon} alt="add_comment_icon"></img>
                </button>
                }
            </div>

            {writeReview && 
            <div class="order-product-comment">
                <p>Your review</p>
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
                <textarea 
                    placeholder="Write a review" 
                    onChange={(e) => setComment(e.target.value)}
                    value = {comment}
                >
                </textarea>
                <button onClick={SubmitReview}>SUBMIT</button>
            </div>
            }
        </div>

    )
}
