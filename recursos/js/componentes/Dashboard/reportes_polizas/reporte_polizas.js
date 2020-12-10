import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Image, Button, Table } from 'react-bootstrap'
import ReactDOM from "react-dom"
import DatePicker from 'react-datepicker'
import { registerLocale, setDefaultLocale } from "react-datepicker"
import es from 'date-fns/locale/es'
import MaskedInput from 'react-text-mask'
import { Typeahead } from 'react-bootstrap-typeahead'
import { URL } from '../../../Variables'
import { EmojiFrown, Search, FileSpreadsheet, FileRichtext } from 'react-bootstrap-icons'
import Preload from '../../General/preload'
registerLocale('es', es)
const AuthReportePolizas = () => {
    const [preload, setPreload] = useState({
        texto: '',
        visible: false
    });
    const CambiarPreload = (texto, visible) => {
        setPreload({
            texto: texto,
            visible: visible
        })
    }
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
        lg: 12,
        xl: 12,
    }
    const config_input = {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12,
    }
    const [subagentes, setsubagentes] = useState([])
    const [reporte, setreporte] = useState([])
    const [datos, setDatos] = useState({
        fecha_inicio: '',
        fecha_final: '',
        id_subagente: [],
    })
    const CambiarFechaInicio = (date) => {
        setDatos({
            ...datos,
            fecha_inicio: date,
        })
    }
    const CambiarFechaFinal = (date) => {
        setDatos({
            ...datos,
            fecha_final: date,
        })
    }
    const CambiarSubAgentes = (selectedOptions) => {
        setDatos({
            ...datos,
            id_subagente: selectedOptions,
        })
    }
    const LimpiarCampos = () => {
        setreporte([])
        setDatos({
            fecha_inicio: '',
            fecha_final: '',
            id_subagente: [],
        })
    }
    const EnviarDatosAgregar = (event) => {
        CambiarPreload('buscando', true)
        // event.preventDefault()
        var url = `${URL}Polizas/Reporte`
      
    
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
                setreporte(response)
            });
    }
    useEffect(() => { EnviarDatosAgregar() }, [datos])
    useEffect(() => {
        let isCancelled = false;
        const CargarSubAgentes = () => {
            var url = `${URL}Generales/SubAgentesS/`
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    setsubagentes(response)
                });
        }
        CargarSubAgentes()
        return () => {
            isCancelled = true;
        }
    }, [])
    return (
        <>
            <Preload texto={preload.texto} visible={preload.visible}></Preload>
            <Container>
                <Row className="justify-content-center my-2 py-1">
                    <Form onSubmit={EnviarDatosAgregar} className="w-100">
                        <Col xs={12} className="card_confianza">
                            <Row className="align-items-end">
                                <Col xs={12} lg={2}>
                                    <Form.Group as={Row} controlId="fecha_inicio" className="mb-0">
                                        <Form.Label column {...config_label} className="col-form-label-left">
                                            Fecha Inicio<sup className="asterisco">*</sup>
                                        </Form.Label>
                                        <Col {...config_input}>
                                            <DatePicker
                                                id="fecha_inicio"
                                                onChange={CambiarFechaInicio}
                                                selected={datos.fecha_inicio}
                                                name="fecha_inicio"
                                                dateFormat="dd/MM/yyyy"
                                                locale="es"
                                                showMonthDropdown
                                                showYearDropdown
                                                useShortMonthInDropdown
                                                className="form-control form-control-sm"
                                                autoComplete="off"
                                                // isClearable
                                                customInput={
                                                    <MaskedInput
                                                        type="text"
                                                        mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
                                                    />
                                                }
                                                required
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} lg={2}>
                                    <Form.Group as={Row} controlId="fecha_fin" className="mb-0">
                                        <Form.Label column {...config_label} className="col-form-label-left">
                                            Fecha Inicio<sup className="asterisco">*</sup>
                                        </Form.Label>
                                        <Col {...config_input}>
                                            <DatePicker
                                                id="fecha_fin"
                                                onChange={CambiarFechaFinal}
                                                selected={datos.fecha_final}
                                                name="fecha_inicio"
                                                dateFormat="dd/MM/yyyy"
                                                locale="es"
                                                showMonthDropdown
                                                showYearDropdown
                                                useShortMonthInDropdown
                                                className="form-control form-control-sm"
                                                autoComplete="off"
                                                // isClearable
                                                customInput={
                                                    <MaskedInput
                                                        type="text"
                                                        mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
                                                    />
                                                }
                                                required
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} lg={4}>
                                    <Form.Group as={Row} controlId="typeahead_subagentes" className="mb-0">
                                        <Form.Label column {...config_label} className="col-form-label-left">
                                            Sub Agente
                                        </Form.Label>
                                        <Col {...config_input}>
                                            <Typeahead
                                                id="typeahead_subagentes"
                                                {...confiTypeahead}
                                                selected={datos.id_subagente}
                                                clearButton
                                                labelKey={option => `${option.nombres.toUpperCase()} ${option.apellidos.toUpperCase()} ${option.abreviatura.toUpperCase()}`}
                                                onChange={CambiarSubAgentes}
                                                options={subagentes}
                                                size="small"
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} lg={4} className="mt-2">
                                    <Form.Group as={Row} className="mb-0 ">
                                        <Col xs={12} className="text-center">
                                            {/* <Button className="my-1" variant="inicio" type="submit" size="sm">
                                                Buscar <Search size={20} />
                                            </Button>{' '} */}
                                            <Button className="my-1" variant="inicio" size="sm" onClick={LimpiarCampos}>
                                                Limpiar <FileRichtext size={20} />
                                            </Button>{' '}
                                            <Button className="my-1" variant="inicio" size="sm" href={datos.fecha_inicio == '' || datos.fecha_final == '' ? '' : `${URL}Polizas/ReporteExcel/${datos.fecha_inicio}/${datos.fecha_final}/${datos.id_subagente.length === 0 ? '' : datos.id_subagente[0].id}`}>
                                                Export a excel <FileSpreadsheet size={20} />
                                            </Button>{' '}
                                            <Button className="my-1" variant="inicio" size="sm" disabled>
                                                Export a pdf <FileRichtext size={20} />
                                            </Button>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                {/* {JSON.stringify(datos)} */}
                            </Row>
                        </Col>
                    </Form>
                </Row>
            </Container>
            <Container className="container_">
                <Row className="justify-content-center">
                    {reporte.length === 0 ? (
                        <Col xs={12} className="card_confianza text-center">
                            <EmojiFrown /> No se encontraron resultados
                        </Col>) : (
                            <Col xs={12} className="card_confianza text-center">
                                <Table striped bordered hover size="sm" responsive>
                                    <thead>
                                        <tr>
                                            <th>FECHA VENTA</th>
                                            <th>Nº PÓLIZA</th>
                                            <th>Nº DE CERTIFICADO</th>
                                            <th>COMPAÑIA</th>
                                            <th>PLACA</th>
                                            <th>IMPORTE</th>
                                            <th>PRIMA NETA</th>
                                            <th>COMISIÓN</th>
                                            <th>%</th>
                                            <th>COMISION AGENTE</th>
                                            <th>DATOS DEL CLIENTE</th>
                                            <th>USO</th>
                                            <th>TIPO EMISIÓN</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reporte.map((item, i) => (
                                            <tr key={i}>
                                                <td>{item.fecha_emision}</td>
                                                <td>{item.nro_poliza}</td>
                                                <td>{item.nro_certificado}</td>
                                                <td className="text-left"><small>{item.empresa}</small></td>
                                                <td>{item.placa}</td>
                                                <td>{item.prima_total}</td>
                                                <td>{item.prima_neta}</td>
                                                <td>{item.comision}</td>
                                                <td>{item.porcentaje}</td>
                                                <td>{item.comision_subagente}</td>
                                                <td className="text-left"><small>{item.cliente}</small></td>
                                                <td>{item.nombre}</td>
                                                <td>{item.tipo}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Col>
                        )}
                </Row>
            </Container>
        </>
    )
}
export default AuthReportePolizas
