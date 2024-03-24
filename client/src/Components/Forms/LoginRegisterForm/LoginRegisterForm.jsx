import React, { useState} from 'react'
import { Link } from 'react-router-dom';
import './LoginRegisterForm.css'

export const LoginRegisterForm = ({title, redirectMessage, redirectPage, action, submitBtnMessage}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // fetch API -- POST
    // verification
  }

  return (
    <form class="loginRegisterForm" onSubmit={handleSubmit}>
      <p class="title">{title}</p>
      <div class="inputContainer">
        <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} required/>
        <label>Username</label>
      </div>
      <div class="inputContainer">
        <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        <label>Password</label>
      </div>
      <div class="redirectMessage">
        {redirectMessage} &nbsp;
        <Link class="redirectLink" to={`${redirectPage}`} onClick={()=>{window.scrollTo({top: (0, 0), behavior: 'instant'})}}>{action}</Link>
      </div>
      <Link to={'/'} onClick={()=>{window.scrollTo({top: (0, 0), behavior: 'instant'})}}>
        <button class="submitBtn" type="submit">{submitBtnMessage}</button>
      </Link>
    </form>
  )
}