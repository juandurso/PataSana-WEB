// MIO
import React from "react";
import NavbarComponent from "./components/Navegation/navbar";
import Footer from "./components/footer";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Adminpacientes from "./Pages/Admin-pacientes";
import Adminturnos from "./Pages/Admin-turnos";
// import signUp from "./Pages/signup";
import SignUp2 from "./Pages/SignUp2";
import AcercaDeNosotros from "./Pages/Acerca-de-nosotros";
import Error404 from "./Pages/Error404";
// FIN MIO

// import SignIn from "./Pages/signin";
import Home from "./Pages/Home";

import DetallesDePlanes from "./Pages/DetallesDePlanes";

//<NavbarComponent />

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Admin-pacientes" element={<Adminpacientes />} />
          <Route path="/Admin-turnos" element={<Adminturnos />} />
          {/* <Route path="/Signin" element={<SignIn />} /> */}
          {/* <Route path="/Signup" element={<signup />} /> */}
          <Route path="/Signup2" element={<SignUp2 />} />
          <Route path="/aboutus" element={<AcercaDeNosotros />} />

          <Route path="/error404" element={<Error404 />} />

          <Route path="/DetallesDePlanes" element={<DetallesDePlanes />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
