import './App.css';
import NavbarComponent from './Components/Navbar';
import Footer from './Components/Footer';
import HomePage from './Pages/HomePage';


function App() {
  return (
    <div className="App">
      <NavbarComponent/>
      <HomePage/>
      <Footer/>
    </div>
  );
}

export default App;
