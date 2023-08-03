import React, { useState } from 'react';
import { Container, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';


function AdminTurnos() {
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [turnos, setTurnos] = useState([]);
  const [formData, setFormData] = useState({
    id: 1,
    firstName: '',
    lastName: '',
    veterinarian: '',
    pet: '',
    date: '',
    time: '',
    details: '',
  });
  const [editIndex, setEditIndex] = useState(-1);

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
        id: 1,
        firstName: '',
        lastName: '',
        veterinarian: '',
        pet: '',
        date: '',
        time: '',
        details: '',
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

  const handleEdit = (index) => {
    setEditIndex(index);
    const turno = turnos[index];
    setFormData({
      id: turno.id,
      firstName: turno.firstName,
      lastName: turno.lastName,
      veterinarian: turno.veterinarian,
      pet: turno.pet,
      date: turno.date,
      time: turno.time,
      details: turno.details,
    });
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const updatedTurnos = [...turnos];
    updatedTurnos.splice(index, 1);
    setTurnos(updatedTurnos);
  };

  return (
    <Container fluid="sm" className="my-5 font-navbar">
      <Form noValidate validated={validated} onSubmit={handleSubmit} >
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label></Form.Label>
            <Form.Control
              maxLength={30}
              required
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Nombre"
            />
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label></Form.Label>
            <Form.Control
              maxLength={30}
              required
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Apellido"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label></Form.Label>
            <Form.Control
              maxLength={30}
              required
              type="text"
              name="veterinarian"
              value={formData.veterinarian}
              onChange={handleChange}
              placeholder="Veterinario"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom04">
            <Form.Label></Form.Label>
            <Form.Control
              maxLength={30}
              required
              type="text"
              name="pet"
              value={formData.pet}
              onChange={handleChange}
              placeholder="Mascota"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom05">
            <Form.Label></Form.Label>
            <Form.Control
              maxLength={30}
              required
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="Fecha"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom06">
            <Form.Label></Form.Label>
            <Form.Control
              maxLength={30}
              required
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="Hora"
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
          <Button type="submit" className='btn-warning'>
            {editIndex !== -1 ? 'Agregar Turno' : 'Agregar Turno'}
          </Button>
        </Form.Group>
      </Form>

      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Detalle de cita</th>
            <th>Veterinario</th>
            <th>Mascota</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {turnos.map((turno, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{turno.details}</td>
              <td>{turno.veterinarian}</td>
              <td>{turno.pet}</td>
              <td>{turno.date}</td>
              <td>{turno.time}</td>
              <td>
                <Button variant="warning" className='mx-2' onClick={() => handleEdit(index)}>
                  Editar
                </Button>
                <Button variant="warning" onClick={() => handleDelete(index)}>
                  Borrar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Turno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            style={{ marginTop: '15px' }}
          >
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label></Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Nombre"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label></Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Apellido"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label></Form.Label>
                <Form.Control
                 type="text"
                  name="veterinarian"
                  value={formData.veterinarian}
                  onChange={handleChange}
                  placeholder="Veterinario"
                  maxLength={20} 
                  required
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label></Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="pet"
                  value={formData.pet}
                  onChange={handleChange}
                  placeholder="Mascota"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom05">
                <Form.Label></Form.Label>
                <Form.Control
                  required
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="Fecha"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom06">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  required
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="Time"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label></Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="details"
                value={formData.details}
                onChange={handleChange}
                maxLength={20}
                required
                placeholder="Detalles de la cita"
                
                
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
          <Button type="submit"  variant='warning' onClick={handleSubmit}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdminTurnos;
