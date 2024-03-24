import React, { useState } from 'react';
import { Navbar } from '../../Components/Navbar/Navbar';
import { OrderHistoryItem } from '../../Components/OrderHistoryItem/OrderHistoryItem'
import editIcon from '../../Assets/Icons/edit_icon.svg'
import saveIcon from '../../Assets/Icons/save_icon.svg'
import './AccountInfo.css'

const Profile = () => {

  /*
  const getUserInfo = () => {
  //API get
  // save initial state before edit
  }
  

  const updateUserInfo = () => {
  // API post
  // restore initial state before edit if edit is rejected
  }
  */

  const [edit, setEdit] = useState(false);

  const [username, setUsername] = useState('my_username');
  const [password, setPassword] = useState('my_password');
  const [firstName, setFirstName] = useState('Chris');
  const [lastName, setLastName] = useState('Wong');
  const [phoneNo, setPhoneNo] = useState('98745263');
  const [address, setAddress] = useState(
    `Room1028, Ho Sin-Hang Engineering Building, The Chinese University of Hong Kong, Shatin, N.T., Hong Kong SAR`); 

  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      setEdit(false); // save edit on click
    } else {
      setEdit(true);  // make edit on click
    }
  }

  return(
    <form class="profile-details">

      <label class="profile-details-field">USERNAME</label>
      <input class="profile-details-input" type="text" disabled={!edit} value={username} onChange={(e)=>setUsername(e.target.value)}></input>

      <label class="profile-details-field">PASSWORD</label>
      <input class="profile-details-input" type="text" disabled={!edit} value={password} onChange={(e)=>setPassword(e.target.value)}></input>

      <label class="profile-details-field">FIRST NAME</label>
      <input class="profile-details-input" type="text" disabled={!edit} value={firstName} onChange={(e)=>setFirstName(e.target.value)}></input>

      <label class="profile-details-field">LAST NAME</label>
      <input class="profile-details-input" type="text" disabled={!edit} value={lastName} onChange={(e)=>setLastName(e.target.value)}></input>

      <label class="profile-details-field">PHONE NUMBER</label>
      <input class="profile-details-input" type="text" disabled={!edit} value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)}></input>

      <label class="profile-details-field">SHIPPING ADDRESS</label>
      <textarea class="profile-details-input" type="text" disabled={!edit} value={address} onChange={(e)=>setAddress(e.target.value)}></textarea>

      <button class="edit-profile-button"><img src={edit ? saveIcon : editIcon} alt="" onClick={handleSubmit}/></button>

    </form>
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
  
  const [AccountInfo, setAccounInfo]=useState(true);
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
