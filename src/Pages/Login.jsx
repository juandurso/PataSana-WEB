import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { Container, Form, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { API_URL } from "../common/constants";

const Login = ({ changeJwt = () => {} }) => {
  //ESTADOS
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);
  // const [buttonMarginTop, setButtonMarginTop] = useState(48);

  // HANDLE LOGIN

  const handleLogin = async (event) => {
    // Prevent default
    event.preventDefault();

    // Postman (snippet code)
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      username: username,
      password: password,
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(API_URL + "/auth/login", requestOptions);

      if (!response.ok) throw new Error("No se pudo iniciar session");

      const data = await response.json();

      changeJwt(data?.access_token);
      localStorage.setItem("token", data?.access_token);
      navigate("/AdminPacientes");
    } catch {
      // alert("No se pudo iniciar sesion");
      setIncorrectCredentials(true);
      // setButtonMarginTop(30);
      setUsername("");
      setPassword("");
    }
  };

  // LOGOUT
  const handleLogout = () => {
    changeJwt("");
  };

  return (
    <div className="div-padre">
      <Container className="py-4">
        <h1 className="text-warning text-center titulo">Iniciar sesión</h1>

        <Container className="container-b">
          <Form onSubmit={handleLogin}>
            <Form.Group className="mt-5 mb-3" controlId="formBasicEmail">
              <Form.Label className="mb-1 labels">
                Nombre de usuario:
              </Form.Label>
              <Form.Control
                className="inputs"
                type="text"
                required
                value={username}
                onChange={(event) => {
                  const newUsername = event.target.value.slice(0, 20);
                  setUsername(newUsername);
                }}
              />
            </Form.Group>

            <Form.Group className="mt-5 mb-1" controlId="formBasicPassword">
              <Form.Label className="mb-1 labels">Contraseña:</Form.Label>
              <Form.Control
                className="inputs"
                type="password"
                required
                value={password}
                onChange={(event) => {
                  const newPassword = event.target.value.slice(0, 20);
                  setPassword(newPassword);
                }}
              />
            </Form.Group>

            <div className="error-button-container mx-auto">
              <p
                className={`text-danger text-center mensajeError ${
                  incorrectCredentials ? "active" : ""
                }`}
              >
                Las credenciales de acceso son incorrectas
              </p>

              <Button
                className="mb-4 d-block mx-auto boton"
                variant="primary"
                type="submit"
              >
                Iniciar sesión
              </Button>
            </div>

            <Nav.Link href="/Error404">
              <p className="mt-5 text-center olvidaste">
                Olvidaste tu contraseña?
              </p>
            </Nav.Link>
          </Form>
        </Container>
      </Container>
    </div>
  );
};

export default Login;
