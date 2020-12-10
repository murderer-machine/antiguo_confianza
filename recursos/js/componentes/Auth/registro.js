import React, { useState } from "react"
import ReactDOM from "react-dom"
import { Form, Container, Row, Col, Card, Button, Badge } from 'react-bootstrap'
import { URL } from '../../Variables'
const Registro = () => {
  let textInput = null;
  const [datos, setDatos] = useState({
    dni: '',
    nombres: '',
    apellidos: '',
    correo: '',
    password: '',
  })
  const [variante, setVariante] = useState({
    style: '',
    mensaje: '',
  });
  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    })
  }
  const enviarDatos = (event) => {
    event.preventDefault();
    var url = `${URL}Auth/Registrar`;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        if (response == 0) {
          setVariante({
            style: 'success',
            mensaje: 'Se agregó correctamente.',
          })
          document.getElementById("formulario").reset();
          textInput.current.focus();
        }
        if (response == 1) {
          setVariante({
            style: 'danger',
            mensaje: 'Ocurrio un error , vovler a intentarlo.',
          })
        }
        if (response == 3) {
          setVariante({
            style: 'danger',
            mensaje: 'El DNI ya esta registrado.',
          })
        }
        setTimeout(() => {
          setVariante({
            style: '',
            mensaje: '',
          })
        }, 3000);
      });
  }
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <Form onSubmit={enviarDatos} id="formulario">
              <Card>
                <Card.Header>Registro <Badge variant={variante.style}>{variante.mensaje}</Badge></Card.Header>
                <Card.Body>
                  <Form.Group as={Row} className="mb-0">
                    <Form.Label column sm="3" className="text-md-right"  >
                      DNI :
          </Form.Label>
                    <Col sm="9">
                      <Form.Control required type="number" name="dni" size="sm" onChange={handleInputChange} ref={(button) => { textInput = button; }} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-0">
                    <Form.Label column sm="3" className="text-md-right"  >
                      Nombres :
          </Form.Label>
                    <Col sm="9">
                      <Form.Control required name="nombres" size="sm" onChange={handleInputChange} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-0">
                    <Form.Label column sm="3" className="text-md-right"  >
                      Apellidos :
          </Form.Label>
                    <Col sm="9">
                      <Form.Control required name="apellidos" size="sm" onChange={handleInputChange} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-0">
                    <Form.Label column sm="3" className="text-md-right" >
                      Correo :
          </Form.Label>
                    <Col sm="9">
                      <Form.Control required type="email" name="correo" size="sm" onChange={handleInputChange} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-0">
                    <Form.Label column sm="3" className="text-md-right" >
                      Contraseña :
          </Form.Label>
                    <Col sm="9">
                      <Form.Control required type="password" name="password" size="sm" onChange={handleInputChange} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-0">
                    <Form.Label column sm="3" className="text-md-right">
                    </Form.Label>
                    <Col sm="9">
                      <Button variant="primary" type="submit" size="sm">  Registrar </Button>
                    </Col>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Registro;
if (document.getElementById("registro")) {
  ReactDOM.render(<Registro />, document.getElementById("registro"));
}
