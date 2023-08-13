import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import modalUpdateDuenio from "./UpdateDuenio";
import Modal from 'react-bootstrap/Modal';

const Adminpacientes = () => {
  // ESTADOS
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [newPatient, setNewPatient] = useState({
    mascota: "",
    especie: "",
    raza: "",
    firstName: "",
    lastName: "",
    celular: "",
    username: "",
    dni: "",
  });
  const [openPatientIndex, setOpenPatientIndex] = useState(-1);
  
  //LOGICA DE CONEXION AL BACK
  const [patients, setPatients] = useState([]);



  //FUNCIONES HANDLERS
  const handlePatientInputChange = (event) => {
    const { name, value } = event.target;
    setNewPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const handleAddPatient = () => {
    const form = document.getElementById("addPatientForm");
    if (form.checkValidity() === false) {
      // Si algún campo requerido no está completo, muestra una alerta
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    if (newPatient.mascota.trim() !== "") {
      setPatients((prevPatients) => [...prevPatients, newPatient]);
      localStorage.setItem(
        "patients",
        JSON.stringify([...patients, newPatient])
      );
      setNewPatient({
        mascota: "",
        especie: "",
        raza: "",
        firstName: "",
        lastName: "",
        celular: "",
        username: "",
        dni: "",
      });
    }
  };

  console.log(patients);

  const handleDeletePatient = (index) => {
    const updatedPatients = [...patients];
    updatedPatients.splice(index, 1);
    setPatients(updatedPatients);
    localStorage.setItem("patients", JSON.stringify(updatedPatients));
  };

  const handleEditPatient = (event, index) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formData = {
        mascota: form.elements.mascota.value,
        especie: form.elements.especie.value,
        raza: form.elements.raza.value,
        firstName: form.elements.firstName.value,
        lastName: form.elements.lastName.value,
        celular: form.elements.celular.value,
        username: form.elements.username.value,
        dni: form.elements.dni.value,
      };
      handleEditPatientData(index, formData);
    }
    setValidated(true);
  };

  const handleEditPatientData = (index, formData) => {
    const updatedPatients = [...patients];
    updatedPatients[index] = formData;
    setPatients(updatedPatients);
    localStorage.setItem("patients", JSON.stringify(updatedPatients));
  };

  const handleEditPatientInputChange = (event, index) => {
    const { name, value } = event.target;
    setPatients((prevPatients) =>
      prevPatients.map((patient, i) =>
        i === index ? { ...patient, [name]: value } : patient
      )
    );
  };

  //BUSCAR PACIENTES POR DNI!!!!
  const [searchDNI, setSearchDNI] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchDNI(event.target.value);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.dni.includes(searchDNI)
  );

  //LOGICA DE CONEXION

  const getAllDuenios = async () => {
    var requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        "http://localhost:8000/duenio/find-all",
        requestOptions
      );

      if (!response.ok) throw new Error("No se pudo buscar los dueños");

      const result = await response.json();
      setPatients(result.data);
    } catch (error) {
      alert("No se pudo buscar los dueños");
    }
  };

  const createDuenios = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      nombre: newPatient.firstName,
      apellido: newPatient.lastName,
      email: newPatient.username,
      dni: newPatient.dni,
      telefono: newPatient.celular,
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:8000/duenio/create",
      requestOptions
    );
    const result = await response.json();
    getAllDuenios();
    setNewPatient({
      firstName: "",
      lastName: "",
      username: "",
      dni: "",
      celular: "",
    });
  };
  

  const borrarDuenio = async (_id) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este dueño?");
  
    if (confirmacion) {
      var requestOptions = {
        method: "DELETE",
        redirect: "follow",
      };
  
      const response = await fetch(
        "http://localhost:8000/duenio/delete-by-id/" + _id,
        requestOptions
      );
  
      await getAllDuenios();
      alert("Dueño eliminado exitosamente");
    } else {
      alert("Eliminación cancelada");
    }
  };


  // Al iniciar mi aplicacion traigo todos los dueños para que aparezcan en mi pantalla
  useEffect(() => {
    getAllDuenios();
  }, []);

  return (
    <div className="container text-center mt-1">
      <h1>ADMINISTRACION DE DUEÑOS</h1>
      <div className="font-navbar">
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
                placeholder="DNI"
                value={newPatient.dni}
                onChange={handlePatientInputChange}
                maxLength={15}
                required
              />
              <Form.Control.Feedback type="invalid">
                Olvidaste poner el DNI.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Nombre del dueño</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Nombre del Dueño"
                value={newPatient.firstName}
                onChange={handlePatientInputChange}
                maxLength={15}
                required
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Apellido del Dueño</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Apellido del Dueño"
                value={newPatient.lastName}
                onChange={handlePatientInputChange}
                maxLength={15}
                required
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Número de Celular</Form.Label>
              <Form.Control
                type="text"
                name="celular"
                placeholder="Número de Celular"
                value={newPatient.celular}
                onChange={handlePatientInputChange}
                maxLength={15}
                required
              />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Mail</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Mail"
                  aria-describedby="inputGroupPrepend"
                  value={newPatient.username}
                  onChange={handlePatientInputChange}
                  maxLength={64}
                  required
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Button className="btn-warning" onClick={createDuenios}>
            Agregar Dueño
          </Button>
        </Form>

        <h2 className="mt-5">LISTA DE DUEÑOS</h2>
        <Form.Control
          className="my-5"
          type="text"
          name="dni"
          placeholder="Buscar por D.N.I"
          value={searchDNI}
          onChange={handleSearchInputChange}
        />

        <Accordion>
          {patients
            .filter((patient) =>
              searchDNI.length > 0 ? patient.dni.includes(searchDNI) : true
            )
            .map((patient, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header onClick={() => setOpenPatientIndex(index)}>
                  {patient.dni} - {patient.nombre} {patient.apellido}
                </Accordion.Header>
                <Accordion.Body className="warning">
                  {openPatientIndex === index && (
                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={(event) => handleEditPatient(event, index)}
                      className=""
                    >
                      <Row className="mb-3">
                        <h3 className="text-start">Datos del dueño</h3>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationCustom07"
                        >
                          <Form.Label>DNI</Form.Label>
                          <Form.Control
                            type="text"
                            name="dni"
                            placeholder="DNI"
                            value={patients[index].dni}
                            onChange={(event) =>
                              handleEditPatientInputChange(event, index)
                            }
                            maxLength={15}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Olvidaste poner el DNI.
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationCustom01"
                        >
                          <Form.Label>Nombre del Dueño</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            placeholder="Nombre del Dueño"
                            value={patients[index].nombre}
                            onChange={(event) =>
                              handleEditPatientInputChange(event, index)
                            }
                            maxLength={15}
                            required
                          />
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="4"
                          controlId="validationCustom02"
                        >
                          <Form.Label>Apellido del Dueño</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            placeholder="Apellido del Dueño"
                            value={patients[index].apellido}
                            onChange={(event) =>
                              handleEditPatientInputChange(event, index)
                            }
                            maxLength={30}
                            required
                          />
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="4"
                          controlId="validationCustom03"
                        >
                          <Form.Label>Número de Celular</Form.Label>
                          <Form.Control
                            type="text"
                            name="celular"
                            placeholder="Número de Celular"
                            value={patients[index].telefono}
                            onChange={(event) =>
                              handleEditPatientInputChange(event, index)
                            }
                            maxLength={15}
                            required
                          />
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="4"
                          controlId="validationCustomUsername"
                        >
                          <Form.Label>Mail</Form.Label>
                          <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">
                              @
                            </InputGroup.Text>
                            <Form.Control
                              type="text"
                              name="username"
                              placeholder="Mail"
                              aria-describedby="inputGroupPrepend"
                              value={patients[index].email}
                              onChange={(event) =>
                                handleEditPatientInputChange(event, index)
                              }
                              maxLength={30}
                              required
                            />
                          </InputGroup>
                        </Form.Group>
                      </Row>
                      <Button 
                      type="submit" 
                      className="btn-warning" 
                      onClick={() => navigate("/duenio/actualizar/" + patient._id) }>
                        Editar datos del dueño
                      </Button>
                      <Button
                        variant="danger"
                        className="my-5 mx-2"
                        onClick={() => borrarDuenio(patient._id)
                        }
                      >
                        Eliminar Paciente
                      </Button>
                      <Button
                        onClick={() =>
                          navigate("/duenio/mascotas/" + patient._id)
                        }
                      >
                        Ver Mascotas
                      </Button>
                    </Form>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Adminpacientes;
