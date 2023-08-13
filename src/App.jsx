import React from "react";
import NavbarComponent from "./components/Navegation/navbar";
import Footer from "./components/footer";
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Adminpacientes from "./Pages/Admin-pacientes";
import Adminturnos from "./Pages/Admin-turnos";
import Signin from "./Pages/signin";
import Signup from "./Pages/signup";
import Home from "./Pages/Home";

import Error404 from "./Pages/Error404";


import DetallesDePlanes from "./Pages/DetallesDePlanes"


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

          <Route path="/error404" element={<Error404/>}/>

          <Route path="/DetallesDePlanes"element={<DetallesDePlanes/>}/>

      </Routes>

      </BrowserRouter>
      <Footer />
    </div>

	);

};

export default App;
