import React, { useState } from 'react';
import { Navbar } from '../../Components/Navbar/Navbar';
import { TextInput } from '../../Components/Forms/TextInput/TextInput'
import { OrderHistoryItem } from '../../Components/OrderHistoryItem/OrderHistoryItem'
import './AccountInfo.css'

const Profile = () => {
  
  /*
  const getUserInfo = () => {
  }

  const updateUserInfo = () => {
  }
  */

  const [NewUserName, setNewUsername] = useState();
  const [NewPassword, setNewPassword] = useState();
  const [NewAddress, setNewAddress] = useState();

  return(
    <div class="profile">
      <div class="profile-details">
        <p>username</p>
        <p>my_username</p>
        <p>password</p>
        <p>************</p>
        <p>address</p>
        <p>my_address</p>
        <button class="edit-prile-button">edit profile</button>
      </div>
      <div class="edit-profile">
        <TextInput type="text" onChange={(e)=>{setNewUsername(e.target.value)}}>new username</TextInput>
        <TextInput type="text" onChange={(e)=>{setNewPassword(e.target.value)}}>new password</TextInput>
        <TextInput type="text" onChange={(e)=>{setNewAddress(e.target.value)}}>new address</TextInput>
      </div>
    </div>    
  )

}

const OrderHistory = () => {
  return (
    <div>
      <OrderHistoryItem/>
      <OrderHistoryItem/>
    </div>
  )
}

export const AccountInfo = () => {
  
  const [AccountInfo, setAccounInfo]=useState(false);
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
            { AccountInfo ?  <Profile/> : <OrderHistory/> }
          </div>
        </div>
    </div>
  )
}
