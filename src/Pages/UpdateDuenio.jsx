import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

function UpdateDuenio() {
  const navigate = useNavigate();
  const params = useParams();

  const [duenio, setDuenio] = useState(undefined);
  const [formValues, setFormValues] = useState({
    dni: '',
    nombre: '',
    apellido: '',
    telefono: '',
    email: ''
  })

  const handleChangeValues = (event) => {
    const { name, value } = event.target

    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const handleEditDuenio = async () => {
    if (!params?.id) return undefined;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      dni: !!formValues.dni ? formValues.dni : undefined,
      nombre: !!formValues.nombre ? formValues.nombre : undefined,
      apellido: !!formValues.apellido ? formValues.apellido : undefined,
      telefono: !!formValues.telefono ? formValues.telefono : undefined,
      email: !!formValues.email ? formValues.email : undefined,
    });

    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:8000/duenio/update-by-id/" + params?.id,
        requestOptions
      );
      const result = await response.json();
      navigate(-1)
      alert('Duenio actualizado')
    } catch {
      alert("No se pudo actualizar")
    }
  };

  const getDuenioById = async () => {
    var requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        "http://localhost:8000/duenio/find-by-id/" + params.id,
        requestOptions
      );
      if (!response.ok) throw new Error("No se pudo buscar el duenio");

      const result = await response.json();
      setDuenio(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Al iniciar mi aplicacion traigo todos los dueños para que aparezcan en mi pantalla
  useEffect(() => {
    getDuenioById();
  }, []);

  return (
    <>
      <h1>Modifique datos</h1>

      <Form
        id="addPatientForm"
        className="border border-warning p-3 rounded border-2 "
      >
        <Row className="mb-3">
          <h3 className="text-start">Datos del dueño</h3>
          <Form.Group as={Col} md="6" controlId="validationCustom11">
            <Form.Label>DNI</Form.Label>
            <Form.Control
              type="text"
              name="dni"
              placeholder={duenio?.dni}
              value={formValues.dni}
              onChange={handleChangeValues}
              maxLength={15}
            />
            <Form.Control.Feedback type="invalid">
              Olvidaste poner el DNI.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Nombre del dueño</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              placeholder={duenio?.nombre}
              value={formValues.nombre}
              onChange={handleChangeValues}
              maxLength={15}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Apellido del Dueño</Form.Label>
            <Form.Control
              type="text"
              name="apellido"
              placeholder={duenio?.apellido}
              value={formValues.apellido}
              onChange={handleChangeValues}
              maxLength={15}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Número de Celular</Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              placeholder={duenio?.telefono}
              value={formValues.telefono}
              onChange={handleChangeValues}
              maxLength={15}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Mail</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                name="email"
                placeholder={duenio?.email}
                aria-describedby="inputGroupPrepend"
                value={formValues.email}
                onChange={handleChangeValues}
                maxLength={64}
              />
            </InputGroup>
          </Form.Group>
        </Row>
        <Button className="btn-warning" onClick={handleEditDuenio}>
          Modificar Datos
        </Button>
      </Form>
    </>
  );
}

export default UpdateDuenio;
