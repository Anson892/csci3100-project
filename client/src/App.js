import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home } from './Pages/Home/Home';
import { Login } from './Pages/Login/Login';
import { Register } from './Pages/Register/Register';
import { AdminPanel } from './Pages/AdminPanel/AdminPanel';
import { ShoppingCart } from './Pages/ShoppingCart/ShoppingCart';
import { Checkout } from './Pages/Checkout/Checkout';
import { AccountInfo } from './Pages/AccountInfo/AccountInfo';
import { SearchResult } from './Pages/SearchResult/SearchResult';
import { ProductInfo } from './Pages/ProductInfo/ProductInfo';
import { NotFound } from './Pages/NotFound/NotFound';
import { PageTransition } from './Components/Animations/PageTransition/PageTransition';


function App() {

    const PageTransitionRoutes = () => {

        const location = useLocation();

        return (
            <AnimatePresence mode='wait'>
                <Routes location={location} key={location.pathname}>
                    <Route path='/' exact element={<PageTransition><Home/></PageTransition>}/>
                    <Route path='/login' element={<PageTransition><Login/></PageTransition>}/>
                    <Route path='/register' element={<PageTransition><Register/></PageTransition>}/>
                    <Route path='/shopping-cart' element={<PageTransition><ShoppingCart/></PageTransition>}/>
                    <Route path='/checkout' element={<PageTransition><Checkout/></PageTransition>}/>
                    <Route path='/account' element={<PageTransition><AccountInfo/></PageTransition>}/>
                    <Route path='/product/:productId' element={<PageTransition><ProductInfo/></PageTransition>}/>
                    <Route path='/search' element={<PageTransition><SearchResult/></PageTransition>}/>
                    <Route path='/admin' element={<PageTransition><AdminPanel/></PageTransition>}/>
                    <Route path='*' element={<PageTransition><NotFound/></PageTransition>}/>
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
