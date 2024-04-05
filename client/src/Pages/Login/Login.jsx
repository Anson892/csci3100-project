import React from 'react';
import loginImage from '../../Assets/Images/LoginImage.jpg'
import { LoginRegisterForm } from '../../Components/Forms/LoginRegisterForm/LoginRegisterForm'
import './Login.css'

export const Login = () => {
  return (
    <div class="loginPage">
      <LoginRegisterForm 
        apiEndPoint = "login"
        title="Welcome back" 
        redirectMessage="Don't have an account yet?" 
        redirectPage="/register" 
        action="Sign up" 
        submitBtnMessage="Sign In"/>
      <img class="loginImage" src={loginImage} alt='login img'></img>
    </div>
  )
}
