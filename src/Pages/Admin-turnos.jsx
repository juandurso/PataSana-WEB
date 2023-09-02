import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { json, useParams } from "react-router-dom";
import { API_URL } from "../common/constants"

function AdminTurnos() {
  const navigate = useNavigate();
  const params = useParams();

  const [validated, setValidated] = useState(false);
  const [turnos, setTurnos] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    veterinarian: "",
    pet: "",
    date: "",
    time: "",
    details: "",
  });
  const [editIndex, setEditIndex] = useState(-1);

  //logica de conexion
  const [paciente, setPaciente] = useState(undefined);

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
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const crearTurno = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      detalle: formData.details,
      veterinario: formData.veterinarian,
      fecha: formData.date,
      idPaciente: params.id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        API_URL + "/turnos/create",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Algo salio mal");
      }
      await getPacienteById();
      alert("Se creo turno correctamente");
    } catch (error) {
      alert("no se pudo crear el turno");
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
    setValidated(true);
    setShowModal(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeveterinario = (event) => {
    const { name, value } = event.target;
  
    // Expresión regular para permitir solo letras y espacios en blanco
    const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]*$/;
  
    if (regex.test(value) || value === "") {
      // Actualizar el estado con el nuevo valor si cumple con la expresión regular
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDelete = (index) => {
    const updatedTurnos = [...turnos];
    updatedTurnos.splice(index, 1);
    setTurnos(updatedTurnos);
  };

  const convertirAHora = (fecha) => {
    const dateObject = new Date(fecha);

    // Ajustar la hora para GMT -3 (restar 3 horas)
    // const horaActual = new Date(dateObject.getTime() - 3 * 60 * 60 * 1000);
    const horaActual = new Date(dateObject.getTime());
    const horaGMTNeg3 = horaActual.toISOString().split("T")[1].split(".")[0];

    return horaGMTNeg3;
  };
  const convertirAFecha = (fecha) => {
    const dateObject = new Date(fecha);

    // Extraer la fecha y la hora usando los métodos de Date
    const fechaFormateada = dateObject.toISOString().split("T")[0]; // Extracción de la fecha

    return fechaFormateada;
  };

  const borrarTurno = async (_id) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar este turno?"
    );

    if (confirmacion) {
      var requestOptions = {
        method: "DELETE",
        redirect: "follow",
      };

      try {
        const response = await fetch(
          API_URL + "/turnos/delete-by-id/" + _id,
          requestOptions
        );

        await getPacienteById();
        alert("Turno eliminado exitosamente");
      } catch (error) {
        console.error("Error al eliminar el turno:", error);
      }
    } else {
      alert("Eliminación cancelada");
    }
  };

  useEffect(() => {
    getPacienteById();
  }, []);
  return (
    <>
      <h1 className="text-center mt-2">Generar un turno para el paciente</h1>
      <Container fluid="sm" className="my-5 font-navbar">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label></Form.Label>
              <Form.Control
                maxLength={30}
                required
                type="text"
                name="veterinarian"
                value={formData.veterinarian}
                onChange={handleChangeveterinario}
                placeholder="Veterinario"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
              placeholder="Detalles de la cita"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 d-flex justify-content-center">
            <Button type="submit" className="btn-warning" onClick={crearTurno}>
              {editIndex !== -1 ? "Agregar Turno" : "Agregar Turno"}
            </Button>
          </Form.Group>
        </Form>

        <Table responsive>
          <thead>
            <tr>
              <th>Detalle de cita</th>
              <th>Veterinario</th>
              <th>Mascota</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paciente?.turnos?.map((turno, index) => (
              <tr key={index}>
                <td>{turno.detalle}</td>
                <td>{turno.veterinario}</td>
                <td>{paciente.nombre}</td>
                <td>{convertirAFecha(turno.fecha)}</td>
                <td>{convertirAHora(turno.fecha)}</td>
                <td>
                  <Button
                    variant="warning"
                    className="mx-2"
                    onClick={() => navigate("/turnos/actualizar/" + turno._id)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => borrarTurno(turno._id)}
                  >
                    Borrar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="warning" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </Container>
    </>
  );
}

export default AdminTurnos;
