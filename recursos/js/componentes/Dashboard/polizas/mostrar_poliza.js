import React, { useState, useEffect } from 'react'
import { Accordion, Badge, Image, Table, Card } from 'react-bootstrap'
import TablePagination from '@material-ui/core/TablePagination'
import { Form, InputGroup, } from 'react-bootstrap'
import { Container, Row, Col } from 'react-bootstrap'
import { Search } from 'react-bootstrap-icons'
import { TrashFill, Pencil, CardHeading, EmojiFrown, Paperclip, } from 'react-bootstrap-icons'
import { URL } from '../../../Variables'
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle, ModalDialog } from 'react-bootstrap'
import AgregarAdjuntoDocumento from './agregar_adjunto_documento'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import DatePicker from 'react-datepicker'
import { registerLocale, setDefaultLocale } from "react-datepicker"
import es from 'date-fns/locale/es'
import MaskedInput from 'react-text-mask'
import { addDays } from "date-fns"
import './mostrar_poliza.scss'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Alert from '@material-ui/lab/Alert';

registerLocale('es', es)
const AuthMostrarPolizas = ({ CambiarPreload }) => {
    const [datosfiltro, setdatosfiltro] = useState({
        fecha_emision_inicio: '',
        fecha_emision_fin: '',
        
    })
    const [polizas, setpolizas] = useState([]);
    const MostrarPolizas = async () => {
        var url = `${URL}Polizas/MostrarActualizado`
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(datosfiltro),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                setpolizas(response)
            });
    }
    useEffect(() => {
        let isCancellede = false;
        MostrarPolizas()
        return () => {
            isCancellede = true;
        }
    }, [datosfiltro.fecha_emision_inicio, datosfiltro.fecha_emision_fin])

    const CambiarFechaEmision_inicio = (date) => {
        setdatosfiltro({
            ...datosfiltro,
            fecha_emision_inicio: date,
        })
    }
    const CambiarFechaEmision_fin = (date) => {
        setdatosfiltro({
            ...datosfiltro,
            fecha_emision_fin: date,
        })
    }
    const [filtrogeneral, setFiltrogeneral] = useState('')
    const [empresa, setempresa] = useState({})
    const [filtroproducto, setfiltroproducto] = useState({})
    const [filtrocliente, setfiltrocliente] = useState({})

    const [empresas, setempresas] = useState([])
    const [productos, setproductos] = useState([])
    const [clientes, setclientes] = useState([])
    useEffect(() => {
        let isCancelled = false;
        const CargarEmpresas = () => {
            var url = `${URL}Generales/EmpresaasSeguro`;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    setempresas(response);
                });
        }
        const CargarClientes = () => {
            var url = `${URL}Generales/Clientes`;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    setclientes(response);
                });
        }
        CargarClientes()
        CargarEmpresas()
        return () => {
            isCancelled = true;
        }
    }, [])
    useEffect(() => {
        const CargarProductos = () => {
            var url = `${URL}Generales/ProductosSeguro/${Object.keys(empresa).length === 0 ? '0' : empresa.id}`;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    setproductos(response);
                });
        }
        CargarProductos()
    }, [empresa])
    const [datos_adjunto, setdatos_adjunto] = useState({
        id_poliza: '',
        id_poliza_documento: '',
    })
    const [ModalAgregarDocumento, setModalAgregarDocumento] = useState(false)
    const CerrarModalAgregarDocumento = () => setModalAgregarDocumento(false)
    const AbrirModalAgregarDocumento = (id, documento) => {
        setdatos_adjunto({
            id_poliza: id,
            id_poliza_documento: documento,
        })
        setModalAgregarDocumento(true)
    }
    const [pagina_actual, setPagina_actual] = useState(0)
    const [elementos_por_pagina, setElementos_pagina] = useState(10)
    const datos_generales_empresa = polizas.filter(documento => Object.keys(empresa).length === 0 ? documento.poliza[0].id_empresa[0].id.includes('') : documento.poliza[0].id_empresa[0].id === empresa.id)
    const datos_generales_producto = datos_generales_empresa.filter(documento => Object.keys(filtroproducto).length === 0 ? documento.poliza[0].id_producto[0].id.includes('') : documento.poliza[0].id_producto[0].id === filtroproducto.id)
    const datos_generales_clientes = datos_generales_producto.filter(documento => Object.keys(filtrocliente).length === 0 ? documento.poliza[0].id_cliente[0].nombre.includes('') : documento.poliza[0].id_cliente[0].id === filtrocliente.id)
    const datos_generales = datos_generales_clientes.sort((a, b) => b['id'] - a['id']).filter(documento => documento.poliza[0].nro_poliza.includes(filtrogeneral) || documento.poliza[0].nro_poliza_corregido.includes(filtrogeneral))
    const CantidadPaginas = parseInt(Math.ceil(Object.keys(datos_generales).length))
    const final = (pagina_actual + 1) * elementos_por_pagina
    const inicio = final - elementos_por_pagina
    const handleChangePage = (event, newPage) => {
        setPagina_actual(newPage)
    }
    const handleChangeRowsPerPage = (event) => {
        setElementos_pagina(parseInt(event.target.value, 10))
        setPagina_actual(0)
    }
    const LimpiarFiltros = () => {
        setempresa({})
        setFiltrogeneral('')
        setfiltroproducto({})
        setfiltrocliente({})
    }
    return (
        <>
            <Row>
                <Col xs={12} lg={3}>
                    <Row>
                        <Col xs={12} className="mb-3">
                            <DatePicker
                                id="fecha_emision_inicio"
                                onChange={CambiarFechaEmision_inicio}
                                selected={datosfiltro.fecha_emision_inicio}
                                dateFormat="dd/MM/yyyy"
                                maxDate={addDays(new Date(), 0)}
                                locale="es"
                                showMonthDropdown
                                showYearDropdown
                                useShortMonthInDropdown
                                autoComplete="off"
                                customInput={
                                    <TextField id="standard-basic" label="Fecha emisión inicio" color="primary" />
                                }
                                required
                            />
                        </Col>
                        <Col xs={12} className="mb-3">
                            <DatePicker
                                id="fecha_emision_fin"
                                onChange={CambiarFechaEmision_fin}
                                selected={datosfiltro.fecha_emision_fin}
                                dateFormat="dd/MM/yyyy"
                                maxDate={addDays(new Date(), 0)}
                                locale="es"
                                showMonthDropdown
                                showYearDropdown
                                useShortMonthInDropdown
                                autoComplete="off"
                                customInput={
                                    <TextField id="standard-basic" label="Fecha emisión fin" color="primary" />
                                }
                                required
                            />
                        </Col>
                        <Col xs={12} className="mb-3">
                            <Autocomplete
                                options={empresas}
                                getOptionLabel={(option) => Object.keys(option).length === 0 ? '' : `${option.nombre.toUpperCase()}`}
                                value={empresa}
                                renderInput={(params) => <TextField {...params} label="Compañia" variant="outlined" />}
                                renderOption={(option) => {
                                    return (
                                        <div>
                                            {option.nombre.toUpperCase()}
                                        </div>
                                    )
                                }}
                                onChange={(event, newValue) => {
                                    if (newValue == null) {
                                        setempresa({})
                                        setPagina_actual(0)
                                    } else {
                                        setempresa(newValue)
                                        setPagina_actual(0)
                                    }
                                }}
                            />
                        </Col>
                  
                        <Col xs={12} className="mb-3">
                            <Button variant="contained" color="primary" onClick={LimpiarFiltros}>Limpiar Filtros</Button>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} lg={9}>
                    {datos_generales.slice(inicio, final).map((documento, i) => (
                        <Col xs={12} className="mb-2 card_confianza" key={i}>
                            <Accordion>
                                <Accordion.Toggle as="div" eventKey="0" className="cursor-pointer">
                                    <Row className="align-items-center">
                                        <Col xs={8} lg={8}>
                                            <h5 className="p-0 m-0 text-inicio font-weight-bold">Nº {documento.poliza[0].nro_poliza_corregido === '' ? documento.poliza[0].nro_poliza.toUpperCase() : documento.poliza[0].nro_poliza_corregido.toUpperCase()} {documento.poliza[0].id_ramo[0].descripcion.toUpperCase()}</h5>
                                            {documento.poliza[0].id_cliente[0].nombre.toUpperCase()} - {documento.poliza[0].id_cliente[0].nrodoc.toUpperCase()}<br />
                                        </Col>
                                        <Col xs={4} lg={4}>
                                            <div className="text-center">
                                                <CardHeading color="#C7941C" size={23} onClick={() => { alert(datos_generales[i]['id']) }} className="mr-2 cursor-pointer" />
                                                <Pencil color="#277687" size={23} onClick={() => alert(datos_generales[i]['id'])} className="mr-2 cursor-pointer" />
                                                <TrashFill color="#656565" size={23} onClick={() => { alert(datos_generales[i]['id']) }} className="mr-2 cursor-pointer" />
                                            </div>
                                        </Col>
                                    </Row>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <>
                                        <Row>
                                            <Col xs={12} lg={12}>
                                                <div className="p-3 card_confianza card_confianza_background">
                                                    <Image src={`${URL}recursos/img/logos_empresas_seguros/${documento.poliza[0].id_empresa[0].logo}`} fluid style={{ width: '100px' }} /><br />
                                                    <b>{documento.poliza[0].id_empresa[0].nombre.toUpperCase()}</b><br />
                                                    <b>Producto : </b>{documento.poliza[0].id_producto[0].nombre.toUpperCase()}<br />
                                                    <b>Ramo : </b>{documento.poliza[0].id_ramo[0].descripcion.toUpperCase()}<br />
                                                    {documento.poliza[0].endoso_a_favor.length === 0 ? (<></>) : (<><b>Endoso a favor : </b>{documento.poliza[0].endoso_a_favor[0].nombre.toUpperCase()}</>)}
                                                </div>
                                            </Col>
                                            <Col xs={12} lg={12}>
                                                <div className="p-3 card_confianza card_confianza_background">
                                                    <Row >
                                                        <Col xs={12} lg={6}>
                                                            <h5 className="p-0 m-0 text-inicio">{documento.poliza[0].id_ramo[0].descripcion.toUpperCase()} {documento.poliza[0].id_ramo[0].id === '66' ? documento.poliza[0].id_ramo[0].id === '66' && documento.nro_certificado !== '' ? 'FÍSICO' : 'DIGITAL' : ''} {documento.tipo_documento_poliza[0].id === '1' ? (<><Badge variant="dark" pill>E</Badge></>) : (<><Badge variant="secondary" pill>R</Badge></>)}</h5>
                                                            <b>Sub Agente : </b>{documento.id_subagente[0].nombres.toUpperCase()} {documento.id_subagente[0].apellidos.toUpperCase()} {documento.id_subagente[0].abreviatura.toUpperCase()}<br />
                                                            <b>Ejecutivo : </b>{documento.ejecutivo[0].nombres.toUpperCase()} {documento.ejecutivo[0].apellidos.toUpperCase()}<br />
                                                            <h5 className="p-0 m-0 mb-1">
                                                                <Badge variant="anaranjado"><b>Fecha Emisión : </b>{documento.fecha_emision.toUpperCase()}</Badge>{' '}
                                                                <Badge variant="anaranjado"><b>Tipo de Vigencia : </b>{documento.tipo_vigencia[0].nombre.toUpperCase()}</Badge>
                                                            </h5>
                                                            <h5 className="p-0 m-0 mb-1">
                                                                <Badge variant="inicio_border"><b>Vigencia Desde : </b>{documento.fecha_vigencia_inicio.toUpperCase()}</Badge>{' '}
                                                                <Badge variant="inicio_border"><b>Vigencia Hasta : </b>{documento.fecha_vigencia_fin.toUpperCase()}</Badge>
                                                            </h5>
                                                            {documento.archivos.length === 0 ? (
                                                                <>
                                                                    <Button className='my-2' variant="contained" color="primary" onClick={() => { AbrirModalAgregarDocumento(documento.poliza[0].id, documento.id) }}>
                                                                        <Paperclip />
                                                                    </Button>
                                                                </>
                                                            ) :
                                                                <>
                                                                    <b>Documentos : </b>
                                                                    <Row>
                                                                        {documento.archivos.map((archivo, i_archivo) => (
                                                                            <Col xs={6} key={i_archivo}>
                                                                                <a target="_blank" href={`${URL}recursos/documentos/${documento.poliza[0].id}/${documento.id}/${archivo}`} key={i_archivo}>
                                                                                    <img
                                                                                        className="d-inline-block"
                                                                                        src={`${URL}recursos/img/pdf.svg`}
                                                                                        style={{ width: '25px' }}
                                                                                    />{' '}{archivo}
                                                                                </a>
                                                                            </Col>
                                                                        ))}
                                                                    </Row>
                                                                    <Button className='my-2' variant="contained" color="primary" onClick={() => { AbrirModalAgregarDocumento(documento.poliza[0].id, documento.id) }} >
                                                                        <Paperclip />
                                                                    </Button>
                                                                </>
                                                            }
                                                        </Col>
                                                        <Col xs={12} lg={6}>
                                                            <Row>
                                                                <Col xs={6}><b>Prima Total :</b></Col>
                                                                <Col xs={6}>{documento.poliza[0].moneda[0].simbolo} {documento.prima_total}</Col>
                                                                <Col xs={6}><b>Prima Comercial :</b></Col>
                                                                <Col xs={6}>{documento.poliza[0].moneda[0].simbolo} {documento.prima_comercial}</Col>
                                                                <Col xs={6}><b>Prima Neta :</b></Col>
                                                                <Col xs={6}>{documento.poliza[0].moneda[0].simbolo} {documento.prima_neta}</Col>
                                                                <Col xs={6}><b>Comisión Broker:</b></Col>
                                                                <Col xs={6}>{documento.poliza[0].moneda[0].simbolo} {documento.comision} {documento.pago_empresa === '0' ? (<><Badge variant="danger">COM. POR PAGAR</Badge></>) : (<><Badge variant="success">COM. PAGADA</Badge></>)}</Col>
                                                                <Col xs={6}><b>Porcentaje :</b></Col>
                                                                <Col xs={6}>% {documento.porcentaje}</Col>
                                                                <Col xs={6}><b>Comisión Sub Agente :</b></Col>
                                                                <Col xs={6}>{documento.poliza[0].moneda[0].simbolo} {documento.comision_subagente} {documento.pago_sub_agente === '0' ? (<><Badge variant="danger">COM. POR PAGAR</Badge></>) : (<><Badge variant="success">COM. PAGADA</Badge></>)}</Col>
                                                            </Row>
                                                        </Col>
                                                        {documento.cupones.map((cupon, i) => (
                                                            <Col xs={12} sm={6} md={4} lg={3} key={i} className="text-center">
                                                                <Alert
                                                                    severity={{
                                                                        "0": "warning",
                                                                        "1": "success",
                                                                        "2": "error",
                                                                    }[cupon.situacion]}
                                                                    className="p-3 my-3 text-center"
                                                                    icon={{
                                                                        "0": <SentimentSatisfiedIcon fontSize="large" />,
                                                                        "1": <InsertEmoticonIcon fontSize="large" />,
                                                                        "2": <SentimentVeryDissatisfiedIcon fontSize="large" />,
                                                                    }[cupon.situacion]
                                                                    }>
                                                                    <b>FECHA PAGO : </b><br />
                                                                    <h6>{cupon.fecha_obligacion}</h6>
                                                                    <b>Nº CUOTA : </b><br />
                                                                    <h6>{cupon.nro_cuota}</h6>
                                                                    <b>IMPORTE : </b><br />
                                                                    <h5><b>{documento.poliza[0].moneda[0].simbolo} {cupon.importe}</b></h5>
                                                                    <div
                                                                        style={{
                                                                            backgroundColor: {
                                                                                "0": "#FFA117",
                                                                                "1": "#5CB660",
                                                                                "2": "#F6685C",
                                                                            }[cupon.situacion],
                                                                            fontWeight: 'bold',
                                                                            color: '#fff',
                                                                            borderRadius: '15px',
                                                                            textShadow: '1px 1px 2px rgba(0, 0, 0, 1)'
                                                                        }}>
                                                                        {{
                                                                            "0": (<><h6>PENDIENTE</h6></>),
                                                                            "1": (<><h6>CANCELADO</h6></>),
                                                                            "2": (<><h6>VENCIDO</h6></>),
                                                                        }[cupon.situacion]
                                                                        }
                                                                    </div>
                                                                    <div
                                                                        className="nro_cupon"
                                                                        style={{
                                                                            backgroundColor: {
                                                                                "0": "#FFA117",
                                                                                "1": "#5CB660",
                                                                                "2": "#F6685C",
                                                                            }[cupon.situacion]
                                                                        }}>
                                                                        {i + 1}
                                                                    </div>
                                                                </Alert>
                                                            </Col>
                                                        ))}
                                                    </Row>
                                                </div>
                                            </Col>
                                            {documento.vehiculos_poliza.length === 0 ? (<></>) : (<>
                                                <Col xs={12} lg={12}>
                                                    <div className="p-3 card_confianza card_confianza_background">
                                                        {documento.vehiculos_poliza.map((vehiculo, i_) => (
                                                            <Row key={i_}>
                                                                <Col xs={12} lg={12}>
                                                                    <Row>
                                                                        <Col xs={6} lg={6}><b>Placa : </b>{vehiculo.placa.toUpperCase()}<br /></Col>
                                                                        <Col xs={6} lg={6}><b>Clase :</b>{vehiculo.clase[0].nombre.toUpperCase()}<br /></Col>
                                                                        <Col xs={6} lg={6}><b>Uso : </b>{vehiculo.uso[0].nombre.toUpperCase()}<br /></Col>
                                                                        <Col xs={6} lg={6}><b>Categoría : </b>{vehiculo.categoria[0].nombre.toUpperCase()}<br /></Col>
                                                                        <Col xs={6} lg={6}><b>Marca : </b>{vehiculo.marca[0].marca.toUpperCase()}<br /></Col>
                                                                        <Col xs={6} lg={6}><b>Modelo : </b>{vehiculo.modelo[0].modelo.toUpperCase()}<br /></Col>
                                                                        <Col xs={6} lg={6}><b>Año : </b>{vehiculo.ano.toUpperCase()}<br /></Col>
                                                                        <Col xs={6} lg={6}><b>Nº de Asientos : </b>{vehiculo.nro_asientos.toUpperCase()}<br /></Col>
                                                                        <Col xs={6} lg={6}><b>Nº de Pasajeros : </b>{vehiculo.nro_pasajeros.toUpperCase()}<br /></Col>
                                                                        <Col xs={6} lg={6}><b>Nº de Serie : </b>{vehiculo.nro_serie.toUpperCase()}<br /></Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                        ))}
                                                    </div>
                                                </Col>
                                            </>)}
                                        </Row>
                                    </>
                                </Accordion.Collapse>
                            </Accordion>
                        </Col>
                    ))}
                    {datos_generales.length === 0 ? (<Col xs={12} className="text-center mb-2 card_confianza"><EmojiFrown /> No se encontraron resultados</Col>) : ''}
                    <Col xs={12} className="mb-2 card_confianza">
                        <TablePagination
                            component="div"
                            count={CantidadPaginas}
                            page={pagina_actual}
                            onChangePage={handleChangePage}
                            rowsPerPage={elementos_por_pagina}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Col>
                </Col>
            </Row>
            <Modal show={ModalAgregarDocumento} onHide={CerrarModalAgregarDocumento} size="xl" centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        <Card.Title>Documentos Adjuntos                       </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Aquí podra agregar documentos adjuntos.</Card.Subtitle>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AgregarAdjuntoDocumento data_id_poliza={datos_adjunto.id_poliza} data_id_poliza_documento={datos_adjunto.id_poliza_documento} CambiarPreload={CambiarPreload} Actualizar={MostrarPolizas} />
                </Modal.Body>
            </Modal>
        </>
    )
}
export default AuthMostrarPolizas