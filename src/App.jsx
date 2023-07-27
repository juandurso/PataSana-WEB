import React from "react";
import NavbarComponent from "./components/Navegation/navbar";
import Footer from "./components/footer";
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Adminpacientes from "./components/Pages/Admin-pacientes";
import Adminturnos from "./components/Pages/Admin-turnos";
import Signin from "./components/Pages/signin";
import Signup from "./components/Pages/signup";
import Home from "./components/Pages/Home";
import AcercaDeNosotros from "./components/Pages/Acerca-de-nosotros";

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
          <Route path="/acerca-de" element={<AcercaDeNosotros/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
      
    </div>
      );
};


export default App;


