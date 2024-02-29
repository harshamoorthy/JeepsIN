import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavbarComponent from './Components/Navbar';
import Footer from './Components/Footer';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login'; 


function App(){
  return(
    <div className="App">
      <Router>
        <NavbarComponent/>
        <Routes>
          <Route path='/' exact Component={HomePage}/>
          <Route path='/login' Component={Login}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App;
