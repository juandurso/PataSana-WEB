import React from 'react';
import '../../styles/styleHome.css';

const Home = () => {
  return (
<div>
  <main>
      <section className="hero">
        <div className="row container">
          <div className="column">
            <h2>¡Bienvenidos a nuestra veterinaria de confianza!</h2>
            <p> En Pata Sana, nuestro compromiso es proporcionar el más alto nivel de cuidado y cariño a todos los animales que atendemos. Somos un equipo apasionado de médicos veterinarios y profesionales dedicados que comparten una profunda conexión con los animales y una misión común: mejorar la salud y el bienestar de las mascotas.</p>
            <div className="buttons">
              <button className="btn">CONOCE MÁS</button>
              <button className="btn">SUCURSALES</button>
            </div>
          </div>
          <div className="column">
            <img src="src/img/website-images/images/hero.png" alt="heroImg" class="hero_img"/>
          </div>
        </div>
        <img src="src/img/website-images/images/bg-bottom-hero.png" alt="" className="curveImg" />
      </section>
  </main>

  <section2>
    <div className="wrapper">
      <div className="box">
         <div className="front-face">
            <div className="icon img">
               <img src="src/img/iconoCirugia.png" alt="png"></img>
            </div>
            <span>SERVICIOS: Clínica y Cirugías</span>
         </div>
         <div class="back-face">
            <span>Clinica y Cirugías</span>
            <p>
               ¡Entra para conocer nuestros servicios especializados en cirugía y clinica!
            </p>
            <button className="btn">Más información</button>
         </div>
      </div>
      <div className="box">
         <div className="front-face">
            <div className="icon">
               <img src="src/img/iconoEspecialidades.png" alt=""></img>
            </div>
            <span>SERVICIOS: Especialidades y Laboratorio</span>
         </div>
         <div className="back-face">
            <span>Especialidades y Laboratorio</span>
            <p>
               ¡Entra y conoce los servicios de laboratorio y especialidades!
            </p>
            <button className="btn">Más información</button>
         </div>
      </div>
      <div className="box">
         <div className="front-face">
            <div className="icon">
               <img src="src/img/iconoMedIntegral.png" alt=""></img>
            </div>
            <span>SERVICIO: Medicina Preventiva</span>
         </div>
         <div className="back-face">
            <span>Medicina Preventiva</span>
            <p>
               ¡Entra para conocer más sobre el chequeo médico integral para tu mascota!
            </p>
            <button className="btn">Más información</button>
         </div>
      </div>
   </div>
  </section2>

  <section3>
    <h3 className="textoCentral">NUESTROS PROFESIONALES</h3>
    <div className="tab library">
      <div className="animation-show">
          <img src="src/img/9.png"></img>
          <h3 className="especialista">Doctora Carmen Brizuela</h3>
          <p className="especialista">Especialista en Cardiología y Clínica</p>
      </div>
      <div className="animation-show">
          <img src="src/img/10.png"></img>
          <h3 className="especialista">Doctor Rodrigo Ponce</h3>
          <p className="especialista">Especialista en Cirugías</p>
      </div>
      <div className="animation-show">
          <img src="src/img/11.png"></img>
          <h3 className="especialista">Doctora Daniela Díaz</h3>
          <p className="especialista">Especialista en Medicina Preventiva</p>
      </div>
      <div className="animation-show">
          <img src="src/img/12.png"></img>
          <h3 className="especialista">Doctor Luis Martínez</h3>
          <p className="especialista">Especialista en Laboratorio</p>
      </div>
    </div>
  </section3>

  <section4 class="planes">
    <img src="src/img/curva2.png" alt=""></img>
   </section4>

</div>
  )
}

export default Home