import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
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


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/shopping-cart' element={<ShoppingCart/>}/>
                <Route path='/checkout' element={<Checkout/>}/>
                <Route path='/account' element={<AccountInfo/>}/>
                <Route path='/product/:productId' element={<ProductInfo/>}/>
                <Route path='/search' element={<SearchResult/>}/>
                <Route path='/admin' element={<AdminPanel/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
