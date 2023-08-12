import React from "react";
import "../styles/styleAboutUs.css";
import vComp from "../assets/videoComp.mp4";
// import mComp from "../assets/strangerThings.mp3";
// import m2Comp from "../assets/music.mp3";


function AcercaDeNosotros() {


  return (
    <div>

      <div>
        {/* <!-- video --> */}



        <video src={vComp} autoPlay loop muted></video>



        {/* <audio src={mComp} autoPlay loop></audio> */}

        {/* <audio src={m2Comp} autoPlay loop></audio> */}

        <div className="padre m-5">
          <div className="hijo"></div>

          {/* hijo 1 */}
          <h1 className="text-center pt-3 text-warning display-2 fw-normal acerca mx-2 acerca-h1">
            Acerca de nosotros
          </h1>


          {/* hijo 2 */}
          {/* <!-- fila 1 FOTOS --> */}
          <div className="container-fluid py-3 text-white">
            <div className="row col-12 mb-2 mx-auto pb-5 row-fotos rounded fila-fotos">
              <div className="col-10  col-sm-8 col-md-6 col-lg-4 container-fluid text-center mt-5 primera-fila-fotos juan">
                <img
                  className="img-fluid rounded-circle"
                  src="/juan.jpg"
                  alt="foto de Juan Durso"
                />
                <p className="nombres h6 mt-2">
                  Juan Durso{" "}
                  <span className="juan">
                    <i>scrum-master</i>
                  </span>
                </p>
              </div>

              <div className="col-10 col-sm-8 col-md-6 col-lg-4 container-fluid text-center mt-5 mx-auto primera-fila-fotos">
                <img
                  className="img-fluid rounded-circle"
                  src="/fabian.jpg"
                  alt="foto de Fabian Brizuela"
                />
                <p className="nombres h6 mt-2">Fabián Brizuela</p>
              </div>

              <div className="col-10 col-sm-8 col-md-6 col-lg-4 container-fluid text-center mt-5 primera-fila-fotos">
                <img
                  className="img-fluid rounded-circle"
                  src="/nacho.jpg"
                  alt="foto de Nacho Castro"
                />
                <p className="nombres h6 mt-2">Nacho Castro</p>
              </div>

              <div className="col-10 col-sm-8 col-md-6 col-lg-4 container-fluid text-center mt-5 tres-ultimas-fotos">
                <img
                  className="img-fluid rounded-circle"
                  src="/mariano.jpg"
                  alt="foto de Mariano Ghidara"
                />
                <p className="nombres h6 mt-2">Mariano Ghidara</p>
              </div>

              <div className="col-10 col-sm-8 col-md-6 col-lg-4 container-fluid text-center mt-5 tres-ultimas-fotos">
                <img
                  className="img-fluid rounded-circle"
                  src="/conty.jpg"
                  alt="foto de Constanza López"
                />
                <p className="nombres h6 mt-2">Constanza López</p>
              </div>

              <div className="col-10 col-sm-8 col-md-6 col-lg-4 container-fluid text-center mt-5 tres-ultimas-fotos">
                <img
                  className="img-fluid rounded-circle"
                  src="/santiago.jpg"
                  alt="foto de Santiago Mamaní"
                />
                <p className="nombres h6 mt-2">Santiago Mamaní</p>
              </div>
            </div>
          </div>

          {/* hijo 3 */}
          {/* <!-- fila 2 TEXTOS --> */}
          <div className="container pt-3 pb-5 text-center container-texto">
            <div className="row">
              <div className="col-12">
                <div className="texto text-warning">
                  <h2 className="text-center">Acerca de Nosotros</h2>
                  <br />

                  <div className="parrafos mx-auto">
                    {/* <p>
                            Hola! Somos un grupo de estudiantes de desarrollo de software y
                          estamos trabajando en la creación de una página de gastronomía en
                          Tucumán. El objetivo principal de nuestro proyecto es ofrecer a
                          los usuarios una plataforma donde puedan encontrar información
                          sobre restaurantes, platos típicos y otros aspectos relacionados
                          con la gastronomía. Para lograr este objetivo, hemos identificado
                          las necesidades y gustos de los diferentes clientes y con ello
                          clasificamos los lugares en Cervecerías, Cafeterías, Restaurantes,
                          Comida al paso, Bares Temáticos
                        </p> */}
                    <p className="text-center">
                      Hola! Somos <span className="span-webPets"><b>Web Pets!</b></span> Alumnos de la Comisión 47i
                      del curso <b>"Full Stack"</b> que dicta la academia{" "}
                      <b>Rolling Code School</b> en la provincia de Tucumán,
                      Argentina, y éste es nuestro <b>Proyecto Final</b> de
                      finalización del curso!
                    </p>
                  </div>

                  <div className="parrafos mx-auto">
                    <p>
                      Para el mismo, elegimos crear un sitio web perteneciente a
                      una <b>VETERINARIA</b> y tuvimos que implementar todos los
                      conceptos aprendidos durante el dictado de clases:{" "}
                      <i>
                        HTML, CSS, Bootstrap, Javascript, React, Express,
                        Nodejs, MongoDB, entre otros.
                      </i>
                    </p>
                  </div>

                  {/* <div className='parrafos mx-auto'>
                        <ul className='ul mx-auto'>
                          <li>HTML</li>
                          <li>CSS</li>
                          <li>Bootstrap</li>
                          <li>Javascript</li>
                          <li>React</li>
                          <li>Express</li>
                          <li>Nodejs</li>
                          <li>MongoDB</li>
                        </ul>
                      </div> */}

                  <div className="parrafos mx-auto">
                    <p>
                      El <b>FrontEnd</b> fue realizado con React y
                      React-Boostrap, y el <b>BackEnd</b> con node.js, express y
                      MongoDB, como lo exigían los requerimientos.
                    </p>
                  </div>

                  <div className="parrafos mx-auto">
                    <p>
                      Se diseñó de manera <b>responsive</b>, para que la
                      interfaz visual se adapte a los distintos tipos de
                      pantalla (celulares, tablets, PCs, Televisores).
                    </p>
                  </div>

                  <div className="parrafos mx-auto">
                    <p>
                      Utilizamos las tecnologías <b>GIT y GITHUB</b> para el
                      trabajo colaborativo del código, y el panel de{" "}
                      <b>Trello</b> y la metodología <b>Scrum</b> para organizar
                      el trabajo en equipo. Juan Durso fue nuestro scrum-master!
                    </p>
                  </div>

                  <div className="parrafos mx-auto">
                    <p>
                      Agradecemos a nuestro mentor José Puente Scapolatempo y a
                      nuestro tutor Juan Lara por toda la dedicación y enseñanza
                      brindadas durante el cursado.
                    </p>
                  </div>

                  <div className="parrafos mx-auto mt-4">
                    <p>Esperemos que les haya gustado! Hasta la próxima!!</p>
                  </div>

                  <div className="parrafos mx-auto mt-5">
                    <p>Agosto de 2023. Todos los derechos reservados ©</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcercaDeNosotros;
