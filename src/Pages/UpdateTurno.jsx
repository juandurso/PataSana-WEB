import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import { API_URL } from "../common/constants"

function UpdateTurno() {
  const navigate = useNavigate();
  const params = useParams();
  const [turno, setTurno] = useState(undefined);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    veterinarian: "",
    pet: "",
    date: "",
    time: "",
    details: "",
  });

  const getTurnoById = async () => {
    var requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        API_URL + "/turnos/find-by-id/" + params.id,
        requestOptions
      );
      if (!response.ok) throw new Error("No se pudo buscar el Turno");

      const result = await response.json();
      setTurno(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if (editIndex === -1) {
        setTurnos([...turnos, { ...formData, id: Date.now() }]);
      } else {
        const updatedTurnos = [...turnos];
        updatedTurnos[editIndex] = formData;
        setTurnos(updatedTurnos);
        setEditIndex(-1);
      }
      setFormData({
        firstName: "",
        lastName: "",
        veterinarian: "",
        pet: "",
        date: "",
        time: "",
        details: "",
      });
    }
  };

  const handleEditTurno = async () => {
    if (!params?.id) return undefined;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      veterinario: !!formData.veterinarian ? formData.veterinarian : undefined,
      detalle: !!formData.details ? formData.details : undefined,
      fecha: !!formData.date ? formData.date : undefined,
      hora: !!formData.time ? formData.time : undefined,
    });

    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        API_URL + "/turnos/update-by-id/" + params?.id,
        requestOptions
      );
      const result = await response.json();
      navigate(-1);
      alert("Turno actualizado");
    } catch {
      alert("No se pudo actualizar");
    }
  };

  const convertirAHora = (fecha) => {
    const dateObject = new Date(fecha);

    // Ajustar la hora para GMT -3 (restar 3 horas)
    const horaActual = new Date(dateObject.getTime() - 3 * 60 * 60 * 1000);
    const horaGMTNeg3 = horaActual.toISOString().split("T")[1].split(".")[0];

    return horaGMTNeg3;
  };
  const convertirAFecha = (fecha) => {
    const dateObject = new Date(fecha);

    // Extraer la fecha y la hora usando los métodos de Date
    const fechaFormateada = dateObject.toISOString().split("T")[0]; // Extracción de la fecha

    return fechaFormateada;
  };

  const handleChangeVeterinario = (event) => {
    const { name, value } = event.target;
  
    // Expresión regular para permitir solo letras y espacios en blanco
    const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]*$/;
  
    if (regex.test(value) || value === "") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    getTurnoById();
  }, []);

  return (
    <div>
      <h2 className="text-center mt-2">Actualizar Turno</h2>
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Veterinario</Form.Label>
              <Form.Control
                maxLength={30}
                required
                type="text"
                name="veterinarian"
                value={formData.veterinarian}
                onChange={handleChangeVeterinario}
                placeholder={turno?.veterinario}


              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Por favor, ingresa solo letras.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom05">
              <Form.Label></Form.Label>
              <Form.Control
                maxLength={30}
                required
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="Fecha"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label></Form.Label>
            <Form.Control
              maxLength={50}
              required
              as="textarea"
              rows={3}
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder={turno?.detalle}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 d-flex justify-content-center">
            <Button
              type="submit"
              className="btn-warning"
              onClick={handleEditTurno}
            >
              Actualizar Turno
            </Button>
          </Form.Group>
        </Form>
      </Container>
      <Button
        type="submit"
        className="btn-warning"
        onClick={() => navigate(-1)}
      >
        Volver
      </Button>
    </div>
  );
}

export default UpdateTurno;
