import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

const Adminpacientes = () => {
  const [validated, setValidated] = useState(false);
  const [newPatient, setNewPatient] = useState('');
  const [num, setNum] = useState(0);
  const [valorInput, setValorInput] = useState('');
  const [patients, setPatients] = useState(() => {
    const savedPatients = window.localStorage.getItem('patients');
    return savedPatients ? JSON.parse(savedPatients) : [];
  });
  const [openPatientIndex, setOpenPatientIndex] = useState(-1); // Estado para controlar el índice del paciente abierto

  const handlePatientInputChange = (event) => {
    setNewPatient(event.target.value);
  };

  const handleAddPatient = () => {
    if (newPatient.trim() !== '') {
      const updatedPatients = [...patients, { mascota: newPatient, state: '', zip: '', firstName: '', lastName: '', celular: '', username: '' }];
      setPatients(updatedPatients);
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
      setNewPatient('');
    }
  };

  const handleDeletePatient = (index) => {
    const updatedPatients = [...patients];
    updatedPatients.splice(index, 1);
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
  };

  const handleSubmit = (event, index) => {
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
      };
      handleEditPatient(index, formData);
    }

    setValidated(true);
  };

  const handleEditPatient = (index, formData) => {
    const updatedPatients = [...patients];
    updatedPatients[index] = formData;
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
  };

  

  const onChange = (evento) => {
    const valor = evento.target.value;
    setValorInput(valor);
  };

  return (
    <div className="container text-center my-5">
      <h1>CRUD DE PACIENTES</h1>
      <div>
        <h2>Lista de pacientes</h2>
        <input
          type="text"
          className="form-control my-5"
          placeholder="Nuevo Paciente"
          value={newPatient}
          onChange={handlePatientInputChange}
        />
        <button className="btn btn-primary mb-5" onClick={handleAddPatient}>
          Agregar Paciente
        </button>
      </div>

      <Accordion>
        {patients.map((patient, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header onClick={() => setOpenPatientIndex(index)}>
              {patient.mascota} {patient.lastName}
            </Accordion.Header>
            <Accordion.Body>
              {openPatientIndex === index && (
                <Form noValidate validated={validated} onSubmit={(event) => handleSubmit(event, index)}>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                      <Form.Label>Nombre Mascota</Form.Label>
                      <Form.Control type="text" name="mascota" placeholder="Nombre" className="sm" defaultValue={patient.mascota} required />
                      <Form.Control.Feedback type="invalid">
                        Olvidaste poner el nombre de la mascota.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                      <Form.Label>Raza</Form.Label>
                      <Form.Control type="text" name="raza" placeholder="Raza" defaultValue={patient.raza} required />
                      <Form.Control.Feedback type="invalid">
                        Olvidaste poner la raza.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom06">
                      <Form.Label>Especie</Form.Label>
                      <Form.Control type="text" name="especie" placeholder="Especie" defaultValue={patient.especie} required />
                      <Form.Control.Feedback type="invalid">
                        Olvidaste poner la especie.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="3" controlId="validationCustom01">
                      <Form.Label>Nombre del dueño</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="firstName"
                        placeholder="Nombre del Dueño"
                        defaultValue={patient.firstName}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom02">
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="lastName"
                        placeholder="Apellido"
                        defaultValue={patient.lastName}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom03">
                      <Form.Label>Celular</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="celular"
                        placeholder="Celular"
                        defaultValue={patient.celular}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustomUsername">
                      <Form.Label>Mail</Form.Label>
                      <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="username"
                          placeholder="Mail"
                          aria-describedby="inputGroupPrepend"
                          defaultValue={patient.username}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Olvidaste poner el mail.
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Check
                      required
                      label="Deseo guardar los datos del paciente."
                      feedback="¿Estan todos los datos?"
                      feedbackType="invalid"
                    />
                  </Form.Group>
                  <Button type="submit" className="my-5 mx-2">Editar datos del paciente</Button>
                  <Button
                    variant="danger"
                    className="my-5 mx-2"
                    onClick={() => handleDeletePatient(index)}
                  >
                    Eliminar Paciente
                  </Button>
                </Form>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

export default Adminpacientes;
