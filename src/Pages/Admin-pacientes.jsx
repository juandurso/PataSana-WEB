import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

const Adminpacientes = () => {
  const [validated, setValidated] = useState(false);
  const [newPatient, setNewPatient] = useState({
    mascota: '',
    especie: '',
    raza: '',
    firstName: '',
    lastName: '',
    celular: '',
    username: '',
    dni: '',
  });
   
  

  const [patients, setPatients] = useState(() => {
    const savedPatients = window.localStorage.getItem('patients');
    return savedPatients ? JSON.parse(savedPatients) : [];
  });
  const [openPatientIndex, setOpenPatientIndex] = useState(-1);

  const handlePatientInputChange = (event) => {
    const { name, value } = event.target;
    setNewPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const handleAddPatient = () => {
    const form = document.getElementById('addPatientForm');
    if (form.checkValidity() === false) {
      // Si algún campo requerido no está completo, muestra una alerta 
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }
  
    if (newPatient.mascota.trim() !== '') {
      setPatients((prevPatients) => [...prevPatients, newPatient]);
      localStorage.setItem('patients', JSON.stringify([...patients, newPatient]));
      setNewPatient({
        mascota: '',
        especie: '',
        raza: '',
        firstName: '',
        lastName: '',
        celular: '',
        username: '',
        dni: '',
      });
    }
  };
    
  console.log(patients);

  const handleDeletePatient = (index) => {
    const updatedPatients = [...patients];
    updatedPatients.splice(index, 1);
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
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
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
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
  const [searchDNI, setSearchDNI] = useState('');
  
  
  const handleSearchInputChange = (event) => {
    setSearchDNI(event.target.value);
  };
  
  
  const filteredPatients = patients.filter(
    (patient) => patient.dni.includes(searchDNI)
  );

  

  

  

  return (
    <div className="container text-center mt-1">
      <h1>ADMINISTRACION DE PACIENTES</h1>
      <div className='font-navbar'>
        
        <Form id="addPatientForm" className='border border-warning p-3 rounded border-2 '>
          <Row className="my-3" >
            <h3 className='text-start'>Datos de la mascota</h3>
            <Form.Group as={Col} md="4" controlId="validationCustom08">
              <Form.Label >Nombre Mascota</Form.Label>
              <Form.Control
                type="text"
                name="mascota"
                placeholder="Nombre"
                value={newPatient.mascota}
                onChange={handlePatientInputChange}
                maxLength={15}
                required
              />
              <Form.Control.Feedback type="invalid">
                Olvidaste poner el nombre de la mascota.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom09">
              <Form.Label>Especie</Form.Label>
              <Form.Control
                type="text"
                name="especie"
                placeholder="Especie"
                value={newPatient.especie}
                onChange={handlePatientInputChange}
                maxLength={15}
                required
              />
              <Form.Control.Feedback type="invalid">
                Olvidaste poner la especie.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom10">
              <Form.Label>Raza</Form.Label>
              <Form.Control
                type="text"
                name="raza"
                placeholder="Raza"
                value={newPatient.raza}
                onChange={handlePatientInputChange}
                maxLength={15}
                required
              />
              <Form.Control.Feedback type="invalid">
                Olvidaste poner la raza.
              </Form.Control.Feedback>
            </Form.Group>
            {/* Datos del dueño */}
          </Row>
          <Row className="mb-3">
            <h3 className='text-start'>Datos del dueño</h3>
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
                  maxLength={30}
                  required
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Button  className='btn-warning' onClick={handleAddPatient}>Agregar Paciente</Button>
        </Form>

        <h2 className="mt-5">LISTA DE PACIENTES</h2>
        <Form.Control
          className='my-5'
          type="text"
          name="dni"
          placeholder="Buscar por D.N.I"
          value={searchDNI}
          onChange={handleSearchInputChange}
        />

        <Accordion>
        {filteredPatients.map((patient, index) => (
            <Accordion.Item eventKey={index.toString()} key={index}>
              <Accordion.Header onClick={() => setOpenPatientIndex(index)} >
                {patient.mascota}: {patient.dni}
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
                      <h3 className='text-start'>Datos de la mascota</h3>
                      <Form.Group as={Col} md="4" controlId="validationCustom04">
                        <Form.Label>Nombre Mascota</Form.Label>
                        <Form.Control
                          type="text"
                          name="mascota"
                          placeholder="Nombre"
                          value={patients[index].mascota}
                          onChange={(event) => handleEditPatientInputChange(event, index)}
                          maxLength={15}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Olvidaste poner el nombre de la mascota.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} md="4" controlId="validationCustom05">
                        <Form.Label>Especie</Form.Label>
                        <Form.Control
                          type="text"
                          name="especie"
                          placeholder="Especie"
                          value={patients[index].especie}
                          onChange={(event) => handleEditPatientInputChange(event, index)}
                          maxLength={15}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Olvidaste poner la especie.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} md="4" controlId="validationCustom06">
                        <Form.Label>Raza</Form.Label>
                        <Form.Control
                          type="text"
                          name="raza"
                          placeholder="Raza"
                          value={patients[index].raza}
                          onChange={(event) => handleEditPatientInputChange(event, index)}
                          maxLength={15}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Olvidaste poner la raza.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <h3 className='text-start'>Datos del dueño</h3>
                      <Form.Group as={Col} md="6" controlId="validationCustom07">
                        <Form.Label>DNI</Form.Label>
                        <Form.Control
                          type="text"
                          name="dni"
                          placeholder="DNI"
                          value={patients[index].dni}
                          onChange={(event) => handleEditPatientInputChange(event, index)}
                          maxLength={15}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Olvidaste poner el DNI.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label>Nombre del Dueño</Form.Label>
                        <Form.Control
                          
                          type="text"
                          name="firstName"
                          placeholder="Nombre del Dueño"
                          value={patients[index].firstName}
                          onChange={(event) => handleEditPatientInputChange(event, index)}
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
                          value={patients[index].lastName}
                          onChange={(event) => handleEditPatientInputChange(event, index)}
                          maxLength={30}
                          required
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="4" controlId="validationCustom03">
                        <Form.Label>Número de Celular</Form.Label>
                        <Form.Control
                          
                          type="text"
                          name="celular"
                          placeholder="Número de Celular"
                          value={patients[index].celular}
                          onChange={(event) => handleEditPatientInputChange(event, index)}
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
                            value={patients[index].username}
                            onChange={(event) => handleEditPatientInputChange(event, index)}
                            maxLength={30}
                            required
                          />
                        </InputGroup>
                      </Form.Group>
                    </Row>
                    <Button type="submit" className='btn-warning'>Editar datos del paciente</Button>
                    <Button
                      variant="warning"
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
    </div>
  );
};

export default Adminpacientes;
