import React, { useState } from 'react';
import { Navbar } from '../../Components/Navbar/Navbar';
import { TextInput } from '../../Components/Forms/TextInput/TextInput'
import { OrderHistoryItem } from '../../Components/OrderHistoryItem/OrderHistoryItem'
import './AccountInfo.css'

const EditProfile = () => {

}

export const AccountInfo = () => {

  const [NewUserName, setNewUsername] = useState();
  const [NewPassword, setNewPassword] = useState();
  const [NewAddress, setNewAddress] = useState();

  return (
    <div>
        <Navbar/>
        <div class="account-page-container">
          <h class="account-page-title">Account</h>
          <div class="selection">
            <p>Profile</p>
            <p>Order History</p>
          </div>

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
          
          <div>
            <OrderHistoryItem/>
            {/* <OrderHistoryItem/>
            <OrderHistoryItem/> */}
          </div>
        </div>
        

    </div>
  )
}
