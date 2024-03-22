import React from 'react';
import registerImage from '../../Assets/Images/RegisterImage.jpg'
import { LoginRegisterForm } from '../../Components/Forms/LoginRegisterForm/LoginRegisterForm'
import '../Login/Login.css'

export const Register = () => {
  return (
    <div class="loginPage">
      <LoginRegisterForm title="Create account" redirectMessage="Already have an account?" redirectPage="/login" action="Sign in" submitBtnMessage="Sign Up"/>
      <img class="loginImage" src={registerImage} alt='register img'></img>
    </div>
  )
}
