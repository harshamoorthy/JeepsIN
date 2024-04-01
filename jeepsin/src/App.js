import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavbarComponent from './Components/Navbar';
import Footer from './Components/Footer';
import HomePage from './Pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Pages/SignupPage'
import Login from './Pages/Login';
import CheckoutForm from './Pages/CheckoutForm';
import PrivateRoute from './Components/PrivateRoute';


function App(){
  return(
    <div className="App">
      <Router>
        <NavbarComponent/>
        <Routes>
          <Route path='/' exact element={<HomePage />}/>
          <Route path='/login'  element={<Login />}/>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/checkout' element={<CheckoutForm />}></Route>
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App;
