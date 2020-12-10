import React, { useState, useEffect, useRef, } from 'react'
import { Container, Row, Col, Card, Alert } from 'react-bootstrap'
import { Form, Badge, Button } from 'react-bootstrap'
import { URL } from '../../../Variables'
import { Typeahead } from 'react-bootstrap-typeahead'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import AgregarDocumento from './agregar_documento'
import AgregarVehiculos from './agregar_vehiculos'
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle, ModalDialog } from 'react-bootstrap'
import AgregarClientes from '../clientes/agregar_cliente'
const AgregarPoliza = ({ CambiarPreload }) => {
    const [ModalAgregar, setModalAgregar] = useState(false)
    const CerrarModalAgregar = () => setModalAgregar(false)
    const AbrirModalAgregar = () => setModalAgregar(true)
    const ComponenteDocumento = useRef()
    const ComponenteVehiculo = useRef()
    const confiTypeahead = {
        disabled: false,
        dropup: false,
        flip: true,
        highlightOnlyResult: false,
        minLength: 0,
        open: undefined,
    }
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
    const [asegurados, setasegurados] = useState(true)
    const [clientes, setclientes] = useState([])
    const [ramos, setramos] = useState([])
    const [empresas, setempresas] = useState([])
    const [productos, setproductos] = useState([])
    const [monedas, setmonedas] = useState([])
    const [idusuario, setidusuario] = useState('')
    const [empresas_bancarias, setempresas_bancarias] = useState([])
    const [datos, setDatos] = useState({
        nro_poliza: '',
        nro_poliza_corregido: '',
        id_cliente: [],
        id_empresa: [],
        id_producto: [],
        id_ramo: [],
        moneda: [],
        descripcion: '',
        endoso_a_favor: [],
        datos_documento: {},
        datos_vehiculos: {},
    })
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }
    useEffect(() => {
        if (datos.nro_poliza == '') {
            setDatos({
                ...datos,
                nro_poliza_corregido: ''
            })
        } else {
            if (datos.id_empresa.length !== 0 || datos.id_ramo.length !== 0) {
                if (datos.id_ramo[0].id != '66') {
                    setDatos({
                        ...datos,
                        nro_poliza_corregido: datos.nro_poliza
                    })
                }
                if (datos.id_empresa[0].id == '19' && datos.id_ramo[0].id == '66') {
                    setDatos({
                        ...datos,
                        nro_poliza_corregido: '00000' + datos.nro_poliza + '00000000000' + '1'
                    })
                }
                if (datos.id_empresa[0].id == '12' && datos.id_ramo[0].id == '66') {
                    var hoy = new Date()
                    var ano = hoy.getFullYear()
                    ano = ano.toString().substr(-2)
                    if (datos.datos_documento.nro_certificado === '') {
                        setDatos({
                            ...datos,
                            nro_poliza_corregido: '302' + ano + datos.nro_poliza.padStart(8, "0")
                        })
                    } else {
                        setDatos({
                            ...datos,
                            nro_poliza_corregido: '302' + ano + datos.nro_poliza.padStart(8, "0") + '-1'
                        })
                    }

                }
                if (datos.id_empresa[0].id == '15' && datos.id_ramo[0].id == '66') {
                    setDatos({
                        ...datos,
                        nro_poliza_corregido: '200' + datos.nro_poliza
                    })
                }
                if (datos.id_empresa[0].id == '16' && datos.id_ramo[0].id == '66') {
                    if (datos.datos_documento.nro_certificado === '') {
                        setDatos({
                            ...datos,
                            nro_poliza_corregido: '700' + datos.nro_poliza + '-0' //corregir
                        })
                    } else {
                        let ultimoCaracter = datos.nro_poliza.charAt(datos.nro_poliza.length - 1);
                        let nro_poliza = datos.nro_poliza.substring(0, datos.nro_poliza.length - 1);
                        setDatos({
                            ...datos,
                            nro_poliza_corregido: '400' + nro_poliza + '-' + ultimoCaracter
                        })
                    }

                }
                if (datos.id_empresa[0].id == '6' && datos.id_ramo[0].id == '66') {
                    if (datos.datos_documento.nro_certificado !== '') {
                        setDatos({
                            ...datos,
                            nro_poliza_corregido: '0000000054' + '-' + datos.nro_poliza.padStart(10, "0")
                        })
                    } else {
                        setDatos({
                            ...datos,
                            nro_poliza_corregido: '05412' + datos.nro_poliza.padStart(8, "0")
                        })
                    }
                }
                if (datos.id_empresa[0].id == '9' && datos.id_ramo[0].id == '66') {
                    setDatos({
                        ...datos,
                        nro_poliza_corregido: datos.nro_poliza
                    })
                }
            }
        }
    }, [datos.nro_poliza, datos.datos_documento])

    const [badge_mensaje, setBadge_mensaje] = useState({
        style: '',
        mensaje: '',
    });
    useEffect(() => {
        const CargarProductos = () => {
            var url = `${URL}Generales/ProductosSeguro/${datos.id_empresa.length === 0 ? '0' : datos.id_empresa[0].id}`;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    setproductos(response);
                });
        }
        CargarProductos()
    }, [datos.id_empresa])
    const [showVerificaPoliza, setshowVerificaPoliza] = useState(false);
    const [showVerificaCertificado, setshowVerificaCertificado] = useState(false);
    useEffect(() => {
        const VerificaPoliza = () => {
            var url = `${URL}Polizas/VerficarPoliza/${datos.nro_poliza}`;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    if (response == 0) {
                    } setshowVerificaPoliza(true)
                    if (response == 1) {

                        setshowVerificaPoliza(false)
                    }
                });
        }
        VerificaPoliza()
    }, [datos.nro_poliza])
    const CargarClientes = () => {
        var url = `${URL}Generales/Clientes`;
        fetch(url)
            .then(res => res.json())
            .then(response => {
                setclientes(response);
            });
    }
    useEffect(() => {
        CargarClientes()
    }, [ModalAgregar])
    useEffect(() => {
        let isCancelled = false;
        const CargarRamos = () => {
            var url = `${URL}Generales/Ramos`;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    setramos(response);
                });
        }
        const CargarEmpresas = () => {
            var url = `${URL}Generales/EmpresaasSeguro`;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    setempresas(response);
                });
        }
        const CargarMonedas = () => {
            var url = `${URL}Generales/Monedas`;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    setmonedas(response);
                });
        }
        const CargarEmpresasBancarias = () => {
            var url = `${URL}Generales/EmpresasBancarias`;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    setempresas_bancarias(response)
                });
        }
        CargarClientes()
        CargarRamos()
        CargarEmpresas()
        CargarMonedas()
        CargarEmpresasBancarias()
        return () => {
            isCancelled = true;
        }
    }, [])
    const CambiarCliente = (selectedOptions) => {
        setDatos({
            ...datos,
            id_cliente: selectedOptions,
        })
    }
    const CambiarEmpresaBancaria = (selectedOptions) => {
        setDatos({
            ...datos,
            endoso_a_favor: selectedOptions,
        })
    }
    const CambiarRamos = (selectedOptions) => {
        ComponenteDocumento.current.ResetCampos()
        setDatos({
            ...datos,
            id_ramo: selectedOptions,
            nro_poliza: '',
            nro_poliza_corregido: ''
        })
    }
    const CambiarMoneda = (selectedOptions) => {
        setDatos({
            ...datos,
            moneda: selectedOptions,
        })
    }
    const CambiarEmpresa = (selectedOptions) => {
        ComponenteDocumento.current.ResetCampos()
        setDatos({
            ...datos,
            id_empresa: selectedOptions,
            id_producto: [],
            id_ramo: [],
            nro_poliza: '',
            nro_poliza_corregido: ''
        })
    }
    const CambiarProducto = (selectedOptions) => {
        ComponenteDocumento.current.ResetCampos()
        setDatos({
            ...datos,
            id_producto: selectedOptions,
            id_ramo: selectedOptions.length === 0 ? [] : ramos.filter(item => item.id === selectedOptions[0].id_ramo),
            nro_poliza: '',
            nro_poliza_corregido: ''
        })
    }
    const EnviarImagen = (id_poliza, id_poliza_documento) => {

        CambiarPreload('Subiendo Documentos', true)
        var fileField = document.querySelector("input[type='file']")

        var formData = new FormData()
        for (const file of fileField.files) {
            formData.append('avatar[]', file, file.name)
        }
        formData.append('id_poliza', id_poliza)
        formData.append('id_poliza_documento', id_poliza_documento)
        var url = `${URL}Ejemplos/Ejemplo`
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {

                CambiarPreload('', false)
                setBadge_mensaje({
                    style: 'success',
                    mensaje: 'Agregada póliza correctamente.',
                })
                fileField.value = null
                ComponenteDocumento.current.ResetFile()
            });
    }
    const enviarDatosAgregar = (event) => {
        event.preventDefault();
        if (
            datos.id_cliente.length === 0 ||
            datos.id_empresa.length === 0 ||
            datos.id_producto.length === 0 ||
            datos.id_ramo.length === 0 ||
            datos.datos_documento.id_subagente.length === 0 ||
            datos.datos_documento.tipo_vigencia.length === 0 ||
            datos.datos_documento.ejecutivo.length === 0 ||
            datos.datos_documento.tipo_documento_poliza.length === 0 ||
            datos.datos_documento.tipo_pago.length === 0 ||
            datos.datos_vehiculos.clase.length === 0 ||
            datos.datos_vehiculos.uso.length === 0 ||
            datos.datos_vehiculos.categoria.length === 0 ||
            datos.datos_vehiculos.marca.length === 0 ||
            datos.datos_vehiculos.modelo.length === 0 ||
            datos.datos_vehiculos.ano.length === 0
        ) {
            setBadge_mensaje({
                style: 'danger',
                mensaje: 'Campos sin rellenar',
            })
        } else {
            CambiarPreload('agregando póliza', true)
            var url = `${URL}Polizas/Agregar`;
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
                    if (response.respuesta_poliza === 0 && response.respuesta_documento_poliza === 0 && response.respuesta_vehiculo_poliza === 0) {

                        setDatos({
                            nro_poliza: '',
                            id_cliente: [],
                            id_empresa: [],
                            id_producto: [],
                            id_ramo: [],
                            moneda: [],
                            descripcion: '',
                            endoso_a_favor: [],
                            datos_documento: {},
                            datos_vehiculos: {}
                        })
                        ComponenteDocumento.current.ResetCamposGeneral()
                        ComponenteVehiculo.current.ResetCamposGeneral()
                        EnviarImagen(response.id_poliza, response.id_poliza_documento)
                    }
                    if (
                        (response.respuesta_poliza === 1 && response.respuesta_documento_poliza === 0 && response.respuesta_vehiculo_poliza === 0) ||
                        (response.respuesta_poliza === 0 && response.respuesta_documento_poliza === 1 && response.respuesta_vehiculo_poliza === 0) ||
                        (response.respuesta_poliza === 0 && response.respuesta_documento_poliza === 0 && response.respuesta_vehiculo_poliza === 1) ||
                        (response.respuesta_poliza === 1 && response.respuesta_documento_poliza === 1 && response.respuesta_vehiculo_poliza === 0) ||
                        (response.respuesta_poliza === 0 && response.respuesta_documento_poliza === 1 && response.respuesta_vehiculo_poliza === 1) ||
                        (response.respuesta_poliza === 1 && response.respuesta_documento_poliza === 0 && response.respuesta_vehiculo_poliza === 0) ||
                        (response.respuesta_poliza === 1 && response.respuesta_documento_poliza === 1 && response.respuesta_vehiculo_poliza === 1)
                    ) {
                        setBadge_mensaje({
                            style: 'danger',
                            mensaje: 'Ocurrió un error.',
                        })
                    }
                });
        }
    }
    const CambiarDatosDocumento = (datos_documento) => {
        setDatos({
            ...datos,
            datos_documento: datos_documento
        })
    }
    const CambiarDatosVehiculos = (datos_vehiculos) => {
        setDatos({
            ...datos,
            datos_vehiculos: datos_vehiculos
        })
    }

    return (
        <>
            <Container fluid>
                <Form onSubmit={enviarDatosAgregar}>
                    <Row className="justify-content-center my-2 py-1">
                        <Col xs={12} className="pb-2">


                            <Form.Group as={Row} controlId="typeahead_empresas" className="mb-0">
                                <Form.Label column {...config_label} >
                                    Compañia<sup className="asterisco">*</sup>
                                </Form.Label>
                                <Col {...config_input}>
                                    <Typeahead
                                        id="typeahead_empresas"
                                        {...confiTypeahead}
                                        selected={datos.id_empresa}
                                        clearButton
                                        labelKey={option => `${option.nombre.toUpperCase()}`}
                                        onChange={CambiarEmpresa}
                                        options={empresas}
                                        size="small"
                                        inputProps={{ required: true }}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="typeahead_productos" className="mb-0">
                                <Form.Label column {...config_label} >
                                    Producto<sup className="asterisco">*</sup>
                                </Form.Label>
                                <Col {...config_input}>
                                    <Typeahead
                                        id="typeahead_productos"
                                        {...confiTypeahead}
                                        selected={datos.id_producto}
                                        clearButton
                                        labelKey={option => `${option.nombre.toUpperCase()}`}
                                        onChange={CambiarProducto}
                                        options={productos}
                                        size="small"
                                        inputProps={{ required: true }}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="typeahead_ramos" className="mb-0">
                                <Form.Label column {...config_label} >
                                    Ramo<sup className="asterisco">*</sup>
                                </Form.Label>
                                <Col {...config_input}>
                                    <Typeahead
                                        id="typeahead_ramos"
                                        {...confiTypeahead}
                                        selected={datos.id_ramo}
                                        clearButton
                                        labelKey={option => `${option.descripcion.toUpperCase()}`}
                                        onChange={CambiarRamos}
                                        options={ramos}
                                        size="small"
                                        inputProps={{ required: true }}
                                        disabled={true}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="moneda" className="mb-0">
                                <Form.Label column {...config_label} >
                                    Moneda<sup className="asterisco">*</sup>
                                </Form.Label>
                                <Col {...config_input}>
                                    <Typeahead
                                        id="typeahead_poliza"
                                        {...confiTypeahead}
                                        selected={datos.moneda}
                                        clearButton
                                        labelKey={option => `${option.nombre.toUpperCase()} - ${option.simbolo.toUpperCase()}`}
                                        onChange={CambiarMoneda}
                                        options={monedas}
                                        size="small"
                                        inputProps={{ required: true }}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="nro_poliza" className="mb-0">
                                <Form.Label column {...config_label} >
                                    Nº Póliza<sup className="asterisco">*</sup>
                                </Form.Label>
                                <Col {...config_input}>
                                    <Form.Control type="text" name="nro_poliza" onChange={handleInputChange} size="sm" value={datos.nro_poliza} required readOnly={datos.id_empresa.length === 0 || datos.id_producto.length === 0 || datos.id_ramo === 0 ? true : false} autoComplete="off" />
                                    {/* {JSON.stringify(datos.nro_poliza_corregido)} */}
                                    {showVerificaPoliza ? (<>
                                        <Alert variant="danger" onClose={() => setshowVerificaPoliza(false)} className="my-1">
                                            Nº de Póliza <b>{datos.nro_poliza}</b> ya se encuentra registrado.
                                        </Alert>
                                    </>) : (<></>)}
                                    {datos.nro_poliza !== '' ? (<>
                                        <Alert variant="success" className="my-1">
                                            <small>Nº de Póliza </small><b>{datos.nro_poliza_corregido}</b>
                                        </Alert>
                                    </>) : (<></>)}

                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="typeahead_poliza" className="mb-0">
                                <Form.Label column {...config_label} >
                                    Contratante<sup className="asterisco">*</sup>
                                </Form.Label>
                                <Col {...config_input}>
                                    <Typeahead
                                        id="typeahead_poliza"
                                        {...confiTypeahead}
                                        selected={datos.id_cliente}
                                        clearButton
                                        labelKey={option => `${option.nombre.toUpperCase()} ${option.nrodoc.toUpperCase()}`}
                                        onChange={CambiarCliente}
                                        options={clientes}
                                        size="small"
                                        inputProps={{ required: true }}
                                    />
                                    <Button variant="inicio" onClick={AbrirModalAgregar} size="sm" className="my-1">
                                        Agregar Contratante
                                </Button>
                                </Col>
                            </Form.Group>
                            {/* <Form.Group as={Row} controlId="asegurado" className="mb-0">
                                <Form.Label column {...config_label} >
                                    Asegurado<sup className="asterisco">*</sup>
                                </Form.Label>
                                <Col {...config_input}>
                                    <BootstrapSwitchButton
                                        checked={asegurados}
                                        onstyle="inicio"
                                        // offstyle="secondary"
                                        size="sm"
                                        onlabel="Si"
                                        offlabel="No"
                                        onChange={(checked) => {
                                            setasegurados(checked)
                                        }}
                                    />
                                   
                                </Col>
                            </Form.Group> */}
                            <Form.Group as={Row} controlId="descripcion" className="mb-0">
                                <Form.Label column {...config_label} >
                                    Descripción
                                </Form.Label>
                                <Col {...config_input}>
                                    <Form.Control type="text" name="descripcion" onChange={handleInputChange} size="sm" value={datos.descripcion} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="typeahead_empresas" className="mb-0">
                                <Form.Label column {...config_label} >
                                    Endoso a favor
                                </Form.Label>
                                <Col {...config_input}>
                                    <Typeahead
                                        id="typeahead_endoso"
                                        {...confiTypeahead}
                                        selected={datos.endoso_a_favor}
                                        clearButton
                                        labelKey={option => `${option.nombre.toUpperCase()}`}
                                        onChange={CambiarEmpresaBancaria}
                                        options={empresas_bancarias}
                                        size="small"
                                        inputProps={{ required: false }}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Col>
                                    <hr />
                                </Col>
                            </Form.Group>
                            <AgregarDocumento ref={ComponenteDocumento} moneda={datos.moneda} id_empresa={datos.id_empresa} id_producto={datos.id_producto} id_ramo={datos.id_ramo} CambiarDatosDocumentos={CambiarDatosDocumento} />
                            <Form.Group as={Row} >
                                <Col>
                                    <hr />
                                </Col>
                            </Form.Group>
                            <AgregarVehiculos ref={ComponenteVehiculo} CambiarDatosVehiculos={CambiarDatosVehiculos} />
                            <Form.Group as={Row} className="mb-0">
                                <Col xs={12} className="text-center">
                                    <Button className='my-1' variant="inicio" type="submit" size="sm">
                                        Agregar Póliza
                                        </Button>
                                </Col>
                                <Col xs={12}>
                                    <Badge pill variant={badge_mensaje.style}>
                                        {badge_mensaje.mensaje}
                                    </Badge>
                                </Col>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <Modal show={ModalAgregar} onHide={CerrarModalAgregar} size="xl" centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        <Card.Title>Datos Contratante                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Aquí podra agregar datos del contratante.</Card.Subtitle>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AgregarClientes CambiarPreload={CambiarPreload} />
                </Modal.Body>
            </Modal>
            {JSON.stringify(datos)}

        </>
    )
}
export default AgregarPoliza