import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';






function NavbarComponent() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary w-100" bg="dark" data-bs-theme="dark">
      <Container fluid className="w-100">
        <Navbar.Brand as={Link} to="/Home">PataSana</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Home">Home</Nav.Link>
            <NavDropdown title="Administración" id="basic-nav-dropdown" className="justify-content-end">
              <NavDropdown.Item as={Link} to="/Admin-turnos">Turnos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Admin-pacientes">Pacientes</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Nav.Link as={Link} to="/signin">
          <Button variant="outline-warning mx-2">Iniciar Sesión</Button>
        </Nav.Link>
        <Nav.Link as={Link} to="/signup">
          <Button variant="outline-warning mx-2">Registrarse</Button>
        </Nav.Link>
      </Container>
    </Navbar>
  
  );
}

export default NavbarComponent;