import "../styles/styleAdminTurnos.css";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

const Adminturnos = () => {
  // ESTADOS:

  const [turnos, setTurnos] = useState([]);

  // FUNCIONES:

  const getAllTurnos = async () => {
    let requestOptions = {
      method: "GET",
    };

    const response = await fetch();

    if (response.status >= 400)
      return alert("No se puedieron obtener los turnos");

    const result = await response.json();

    setTurnos(result.data);
  };

  // HANDLERS:

  // useEffects

  useEffect(() => {
    getAllTurnos(), [];
  });

  return (
    <div className="div-padre">
      <Container className="container-padre pt-3 pb-3 px-4">
        <h1 className="text-center mb-4">Administrar turnos</h1>

        <Form className="px-4 pt-3 formTurnos">
          <div className="mb-3 rows">
            <h5>Dueño:</h5>
            {/* <Form.Label>Dueño</Form.Label> */}

            <Form.Group controlId="formGridAddress1">
              <Form.Label className="mb-1">Apellido</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>

            <Form.Group controlId="formGridAddress1">
              <Form.Label className="mb-1">Nombre</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
          </div>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label className="mb-1">Nombre de la Mascota:</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>

          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
              <Form.Label className="mb-1">Fecha Turno</Form.Label>
              <Form.Control type="date" placeholder="" />
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
              <Form.Label className="mb-1">Hora Turno</Form.Label>
              <Form.Control type="time" placeholder="" />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label className="mb-1">Veterinario:</Form.Label>
            <Form.Control type="text" placeholder="" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label className="mb-1">Detalle de cita:</Form.Label>
            <Form.Control as="textarea" placeholder="" />
          </Form.Group>

          <div className="text-center">
            <Button variant="primary" type="submit">
              Generar Turno
            </Button>
          </div>
        </Form>
      </Container>
      <Table className="mt-5" striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Mascota</th>
            <th>Fecha Turno</th>
            <th>Hora Turno</th>
            <th>Veterinario</th>
            <th>acciones</th>
          </tr>
        </thead>
        <tbody>
          {turnos.map((turno) => {
            <tr key={turno._id}>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>;
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Adminturnos;
