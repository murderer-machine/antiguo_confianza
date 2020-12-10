import React, { useState, useEffect, forwardRef, createRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Form, Badge, Button, Card } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import { URL, Fechadiv } from '../../../Variables'
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import DatePicker from 'react-datepicker'
import { registerLocale, setDefaultLocale } from "react-datepicker"
import es from 'date-fns/locale/es'
registerLocale('es', es)
const AuthAgregarCliente = ({ CambiarPreload, id_editar = 0 }) => {
    const ref = createRef()
    const confiTypeahead = {
        disabled: false,
        dropup: false,
        flip: true,
        highlightOnlyResult: false,
        minLength: 0,
        open: undefined,
    }
    const [datos, setDatos] = useState({
        nombre: '',
        id_tipodoc: [],
        nrodoc: '',
        id_giro_negocio: [],
        direccion: '',
        referencia: '',
        id_ubigeo: [],
        contacto: {
            nombre: '',
            telefono: '',
            celular: '',
            correo: '',
        },
        fecha_creacion: '',
        id_subagente: [],
    })
    const [ubigeos, setUbigeos] = useState([])
    const [tiposdocumentos, setTiposdocumentos] = useState([])
    const [gironegocios, setGironegocios] = useState([])
    const [subagentes, setSubagentes] = useState([])
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }
    const handleInputChangecontacto = (event) => {
        setDatos({
            ...datos,
            contacto: {
                ...datos.contacto,
                [event.target.name]: event.target.value
            }
        })
    }
    useEffect(() => {
        let isCancelled = false;
        if (id_editar !== 0) {
            const CargarDatosEditar = () => {
                var url = `${URL}Clientes/MostrarId/${id_editar}`;
                fetch(url)
                    .then(res => res.json())
                    .then(response => {
                        setDatos({
                            nombre: response.nombre,
                            id_tipodoc: response.id_tipodoc,
                            nrodoc: response.nrodoc,
                            id_giro_negocio: response.id_giro_negocio,
                            direccion: response.direccion,
                            referencia: response.referencia,
                            id_ubigeo: response.id_ubigeo,
                            contacto: response.contacto,
                            fecha_creacion: response.fecha_creacion === '' ? '' : new Date(response.fecha_creacion),
                            id_subagente: response.id_subagente,
                        })
                    });
            }
            CargarDatosEditar()
            return () => {
                isCancelled = true;
            }
        }
    }, [])
    useEffect(() => {
        let isCancelled = false;
        const CargarUbigeo = () => {
            var url = `${URL}Generales/Ubigeo`;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    setUbigeos(response);
                });
        }
        const CargarTipoDocumento = () => {
            var url = `${URL}Generales/TipoDocumento`;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    setTiposdocumentos(response);
                });
        }
        const CargarGiroNegocio = () => {
            var url = `${URL}Generales/GiroNegocios`;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    setGironegocios(response);
                });
        }
        const CargarSubAgentes = () => {
            var url = `${URL}SubAgentes/Mostrar`;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    setSubagentes(response);
                });
        }
        CargarUbigeo()
        CargarTipoDocumento()
        CargarGiroNegocio()
        CargarSubAgentes()
        return () => {
            isCancelled = true;
        }
    }, [])
    const CambiarOpcionUbicacion = (selectedOptions) => {
        setDatos({
            ...datos,
            id_ubigeo: selectedOptions,
        })
    }
    const CambiarOpcionTipoDocumento = (selectedOptions) => {
        setDatos({
            nombre: '',
            id_tipodoc: selectedOptions,
            nrodoc: '',
            id_giro_negocio: [],
            direccion: '',
            referencia: '',
            id_ubigeo: [],
            contacto: {
                nombre: '',
                telefono: '',
                celular: '',
                correo: '',
            },
            fecha_creacion: '',
            id_subagente: [],
        })
    }
    const CambiarGiroNegocio = (selectedOptions) => {
        setDatos({
            ...datos,
            id_giro_negocio: selectedOptions,
        })
    }
    const CambiarSubAgentes = (selectedOptions) => {
        setDatos({
            ...datos,
            id_subagente: selectedOptions,
        })
    }
    const CargarDatosSunat = (nrodoc) => {
        if (Object.entries(datos.id_tipodoc).length === 0) {
            setDatos({
                ...datos,
                nombre: '',
                id_giro_negocio: [],
                direccion: '',
                referencia: '',
                id_ubigeo: [],
                contacto: {
                    nombre: '',
                    telefono: '',
                    celular: '',
                    correo: '',
                },
                fecha_creacion: '',
                id_subagente: [],
            })
        } else {
            if (datos.id_tipodoc[0].id === "2" || datos.id_tipodoc[0].id === "4") {
                CambiarPreload('cargando datos sunat', true)
                var url = `${URL}Sunat/Datos`;
                let data = {
                    nrodoc: nrodoc
                }
                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(response => {
                        CambiarPreload('', false)
                        if (Object.entries(response).length === 0) {
                            setDatos({
                                ...datos,
                                nombre: '',
                                direccion: '',
                                referencia: '',
                                id_ubigeo: [],
                            })
                        } else {
                            setDatos({
                                ...datos,
                                nombre: response.result.RazonSocial,
                                direccion: response.Direccion_corregida,
                                referencia: '',
                                id_ubigeo: [{
                                    id: response.id,
                                    ubi_departamento: response.ubi_departamento,
                                    ubi_distrito: response.ubi_distrito,
                                    ubi_provincia: response.ubi_provincia,
                                }],
                                contacto: {
                                    ...datos.contacto,
                                    nombre: response.result.RazonSocial,
                                },
                            })
                        }
                    })
            } else {
                setDatos({
                    ...datos,
                    nombre: '',
                    id_giro_negocio: [],
                    direccion: '',
                    referencia: '',
                    id_ubigeo: [],
                    contacto: {
                        nombre: '',
                        telefono: '',
                        celular: '',
                        correo: '',
                    },
                    fecha_creacion: '',
                    id_subagente: [],
                })
            }
        }
    }
    const CambiarFechaCreacion = (date) => {
        setDatos({
            ...datos,
            fecha_creacion: date,
        })
    }
    const enviarDatosEditar = (event) => {
        CambiarPreload('Editando Contratante', true)
        event.preventDefault()
        const editar = {
            datos: datos,
            id_editar: id_editar,
        }
        var url = `${URL}Clientes/Editar`;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(editar),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if (response === 0) {
                    setBadge_mensaje({
                        style: 'success',
                        mensaje: 'Modificado correctamente.',
                    })
                }
                if (response === 1) {
                    setBadge_mensaje({
                        style: 'danger',
                        mensaje: 'Ocurrió un error.',
                    })
                }
                CambiarPreload('', false)
            })
    }
    const enviarDatosAgregar = (event) => {
        CambiarPreload('Agregando Contratante', true)
        event.preventDefault();
        var url = `${URL}Clientes/Agregar`;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                CambiarPreload('', false)
                if (response === 0) {
                    setBadge_mensaje({
                        style: 'success',
                        mensaje: 'Agregado correctamente.',
                    })
                    setDatos({
                        nombre: '',
                        id_tipodoc: [],
                        nrodoc: '',
                        id_giro_negocio: [],
                        direccion: '',
                        referencia: '',
                        id_ubigeo: [],
                        contacto: {
                            nombre: '',
                            telefono: '',
                            celular: '',
                            correo: '',
                        },
                        fecha_creacion: '',
                        id_subagente: [],
                    })
                }
                if (response === 1) {
                    setBadge_mensaje({
                        style: 'danger',
                        mensaje: 'Ocurrió un error.',
                    })
                }
                if (response === 2) {
                    setBadge_mensaje({
                        style: 'info',
                        mensaje: `El nro de documento ${datos.nrodoc} ya se encuentra registrado.`,
                    })
                }
            });
    }
    const [badge_mensaje, setBadge_mensaje] = useState({
        style: '',
        mensaje: '',
    });
    return (
        <>
            <Container fluid>
                <Form onSubmit={id_editar !== 0 ? enviarDatosEditar : enviarDatosAgregar}>
                    <Row className="justify-content-center my-2">
                        <Col xs={12}>
                            <Badge pill variant={badge_mensaje.style}>
                                {badge_mensaje.mensaje}
                            </Badge>
                            <Form.Group as={Row} controlId="id_tipodoc" className="mb-0">
                                <Form.Label column sm={3} className="text-right">
                                    Tipo de Documento<sup className="asterisco">*</sup>
                                </Form.Label>
                                <Col sm={9}>
                                    <Typeahead
                                        id="typeahead_"
                                        {...confiTypeahead}
                                        selected={datos.id_tipodoc}
                                        clearButton
                                        labelKey={option => `${option.descripcion.toUpperCase()}`}
                                        onChange={CambiarOpcionTipoDocumento}
                                        options={tiposdocumentos}
                                        size="small"
                                        inputProps={{ required: true }}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="nrodoc" className="mb-0">
                                <Form.Label column sm={3} className="text-right" >
                                    Número de Documento<sup className="asterisco">*</sup>
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="number" name="nrodoc" onChange={handleInputChange} size="sm" value={datos.nrodoc} onBlur={(event) => { CargarDatosSunat(event.target.value) }} required />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="nombre" className="mb-0">
                                <Form.Label column sm={3} className="text-right">
                                    Nombre ó Razon Social<sup className="asterisco">*</sup>
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="text" name="nombre" onChange={handleInputChange} size="sm" value={datos.nombre} required autoComplete="off" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="id_giro_negocio" className="mb-0">
                                <Form.Label column sm={3} className="text-right">
                                    Giro del Negocio
                                    </Form.Label>
                                <Col sm={9}>
                                    <Typeahead
                                        id="typeahead_2"
                                        {...confiTypeahead}
                                        selected={datos.id_giro_negocio}
                                        clearButton
                                        labelKey={option => `${option.descripcion.toUpperCase()}`}
                                        onChange={CambiarGiroNegocio}
                                        options={gironegocios}
                                        size="small"
                                        inputProps={{ required: false }}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="direccion" className="mb-0">
                                <Form.Label column sm={3} className="text-right">
                                    Dirección<sup className="asterisco">*</sup>
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="text" name="direccion" onChange={handleInputChange} size="sm" value={datos.direccion} required autoComplete="off" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="referencia" className="mb-0">
                                <Form.Label column sm={3} className="text-right">
                                    Referencia
                                    </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="text" name="referencia" onChange={handleInputChange} size="sm" value={datos.referencia} autoComplete="off" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="id_ubigeo" className="mb-0">
                                <Form.Label column sm={3} className="text-right">
                                    Ubicación<sup className="asterisco">*</sup>
                                </Form.Label>
                                <Col sm={9}>
                                    {/* <Form.Control as="select" name="id_ubigeo" onChange={handleInputChange} size="sm">
                                            {
                                                ubigeos.map((ubigeo, key) =>
                                                    <option value={ubigeo.id} key={key}>{ubigeo.ubi_departamento} - {ubigeo.ubi_provincia} - {ubigeo.ubi_distrito}</option>
                                                )
                                            }
                                        </Form.Control> */}
                                    <Typeahead
                                        id="typeahead_3"
                                        {...confiTypeahead}
                                        selected={datos.id_ubigeo}
                                        clearButton
                                        labelKey={option => `${option.ubi_departamento.toUpperCase()} - ${option.ubi_provincia.toUpperCase()} - ${option.ubi_distrito.toUpperCase()}`}
                                        onChange={CambiarOpcionUbicacion}
                                        options={ubigeos}
                                        size="small"
                                        inputProps={{ required: true }}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="fecha_creacion" className="mb-0">
                                <Form.Label column sm={3} className="text-right">
                                    Cumpleaños o Aniversario
                                        </Form.Label>
                                <Col sm={9}>
                                    <DatePicker
                                        onChange={CambiarFechaCreacion}
                                        // minDate={new Date()}
                                        selected={datos.fecha_creacion}
                                        name="fecha_creacion"
                                        dateFormat="yyyy-MM-dd"
                                        locale="es"
                                        showMonthDropdown
                                        showYearDropdown
                                        useShortMonthInDropdown
                                        //customInput={<Fechadiv ref={ref} />}
                                        className="form-control form-control-sm"
                                        autoComplete="off"
                                    />
                                </Col>
                            </Form.Group>
                            {/* <Form.Group as={Row} controlId="id_subagente" className="mb-0">
                                <Form.Label column sm={3} className="text-right">
                                    Sub Agente<sup className="asterisco">*</sup>
                                </Form.Label>
                                <Col sm={9}>
                                    <Typeahead
                                        id="typeahead_subagentes"
                                        {...confiTypeahead}
                                        selected={datos.id_subagente}
                                        clearButton
                                        labelKey={option => `${option.nombres} ${option.apellidos} ${option.abreviatura}`}
                                        onChange={CambiarSubAgentes}
                                        options={subagentes}
                                        size="small"
                                        inputProps={{ required: true }}
                                        renderMenuItemChildren={(option) => (
                                            <>
                                                <Row className="align-items-center justify-content-center">
                                                    <Col xs={6} md={1} lg={2}>
                                                        <Image className="w-75 text-center p-2" src="http://placeimg.com/400/400/any" roundedCircle fluid />
                                                    </Col>
                                                    <Col xs={12} md={11} lg={10}>
                                                        <div className="text-uppercase">{option.nombres} {option.apellidos}</div>
                                                        <div className="text-uppercase"><small><b>{option.abreviatura}</b></small></div>
                                                    </Col>
                                                </Row>
                                            </>
                                        )}
                                    />
                                </Col>
                            </Form.Group> */}


                            <Form.Group as={Row} controlId="nombre_contacto" className="mb-0">
                                <Form.Label column sm={3} className="text-right">
                                    Responsable del Pago<sup className="asterisco">*</sup>
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="text" name="nombre" onChange={handleInputChangecontacto} size="sm" value={datos.contacto.nombre} required autoComplete="off" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="telefono" className="mb-0">
                                <Form.Label column sm={3} className="text-right">
                                    Teléfono
                                    </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="number" name="telefono" onChange={handleInputChangecontacto} size="sm" value={datos.contacto.telefono} autoComplete="off" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="celular" className="mb-0">
                                <Form.Label column sm={3} className="text-right">
                                    Celular<sup className="asterisco">*</sup>
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="number" name="celular" onChange={handleInputChangecontacto} size="sm" value={datos.contacto.celular} required autoComplete="off" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="correo" className="mb-0">
                                <Form.Label column sm={3} className="text-right">
                                    Correo<sup className="asterisco">*</sup>
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control type="email" name="correo" onChange={handleInputChangecontacto} size="sm" value={datos.contacto.correo} required />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-0">
                                <Col sm={12} className="text-center">
                                    <Button variant="inicio" type="submit">
                                        {id_editar !== 0 ? 'Editar' : 'Agregar'} Contratante
                                        </Button>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>
    )
}
export default AuthAgregarCliente
