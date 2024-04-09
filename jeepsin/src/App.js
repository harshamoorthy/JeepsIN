import './App.css';
import React from 'react';
import NavbarComponent from './Components/Navbar';
import Footer from './Components/Footer';
import HomePage from './Pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Pages/SignupPage'
import Admin from './Pages/Admin'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Pages/Login';
import CheckoutForm from './Pages/CheckoutForm';
import PrivateRoute from './Components/PrivateRoute';

import CartPage from './Pages/CartPage';

import Add_Products from './Pages/Add_Products';
import Returns from './Pages/ReturnPage';
import ProductDetails from './Pages/ProductDetails';




function App(){
  return(
    <div className="App">

      <BrowserRouter>
      <NavbarComponent/>
    <Routes>
      <Route path='/' element={<HomePage />}></Route> 
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/login' element={<Login />}></Route> 
      <Route path='/admin' element={<Admin />}></Route>
      <Route path='/return_product' element={<Returns />}></Route>
      <Route path='/add_products' element={<Add_Products />}></Route>
      <Route path='/cart' element={<CartPage />}></Route>
      <Route path='/productdetails/:id' element={<ProductDetails />}></Route>
      <Route path='/checkout' element={<CheckoutForm />}></Route>

    </Routes>
    <Footer/>
    </BrowserRouter>
    </div>
  );

}

export default App;
