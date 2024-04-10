import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import './Checkout.css'
import { Link } from 'react-router-dom';
import { TextInput } from '../../Components/Forms/TextInput/TextInput'
import { SubmitButton } from '../../Components/Forms/SubmitButton/SubmitButton'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';


export const Checkout = () => {
  const navigate = useNavigate();
  const [Address, setAddress] = useState('');
  const [Receiver, setReceiver] = useState('');
  const [CardNum, setCardNum] = useState('');
  const [ExpireDate, setExpireDate] = useState('');
  const [CVC, setCVC] = useState('');
  const [PostalCode, setPostalCode] = useState('');
  const [orderId, setorderId] = useState(localStorage.getItem('orderId')) // !!!!!! To be set by global or useparams !!!!!!

  const { userAuth } = useContext(AuthContext);
  
  //fetch user info
  useEffect(() => {
    fetch('http://localhost:8080/api/info/checkout/'+userAuth.id, {method:'GET'})
    .then(res => {
      return res.json();
    })
    .then(data => {
      setReceiver(data.Receiver);
      setAddress(data.Address);
    })
  },[])

  const handelchangeaddress = (e) => {
    e.preventDefault();
    setAddress(e.target.value)
  }

  const handlechangereceiver = (e) => {
    e.preventDefault();
    setReceiver(e.target.value)
  }

  const clearCart = async () => {
    const url = "http://localhost:8080/api/cart/clear/"
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "userId": userAuth.id
      })
    })
    .then((res)=>{
      return res.json()
    })
    .then((response)=>{
      console.log(JSON.stringify(response.message))
    })
  }

  const handleSubmit = () => {
    if ((Address != '')&&(Receiver != '')&&(CardNum != '')&&(ExpireDate != '')&&(CVC != '')&&(PostalCode != '')){
      const CheckoutUrl = "http://localhost:8080/api/order/placeorder"
      fetch(CheckoutUrl,{
                method : 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  orderId: orderId,
                  paymentMethod: "Credit Card",
                  receiver: Receiver,
                  address: Address
                })
      })
      .then((res)=>{
        return res.json()
      })
      .then((response)=>{
        console.log(JSON.stringify(response))
        alert(JSON.stringify(response.message))
      })


      alert ("Ordered!")

      // clear local storage
      localStorage.removeItem('orderId')
      // clear cart
      clearCart();

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
          <TextInput type="text" defaultText={Address} onChange={handelchangeaddress}>Deliver Address</TextInput>
          <TextInput type="text" defaultText={Receiver} onChange={handlechangereceiver}>Receiver Name</TextInput>
        </div>
      </div>
      <div className='CreditCardContainer'>
          <p className='CreditCardText'>Credit Card</p>
          <TextInput type="text" onChange={(e)=>{setCardNum(e.target.value)}}>Card Number</TextInput>
          <TextInput type="text" onChange={(e)=>{setExpireDate(e.target.value)}}>Expiration Date (MM/YYYY)</TextInput>
          <TextInput type="text" onChange={(e)=>{setCVC(e.target.value)}}>CVC/CVV</TextInput>
          <TextInput type="text" onChange={(e)=>{setPostalCode(e.target.value)}}>Postal Code</TextInput>
            <SubmitButton onClick={handleSubmit} children="Place Order">
            </SubmitButton>
      </div>
    </div>
  )
}
