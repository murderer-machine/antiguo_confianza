import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Row, Col, Badge, Spinner, Image, Card, Table } from 'react-bootstrap'
import { URL } from '../../../Variables'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'
import Alert from '@material-ui/lab/Alert'
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle, ModalDialog } from 'react-bootstrap'

const Cobranzas = () => {
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
    const [datos, setDatos] = useState({
        id_cupon: '',
        fecha_pago: '',
        observaciones: '',

    })
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }
    const [datos_comentarios, setdatos_comentarios] = useState({
        comentario: '',
    })
    const handleInputChange_datos_comentarios = (event) => {
        setdatos_comentarios({
            ...datos_comentarios,
            [event.target.name]: event.target.value
        })
    }
    const [documentos, setdocumentos] = useState([])
    const CargarDocumentos = () => {
        var url = `${URL}Cupones/Mostrar`;
        fetch(url)
            .then(res => res.json())
            .then(response => {
                setdocumentos(response);
            });
    }

    const [ActualizarCargarDocumentos, setActualizarCargarDocumentos] = useState(true)
    const [ModalAgregarPago, setModalAgregarPago] = useState(false)
    const CerrarModalAgregarPago = () => {
        setDatos({
            ...datos,
            id_cupon: '',
            fecha_pago: '',
            observaciones: '',
        })
        setActualizarCargarDocumentos(!ActualizarCargarDocumentos)
        setModalAgregarPago(false)
        setalert_respuesta(false)
    }
    const AbrirModalAgregarPago = (id) => {
        setModalAgregarPago(true)
        setDatos({
            ...datos,
            id_cupon: id
        })
    }
    const [alert_respuesta, setalert_respuesta] = useState(false)
    const [config_alert_respuesta, setconfig_alert_respuesta] = useState({
        variante: 'info',
        text: 'Aqui aparecera el error',
    })

    const AplicarPago = () => {
        setalert_respuesta(false)
        if (datos.fecha_pago === '') {
            setalert_respuesta(true)
            setconfig_alert_respuesta({
                variante: 'error',
                text: 'Falta poner la fecha.',
            })
        } else {
            var url = `${URL}Cupones/AplicarPago`;
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(datos),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    setalert_respuesta(true)
                    if (response === 1) {
                        setconfig_alert_respuesta({
                            variante: 'error',
                            text: 'Ocurrió un error al generar pago. ',
                        })
                    }
                    if (response === 0) {
                        setconfig_alert_respuesta({
                            variante: 'success',
                            text: 'Se genero el pago correctamente',
                        })
                        CerrarModalAgregarPago()
                    }
                });
        }
    }
    const AplicarRevisado = (id) => {
        var url = `${URL}Cupones/AplicarRevisado/${id}`;
        fetch(url).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                setActualizarCargarDocumentos(!ActualizarCargarDocumentos)
            });
    }
    useEffect(() => {
        CargarDocumentos()
    }, [ActualizarCargarDocumentos])
    const [busqueda_nombre, setbusqueda_nombre] = useState('')
    const documentosfiltro = documentos.filter(documento => documento.cliente.nombre.includes(busqueda_nombre))
    const handleInputChange_filtro_nombre = (event) => {
        setbusqueda_nombre(event.target.value)
    }
    const AgregarComentarioDocumento = (id) => {

        if (datos_comentarios.comentario !== '') {
            var url = `${URL}Cupones/AgregarComentario/${id}`;
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(datos_comentarios),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    setdatos_comentarios({
                        comentario: '',
                    })
                    setActualizarCargarDocumentos(!ActualizarCargarDocumentos)
                });
        }
    }
    return (
        <>
            <Row>
                <Col xs={12} lg={12}>
                    <Form.Group as={Row} controlId="fecha_pago" className="mb-0">
                        <Form.Label column {...config_label} >
                            Nombre :
                        </Form.Label>
                        <Col {...config_input}>
                            <Form.Control type="text" name="fecha_pago" onChange={handleInputChange_filtro_nombre} size="sm" value={busqueda_nombre} />
                        </Col>
                    </Form.Group>
                </Col>
                <Col xs={12} lg={12}>
                    <div className="card_confianza">
                        {documentosfiltro.map((documento, d_i) => (
                            <Container key={d_i} fluid>
                                <Row>
                                    <Col xs={12}>
                                        <h5 className="p-0 m-0 text-inicio font-weight-bold">Nº {documento.poliza.nro_poliza.toUpperCase()}</h5>
                                    </Col>
                                    <Col xs={12}>
                                        <Row>
                                            <Col xs={12} lg={6}>
                                                {documento.cliente.nombre.toUpperCase()}<br />
                                                {documento.cliente.nrodoc.toUpperCase()}<br />
                                                <Image src={`${URL}recursos/img/logos_empresas_seguros/${documento.poliza.id_empresa.logo}`} fluid style={{ width: '100px' }} /><br />
                                                <b>{documento.poliza.id_empresa.nombre.toUpperCase()}</b><br />
                                                <b>Producto : </b>{documento.poliza.id_producto.nombre.toUpperCase()}<br />
                                                <b>Ramo : </b>{documento.poliza.id_ramo.descripcion.toUpperCase()} {Object.keys(documento.poliza.vehiculo).length === 0 ? '' : (<> <b>Placa : </b><h5 className="d-inline">{documento.poliza.vehiculo.placa.toUpperCase()}</h5></>)}<br />
                                            </Col>
                                            <Col xs={12} lg={6}>
                                                <Form.Group as={Row} controlId="comentario" className="mb-0">
                                                    <Col >
                                                        <Form.Control as="textarea" rows={3} type="number" name="comentario" onChange={handleInputChange_datos_comentarios} size="sm" value={datos_comentarios.comentario} placeholder="Agregue un comentario aquí" />
                                                        <Button variant="primary" size="sm" onClick={() => AgregarComentarioDocumento(documento.documento.id)}>Agregar Comentario</Button>
                                                    </Col>
                                                </Form.Group>
                                                {documento.documento_comentarios.map((item, i) => (
                                                    <div key={i}>
                                                        <small>{item.fecha_hora} [{item.id_usuario}] : </small>{item.comentario}<br />
                                                    </div>

                                                ))}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    {documento.cupones.map((cupon, c_i) => (
                                        <Col xs={6} sm={4} md={3} lg={3} key={c_i} className="text-center m-0 p-1">
                                            <div style={{
                                                backgroundColor: {
                                                    "0": "#FFF4E5",
                                                    "1": "#EDF7ED",
                                                    "2": "#FDECEA",
                                                }[cupon.situacion],
                                                color: {
                                                    "0": "#663C00",
                                                    "1": "#1E4620",
                                                    "2": "#611A15",
                                                }[cupon.situacion],
                                                borderWidth: '1px',
                                                borderStyle: 'dotted',
                                                borderColor: {
                                                    "0": "#663C00",
                                                    "1": "#1E4620",
                                                    "2": "#611A15",
                                                }[cupon.situacion],
                                            }}>
                                                Cupón Nº<b>{cupon.nro_orden}</b><br />
                                                {cupon.fecha_obligacion}<br />
                                                Pago Vencido Hace <b>{cupon.contador_dias}</b><br />
                                                <b>CP-{cupon.nro_cuota}</b><br />
                                                {documento.poliza.moneda.simbolo.toUpperCase()} <b>{cupon.importe}</b><br />
                                                {{
                                                    "0": (<><h6 style={{ color: '#FFA117' }}><b>PENDIENTE</b></h6></>),
                                                    "1": (<><h6 style={{ color: '#5CB660' }}>CANCELADO</h6></>),
                                                    "2": (<><h6 style={{ color: '#F6685C' }}><b>VENCIDO</b></h6></>),
                                                }[cupon.situacion]
                                                }
                                                <Col xs={12}>
                                                    <Button variant="danger" size="sm" onClick={() => AbrirModalAgregarPago(cupon.id)}>Realizar Pago</Button>
                                                </Col>
                                                <Col xs={12}>
                                                    <Button variant="warning" size="sm" onClick={() => { AplicarRevisado(cupon.id) }}>Revisado</Button>
                                                </Col>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                                <hr style={{
                                    borderColor: '#2A427B'
                                }} />
                            </Container>
                        ))}
                    </div>
                </Col>
            </Row>
            <Modal show={ModalAgregarPago} onHide={CerrarModalAgregarPago} backdrop="static" size="lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        <Card.Title>Registrar Pago</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Aquí podra registrar el pago del cupón.</Card.Subtitle>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Row} controlId="fecha_pago" className="mb-0">
                        <Form.Label column {...config_label} >
                            Fecha Pago : <sup className="asterisco">*</sup>
                        </Form.Label>
                        <Col {...config_input}>
                            <Form.Control type="text" name="fecha_pago" onChange={handleInputChange} size="sm" value={datos.fecha_pago} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="observaciones" className="mb-0">
                        <Form.Label column {...config_label} >
                            Observaciones :
                        </Form.Label>
                        <Col {...config_input}>
                            <Form.Control as="textarea" rows={3} type="text" name="observaciones" onChange={handleInputChange} size="sm" value={datos.observaciones} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="button_cobrar" className="mb-0">
                        <Form.Label column {...config_label} >
                        </Form.Label>
                        <Col {...config_input}>
                            <Button variant="inicio" onClick={AplicarPago} size="sm" className="my-1">
                                Cobrar Cuota
                                </Button>
                        </Col>
                        {alert_respuesta ? (<>
                            <Col xs={12}>
                                <Alert severity={config_alert_respuesta.variante}>{config_alert_respuesta.text}</Alert>
                            </Col>
                        </>) : (<></>)}
                    </Form.Group>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default Cobranzas