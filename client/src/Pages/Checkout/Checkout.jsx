import React from 'react';
import { useState } from 'react';
import './Checkout.css'
import { Link } from 'react-router-dom';
import { TextInput } from '../../Components/Forms/TextInput/TextInput'
import { SubmitButton } from '../../Components/Forms/SubmitButton/SubmitButton'

export const Checkout = () => {
  const [Address, setAddress] = useState();
  const [Receiver, setReceiver] = useState();
  const [CardNum, setCardNum] = useState();
  const [ExpireDate, setExpireDate] = useState();
  const [CVC, setCVC] = useState();
  const [PostalCode, setPostalCode] = useState();
  const handleSubmit = () => {
    alert ("Ordered!")
  }


  return (
    <div>
      <Link to ={'/shopping-cart'} onClick={()=>{window.scrollTo({top: (0, 0), behavior: 'instant'})}}>
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
          <Link to ={'/'} onClick={()=>{window.scrollTo({top: (0, 0), behavior: 'instant'})}}>
            <SubmitButton onClick={handleSubmit}>
              <p className='PlaceOrderText'>PLACE ORDER</p>
            </SubmitButton>
          </Link>
      </div>
    </div>
  )
}
