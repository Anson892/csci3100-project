import React from 'react';
import { useState } from 'react';
import './Checkout.css'
import { Link } from 'react-router-dom';
import { TextInput } from '../../Components/Forms/TextInput/TextInput'
import { SubmitButton } from '../../Components/Forms/SubmitButton/SubmitButton'
import { useNavigate } from 'react-router-dom';


export const Checkout = () => {
  const navigate = useNavigate();
  const [Address, setAddress] = useState('');
  const [Receiver, setReceiver] = useState('');
  const [CardNum, setCardNum] = useState('');
  const [ExpireDate, setExpireDate] = useState('');
  const [CVC, setCVC] = useState('');
  const [PostalCode, setPostalCode] = useState('');
  const [orderId, setorderId] = useState(1) // !!!!!! To be set by global or useparams !!!!!!
  const handleSubmit = () => {
    if ((Address != '')&&(Receiver != '')&&(CardNum != '')&&(ExpireDate != '')&&(CVC != '')&&(PostalCode != '')){
      const CheckoutUrl = "http://localhost:8080/api/order/placeorder"
      fetch(CheckoutUrl,{
                method : 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  "orderId": orderId,
                  "paymentMethod": "Credit Card"
                })
      })
      .then((res)=>{
        return res.json()
      })
      .then((response)=>{
        console.log(JSON.stringify(response))
      })


      alert ("Ordered!")
      navigate({
        pathname: '/',
     });
    }
    else{
      alert ("error")
    }
  }

  const handleCancelorder = () => {
    const cancelurl = "http://localhost:8080/api/order/delete/"+orderId
    fetch (cancelurl,{
      method : "DELETE"
    })
    .then((res)=>{
      return res.json
    })
    .then((response)=>{
      console.log(JSON.stringify(response.message))
    })
    

    {window.scrollTo({top: (0, 0), behavior: 'instant'})}
  }

  return (
    <div>
      <Link to ={'/shopping-cart'} onClick={handleCancelorder}>
        <p className='CancelOrderText'>《Cancel Order</p>
      </Link>
      <div className='DeliveryContainer'>
        <p className='DeliveryText'>Delivery</p>
        <div className='DeliverAddressContainer'>
          <TextInput type="text" onChange={(e)=>{setAddress(e.target.value)}}>Deliver Address</TextInput>
          <TextInput type="text" onChange={(e)=>{setReceiver(e.target.value)}}>Receiver Name</TextInput>
        </div>
      </div>
      <div className='CreditCardContainer'>
          <p className='CreditCardText'>Credit Card</p>
          <TextInput type="text" onChange={(e)=>{setCardNum(e.target.value)}}>Card Number</TextInput>
          <TextInput type="text" onChange={(e)=>{setExpireDate(e.target.value)}}>Expiration Date (MM/YYY)</TextInput>
          <TextInput type="text" onChange={(e)=>{setCVC(e.target.value)}}>CVC/CVV</TextInput>
          <TextInput type="text" onChange={(e)=>{setPostalCode(e.target.value)}}>Postal Code</TextInput>
            <SubmitButton onClick={handleSubmit} children="Place Order">
            </SubmitButton>
      </div>
    </div>
  )
}
