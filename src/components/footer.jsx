import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5">
      <Container>
        <Row>
          <Col xs={12} md={4}>
            <h5>Redes Sociales</h5>
            <ul>
              <li>Facebook</li>
              <li>Instagram</li>
            </ul>
          </Col>
          <Col xs={12} md={4}>
            <h5>Ubicación</h5>
            <p>Manantial</p>
          </Col>
          <Col xs={12} md={4}>
            <h5>Teléfonos</h5>
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
