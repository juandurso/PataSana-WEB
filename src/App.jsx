import React, { useEffect, useState } from "react";
import NavbarComponent from "./components/Navegation/navbar";
import Footer from "./components/footer";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Adminpacientes from "./Pages/AdminPacientes";
import Adminturnos from "./Pages/Admin-turnos";
import AcercaDeNosotros from "./Pages/Acerca-de-nosotros";
import Error404 from "./Pages/Error404";
import UpdateDuenio from "./Pages/UpdateDuenio";
import UpdateMascota from "./Pages/UpdateMascota";
import UpdateTurno from "./Pages/UpdateTurno";
import Home from "./Pages/Home";
import DetallesDePlanes from "./Pages/DetallesDePlanes";
import MascotasDuenio from "./Pages/MascotasDuenio";
import SignUp3 from "./Pages/Register";
import Login from "./Pages/Login";


const App = () => {
  const [jwt, setJwt] = useState(localStorage.getItem('token') || "")

  const changeJwt = (value) => {
    setJwt(value)
  }

  useEffect(() => {
    if (jwt.length) console.log(jwt)
  }, [jwt])

  return (
    <div>
      <BrowserRouter>
        <NavbarComponent jwt={jwt}/>
        <Routes>
          {/* PUBLICAS */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/login" element={<Login changeJwt={changeJwt}/>} />
          <Route path="/Register" element={<SignUp3/>} />
          <Route path="/*" element={<Error404 />} />
          <Route path="/DetallesDePlanes" element={<DetallesDePlanes />} />
          <Route path="/aboutus" element={<AcercaDeNosotros />} />
          <Route path="/acerca-de-nosotros" element={<AcercaDeNosotros />} />
          {/* PRIVADAS */}
          {
            jwt.length > 0 && (
              <>
                <Route path="/AdminPacientes" element={<Adminpacientes />} />
                <Route path="/Admin-turnos" element={<Adminturnos />} />
                <Route path="/duenio/mascotas/:id" element={<MascotasDuenio />} />
                <Route path="/duenio/actualizar/:id" element={<UpdateDuenio />} />
                <Route path="/mascotas/actualizar/:id" element={<UpdateMascota />} />
                <Route path="/turnos/actualizar/:id" element={<UpdateTurno />} />
                <Route path="/mascotas/Adminturnos/:id" element={<Adminturnos />} />
              </>
            )
          }
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
