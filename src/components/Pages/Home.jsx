import React from 'react';
import './styles/styleHome.css';

const Home = () => {
  return (
    // paginaPrincipal
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
    // FinPaginaPrincipal
  )
}

export default Home
