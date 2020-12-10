import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Col, Row, Spinner } from 'react-bootstrap'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Button from '@material-ui/core/Button'
import { URL } from '../../../Variables'
import { MDBTable, MDBTableBody, MDBTableHead, MDBIcon, MDBAlert } from 'mdbreact'
import Alert from '@material-ui/lab/Alert';


const Motorizados = () => {
    const [ejecutivos, setejecutivos] = useState([])
    const [motorizadosdata, setmotorizadosdata] = useState([])
    const [condicion, setcondicion] = useState(true)
    const [datos, setdatos] = useState({
        ejecutivo: {},
        observacion: '',
    })
    useEffect(() => {
        let isCancelled = false
        const CargarEjecutivos = () => {
            var url = `${URL}Generales/Ejecutivos`
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    setejecutivos(response.ejecutivos)
                });
        }
        CargarEjecutivos()
        return () => {
            isCancelled = true
        }
    }, [])
    useEffect(() => {
        let isCancelled = false
        const CargarMotorizados = () => {
            var url = `${URL}Motorizados/Mostrar`
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    setmotorizadosdata(response)
                });
        }
        CargarMotorizados()
        return () => {
            isCancelled = true
        }
    }, [condicion])
    const [btnmarcar, setbtnmarcar] = useState(false)
    const [showalert_agregar, setshowalert_agregar] = useState({
        variant: 'info',
        texto: 'Recuerde que es una version BETA cualquier incidente tomar captura de pantalla y enviarlo a marcorodriguez@confianzayvida.com',
    });
    const AgregarMotorizado = async () => {
        setbtnmarcar(true)
        var url = `${URL}Motorizados/Agregar`
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                setbtnmarcar(false)
                if (response === 0) {
                    let nombre = `${datos.ejecutivo.nombres} ${datos.ejecutivo.apellidos}`
                    setcondicion(!condicion)
                    setdatos({
                        ejecutivo: {},
                        observacion: '',
                    })
                    setshowalert_agregar({
                        variant: 'success',
                        texto: `Se inicio ruta correctamente de ${nombre.toUpperCase()}`,
                    })
                    setTimeout(() => {
                        setshowalert_agregar({
                            variant: 'info',
                            texto: 'Recuerde que es una version BETA cualquier incidente tomar captura de pantalla y enviarlo a marcorodriguez@confianzayvida.com',
                        })
                    }, 6000);
                }
                if (response === 1) {
                    setshowalert_agregar({
                        variant: 'error',
                        texto: `Ocurrió un error al iniciar ruta. Informar al área TI`,
                    })
                }
            });
    }
    const MarcarRetorno = (id) => {
        var url = `${URL}Motorizados/MarcarRetorno/${id}`
        fetch(url)
            .then(res => res.json())
            .then(response => {
                setcondicion(!condicion)
            });
    }
    return (
        <>
            <Row>
                <Col xs={12} lg={4} className="text-center">
                    <div className="card_confianza">
                        <Col xs={12} className="mb-3">
                            <Autocomplete
                                options={ejecutivos}
                                getOptionLabel={(option) => Object.keys(option).length === 0 ? '' : `${option.nombres.toUpperCase()} ${option.apellidos.toUpperCase()}`}
                                value={datos.ejecutivo}
                                renderInput={(params) => <TextField {...params} label="Motorizados" variant="outlined" />}
                                renderOption={(option) => {
                                    return (
                                        <div>
                                            {option.nombres.toUpperCase()} {option.apellidos.toUpperCase()}
                                        </div>
                                    )
                                }}
                                onChange={(event, newValue) => {
                                    if (newValue == null) {
                                        setdatos({
                                            ...datos,
                                            ejecutivo: {}
                                        })
                                    } else {
                                        setdatos({
                                            ...datos,
                                            ejecutivo: newValue
                                        })
                                    }
                                }}
                            />
                        </Col>
                        <Col xs={12} className="mb-3">
                            <TextField
                                label="Observación"
                                multiline
                                rows={3}
                                value={datos.observacion}
                                onChange={(event) => {
                                    setdatos({
                                        ...datos,
                                        observacion: event.target.value
                                    })
                                }}
                            />
                        </Col>
                        <Col xs={12} className="mb-3">
                            <Button variant="contained" color="primary" onClick={AgregarMotorizado} disabled={btnmarcar}>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    style={{ display: !btnmarcar ? 'none' : 'inline-block' }}
                                    className="mr-1" />
                                Agregar Salida</Button>
                        </Col>
                        <Col xs={12} className="mb-3">
                            <Alert severity={showalert_agregar.variant}>{showalert_agregar.texto}</Alert>
                        </Col>
                    </div>
                </Col>
                <Col xs={12} lg={8} className="text-center">
                    <div className="card_confianza">
                        {motorizadosdata.map((item, i) => (
                            <Col xs={12} key={i} className="mb-2 item_asistencia">
                                <h4 className="p-0 m-0 mb-1 text-inicio">{item.datos_dia.dia_numero} {item.datos_dia.dia_nombre} <small>({item.datos_dia.mes_nombre})</small></h4>
                                {item.registros.map((registro, i) => (
                                    <MDBAlert color="secondary" key={i}>
                                        <Row className="justify-content-center" >
                                            <Col xs={12} lg={12}>
                                                <h6 className="p-0 m-0 mb-1"><MDBIcon icon="user-circle" size="lg" /> {registro.id_motorizado[0].nombres.toUpperCase()} {registro.id_motorizado[0].apellidos.toUpperCase()}</h6>
                                            </Col>
                                            <Col xs={12} lg={12} className="mb-2">
                                                <h6 className="p-0 m-0">Observación de salida :{registro.observacion.toUpperCase()} </h6>
                                                <h6 className="p-0 m-0"> {registro.observacion_retorno === '' ? (
                                                    <>
                                                        <MDBIcon icon="circle" className="green-text" /> <small className="text-uppercase">Sin incidencia</small>
                                                    </>
                                                ) : (
                                                        <>
                                                            <MDBIcon icon="circle" className="red-text" /> <small className="text-uppercase">{registro.observacion_retorno}</small>
                                                        </>
                                                    )}
                                                </h6>
                                                <h6 className="p-0 m-0">Información : {registro.info_hora} </h6>
                                            </Col>
                                            <Col xs={6} lg={3} className="text-center">
                                                <h6><MDBIcon icon="long-arrow-alt-right" className="green-text" size="lg" />  {registro.fecha_salida === '00:00:00' ? (<span className="red-text"> <MDBIcon icon="exclamation-triangle" className="red-text" /> No Marcado</span>) : registro.fecha_salida}</h6>
                                            </Col>
                                            <Col xs={6} lg={3} className="text-center">
                                                <h6><MDBIcon icon="long-arrow-alt-left" className="red-text" size="lg" />  {registro.fecha_retorno === '00:00:00' ?
                                                    (<>
                                                        <Button variant="contained" color="primary" size="small" onClick={() => { MarcarRetorno(registro.id) }}>
                                                            Marcar Retorno
                                                        </Button>
                                                    </>)
                                                    : registro.fecha_retorno}</h6>
                                            </Col>
                                        </Row>
                                    </MDBAlert>
                                ))}
                            </Col>
                        )).reverse()}
                    </div>
                </Col>
            </Row>
        </>
    )
}
export default Motorizados;
