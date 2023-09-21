import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "../../styles/styleNavBar.css";
import Image from "react-bootstrap/Image";
import LogoutButton from "../../Pages/Logout";

function NavbarComponent({ jwt = "" }) {


  return (
    <Navbar
      expand="lg"
      className="nav-bg w-100 font-navbar zIndex"
      data-bs-theme="dark"
    >
      <Container fluid className="w-100">
        <Navbar.Brand as={Link} to="/Home" className="mx-3">
          <Image src="/logonavbar.png" alt="logo" className="imgNavbar" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="nav-bg" />
        <Navbar.Collapse id="basic-navbar-nav" className="nav-bg">
          <Nav className="nav-bg me-auto">
            <Nav.Link as={Link} to="/Home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/Acerca-de-nosotros">
              Acerca de Nosotros
            </Nav.Link>
            <Nav.Link as={Link} to="/Register">
              Registrarse
            </Nav.Link>
            <Nav.Link as={Link} to="/DetallesDePlanes">
              Detalles de planes
            </Nav.Link>
            {jwt?.length === 0 ? (
              <Nav.Link as={Link} to="/login">
                Iniciar Sesión
              </Nav.Link>
            ) : (
              <NavDropdown
                title="Administración"
                id="basic-nav-dropdown"
                className="nav-bg"
              >
                <NavDropdown.Item
                  as={Link}
                  to="/AdminPacientes"
                  className="nav-bg"
                >
                  Pacientes
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          {jwt?.length > 0 && <LogoutButton />}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
