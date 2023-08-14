import "../styles/styleHome.css";
import ReactModal from "react-modal";
import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";
import toast, { Toaster } from "react-hot-toast";
// import heroImg from "../img/website-images/images/hero.png"
// import curvaHero from "../img/website-images/images/bg-bottom-hero.png"

window.addEventListener('load', () => {

  let lon;
  let lat;

  let temperaturaValor = document.getElementById("temperatura-valor");
  let temperaturaDescripcion = document.getElementById(
    "temperatura-descripcion"
  );

  let ubicacion = document.getElementById("ubicacion");
  let iconoAnimado = document.getElementById("icono-animado");

  let vientoVelocidad = document.getElementById("viento-velocidad");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((posicion) => {
      lon = posicion.coords.longitude;
      lat = posicion.coords.latitude;

      const url = `https://api.openweathermap.org/data/2.5/weather?q=Tucuman&appid=6463c6716417643cce6e88a52ee48649`;

      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let tempKelvin = data.main.temp;
          let tempCelsius = Math.round(tempKelvin - 273.15);
          temperaturaValor.textContent = `${tempCelsius} °C`;

          let desc = data.weather[0].description;
          temperaturaDescripcion.textContent = desc.toUpperCase();

          ubicacion.textContent = data.name;

          let velocidadMs = data.wind.speed;
          let velocidadKmh = Math.round(velocidadMs * 3.6);
          vientoVelocidad.textContent = `${velocidadKmh} km/h`;

          console.log(data.weather[0].main);
          switch (data.weather[0].main) {
            case "Thunderstorm":
              iconoAnimado.src = "/thunder.svg";
              console.log("TORMENTA");
              break;
            case "Drizzle":
              iconoAnimado.src = "/rainy-2.svg";
              console.log("LLOVIZNA");
              break;
            case "Rain":
              iconoAnimado.src = "/rainy-7.svg";
              console.log("LLUVIA");
              break;
            case "Snow":
              iconoAnimado.src = "/snowy-6.svg";
              console.log("NIEVE");
              break;
            case "Clear":
              iconoAnimado.src = "/day.svg";
              console.log("LIMPIO");
              break;
            case "Atmosphere":
              iconoAnimado.src = "/weather.svg";
              console.log("ATMOSFERA");
              break;
            case "Clouds":
              iconoAnimado.src = "/cloudy-day-1.svg";
              console.log("NUBES");
              break;
            default:
              iconoAnimado.src = "/cloudy-day-1.svg";
              console.log("por defecto");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
});

const Home = () => {
    //modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
    });
  
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Enviamos el formulario usando el paquete emailjs-com
      emailjs
        .sendForm('service_72sah3s', 'template_q8qw8fc', e.target, '0ku9k9GZc3KaSdMBY')
        .then(
          (result) => {
            console.log(result.text);
            // Después de enviar el formulario, cerramos la ventana modal
            handleCloseModal();
        //toast
        toast.success('¡Formulario enviado correctamente! Recibimos tu pedido, pronto nos pondremos en contacto contigo.', {
        style: {
          background: '#013D37',
          color: '#fff',
          padding: '12px',
          fontFamily: 'Poppins, sans-serif',
        },
        });
          },
          (error) => {
            console.log(error.text);
        //toast error 
        toast.error('Error al enviar el formulario.', {
        style: {
          background: '#f44336',
          color: '#fff',
          padding: '12px',
          fontFamily: 'Poppins, sans-serif',
        },
        });
          }
        );
    };
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
    
    //modal
  
  return (
<div>
  <main>
      <section className="hero">
        <div className="container">
          <div className="row">
          <div className="col-lg-6 mt-5">
            <h2>¡Bienvenidos a nuestra veterinaria de confianza!</h2>
            <p> En Pata Sana, nuestro compromiso es proporcionar el más alto nivel de cuidado y cariño a todos los animales que atendemos. Somos un equipo apasionado de médicos veterinarios y profesionales dedicados que comparten una profunda conexión con los animales y una misión común: mejorar la salud y el bienestar de las mascotas.</p>
            <div className="buttons">
              <button className="btn" onClick={handleOpenModal}>CONTACTANOS</button>
              <button className="btn">SUCURSALES</button>
            </div>
          </div>
          <div className="col-lg-6 my-5">
            <img src="/hero.png" alt="png" className="hero_img"/>
          </div>
          </div>
        </div>
        <img src="/bg-bottom-hero.png" alt="png" className="curveImg" />
      </section>
  </main>

      <div id="contenedor">
        <div id="caja1">
          <h1 id="temperatura-valor" className="fs-2"></h1>
          <h2 id="temperatura-descripcion" className="fs-4"></h2>
        </div>
        <div id="caja2">
          <h2 id="ubicacion" className="fs-4"></h2>
          <img id="icono-animado" src="" alt="" height="150" width="150"></img>
        </div>
        <div id="caja3">
          <h3 className="fs-4">Velocidad del Viento</h3>
          <h1 id="viento-velocidad" className="fs-2"></h1>
        </div>
      </div>
      <section2>
        <div className="wrapper">
          <div className="box">
            <div className="front-face">
              <div className="icon img">
                <img src="/iconoCirugia.png" alt="png"></img>
              </div>
              <span>SERVICIOS: Clínica y Cirugías</span>
            </div>
            <div className="back-face">
              <span>Clinica y Cirugías</span>
              <p>
                ¡Entra para conocer nuestros servicios especializados en cirugía
                y clinica!
              </p>
              <a href="error404">
                <button className="btn text-decoration-none">
                  Más información
                </button>
              </a>
            </div>
          </div>
          <div className="box">
            <div className="front-face">
              <div className="icon">
                <img src="/iconoEspecialidades.png" alt="png"></img>
              </div>
              <span>SERVICIOS: Especialidades y Laboratorio</span>
            </div>
            <div className="back-face">
              <span>Especialidades y Laboratorio</span>
              <p>
                ¡Entra y conoce los servicios de laboratorio y especialidades!
              </p>
              <a href="error404">
                <button className="btn text-decoration-none">
                  Más información
                </button>
              </a>
            </div>
          </div>
          <div className="box">
            <div className="front-face">
              <div className="icon">
                <img src="/iconoMedIntegral.png" alt="png"></img>
              </div>
              <span>SERVICIO: Medicina Preventiva</span>
            </div>
            <div className="back-face">
              <span>Medicina Preventiva</span>
              <p>
                ¡Entra para conocer más sobre el chequeo médico integral para tu
                mascota!
              </p>
              <a href="error404">
                <button className="btn text-decoration-none">
                  Más información
                </button>
              </a>
            </div>
          </div>
        </div>
      </section2>

      <section3>
        <h3 className="textoCentral">NUESTROS PROFESIONALES</h3>
        <div className="tab library">
          <div className="animation-show">
            <img src="/9.png"></img>
            <h3 className="especialista fs-5">Doctora Carmen Brizuela</h3>
            <p className="especialista">
              Especialista en Cardiología y Clínica
            </p>
          </div>
          <div className="animation-show">
            <img src="/10.png"></img>
            <h3 className="especialista fs-5">Doctor Rodrigo Ponce</h3>
            <p className="especialista">Especialista en Cirugías</p>
          </div>
          <div className="animation-show">
            <img src="/11.png"></img>
            <h3 className="especialista fs-5">Doctora Daniela Díaz</h3>
            <p className="especialista">Especialista en Medicina Preventiva</p>
          </div>
          <div className="animation-show">
            <img src="/12.png"></img>
            <h3 className="especialista fs-5">Doctor Leandro Martínez</h3>
            <p className="especialista">Especialista en Laboratorio</p>
          </div>
        </div>
      </section3>

      <section4 className="imagDiv">
        <img src="/curva2.png" alt="png"></img>
      </section4>

      <section5>
        <div className="wrapper2 my-5">
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
                <span className="list-name">
                  PLAN PRIMEROS PASOS - CACHORROS
                </span>
              </li>
              <li>
                <span className="list-name">
                  Servicio completo para mascotas de 0 a 5 años.
                </span>
              </li>
              <li>
                <span className="list-name">
                  ¡Entrá a ver los detalles del plan y todo lo que incluye!
                </span>
              </li>
            </ul>
          </div>
          <div className="table premium">
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
                <span className="list-name">
                  PLAN CRECIMIENTO - MASCOTAS MADURAS
                </span>
              </li>
              <li>
                <span className="list-name">
                  Servicio completo para mascotas de 5 a 10 años.
                </span>
              </li>
              <li>
                <span className="list-name">
                  ¡Entrá a ver los detalles del plan y todo lo que incluye!
                </span>
              </li>
            </ul>
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
                <span className="list-name">
                  PLAN CUIDADOS - MASCOTAS ADULTAS
                </span>
              </li>
              <li>
                <span className="list-name">
                  Servicio para mascotas mayores a 10 años.
                </span>
              </li>
              <li>
                <span className="list-name">
                  ¡Entrá a ver los detalles del plan y todo lo que incluye!
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section5>

      <div>
        <a href="DetallesDePlanes">
          <div className="d-flex justify-content-center my-5">
            <button className="btn2 fw-bold text-decoration-none">
              ¡ HAZ CLICK AQUÍ PARA CONOCER LOS PLANES QUE TENEMOS PARA TU
              MASCOTA !
            </button>
          </div>
        </a>
      </div>

      <br />

      <section6>
        <h3 className="textoCentral my-5">COMENTARIOS DE CLIENTES</h3>
        <div className="wrapper2">
          <div className="box">
            <i className="fas fa-quote-left quote"></i>
            <p>
              Lorem aliasry ipsum dolor sits ametans, consectetur adipisicing
              elitits. Expedita reiciendis itaque placeat thuratu, quasi yiuos
              repellendus repudiandae deleniti ideas fuga molestiae, alias.
            </p>
            <div className="content">
              <div className="info">
                <div className="name">Julieta Castro</div>
                <div className="date">2:52pm | 20 jun 2023</div>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                </div>
              </div>
              <div className="image">
                <img src="/comentario2.jpg" alt="jpg"></img>
              </div>
            </div>
          </div>
          <div className="box">
            <i className="fas fa-quote-left quote"></i>
            <p>
              Lorem aliasry ipsum dolor sits ametans, consectetur adipisicing
              elitits. Expedita reiciendis itaque placeat thuratu, quasi yiuos
              repellendus repudiandae deleniti ideas fuga molestiae, alias.
            </p>
            <div className="content">
              <div className="info">
                <div className="name">Marcelo Lobos</div>
                <div className="date">8:33pm | 3 marzo 2023</div>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                </div>
              </div>
              <div className="image">
                <img src="/comentario1.jpg" alt="jpg"></img>
              </div>
            </div>
          </div>
          <div className="box">
            <i className="fas fa-quote-left  quote"></i>
            <p>
              Lorem aliasry ipsum dolor sits ametans, consectetur adipisicing
              elitits. Expedita reiciendis itaque placeat thuratu, quasi yiuos
              repellendus repudiandae deleniti ideas fuga molestiae, alias.
            </p>
            <div className="content">
              <div className="info">
                <div className="name">Karina Medina</div>
                <div className="date">9:05am | 2 agosto 2023</div>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="far fa-star"></i>
                </div>
              </div>
              <div className="image">
                <img src="/comentario3.jpg" alt=""></img>
              </div>
            </div>
          </div>
        </div>
      </section6>

      <section className="d-flex justify-content-center my-5">
        <a href="error404">
          <button className="btnStart text-decoration-none">
            <svg
              height="24"
              width="24"
              fill="#FFFFFF"
              viewBox="0 0 24 24"
              data-name="Layer 1"
              id="Layer_1"
              class="sparkle"
            >
              <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
            </svg>
            <span className="text">Ver más comentarios</span>
          </button>
        </a>
      </section>

      <br />
      <br />

      <section7 className="imagDiv">
        <img src="/curva3.png" alt="png"></img>
      </section7>

      <section8 className="imagDiv">
        <img src="/alimento.png" alt="png"></img>
      </section8>

      <section9>
        <div className="slider">
          <div className="slide-track">
            <div className="slide">
              <img src="/a.webp" alt="webp"></img>
            </div>
            <div className="slide">
              <img src="/b.webp" alt="webp"></img>
            </div>
            <div className="slide">
              <img src="/c.webp" alt="webp"></img>
            </div>
            <div className="slide">
              <img src="/d.webp" alt="webp"></img>
            </div>
            <div className="slide">
              <img src="/e.webp" alt="webp"></img>
            </div>
            <div className="slide">
              <img src="/f.webp" alt="webp"></img>
            </div>
            <div className="slide">
              <img src="/g.webp" alt="webp"></img>
            </div>
            <div className="slide">
              <img src="/h.webp" alt="webp"></img>
            </div>
            <div className="slide">
              <img src="/i.webp" alt="webp"></img>
            </div>
            <div className="slide">
              <img src="/j.webp" alt="webp"></img>
            </div>

            <div className="slide">
              <img src="/a.webp" alt="webp"></img>
            </div>
            <div className="slide">
              <img src="/b.webp" alt="webp"></img>
            </div>
            <div className="slide">
              <img src="/c.webp" alt="webp"></img>
            </div>
            <div className="slide">
              <img src="/d.webp" alt="webp"></img>
            </div>
            <div className="slide">
              <img src="/e.webp" alt="webp"></img>
            </div>
            <div className="slide">
              <img src="/f.webp" alt="webp"></img>
            </div>
            <div className="slide">
              <img src="/g.webp" alt="webp"></img>
            </div>
            <div className="slide">
              <img src="/h.webp" alt="webp"></img>
            </div>
            <div className="slide">
              <img src="/i.webp" alt="webp"></img>
            </div>
            <div className="slide">
              <img src="/j.webp" alt="webp"></img>
            </div>
          </div>
        </div>
      </section9>

      <section10>
        <header>
          <h3 className="my-4">PRODUCTOS DESTACADOS</h3>

          <div className="container-icon">
            <div className="container-cart-products hidden-cart">
              <div className="row-product hidden">
                <div className="cart-product"></div>
              </div>
            </div>
          </div>
        </header>
        <div className="container-items">
          <div className="item">
            <figure className="imgCarrito">
              <img src="/1.webp.png" alt="producto" />
            </figure>
            <div className="info-product">
              <h4>Juguete Pez</h4>
              <p className="price">$1100</p>
              <button className="btn-add-cart" onClick={handleOpenModal}>
                COMPRAR
              </button>
            </div>
          </div>
          <div className="item">
            <figure className="imgCarrito">
              <img src="/2.webp.png" alt="producto" />
            </figure>
            <div className="info-product">
              <h4>ProPlan</h4>
              <p className="price">$22760</p>
              <button className="btn-add-cart" onClick={handleOpenModal}>
                COMPRAR
              </button>
            </div>
          </div>
          <div className="item">
            <figure className="imgCarrito">
              <img src="/3.webp.png" alt="producto" />
            </figure>
            <div className="info-product">
              <h4>Artrin X30comp.</h4>
              <p className="price">$4500</p>
              <button className="btn-add-cart" onClick={handleOpenModal}>
                COMPRAR
              </button>
            </div>
          </div>
          <div className="item">
            <figure className="imgCarrito">
              <img src="/4.webp.png" alt="producto" />
            </figure>
            <div className="info-product">
              <h4>Royal Canin Mini</h4>
              <p className="price">$16480</p>
              <button className="btn-add-cart" onClick={handleOpenModal}>
                COMPRAR
              </button>
            </div>
          </div>
          <div className="item">
            <figure className="imgCarrito">
              <img src="/5.webp.png" alt="producto" />
            </figure>
            <div className="info-product">
              <h4>Purina Dental</h4>
              <p className="price">$650</p>
              <button className="btn-add-cart" onClick={handleOpenModal}>
                COMPRAR
              </button>
            </div>
          </div>
          <div className="item">
            <figure className="imgCarrito">
              <img src="/6.webp.png" alt="producto" />
            </figure>
            <div className="info-product">
              <h4>Agility</h4>
              <p className="price">$730</p>
              <button className="btn-add-cart" onClick={handleOpenModal}>
                COMPRAR
              </button>
            </div>
          </div>
        </div>
      </section10>
      <Toaster
  position="bottom-right"
  reverseOrder={false} />
      <ReactModal
        className='ModalContacto'
        ariaHideApp={false}
        isOpen={isModalOpen}
        contentLabel='Ventana Modal de Contacto'
        onRequestClose={handleCloseModal}
      >
        {/* Contenido de la ventana modal */}
<form onSubmit={handleSubmit} className='contacto-form'>
  <h3>Formulario de Contacto</h3>

  <div className='formulario-modal'>
    <label htmlFor='name'>Nombre:</label>
    <input
      maxLength={20}
      className='label-style'
      type='text'
      id='name'
      name='name'
      value={formData.name}
      onChange={handleChange}
      required
    />
  </div>

  <div className='formulario-modal'>
    <label htmlFor='email'>Email:</label>
    <input
      maxLength='35'
      className='label-style'
      type='email'
      id='email'
      name='email'
      value={formData.email}
      onChange={handleChange}
      required
    />
  </div>

  <div className='formulario-modal col-12'>
    <label htmlFor='subject'>Asunto:</label>
    <select
      className='label-style'
      id='subject'
      name='subject'
      value={formData.subject}
      onChange={handleChange}
      required
    >
      <option value='general'>General</option>
      <option value='compra'>Compra</option>
      <option value='detallesPlanes'>Detalles de Planes</option>
    </select>
  </div>

  <div className='formulario-modal form-group-textarea'>
    <label htmlFor='message'>Mensaje:</label>
    <textarea
      maxLength='120'
      className='label-style'
      id='message'
      name='message'
      value={formData.message}
      onChange={handleChange}
      required
    />
  </div>

  

  <div className='formulario-modal col-12'id='flex-direct'>
    <button type='submit' className='label-style button1 col-4'>Enviar</button>
    <button onClick={handleCloseModal} className='label-style button1 col-4'>Cerrar</button>
  </div>
</form>

      </ReactModal>
    </div>
  );
};

export default Home;
