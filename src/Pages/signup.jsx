import React, { useState } from "react";
import "../styles/styleSignUp2.css";
import { Container, Form, Button} from "react-bootstrap";

const SignUp = () => {
  //ESTADOS
  const [apellido, setApellido] = useState("");
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  //ESTADOS - VALIDACION DNI
  const [isValid, setIsValid] = useState(true)

  //FUNCIONES

  //HANDLERS
  const handleChangeApellido = (event) => {
    setApellido(event.target.value);
  };

  const handleChangeNombre = (event) => {
    setNombre(event.target.value);
  };

  const handleChangeDni = (event) => {
    // setDni(event.target.value);
    const inputValue = event.target.value;
    const numericPattern = /^[0-9]*$/;

    if (numericPattern.test(inputValue)) {
      setDni(inputValue);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleChangeUserName = (event) => {
    setUserName(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeRepeatPassword = (event) => {
    setRepeatPassword(event.target.value);
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();

    if (password !== repeatPassword) {
      alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
    } else {
      alert("Te has registrado con éxito!");
      setApellido("");
      setNombre("");
      setDni("");
      setUserName("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");
    }
  };

  return (
    <div className="div-padre">
      <Container className="py-1 pb-3 container-1">
        <h1 className="text-warning text-center mt-3 titulo-h1">Registro</h1>
        <div className="text-center">
          <p className="p-asterisco px-1">
            <i>
              <sup>(*)</sup> Todos los campos son obligatorios
            </i>
          </p>
        </div>

        <Container className="container-2">
          <Form className="form" onSubmit={handleRegisterSubmit}>
            <Form.Group className="mt-5 mb-3" controlId="formBasicEmail">
              <Form.Label className="text-white mb-1 labels">
                Apellido:
              </Form.Label>
              <Form.Control
                type="text"
                style={{ fontStyle: "italic", color: "gray" }}
                // placeholder="Apellido"
                minLength={2}
                maxLength={30}
                required
                value={apellido}
                onChange={handleChangeApellido}
              />
            </Form.Group>

            <Form.Group className="mt-4 mb-3" controlId="formBasicEmail">
              <Form.Label className="text-white mb-1 labels">
                Nombre:
              </Form.Label>
              <Form.Control
                type="text"
                style={{ fontStyle: "italic", color: "gray" }}
                // placeholder="Nombre"
                minLength={3}
                maxLength={30}
                required
                value={nombre}
                onChange={handleChangeNombre}
              />
            </Form.Group>

            {/* <Form.Group className="mt-4 mb-3" controlId="formBasicEmail">
              <Form.Label className="text-white mb-1 labels">DNI:</Form.Label>
              <Form.Control
                type="text"
                style={{ fontStyle: "italic", color: "gray" }}
                placeholder="Ingrese su dni sin puntos"
                minLength={7}
                maxLength={8}
                required
                value={dni}
                onChange={handleChangeDni}
              />
            </Form.Group> */}

            <Form.Group className="mt-4 mb-3" controlId="dni">
              <Form.Label className="text-white mb-1 labels">DNI:</Form.Label>
              <Form.Control
                type="text"
                style={{ fontStyle: "italic", color: "gray" }}
                placeholder="Ingrese su dni sin puntos"
                minLength={7}
                maxLength={8}
                required
                value={dni}
                onChange={handleChangeDni}
                isInvalid={!isValid}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, ingresa solo números.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mt-4 mb-3" controlId="formBasicEmail">
              <Form.Label className="text-white mb-1 labels">
                Nombre de usuario:
              </Form.Label>
              <Form.Control
                type="text"
                style={{ fontStyle: "italic", color: "gray" }}
                // placeholder="ingrese su nombre de usuario"
                minLength={5}
                maxLength={20}
                required
                value={userName}
                onChange={handleChangeUserName}
              />
              <Form.Text className="text-white" style={{ fontStyle: "italic" }}>
                * debe poseer un mínimo de 5 caracteres
              </Form.Text>
            </Form.Group>

            <Form.Group className="mt-4 mb-3" controlId="formBasicEmail">
              <Form.Label className="text-white mb-1 labels">
                E-mail:
              </Form.Label>
              <Form.Control
                type="email"
                style={{ fontStyle: "italic", color: "gray" }}
                placeholder="email@example.com"
                maxLength={30}
                value={email}
                onChange={handleChangeEmail}
                required
              />
            </Form.Group>

            <Form.Group className="mt-4 mb-3" controlId="formBasicPassword">
              <Form.Label className="text-white mb-1 text-start labels">
                Contraseña:
              </Form.Label>
              <Form.Control
                type="password"
                style={{ fontStyle: "italic", color: "gray" }}
                placeholder="ingrese su contraseña"
                minLength={8}
                required
                value={password}
                onChange={handleChangePassword}
              />
              <Form.Text className="text-white" style={{ fontStyle: "italic" }}>
                * debe poseer un mínimo de 8 caracteres
              </Form.Text>
            </Form.Group>

            <Form.Group className="mt-4 mb-3" controlId="formBasicPassword">
              <Form.Label className="text-white mb-1 text-start labels">
                Repita su contraseña:
              </Form.Label>
              <Form.Control
                type="password"
                style={{ fontStyle: "italic", color: "gray" }}
                placeholder="ingrese su contraseña"
                minLength={8}
                required
                value={repeatPassword}
                onChange={handleChangeRepeatPassword}
              />
            </Form.Group>

            <Button
              className="mt-5 mb-4 mx-auto d-block submit-button"
              variant="primary"
              type="submit"
            >
              Registrarse
            </Button>
          </Form>
        </Container>
      </Container>
    </div>
  );
};

export default SignUp;
