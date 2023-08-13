import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";

export default function MascotasDuenio() {
  const params = useParams();
  const navigate = useNavigate();
  const [duenio, setDuenio] = useState({
    pacientes: [],
  });
  const [formValues, setFormValues] = useState({
    nombre: "",
    especie: "",
    raza: "",
  });

  const handleChangeValues = (event) => {
    const { name, value } = event.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
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
  const limpiarInputs = () => {
    setFormValues({
      nombre: "",
      especie: "",
      raza: "",
    });
  };
  const createPaciente = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      nombre: formValues.nombre,
      especie: formValues.especie,
      raza: formValues.raza,
      idDuenio: duenio._id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8000/paciente/create", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // Aquí se ejecuta después de que el borrado sea exitoso
        getDuenioById(); // Llamar a getDuenioById() después del borrado exitoso
      });

    limpiarInputs();
  };

  const borrarMascota = (_id) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch("http://localhost:8000/paciente/delete-by-id/" + _id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // Aquí se ejecuta después de que el borrado sea exitoso
        getDuenioById(); // Llamar a getDuenioById() después del borrado exitoso
      });
  };

  // Al iniciar mi aplicacion traigo todos los dueños para que aparezcan en mi pantalla
  useEffect(() => {
    getDuenioById();
  }, []);

  return (
    <div>
      <Container>
        <Form className="border border-warning p-3 m-2 rounded border-2 ">
          <Row className="mb-3">
            <h3 className="text-start">
              AGREGAR MASCOTAS PARA {duenio.nombre} {duenio.apellido}
            </h3>
            <Form.Group as={Col} md="4" controlId="validationCustom04">
              <Form.Label>Nombre Mascota</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formValues.nombre}
                onChange={handleChangeValues}
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
                value={formValues.especie}
                onChange={handleChangeValues}
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
                value={formValues.raza}
                onChange={handleChangeValues}
                maxLength={15}
                required
              />
              <Form.Control.Feedback type="invalid">
                Olvidaste poner la raza.
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              className="btn btn-warning my-2 text-center"
              as={Col}
              md="4"
              onClick={createPaciente}
            >
              AGREGAR MASCOTA
            </Button>
          </Row>
        </Form>
      </Container>

      {!!duenio && (
        <div>
          <h3>
            {" "}
            Mascotas de: {duenio.nombre} {duenio.apellido}{" "}
          </h3>
          {
            <Table responsive>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Raza</th>
                  <th>Especie</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {duenio.pacientes.map((paciente, index) => (
                  <tr key={index}>
                    <td>{paciente.nombre}</td>
                    <td>{paciente.raza}</td>
                    <td>{paciente.especie}</td>
                    <td>
                      <Button
                        variant="warning"
                        className="mx-2"
                        onClick={() =>
                          navigate("/mascotas/actualizar/" + paciente._id)
                        }
                      >
                        Editar
                      </Button>
                      <Button
                        variant="warning"
                        className="mx-2"
                        onClick={() =>
                          navigate("/mascotas/Adminturnos/" + paciente._id)
                        }
                      >
                        Generar Turno
                      </Button>
                      <Button
                        variant="warning"
                        onClick={() => borrarMascota(paciente._id)}
                      >
                        Borrar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          }
          <button onClick={() => navigate(-1)}>Volver</button>
        </div>
      )}
    </div>
  );
}
