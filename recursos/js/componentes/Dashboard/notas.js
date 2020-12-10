import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom";
import { Container, Row, Col } from 'react-bootstrap'
import { Form, Badge, Button } from 'react-bootstrap'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { registerLocale, setDefaultLocale } from "react-datepicker"
import es from 'date-fns/locale/es'

import { URL } from '../../Variables'
import Table from 'react-bootstrap/Table'
registerLocale('es', es)
const AuthNotas = () => {
    const [datosMostrar, setDatosMostrar] = useState([]);
    const [datos, setDatos] = useState({
        fecha_final: '',
        nota: '',
        number: Math.floor(Math.random() * 100),
    })
    const CambiarFecha_final = (date) => {
        setDatos({
            ...datos,
            fecha_final: date,
        })
    }
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }
    useEffect(() => {
        const CargarDatos = () => {
            var url = `${URL}AuthNotas/Mostrar`;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    setDatosMostrar(response);
                });
        }
        CargarDatos()
    }, [datos])

    const enviarDatos = (event) => {
        event.preventDefault();
        var url = `${URL}AuthNotas/Agregar`;
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
                    setDatos({
                        fecha_final: '',
                        nota: '',
                    })
                }
                if (response == 1) {
                    alert('incorrecto')
                }
            });
    }
    const CambiarEstado = (id) => {
        var url = `${URL}AuthNotas/CambiarEstado`;
        let data = {
            id: id,
        };
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if (response == 0) {
                    setDatos({
                        ...datos,
                        number: Math.floor(Math.random() * 100)
                    })
                }
                if (response == 1) {
                    alert('incorrecto')
                }
            });
    }
    const ExampleCustomInput = ({ value, onClick }) => (

        <Button className="btn-inicio" block size="sm"
            onClick={onClick}>
            {value === '' ? 'Seleccione una fecha' : value}
        </Button>
    );
    return (
        <>
            <Container>
                <Row className="justify-content-center">
                    <Col lg={4}>
                        <Form onSubmit={enviarDatos}>
                            <Form.Group>
                                <Form.Label>Fecha Final :</Form.Label><br />
                                <DatePicker
                                    onChange={CambiarFecha_final}
                                    minDate={new Date()}
                                    selected={datos.fecha_final}
                                    name="startDate"
                                    dateFormat="yyyy-MM-dd"
                                    locale="es"
                                    showMonthDropdown
                                    useShortMonthInDropdown
                                    customInput={<ExampleCustomInput />}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Nota :</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    type="text"
                                    placeholder="Ingrese su nota"
                                    onChange={handleInputChange}
                                    name="nota"
                                    value={datos.nota}
                                    required
                                    size="sm"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Button className="btn-inicio" type="submit" size="sm" block>
                                    Guardar Nota
                        </Button>
                            </Form.Group>
                        </Form>
                        {JSON.stringify(datos)}
                    </Col>
                    <Col lg={8}>
                        <Table bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Fecha Creacion</th>
                                    <th>Fecha Final</th>
                                    <th>Nota</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    datosMostrar.map((item, key) =>
                                        <tr key={key}>
                                            <td>{item.fecha_creacion} </td>
                                            <td>{item.fecha_final === '0000-00-00' ? '-' : item.fecha_creacion}</td>
                                            <td width="50%">{item.nota}</td>
                                            <td>
                                                <Button className="btn-inicio" block size="sm"
                                                    onClick={() => CambiarEstado(item.id)}
                                                >
                                                    Realizado
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>

                    </Col>
                </Row>

            </Container>
        </>
    )
}
export default AuthNotas;
if (document.getElementById("auth_notas")) {
    ReactDOM.render(<AuthNotas />, document.getElementById("auth_notas"));
}