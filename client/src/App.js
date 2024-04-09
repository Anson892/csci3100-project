import './App.css';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';
import { AnimatePresence } from 'framer-motion';
import { Home } from './Pages/Home/Home';
import { Login } from './Pages/Login/Login';
import { Register } from './Pages/Register/Register';
import { AdminUser } from './Pages/AdminUser/AdminUser';
import { AdminProduct } from './Pages/AdminProduct/AdminProduct';
import { ShoppingCart } from './Pages/ShoppingCart/ShoppingCart';
import { Checkout } from './Pages/Checkout/Checkout';
import { AccountInfo } from './Pages/AccountInfo/AccountInfo';
import { SearchResult } from './Pages/SearchResult/SearchResult';
import { ProductInfo } from './Pages/ProductInfo/ProductInfo';
import { NotFound } from './Pages/NotFound/NotFound';
import { PageTransition } from './Components/Animations/PageTransition/PageTransition';
import { useEffect, useContext } from 'react';


function App() {

    const PageTransitionRoutes = () => {

        const location = useLocation();
        const { userAuth } = useContext(AuthContext)
        const userType = userAuth ? userAuth.userType : null

        useEffect(() => {
            console.log(location.pathname)
            if (location.pathname === "/admin/product") {
                document.body.style.backgroundColor = "#e7e7e7"
            }
            else {
                document.body.style.backgroundColor = "#F6F6E9"
            }
        }, [location])

        return (
            <AnimatePresence mode='wait'>
                <Routes location={location} key={location.pathname + location.search}>
                    
                    {/* visible to all users, does not require authentification */}
                    <Route path='/' exact element={<PageTransition><Home/></PageTransition>}/>
                    <Route path='/product/:productId' element={<PageTransition><ProductInfo/></PageTransition>}/>
                    <Route path='/search' element={<PageTransition><SearchResult/></PageTransition>}/>

                    {/* page not found */}
                    <Route path='*' element={<PageTransition><NotFound/></PageTransition>}/>

                    {/* redirect customer to home page, admin to admin user panel after successful login */}
                    <Route path='/login' element={
                        userType == "admin" ? <PageTransition><AdminUser/></PageTransition> :
                        userType == "customer" ? <PageTransition><Home/></PageTransition> :
                        <PageTransition><Login/></PageTransition>}/>
                    
                    {/* redirect customer to home page, admin to admin user panel after successful login */}
                    <Route path='/register' element={
                        userType == "admin" ? <PageTransition><AdminUser/></PageTransition> :
                        userType == "customer" ? <PageTransition><Home/></PageTransition> :
                        <PageTransition><Register/></PageTransition>}/>

                    {/* redirect customer to login if not loggin in */}
                    <Route path='/shopping-cart' element={
                        userType == "customer" ? <PageTransition><ShoppingCart/></PageTransition>:
                        <PageTransition><Navigate to='/login'/></PageTransition>}/>

                    {/* redirect customer to login if not loggin in */}
                    <Route path='/checkout' element={
                        userType == "customer" ? <PageTransition><Checkout/></PageTransition>:
                        <PageTransition><Navigate to='/login'/></PageTransition>}/>
                    
                    {/*  redirect customer to login if not loggin in */}
                    <Route path='/account' element={
                        userType == "customer" ? <PageTransition><AccountInfo/></PageTransition>:
                        <PageTransition><Navigate to='/login'/></PageTransition>}/>

                    {/*  redirect admin to login if not loggin in */}
                    <Route path='/admin/user' element={
                        userType == "admin" ? <PageTransition><AdminUser/></PageTransition>: 
                        <PageTransition><Navigate to='/login'/></PageTransition>}/>
                    
                    {/*  redirect admin to login if not loggin in */}
                    <Route path='/admin/product' element={
                        userType == "admin" ? <PageTransition><AdminProduct/></PageTransition>:
                        <PageTransition><Navigate to='/login'/></PageTransition>}/>

                </Routes>
            </AnimatePresence>
        )
    }

    
  return (
    <div className="App">
        <BrowserRouter>
            <PageTransitionRoutes/>
        </BrowserRouter>
    </div>
  );
}

export default App;
