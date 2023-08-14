// MIO
import React from "react";
import NavbarComponent from "./components/Navegation/navbar";
import Footer from "./components/footer";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Adminpacientes from "./Pages/AdminPacientes";
import Adminturnos from "./Pages/Admin-turnos";
// import signUp from "./Pages/signup";
import AcercaDeNosotros from "./Pages/Acerca-de-nosotros";
import Error404 from "./Pages/Error404";

import UpdateDuenio from "./Pages/UpdateDuenio";
import UpdateMascota from "./Pages/UpdateMascota";
import UpdateTurno from "./Pages/UpdateTurno";


// import SignIn from "./Pages/signin";
import Home from "./Pages/Home";

import DetallesDePlanes from "./Pages/DetallesDePlanes";
import MascotasDuenio from "./Pages/MascotasDuenio";
import SignUp from "./Pages/SignUp";

//<NavbarComponent />

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/AdminPacientes" element={<Adminpacientes />} />
          <Route path="/Admin-turnos" element={<Adminturnos />} />
          {/* <Route path="/Signin" element={<SignIn />} /> */}
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/aboutus" element={<AcercaDeNosotros />} />
          <Route path="/error404" element={<Error404 />} />
          <Route path="/DetallesDePlanes" element={<DetallesDePlanes />} />
          <Route path="/duenio/mascotas/:id" element={<MascotasDuenio />} />
          <Route path="/duenio/actualizar/:id" element={<UpdateDuenio />} />
          <Route path="/mascotas/actualizar/:id" element={<UpdateMascota />} />
          <Route path="/turnos/actualizar/:id" element={<UpdateTurno />} />
          <Route path="/mascotas/Adminturnos/:id" element={<Adminturnos />} />
          <Route path="/acerca-de-nosotros" element={<AcercaDeNosotros />} />


        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
