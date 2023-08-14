import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import '../../styles/styleNavBar.css';
import Image from 'react-bootstrap/Image';






function NavbarComponent() {
  return (
    <Navbar expand="lg" className="nav-bg w-100 font-navbar zIndex"  data-bs-theme="dark">
      <Container fluid className="w-100">
        <Navbar.Brand as={Link} to="/Home" className='mx-3'>
          <Image src="/logonavbar.png" alt="logo"  className="imgNavbar"   /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="nav-bg"/>
        <Navbar.Collapse id="basic-navbar-nav" className="nav-bg">
          <Nav className="nav-bg me-auto" >
            <Nav.Link as={Link} to="/Home">Home</Nav.Link>
            <Nav.Link as={Link} to="/Acerca-de-nosotros">Acerca de Nosotros</Nav.Link>
            <NavDropdown title="Administración" id="basic-nav-dropdown" className="nav-bg">
              <NavDropdown.Item as={Link} to="/AdminPacientes" className="nav-bg">Pacientes</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Nav.Link as={Link} to="/login">
          <Button variant="outline-warning mx-2">Iniciar Sesión</Button>
        </Nav.Link>
        <Nav.Link as={Link} to="/Register">
          <Button variant="outline-warning mx-2">Registrarse</Button>
        </Nav.Link>
        <Nav.Link as={Link} to="/DetallesDePlanes">
          <Button variant="outline-warning mx-2">DetallesDePlanes</Button>
        </Nav.Link>
      </Container>
    </Navbar>
  
  );
}

export default NavbarComponent;