import React from 'react';
import '../styles/styleHome.css';


window.addEventListener('load', () => {
  let lon;
  let lat;

  let temperaturaValor = document.getElementById('temperatura-valor');
  let temperaturaDescripcion = document.getElementById('temperatura-descripcion');

  let ubicacion = document.getElementById('ubicacion');
  let iconoAnimado = document.getElementById('icono-animado');

  let vientoVelocidad = document.getElementById('viento-velocidad');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(posicion => {
      lon = posicion.coords.longitude;
      lat = posicion.coords.latitude;

      const url = `https://api.openweathermap.org/data/2.5/weather?q=Tucuman&appid=6463c6716417643cce6e88a52ee48649`;

      fetch(url)
        .then(response => {
          return response.json();
        })
        .then(data => {
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
            case 'Thunderstorm':
              iconoAnimado.src = 'src/animated/thunder.svg';
              console.log('TORMENTA');
              break;
            case 'Drizzle':
              iconoAnimado.src = 'src/animated/rainy-2.svg';
              console.log('LLOVIZNA');
              break;
            case 'Rain':
              iconoAnimado.src = 'src/animated/rainy-7.svg';
              console.log('LLUVIA');
              break;
            case 'Snow':
              iconoAnimado.src = 'src/animated/snowy-6.svg';
              console.log('NIEVE');
              break;
            case 'Clear':
              iconoAnimado.src = 'src/animated/day.svg';
              console.log('LIMPIO');
              break;
            case 'Atmosphere':
              iconoAnimado.src = 'src/animated/weather.svg';
              console.log('ATMOSFERA');
              break;
            case 'Clouds':
              iconoAnimado.src = 'src/animated/cloudy-day-1.svg';
              console.log('NUBES');
              break;
            default:
              iconoAnimado.src = 'src/animated/cloudy-day-1.svg';
              console.log('por defecto');
          }
        })
        .catch(error => {
          console.log(error);
        });
    });
  }
});



let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');

iconCart.addEventListener('click', function(){
    if(cart.style.right == '-100%'){
        cart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    }else{
        cart.style.right = '-100%';
        container.style.transform = 'translateX(0)';
    }
})
close.addEventListener('click', function (){
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)';
})


let products = null;
// obtengo datos de json
fetch('product.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
})

//muestra el producto de datos en la lista 
function addDataToHTML(){
    // elimina los datos predeterminados de HTML
    let listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = '';

    // agregar nuevas datos
    if(products != null) // si tiene datos

    {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML = 
            `<img src="src/${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>
            <button onclick="addCart(${product.id})">COMPRAR</button>`;

            listProductHTML.appendChild(newProduct);

        });
    }
}
//usa una cookie para que el carrito no se pierda al actualizar la página


let listCart = [];
function checkCart(){
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }else{
        listCart = [];
    }
}
checkCart();
function addCart($idProduct){
    let productsCopy = JSON.parse(JSON.stringify(products));
    // si este producto no esta en el carrito
    if(!listCart[$idProduct]) 
    {
        listCart[$idProduct] = productsCopy.filter(product => product.id == $idProduct)[0];
        listCart[$idProduct].quantity = 1;
    }else{
        //si este producto ya esta en el carrito
        //aumeto cantidad
        listCart[$idProduct].quantity++;
    }
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

    addCartToHTML();
}
addCartToHTML();
function addCartToHTML(){
    // borrar datos por defecto
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';

    let totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;
    // si tiene producto en el carrito
    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                    `<img src="${product.image}">
                    <div class="content">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price} / 1 product</div>
                    </div>
                    <div class="quantity">
                        <button onclick="changeQuantity(${product.id}, '-')">-</button>
                        <span class="value">${product.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, '+')">+</button>
                    </div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
            }
        })
    }
    totalHTML.innerText = totalQuantity;
}
function changeQuantity($idProduct, $type){
    switch ($type) {
        case '+':
            listCart[$idProduct].quantity++;
            break;
        case '-':
            listCart[$idProduct].quantity--;

            // si la cantidad <= 0 entonces elimina el producto del carrito
            if(listCart[$idProduct].quantity <= 0){
                delete listCart[$idProduct];
            }
            break;
    
        default:
            break;
    }
    // guardar nuevos datos en la cookie
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
    //  recargar el carrito de vista html
    addCartToHTML();
}



const Home = () => {
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
              <button className="btn">CONOCE MÁS</button>
              <button className="btn">SUCURSALES</button>
            </div>
          </div>
          <div className="col-lg-6 my-5">
            <img src="src/img/website-images/images/hero.png" alt="heroImg" className="hero_img"/>
          </div>
          </div>
        </div>
        <img src="src/img/website-images/images/bg-bottom-hero.png" alt="png" className="curveImg" />
      </section>
  </main>

  <div id="contenedor">
        <div id="caja1">
            <h1 id="temperatura-valor" className='fs-2'></h1>
            <h2 id="temperatura-descripcion" className='fs-4'></h2>
        </div>
        <div id="caja2">
            <h2 id="ubicacion" className='fs-4'></h2>
            <img id="icono-animado" src="" alt="" height="150" width="150"></img>
        </div>
        <div id="caja3">
            <h3 className='fs-4'>Velocidad del Viento</h3>
            <h1 id="viento-velocidad" className='fs-2'></h1>
        </div>
  </div>

  <section2>
    <div className="wrapper">
      <div className="box">
         <div className="front-face">
            <div className="icon img">
               <img src="src/img/iconoCirugia.png" alt="png"></img>
            </div>
            <span>SERVICIOS: Clínica y Cirugías</span>
         </div>
         <div className="back-face">
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
          <h3 className="especialista fs-5">Doctora Carmen Brizuela</h3>
          <p className="especialista">Especialista en Cardiología y Clínica</p>
      </div>
      <div className="animation-show">
          <img src="src/img/10.png"></img>
          <h3 className="especialista fs-5">Doctor Rodrigo Ponce</h3>
          <p className="especialista">Especialista en Cirugías</p>
      </div>
      <div className="animation-show">
          <img src="src/img/11.png"></img>
          <h3 className="especialista fs-5">Doctora Daniela Díaz</h3>
          <p className="especialista">Especialista en Medicina Preventiva</p>
      </div>
      <div className="animation-show">
          <img src="src/img/12.png"></img>
          <h3 className="especialista fs-5">Doctor Leandro Martínez</h3>
          <p className="especialista">Especialista en Laboratorio</p>
      </div>
    </div>
  </section3>

  <section4 className="imagDiv">
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

  <section5 className="imagDiv">
      <img src="src/img/alimento.png" alt="png"></img>
  </section5>

  <section6 className="imagDiv">
       <img src="src/img/curva3.png" alt="png"></img>
  </section6>

  <section7>
  <div className="containerCarrito">
      <header className="fondo">
          <h3>PRODUCTOS DESTACADOS</h3>
          <div className="iconCart">
            <img src="src/img/icono-carrito.png"></img>
            <div className="totalQuantity">0</div>
          </div>
      </header>

      <div className="listProduct">
        <div className="item">
            <img src="src/img/1.webp.png" alt=""></img>
            <h2>CoPilot / Black / Automatic</h2>
            <div className="price">$550</div>
            <button>Añadir</button>
        </div>
      </div>
    </div>
  <div className="cart">
    <h2>
        CARRITO
    </h2>
    <div className="listCart">
        <div className="item">
            <img src="src/img/1.webp.png"></img>
            <div className="content">
                <div className="name">CoPilot / Black / Automatic</div>
                <div className="price">$550 / 1 product</div>
            </div>
            <div className="quantity">
                <button>-</button>
                <span className="value">3</span>
                <button>+</button>
            </div>
        </div>
    </div>
    <div className="buttons">
        <div className="close">
            CERRAR
        </div>
        <div className="checkout">
            <a href="checkout.html">COMPRAR</a>
        </div>
    </div>
  </div>
  </section7>






</div>
  )
}

export default Home
