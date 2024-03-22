import React from 'react';
import { Link } from 'react-router-dom';
import loginImage from '../../Assets/Images/RegisterImage.jpg'
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion'
import '../Login/Login.css'


const LoginForm = () => {
  return (
    <form class="loginForm">
      <p class="title">Create account</p>
      <div class="inputContainer">
        <input type="text" required/>
        <label>Username</label>
      </div>
      <div class="inputContainer">
        <input type="text" required/>
        <label>Password</label>
      </div>
      <div class="redirectLink">
        Already have an account? &nbsp;
        <Link to={'/login'} onClick={()=>{window.scrollTo({top: (0, 0), behavior: 'instant'})}}>Sign in</Link>
      </div>
      <Link to={'/'} onClick={()=>{window.scrollTo({top: (0, 0), behavior: 'instant'})}}>
        <button class="loginButton" type="submit">Sign Up</button>
      </Link>
    </form>
    
  )
}
export const Register = () => {
  return (
    <div>
      <LoginForm/>
      <img class="loginImage" src={loginImage} alt='login img'></img>
    </div>
  )
}