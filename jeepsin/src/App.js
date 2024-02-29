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
    </Routes>
    <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;
