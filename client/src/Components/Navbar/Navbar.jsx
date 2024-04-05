import React, { useContext } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { SearchBar } from '../SearchBar/SearchBar'
import logo from '../../Assets/logo.svg';
import shopping_cart_icon from '../../Assets/Icons/shopping_cart_icon.svg'
import profile_icon from '../../Assets/Icons/profile_icon.svg'
import { AuthContext } from '../../Context/AuthContext';

export const Navbar = () => {
    const { userAuth, dispatch } = useContext(AuthContext)
    const logout = () => {
        localStorage.removeItem('userAuth')
        dispatch({type:'LOGOUT'})
    }

    return (
        <div className="navbar">
            <Link to={'/'} onClick={()=>{window.scrollTo({top: (0, 0), behavior: 'instant'})}}>
                <div className="nav-logo">
                    <img src={logo} alt="" />
                </div>
            </Link>
            <div className="search-bar-container">
                <SearchBar/>
            </div>
            <div className="nav-right">
                <Link to={'/shopping-cart'} onClick={()=>{window.scrollTo({top: (0, 0), behavior: 'instant'})}}>
                    <img src={shopping_cart_icon} alt="" />
                </Link>
                <Link to={'/account'} onClick={()=>{window.scrollTo({top: (0, 0), behavior: 'instant'})}}>
                    <img src={profile_icon} alt="" />
                </Link>
                { userAuth ?
                <button onClick={logout}><p>Logout</p> </button> :
                <Link to={'/login'} onClick={()=>{window.scrollTo({top: (0, 0), behavior: 'instant'})}}>
                    <button> <p>Login</p></button>
                </Link> 
                }
            </div>
        </div>
    )
}
