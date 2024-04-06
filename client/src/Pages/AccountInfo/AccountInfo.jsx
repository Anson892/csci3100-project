import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from '../../Components/Navbar/Navbar';
import './AccountInfo.css'
import { Profile } from './Profile';
import { OrderHistory } from './OrderHistory/OrderHistory';


export const AccountInfo = () => {
  
  const [AccountInfo, setAccounInfo]=useState(false /*true*/);
  const ProfileButton_clicked = () =>{
    setAccounInfo(true);
  }
  const OrderHistoryButton_clicked = () =>{
    setAccounInfo(false);

  }
  const buttonState1 = AccountInfo ? "active" : "muted"
  const buttonState2 = AccountInfo ? "muted" : "active"

  return (
    <div>
        <Navbar/>
        <div class="account-page-container">
          <h class="account-page-title">Account</h>
          <div class="account-info-selection">
            <button onClick={ProfileButton_clicked} class={buttonState1}>Profile</button>
            <button onClick= {OrderHistoryButton_clicked} class={buttonState2}>Order History</button>
          </div>
          <div className='account-info-container'>
            { AccountInfo ?  <Profile /> : <OrderHistory/> }
          </div>
        </div>
    </div>
  )
}
