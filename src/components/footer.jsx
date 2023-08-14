import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import "../styles/styleNavBar.css";
import logoNav from "../../src/img/logonavbar.png";

const Footer = () => {
  return (
    <footer className="nav-bg text-light justify-content-center zIndexFooter ">
      <Container fluid>
        <Row className="text-center">
          <Col xs={12} md={3} className="border-end">
            <Image
              src={logoNav}
              alt="logo"
              className="my-1 me-0 imgFooter"
            />
          </Col>
          <Col xs={12} md={3} className="border-end">
            <h5 className="my-1">Nuestras Redes</h5>

            <a href="">
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-brand-instagram"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="#ffffff"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                  <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                  <path d="M16.5 7.5l0 .01" />
                </svg>
              </p>
            </a>
            <a href="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-brand-facebook"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="#ffffff"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
              </svg>
            </a>
          </Col>
          <Col xs={12} md={3} className="border-end">
            <h5 className="my-2">Ubicación</h5>
            <p>Manantial</p>
          </Col>
          <Col xs={12} md={3}>
            <h5 className="my-2">Teléfonos</h5>
            <p>Teléfono 1: 3816529520</p>
            <p>Teléfono 2: 3817623407</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-center">
              Todos los derechos reservados &copy; {new Date().getFullYear()}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
