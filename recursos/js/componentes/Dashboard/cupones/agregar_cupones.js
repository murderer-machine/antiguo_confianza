import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Form, Button, Table } from 'react-bootstrap'
const Cupones = ({ CambiarDatosCupones = () => { } }) => {
    const config_label = {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 4,
        xl: 4,
    }
    const config_input = {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 8,
        xl: 8,
    }
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const [datos, setDatos] = useState({
        nro_cuota: '',
        importe: '',
        fecha_obligacion: '',
        fecha_limite: '',

    })
    const [cupones, setcupones] = useState([])
    const AgregarCuota = () => {
        if (datos.nro_cuota !== '' && datos.importe !== '' && datos.fecha_obligacion !== '' && datos.fecha_limite !== '') {
            setcupones(cupones => [...cupones, datos]);
            setDatos({
                nro_cuota: '',
                importe: '',
                fecha_obligacion: '',
                fecha_limite: '',
            })
        }
    }
    useEffect(() => {
        CambiarDatosCupones(cupones)
    }, [cupones])
    return (
        <div style={{ backgroundColor: 'rgba(42,66,123,0.1)', padding: 10 }} className="mb-3">
            <Form.Group as={Row} controlId="nro_cuota" className="mb-0">
                <Form.Label column {...config_label} >
                    Nº Cuota<sup className="asterisco">*</sup>
                </Form.Label>
                <Col {...config_input}>
                    <Form.Control type="text" name="nro_cuota" onChange={handleInputChange} size="sm" value={datos.nro_cuota} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="importe" className="mb-0">
                <Form.Label column {...config_label} >
                    Importe<sup className="asterisco">*</sup>
                </Form.Label>
                <Col {...config_input}>
                    <Form.Control type="text" name="importe" onChange={handleInputChange} size="sm" value={datos.importe} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="fecha_obligacion" className="mb-0">
                <Form.Label column {...config_label} >
                    Fecha Obligación<sup className="asterisco">*</sup>
                </Form.Label>
                <Col {...config_input}>
                    <Form.Control type="text" name="fecha_obligacion" onChange={handleInputChange} size="sm" value={datos.fecha_obligacion} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="fecha_limite" className="mb-0">
                <Form.Label column {...config_label} >
                    Fecha Limite<sup className="asterisco">*</sup>
                </Form.Label>
                <Col {...config_input}>
                    <Form.Control type="text" name="fecha_limite" onChange={handleInputChange} size="sm" value={datos.fecha_limite} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="fecha_limite" className="mb-0">
                <Form.Label column {...config_label} >
                </Form.Label>
                <Col {...config_input}>
                    <Button variant="inicio" onClick={AgregarCuota} size="sm" className="my-1">
                        Agregar Cuota
                                </Button>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="fecha_limite" className="mb-0 justify-content-center">
                <Form.Label column {...config_label} >
                </Form.Label>
                <Col {...config_input}>
                    <Table bordered hover size="sm" className="text-center">
                        <thead>
                            <tr>
                                <th>Nº CUOTA</th>
                                <th>IMPORTE</th>
                                <th>FECHA DE OBLIGACIÓN PAGO</th>
                                <th>SITUACIÓN RECIBO</th>
                                <th>ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cupones.map((cupon, i) => (
                                <tr key={i}>
                                   
                                    <td>{cupon.nro_cuota}</td>
                                    <td>{cupon.importe}</td>
                                    <td>{cupon.fecha_obligacion}</td>
                                    <td>{cupon.fecha_limite}</td>
                                    <td><Button variant="danger" onClick={() => {
                                        const copycupones = Object.assign([], cupones)
                                        copycupones.splice(i, 1)
                                        setcupones(copycupones)
                                    }}
                                        size="sm"
                                        className="my-1">
                                        Eliminar
                                </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Form.Group>
        </div>
    )
}
export default Cupones