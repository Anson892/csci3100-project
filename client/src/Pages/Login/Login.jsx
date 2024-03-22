import React from 'react';
import { Link } from 'react-router-dom';
import loginImage from '../../Assets/Images/LoginImage.jpg'
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion'
import './Login.css'


const LoginForm = () => {
  return (
    <form class="loginForm">
      <p class="title">Welcome back</p>
      <div class="inputContainer">
        <input type="text" required/>
        <label>Username</label>
      </div>
      <div class="inputContainer">
        <input type="text" required/>
        <label>Password</label>
      </div>
      <div class="redirectLink">
        Don’t have an account yet? &nbsp;
        <Link class="signUpLink" to={'/register'} onClick={()=>{window.scrollTo({top: (0, 0), behavior: 'instant'})}}>Sign up</Link>
      </div>
      <Link to={'/'} onClick={()=>{window.scrollTo({top: (0, 0), behavior: 'instant'})}}>
        <button class="loginButton" type="submit">Sign In</button>
      </Link>
    </form>
    
  )
}
export const Login = () => {
  return (
    <div class="loginPage">
      <LoginForm/>
      <img class="loginImage" src={loginImage} alt='login img'></img>
    </div>
  )
}
