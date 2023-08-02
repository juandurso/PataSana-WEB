import React from "react";
import NavbarComponent from "./components/Navegation/navbar";
import Footer from "./components/footer";
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Adminpacientes from "./components/Pages/Admin-pacientes";
import Adminturnos from "./components/Pages/Admin-turnos";
import Signin from "./components/Pages/signin";
import Signup from "./components/Pages/signup";
import Home from "./components/Pages/Home";
import Contacto from "./Pages/Contacto";


//<NavbarComponent />

const App = () => {
  return (
    
    <div>
      <BrowserRouter>
      <NavbarComponent />
      <Routes>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/Admin-pacientes" element={<Adminpacientes/>}/>
          <Route path="/Admin-turnos" element={<Adminturnos/>}/>
          <Route path="/Signin" element={<Signin/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/Contacto" element={<Contacto/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
      
    </div>
      );
};


export default App;


