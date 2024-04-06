import React, { useContext, useEffect, useState } from 'react';
import editIcon from '../../Assets/Icons/edit_icon.svg'
import saveIcon from '../../Assets/Icons/save_icon.svg'
import './AccountInfo.css'
import { AuthContext } from '../../Context/AuthContext';

export const Profile = () => {

  const [edit, setEdit] = useState(false);

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState(''); 

  const { userAuth } = useContext(AuthContext);

  // fetch user info
  useEffect(() => {
    fetch('http://localhost:8080/api/info/'+userAuth.id, {method:'GET'})
    .then(res => {
      return res.json();
    })
    .then(data => {
      const i = data.data[0];
      setUsername(i.user.username);
      setFirstName(i.firstName);
      setLastName(i.lastName);
      setPhoneNo(i.phoneNumber);
      setAddress(i.address);
    })
  },[])
  
  const updateProfile = (e) => {
    e.preventDefault();
    if (edit) {
      fetch('http://localhost:8080/api/info/'+userAuth.id, {
        method:'PUT',
        headers:{"Content-type":"application/json"},
        body: JSON.stringify({
          "InfoId": userAuth.id,
          "firstName": firstName,
          "lastName": lastName,
          "address": address,
          "phoneNumber": phoneNo
        })
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        // console.log("updated!");
      })
      setEdit(false); // save edit on click
    } else {
      setEdit(true);  // make edit on click
    }
  }

  return(
    <form class="profile-details">

      <label class="profile-details-field">USERNAME</label>
      <input class="profile-details-input" type="text" disabled={true} value={username}></input>

      <label class="profile-details-field">FIRST NAME</label>
      <input class="profile-details-input" type="text" disabled={!edit} value={firstName} onChange={(e)=>setFirstName(e.target.value)}></input>

      <label class="profile-details-field">LAST NAME</label>
      <input class="profile-details-input" type="text" disabled={!edit} value={lastName} onChange={(e)=>setLastName(e.target.value)}></input>

      <label class="profile-details-field">PHONE NUMBER</label>
      <input class="profile-details-input" type="text" disabled={!edit} value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)}></input>

      <label class="profile-details-field">SHIPPING ADDRESS</label>
      <textarea class="profile-details-input" type="text" disabled={!edit} value={address} onChange={(e)=>setAddress(e.target.value)}></textarea>

      <button class="edit-profile-button"><img src={edit ? saveIcon : editIcon} alt="" onClick={updateProfile}/></button>

    </form>
  )

}