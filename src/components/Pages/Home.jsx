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
        <img src="src/img/website-images/images/bg-bottom-hero.png" alt="png" className="curveImg" />
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
               <img src="src/img/iconoEspecialidades.png" alt="png"></img>
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
               <img src="src/img/iconoMedIntegral.png" alt="png"></img>
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
    <img src="src/img/curva2.png" alt="png"></img>
  </section4>

  <section4>
   <div className="wrapper2">
    <div className="table basic">
      <div className="price-section">
        <div className="price-area">
          <div className="inner-area">
            <span className="text"></span>
            <span className="price">0-5</span>
          </div>
        </div>
      </div>
      <div className="package-name"></div>
      <ul className="features">
        <li>
          <span className="list-name">PLAN PRIMEROS PASOS - CACHORROS</span>
        </li>
        <li>
          <span className="list-name">Servicio completo para mascotas de 0 a 5 años.</span>
        </li>
        <li>
          <span className="list-name">¡Entrá a ver los detalles del plan y todo lo que incluye!</span>
        </li>
      </ul>
      <div className="btn2"><button>Detalles</button></div>
    </div>
    <div className="table premium">
      <div className="ribbon"><span>Promoción</span></div>
      <div className="price-section">
        <div className="price-area">
          <div className="inner-area">
            <span className="text"></span>
            <span className="price">5-10</span>
          </div>
        </div>
      </div>
      <div className="package-name"></div>
      <ul className="features">
        <li>
          <span className="list-name">PLAN CRECIMIENTO - MASCOTAS MADURAS</span>
        </li>
        <li>
          <span className="list-name">Servicio completo para mascotas de 5 a 10 años.</span>
        </li>
        <li>
          <span className="list-name">¡Entrá a ver los detalles del plan y todo lo que incluye!</span>
        </li>
      </ul>
      <div className="btn2"><button>Detalles</button></div>
    </div>
    <div className="table ultimate">
      <div className="price-section">
        <div className="price-area">
          <div className="inner-area">
            <span className="text"></span>
            <span className="price">+ 10</span>
          </div>
        </div>
      </div>
      <div className="package-name"></div>
      <ul className="features">
        <li>
          <span className="list-name">PLAN CUIDADOS - MASCOTAS ADULTAS</span>
        </li>
        <li>
          <span className="list-name">Servicio para mascotas mayores a 10 años.</span>
        </li>
        <li>
          <span className="list-name">¡Entrá a ver los detalles del plan y todo lo que incluye!</span>
        </li>
      </ul>
      <div className="btn2"><button>Detalles</button></div>
    </div>
  </div>
</section4>

<sectionSlader>
    <div className="slider">
      <div className="slide-track">
          <div className="slide">
              <img src="src/img/a.webp" alt="webp"></img>
          </div>
          <div className="slide">
              <img src="src/img/b.webp" alt="webp"></img>
          </div>
          <div className="slide">
              <img src="src/img/c.webp" alt="webp"></img>
          </div>
          <div className="slide">
              <img src="src/img/d.webp" alt="webp"></img>
          </div>
          <div className="slide">
              <img src="src/img/e.webp" alt="webp"></img>
          </div>
          <div className="slide">
              <img src="src/img/f.webp" alt="webp"></img>
          </div>
          <div className="slide">
              <img src="src/img/g.webp" alt="webp"></img>
          </div>
          <div className="slide">
              <img src="src/img/h.webp" alt="webp"></img>
          </div>
          <div className="slide">
              <img src="src/img/i.webp" alt="webp"></img>
          </div>
          <div className="slide">
              <img src="src/img/j.webp" alt="webp"></img>
          </div>
          
          <div className="slide">
            <img src="src/img/a.webp" alt="webp"></img>
        </div>
        <div className="slide">
            <img src="src/img/b.webp" alt="webp"></img>
        </div>
        <div className="slide">
            <img src="src/img/c.webp" alt="webp"></img>
        </div>
        <div className="slide">
            <img src="src/img/d.webp" alt="webp"></img>
        </div>
        <div className="slide">
            <img src="src/img/e.webp" alt="webp"></img>
        </div>
        <div className="slide">
            <img src="src/img/f.webp" alt="webp"></img>
        </div>
        <div className="slide">
            <img src="src/img/g.webp" alt="webp"></img>
        </div>
        <div className="slide">
            <img src="src/img/h.webp" alt="webp"></img>
        </div>
        <div className="slide">
            <img src="src/img/i.webp" alt="webp"></img>
        </div>
        <div className="slide">
            <img src="src/img/j.webp" alt="webp"></img>
        </div>
      </div>
  </div>
</sectionSlader>




</div>
  )
}

export default Home
