import {React, useState} from 'react'
import "../styles/login.css";
import { Container, Form, Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';



const Login = () => {
  //ESTADOS
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // HANDLE
  const handleLogin = () => {
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

    fetch("http://localhost:8000/auth/login", requestOptions)
      .then((response) => response.json())
      .then((result) => changeJwt(result.access_token))
      .catch((error) => console.log("error", error));
  };

  // LOGOUT
  const handleLogout = () => {
    changeJwt("")
  }



  return (
    <div className='div-padre'>
      <Container className='py-4'>

        <h1 className='text-warning text-center'>Iniciar sesión</h1>

        <Container className='container-b'>

        <Form>

          <Form.Group className="mt-5 mb-3" controlId="formBasicEmail">
            <Form.Label className='text-white mb-1 labels'>Nombre de usuario:</Form.Label>
            <Form.Control
              className='inputs' 
              style={{ fontStyle: 'italic', color: 'gray' }}
              type="text" 
              placeholder="ingrese su nombre de usuario"
              minLength={5}
              maxLength={20}
              required
              value={username}
              onChange={(event)=> {
                setUsername(event.target.value)
              }}
              />
          </Form.Group>

          <Form.Group className="mt-5 mb-3" controlId="formBasicPassword">
            <Form.Label className='text-white mb-1 text-start labels'>Contraseña:</Form.Label>
            <Form.Control
              className='inputs' 
              style={{ fontStyle: 'italic', color: 'gray' }}
              type="password" 
              placeholder="ingrese su contraseña"
              minLength={8}
              required
              value={password}
              onChange={(event)=> {
                setPassword(event.target.value)
              }} 
              />
          </Form.Group>

          <Nav.Link href="/Error404">
            <p className='text-white mt-5 text-center'>Olvidaste tu contraseña? haz click aquí</p>
          </Nav.Link>

          <Button
            className='mt-5 mb-4 d-block mx-auto' 
            variant="primary" 
            type="submit"
            onClick={handleLogin}
            >
            Iniciar sesión
          </Button>

          <Button
            className='mt-5 mb-4 d-block mx-auto' 
            variant="primary" 
            type="submit"
            onClick={handleLogout}
            >
            Cerrar sesión
          </Button>

        </Form>

        </Container>

      </Container>


    </div>
  )
}


export default Login;