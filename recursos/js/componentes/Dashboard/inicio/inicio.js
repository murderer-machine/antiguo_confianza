import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from "react-dom"
import { Row, Col, Button, Alert, Image, Spinner } from 'react-bootstrap'
import { URL } from '../../../Variables'
import Menuprincipal from '../app'
import { MDBTable, MDBTableBody, MDBTableHead, MDBIcon, MDBAlert } from 'mdbreact';
import './inicio.scss'
import { GeneralContext } from '../../Context/GeneralContext'

const AuthInicio = () => {
    const { datos_user } = useContext(GeneralContext)
    const [fechahora, setfechahora] = useState({
        fecha: '',
        fecha_database: '',
        hora: '',
    })
    useEffect(() => {
        const interval = setInterval(() => {
            let crTime = new Date()
            let crHrs = crTime.getHours()
            let crMns = crTime.getMinutes()
            let crScs = crTime.getSeconds()
            crMns = crMns < 10 ? '0' + crMns : '' + crMns
            crScs = crScs < 10 ? '0' + crScs : '' + crScs
            crHrs = crTime.getHours() < 10 ? '0' + crTime.getHours() : crTime.getHours()
            let crTimeString = crHrs + ":" + crMns + ":" + crScs
            let dia = crTime.getDate() < 10 ? '0' + crTime.getDate() : crTime.getDate()
            let mes = (crTime.getMonth() + 1) < 10 ? '0' + (crTime.getMonth() + 1) : (crTime.getMonth() + 1)
            let ano = crTime.getFullYear()
            setfechahora({
                ...fechahora,
                fecha: `${dia}/${mes}/${ano}`,
                fecha_database: `${ano}-${mes}-${dia} ${crTimeString}`,
                hora: crTimeString,
            })
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    const [asistencia, setasistencia] = useState([])
    const [marcaasistencia, setmarcaasistencia] = useState(false)
    const [showalert, setshowalert] = useState({
        condicion: false,
        variant: '',
        texto: '',
    });
    const [btnmarcar, setbtnmarcar] = useState(false)
    const MarcarAsistencia = () => {
        setbtnmarcar(true)
        var url = `${URL}Inicio/Marcar`;
        fetch(url)
            .then(res => res.json())
            .then(response => {
                setTimeout(() => {
                    setbtnmarcar(false)
                    setmarcaasistencia(!marcaasistencia)
                    if (response.respuesta === 0) {
                        switch (response.mensaje) {
                            case 1:
                                setshowalert({
                                    condicion: true,
                                    variant: 'success',
                                    texto: 'Buenos días',
                                })
                                break;
                            case 2:
                                setshowalert({
                                    condicion: true,
                                    variant: 'success',
                                    texto: 'Disfrute tu almuerzo',
                                })
                                break;
                            case 3:
                                setshowalert({
                                    condicion: true,
                                    variant: 'success',
                                    texto: 'Ya falta poco para la salida',
                                })
                                break;
                            case 4:
                                setshowalert({
                                    condicion: true,
                                    variant: 'success',
                                    texto: 'Gracias por tu labor',
                                })
                                break;
                        }
                    }
                    if (response.respuesta === 1) {
                        setshowalert({
                            condicion: true,
                            variant: 'danger',
                            texto: 'ocurrió un error',
                        })
                    }
                    if (response.respuesta === 2) {
                        setshowalert({
                            condicion: true,
                            variant: 'warning',
                            texto: 'Ya termino su dia',
                        })
                    }
                    if (response.respuesta === 'ip' && response.mensaje === 'ip') {
                        setshowalert({
                            condicion: true,
                            variant: 'danger',
                            texto: 'No puede marcar si no esta en la red de CONFIANZA',
                        })
                    }
                }, 4000);
            });
    }
    useEffect(() => {
        let isCancelled = false
        const CargarTipoVigencia = () => {
            var url = `${URL}Inicio/CargaInicial`;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    setasistencia(response)
                });
        }
        CargarTipoVigencia()
        return () => {
            isCancelled = true
        }
    }, [marcaasistencia])
    return (
        <Row>
            <Col xs={12} lg={4} className="text-center">
                <div className="card_confianza">
                    <Image
                        className="py-3"
                        src={`${URL}recursos/img/logo400.svg`}
                        alt="logo_principal"
                        fluid
                    />
                    <h4 className="text-tercero text-capitalize">Bienvenid@ </h4>
                    <h4 className="text-tercero text-capitalize">{datos_user.nombres} {datos_user.apellidos}</h4>
                    <h4 className="text-tercero"><b>{fechahora.fecha} {fechahora.hora}</b></h4>
                    <Button variant="inicio" onClick={MarcarAsistencia} disabled={btnmarcar}>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            style={{ display: !btnmarcar ? 'none' : 'inline-block' }}
                        />{' '}
                        Marcar
                        </Button>
                    {showalert.condicion ? (
                        <Alert variant={showalert.variant}>
                            {showalert.texto} <b className="text-capitalize">{datos_user.nombres}</b>
                        </Alert>
                    ) : (<></>)}
                </div>
            </Col>
            <Col xs={12} lg={8} className="text-center">
                <div className="card_confianza">
                    {asistencia.map((item, i) => (
                        <Col xs={12} key={i} className="mb-2 item_asistencia">
                            <h4 className="p-0 m-0 mb-1 text-inicio">{item.datos_dia.dia_numero} {item.datos_dia.dia_nombre} <small>({item.datos_dia.mes_nombre})</small></h4>
                            {item.registros.map((registro, i) => (
                                <MDBAlert color="secondary" key={i}>
                                    <Row className="justify-content-center" key={i}>
                                        <Col xs={12} lg={12}>
                                            <h6 className="p-0 m-0 mb-1"><MDBIcon icon="user-circle" size="lg" /> {registro.usuario[0].nombres.toUpperCase()}  {registro.usuario[0].apellidos.toUpperCase()}</h6>
                                        </Col>
                                        <Col xs={12} lg={12} className="mb-2">
                                            <h6 className="p-0 m-0"> {registro.observacion === '' ? (
                                                <>
                                                    <MDBIcon icon="circle" className="green-text" /> <small className="text-uppercase">Sin incidencia</small>
                                                </>
                                            ) : (
                                                    <>
                                                        <MDBIcon icon="circle" className="red-text" /> <small className="text-uppercase">{registro.observacion}</small>
                                                    </>
                                                )}
                                            </h6>
                                            <h6 className="p-0 m-0">Información : {registro.info_hora} </h6>
                                        </Col>
                                        <Col xs={6} lg={3} className="text-center">
                                            <h6><MDBIcon icon="long-arrow-alt-right" className="green-text" size="lg" /> {registro.fecha_ingreso === '' || registro.fecha_ingreso === '00:00:00' ? (<span className="red-text"> <MDBIcon icon="exclamation-triangle" className="red-text" /> No Marcado</span>) : registro.fecha_ingreso}</h6>
                                        </Col>
                                        <Col xs={6} lg={3} className="text-center">
                                            <h6><MDBIcon icon="long-arrow-alt-left" className="red-text" size="lg" />  {registro.fecha_salida === '' || registro.fecha_salida === '00:00:00' ? (<span className="red-text"> <MDBIcon icon="exclamation-triangle" className="red-text" /> No Marcado</span>) : registro.fecha_salida}</h6>
                                        </Col>
                                        <Col xs={6} lg={3} className="text-center">
                                            <h6><MDBIcon icon="long-arrow-alt-right" className="green-text" size="lg" /> {registro.fecha_ingreso2 === '' || registro.fecha_ingreso2 === '00:00:00' ? (<span className="red-text"> <MDBIcon icon="exclamation-triangle" className="red-text" /> No Marcado</span>) : registro.fecha_ingreso2}</h6>
                                        </Col>
                                        <Col xs={6} lg={3} className="text-center">
                                            <h6><MDBIcon icon="long-arrow-alt-left" className="red-text" size="lg" /> {registro.fecha_salida2 === '' || registro.fecha_salida2 === '00:00:00' ? (<span className="red-text"> <MDBIcon icon="exclamation-triangle" className="red-text" /> No Marcado</span>) : registro.fecha_salida2}</h6>
                                        </Col>
                                    </Row>
                                </MDBAlert>
                            ))}
                        </Col>
                    )).reverse()}
                </div>
            </Col>
        </Row>
    )
}
export default AuthInicio

