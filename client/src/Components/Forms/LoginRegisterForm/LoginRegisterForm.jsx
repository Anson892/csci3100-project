import React from 'react'
import { Link } from 'react-router-dom';
import './LoginRegisterForm.css'

export const LoginRegisterForm = ({title, redirectMessage, redirectPage, action, submitBtnMessage}) => {
  return (
    <form class="loginRegisterForm">
      <p class="title">{title}</p>
      <div class="inputContainer">
        <input type="text" required/>
        <label>Username</label>
      </div>
      <div class="inputContainer">
        <input type="text" required/>
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