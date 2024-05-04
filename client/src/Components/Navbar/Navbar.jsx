import React, { useContext, useEffect , useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { SearchBar } from '../SearchBar/SearchBar'
import logo from '../../Assets/logo.svg';
import shopping_cart_icon from '../../Assets/Icons/shopping_cart_icon.svg'
import profile_icon from '../../Assets/Icons/profile_icon.svg'
import { AuthContext } from '../../Context/AuthContext';
import { CartContext } from '../../Context/CartContext';

export const Navbar = () => {
    const { userAuth, dispatch } = useContext(AuthContext)
    const [cartSize, setCartSize] = useState(0);
    const { cartItems } = useContext(CartContext)

    const logout = () => {
        localStorage.removeItem('userAuth')
        dispatch({type:'LOGOUT'})
        // reloading the page
        window.location.reload();
    }

    useEffect(() => {
        async function getCartSize() {
            const response = await fetch('http://localhost:8080/api/cart/' + userAuth.id);
            const data = await response.json();
            setCartSize(data.length);
            console.log(cartSize);
        }
        if (userAuth) {
            getCartSize();
        } 
    }, [userAuth, cartItems])

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
                <Link className="shopping-cart-icon" to={'/shopping-cart'} onClick={()=>{window.scrollTo({top: (0, 0), behavior: 'instant'})}}>
                    <img src={shopping_cart_icon} alt="" />
                    {cartSize>0 && <div className="cart-size-indicator">{cartSize}</div>}
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
