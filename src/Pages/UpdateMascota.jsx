import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import { API_URL } from "../common/constants";

function UpdateMascota() {
  const params = useParams();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(undefined);

  const [formValues, setFormValues] = useState({
    nombre: "",
    raza: "",
    especie: "",
  });

  
  const handleChangeValues = (event) => {
    const { name, value } = event.target;
  
    // Expresión regular para permitir solo letras y espacios en blanco
    const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]*$/;
  
    if (regex.test(value) || value === "") {
      // Actualizar el estado con el nuevo valor si cumple con la expresión regular
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const getPacienteById = async () => {
    var requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        API_URL + "/paciente/find-by-id/" + params.id,
        requestOptions
      );
      if (!response.ok) throw new Error("No se pudo buscar el paciente");

      const result = await response.json();
      setPaciente(result.data);
      setFormValues(result.data); // Establecer los valores iniciales de los campos
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPaciente = async () => {
    if (!params?.id) return undefined;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      nombre: formValues.nombre,
      especie: formValues.especie,
      raza: formValues.raza,
    });

    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        API_URL + "/paciente/update-by-id/" + params?.id,
        requestOptions
      );
      const result = await response.json();
      navigate(-1);
      alert("Paciente actualizado");
    } catch {
      alert("No se pudo actualizar");
    }
  };

  useEffect(() => {
    getPacienteById();
  }, []);

  return (
    <div>
      <h1 className="text-center mt-2">Actualizar Datos de: {paciente?.nombre}</h1>
      <Container>
        <Form
          id="addPatientForm"
          className="border border-warning p-3 rounded border-2"
        >
          <Row className="mb-3">
            <h3 className="text-start">Datos de la mascota</h3>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Nombre de la mascota</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formValues.nombre}
                onChange={handleChangeValues}
                maxLength={15}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Raza</Form.Label>
              <Form.Control
                type="text"
                name="raza"
                value={formValues.raza}
                onChange={handleChangeValues}
                maxLength={15}
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Especie</Form.Label>
              <Form.Control
                type="text"
                name="especie"
                value={formValues.especie}
                onChange={handleChangeValues}
                maxLength={15}
              />
            </Form.Group>
          </Row>
          <Button className="btn-warning" onClick={handleEditPaciente}>
            Modificar Datos
          </Button>
          <Button className="btn-warning" onClick={() => navigate(-1)}>
            Volver
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default UpdateMascota;
