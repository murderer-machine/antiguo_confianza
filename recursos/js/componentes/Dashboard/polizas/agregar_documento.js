import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Form, Row, Col, Badge, Image, Alert } from 'react-bootstrap'
import { URL } from '../../../Variables'
import { Typeahead } from 'react-bootstrap-typeahead'
import DatePicker from 'react-datepicker'
import { registerLocale, setDefaultLocale } from "react-datepicker"
import es from 'date-fns/locale/es'
import MaskedInput from 'react-text-mask'
import { Paperclip, InfoCircle, InfoCircleFill } from 'react-bootstrap-icons'
import AgregarCupones from '../cupones/agregar_cupones'
registerLocale('es', es)
const AgregarDocumentos = forwardRef(({ moneda = [], id_empresa = [], id_producto = [], id_ramo = [], CambiarDatosDocumentos = () => { } }, ref) => {
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
    const [showVerificaCertificadoDatabase, setshowVerificaCertificadoDatabase] = useState(false);
    const [subagentes, setsubagentes] = useState([])
    const [tipo_vigencia, settipo_vigencia] = useState([])
    const [ejecutivos, setejecutivos] = useState([])
    const [tipo_documento_poliza, settipo_documento_poliza] = useState([])
    const [tipo_pago, settipo_pago] = useState([])
    const [badge_nro_poliza, setbadge_nro_poliza] = useState({
        class: '',
        nombre: ''
    })
    const [nombre_archivos, setnombre_archivos] = useState('')
    const [datos, setDatos] = useState({
        id_subagente: [],
        fecha_emision: '',
        tipo_vigencia: [],
        fecha_vigencia_inicio: '',
        fecha_vigencia_fin: '',
        ejecutivo: [],
        prima_total: '',
        prima_comercial: '',
        prima_neta: '',
        comision: '',
        porcentaje: '',
        comision_subagente: '',
        tipo_documento_poliza: [],
        tipo_pago: [],
        nro_certificado: '',
        cupones: [],
    })

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }
    const CambiarSubAgentes = (selectedOptions) => {
        setDatos({
            ...datos,
            id_subagente: selectedOptions,
            prima_total: '',
            prima_comercial: '',
            prima_neta: '',
            comision: '',
            porcentaje: '',
            comision_subagente: '',
            nro_certificado: ''
        })

    }
    const CambiarFechaEmision = (date) => {
        setDatos({
            ...datos,
            fecha_emision: date,
        })
    }
    const CambiarTipoVigencia = (selectedOptions) => {
        setDatos({
            ...datos,
            tipo_vigencia: selectedOptions,
        })
    }
    const CambiarFechaVigenciaInicio = (date) => {
        setDatos({
            ...datos,
            fecha_vigencia_inicio: date,
        })
    }
    const CambiarFechaVigenciaFin = (date) => {
        setDatos({
            ...datos,
            fecha_vigencia_fin: date,
        })
    }
    const CambiarEjecutivo = (selectedOptions) => {
        setDatos({
            ...datos,
            ejecutivo: selectedOptions,
        })
    }
    const CambiarTipoDocumentoPoliza = (selectedOptions) => {
        setDatos({
            ...datos,
            tipo_documento_poliza: selectedOptions,
        })
    }
    const CambiarTipoPago = (selectedOptions) => {
        setDatos({
            ...datos,
            tipo_pago: selectedOptions,
            cupones: [],
        })
    }
    useImperativeHandle(ref, () => ({
        ResetCampos() {
            setDatos({
                ...datos,
                prima_total: '',
                prima_comercial: '',
                prima_neta: '',
                comision: '',
                porcentaje: '',
                comision_subagente: '',
            })
        },
        ResetCamposGeneral() {
            setDatos({
                ...datos,
                id_subagente: [],
                fecha_emision: '',
                tipo_vigencia: [],
                fecha_vigencia_inicio: '',
                fecha_vigencia_fin: '',
                ejecutivo: [],
                prima_total: '',
                prima_comercial: '',
                prima_neta: '',
                comision: '',
                porcentaje: '',
                comision_subagente: '',
                tipo_documento_poliza: [],
                tipo_pago: [],
                nro_certificado: '',
            })
        },
        ResetFile() {
            setnombre_archivos('')
        }
    }))
    useEffect(() => {
        CargarSubAgentes()
    }, [id_producto])
    useEffect(() => {
        setDatos({
            ...datos,
            id_subagente: [],
        })
    }, [id_empresa, id_producto, id_ramo])
    const CargarSubAgentes = () => {
        var url = `${URL}Generales/SubAgentes/${id_empresa.length === 0 ? '0' : id_empresa[0].id}/${id_producto.length === 0 ? '0' : id_producto[0].id}`;
        fetch(url)
            .then(res => res.json())
            .then(response => {
                setsubagentes(response);
            });
    }

    useEffect(() => {
        let isCancelled = false;

        const CargarTipoVigencia = () => {
            var url = `${URL}Generales/TipoVigencia`;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    settipo_vigencia(response)
                });
        }
        const CargarEjecutivos = () => {
            var url = `${URL}Generales/Ejecutivos`;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    setejecutivos(response.ejecutivos)
                });
        }
        const CargarTipoDocumentoPoliza = () => {
            var url = `${URL}Generales/TipoDocumentoPoliza`;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    settipo_documento_poliza(response)
                    setDatos({
                        ...datos,
                        tipo_documento_poliza: response.filter(item => item.id === '1'),
                    })
                });
        }
        const CargarTipoPago = () => {
            var url = `${URL}Generales/TipoPago`;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    settipo_pago(response)
                });
        }
        CargarTipoVigencia()
        CargarEjecutivos()
        CargarTipoDocumentoPoliza()
        CargarTipoPago()
        return () => {
            isCancelled = true;
        }
    }, [])
    const CambiarDatosCupones = (datos_cupones) => {
        setDatos({
            ...datos,
            cupones: datos_cupones
        })
    }
    useEffect(() => {
        CambiarDatosDocumentos(datos)
    }, [datos])
    useEffect(() => {
        if (datos.tipo_vigencia.length !== 0 && datos.fecha_vigencia_inicio !== '') {
            const ObtenerFecha = () => {
                var url = `${URL}Fechas/SumaMes/${datos.fecha_vigencia_inicio}/${datos.tipo_vigencia[0].dias}`;
                fetch(url)
                    .then(res => res.json())
                    .then(response => {
                        setDatos({
                            ...datos,
                            fecha_vigencia_fin: new Date(response)
                        })
                    });
            }
            ObtenerFecha()
        }
    }, [datos.fecha_vigencia_inicio, datos.tipo_vigencia])
    const [showVerificaCertificadoFisico, setshowVerificaCertificadoFisico] = useState({
        condicion: false,
        class: '',
        nombre: '',
    });

    useEffect(() => {
        const CargarCertificadoFisisico = () => {
            var url = `${URL}CertificadosFisicos/Pertenece/${datos.id_subagente.length === 0 ? 0 : datos.id_subagente[0].id}/${id_empresa.length === 0 ? 0 : id_empresa[0].id}/${datos.nro_certificado === '' ? 0 : datos.nro_certificado}`;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    if (response === 0) {
                        setshowVerificaCertificadoFisico({
                            condicion: true,
                            class: 'success',
                            nombre: `pertenece al subagente ${datos.id_subagente.length === 0 ? 'sub agente' : datos.id_subagente[0].nombres.toUpperCase() + ' ' + datos.id_subagente[0].apellidos.toUpperCase()}`
                        })
                    }
                    if (response === 1) {
                        setshowVerificaCertificadoFisico({
                            condicion: true,
                            class: 'danger',
                            nombre: `no pertenece al subagente ${datos.id_subagente.length === 0 ? 'sub agente' : datos.id_subagente[0].nombres.toUpperCase() + ' ' + datos.id_subagente[0].apellidos.toUpperCase()}`
                        })
                    }
                    if (response === 2) {
                        setshowVerificaCertificadoFisico({
                            condicion: false,
                            class: '',
                            nombre: ''
                        })
                    }
                });
        }
        CargarCertificadoFisisico()
    }, [datos.nro_certificado])

    useEffect(() => {
        const VerificaPolizaDocumento = () => {
            var url = `${URL}Polizas/VerficarPolizaDocumento/${datos.nro_certificado}`;
            fetch(url)
                .then(res => res.json())
                .then(response => {

                    if (response == 0) {
                    } setshowVerificaCertificadoDatabase(true)
                    if (response == 1) {
                        setshowVerificaCertificadoDatabase(false)
                    }
                });
        }
        VerificaPolizaDocumento()
    }, [datos.nro_certificado])
    const CambiarPrimaTotal = (e) => {
        if (id_empresa.length !== 0 && id_producto.length !== 0 && datos.id_subagente.length !== 0 && id_ramo.length !== 0) {
            var prima_comercial = parseFloat(datos.prima_total) / 1.18
            var factor = id_ramo[0].id === '66' ? parseFloat(id_empresa[0].factor_soat) : parseFloat(id_empresa[0].factor_general)
            var prima_neta = parseFloat(datos.prima_total) / parseFloat(factor)
            var gasto_e = id_ramo[0].id === '66' ? parseFloat(id_empresa[0].gastos_emision_minimo_soat) : parseFloat(id_empresa[0].gastos_emision_minimo)
            prima_neta = parseFloat(prima_comercial) - parseFloat(prima_neta)
            prima_neta = parseFloat(prima_neta) > parseFloat(gasto_e) ? parseFloat(datos.prima_total) / parseFloat(factor) : parseFloat(prima_comercial) - parseFloat(gasto_e)
            var comision = id_producto[0].comision === '0.00' ? 0 : parseFloat(prima_neta) * parseFloat(id_producto[0].comision) / 100
            var porcentaje = parseFloat(comision) * 100 / parseFloat(prima_neta)
            var comision_subagente = parseFloat(comision) * parseFloat(datos.id_subagente[0].comisiones.length === 0 ? 0 : datos.id_subagente[0].comisiones[0].comision) / 100
            setDatos({
                ...datos,
                prima_total: parseFloat(datos.prima_total).toFixed(2),
                prima_comercial: parseFloat(prima_comercial).toFixed(2),
                prima_neta: parseFloat(prima_neta).toFixed(2),
                comision: parseFloat(comision).toFixed(2),
                porcentaje: parseFloat(porcentaje).toFixed(2),
                comision_subagente: parseFloat(comision_subagente).toFixed(2),
            })
        }
    }
    const CambiarPorcentaje = () => {
        if (id_empresa.length !== 0 && id_producto.length !== 0 && datos.id_subagente.length !== 0 && id_ramo.length !== 0) {
            var comision = parseFloat(datos.prima_neta) * parseFloat(datos.porcentaje) / 100
            var comision_subagente = parseFloat(comision) * parseFloat(datos.id_subagente[0].comisiones.length === 0 ? 0 : datos.id_subagente[0].comisiones[0].comision) / 100
            setDatos({
                ...datos,
                porcentaje: parseFloat(datos.porcentaje).toFixed(2),
                comision: parseFloat(comision).toFixed(2),
                comision_subagente: parseFloat(comision_subagente).toFixed(2)
            })
        }
    }
    const CambiarArchivos = (e) => {
        e.target.files.length === 0 ? setnombre_archivos('') : setnombre_archivos(`${e.target.files.length} ${e.target.files.length === 1 ? 'archivo' : 'archivos'}`);
    }
    const CambiarComision = (e) => {
        if (id_empresa.length !== 0 && id_producto.length !== 0 && datos.id_subagente.length !== 0 && id_ramo.length !== 0) {
            var porcentaje = parseFloat(datos.comision) * 100 / parseFloat(datos.prima_neta)
            var comision_subagente = parseFloat(datos.comision) * parseFloat(datos.id_subagente[0].comisiones.length === 0 ? 0 : datos.id_subagente[0].comisiones[0].comision) / 100
            setDatos({
                ...datos,
                comision: parseFloat(datos.comision).toFixed(2),
                porcentaje: parseFloat(porcentaje).toFixed(2),
                comision_subagente: parseFloat(comision_subagente).toFixed(2),
            })
        }
    }
    return (
        <>
            <Form.Group as={Row} controlId="typeahead_subagentes" className="mb-0">
                <Form.Label column {...config_label} >
                    Sub Agente<sup className="asterisco">*</sup>
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
                        inputProps={{ required: true }}

                    />
                    {/* {JSON.stringify(datos.id_subagente)}
                    <hr />
                    {JSON.stringify(subagentes)} */}
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="fecha_emision" className="mb-0">
                <Form.Label column {...config_label} >
                    Fecha de Emisión<sup className="asterisco">*</sup>
                </Form.Label>
                <Col {...config_input}>
                    <DatePicker
                        id="fecha_emision"
                        onChange={CambiarFechaEmision}
                        selected={datos.fecha_emision}
                        name="fecha_creacion"
                        dateFormat="dd/MM/yyyy"
                        locale="es"
                        showMonthDropdown
                        showYearDropdown
                        useShortMonthInDropdown
                        className="form-control form-control-sm"
                        autoComplete="off"
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
            <Form.Group as={Row} controlId="typeahead_tipovigencia" className="mb-0">
                <Form.Label column {...config_label} >
                    Tipo de Vigencia<sup className="asterisco">*</sup>
                </Form.Label>
                <Col {...config_input}>
                    <Typeahead
                        id="typeahead_tipovigencia"
                        {...confiTypeahead}
                        selected={datos.tipo_vigencia}
                        clearButton
                        labelKey={option => `${option.nombre.toUpperCase()}`}
                        onChange={CambiarTipoVigencia}
                        options={tipo_vigencia}
                        size="small"
                        inputProps={{ required: true }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="fecha_vigencia_inicio" className="mb-0">
                <Form.Label column {...config_label} >
                    Vigencia Inicio<sup className="asterisco">*</sup>
                </Form.Label>
                <Col {...config_input}>
                    <DatePicker
                        id="fecha_vigencia_inicio"
                        onChange={CambiarFechaVigenciaInicio}
                        // minDate={new Date()}
                        selected={datos.fecha_vigencia_inicio}
                        name="fecha_creacion"
                        dateFormat="dd/MM/yyyy"
                        locale="es"
                        showMonthDropdown
                        showYearDropdown
                        useShortMonthInDropdown
                        customInput={
                            <MaskedInput
                                type="text"
                                mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
                            />
                        }
                        required
                        className="form-control form-control-sm"
                        autoComplete="off"
                    />                                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="fecha_vigencia_fin" className="mb-0">
                <Form.Label column {...config_label} >
                    Vigencia Fin<sup className="asterisco">*</sup>
                </Form.Label>
                <Col {...config_input}>
                    <DatePicker
                        id="fecha_vigencia_fin"
                        onChange={CambiarFechaVigenciaFin}
                        // minDate={new Date()}
                        selected={datos.fecha_vigencia_fin}
                        name="fecha_creacion"
                        dateFormat="dd/MM/yyyy"
                        locale="es"
                        showMonthDropdown
                        showYearDropdown
                        useShortMonthInDropdown
                        customInput={
                            <MaskedInput
                                type="text"
                                mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
                            />
                        }
                        required
                        className="form-control form-control-sm"
                        autoComplete="off"
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="typeahead_empresas" className="mb-0">
                <Form.Label column {...config_label} >
                    Ejecutivo<sup className="asterisco">*</sup>
                </Form.Label>
                <Col {...config_input}>
                    <Typeahead
                        id="typeahead_ejecutivo"
                        {...confiTypeahead}
                        selected={datos.ejecutivo}
                        clearButton
                        labelKey={option => `${option.nombres.toUpperCase()} ${option.apellidos.toUpperCase()}`}
                        onChange={CambiarEjecutivo}
                        options={ejecutivos}
                        size="small"
                        inputProps={{ required: true }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="prima_total" className="mb-0">
                <Form.Label column {...config_label} >
                    Prima Total {moneda.length === 0 ? '' : `- ${moneda[0].simbolo}`}<sup className="asterisco">*</sup>
                </Form.Label>
                <Col {...config_input}>
                    <Form.Control type="number" name="prima_total" onChange={handleInputChange} size="sm" value={datos.prima_total} required onBlur={CambiarPrimaTotal} readOnly={id_empresa.length === 0 || id_producto.length === 0 || datos.id_subagente.length === 0 || id_ramo.length === 0 ? true : false} step="any" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="prima_comercial" className="mb-0">
                <Form.Label column {...config_label} >
                    Prima Comercial {moneda.length === 0 ? '' : `- ${moneda[0].simbolo}`}<sup className="asterisco">*</sup>
                </Form.Label>
                <Col {...config_input}>
                    <Form.Control type="number" name="prima_comercial" onChange={handleInputChange} size="sm" value={datos.prima_comercial} required readOnly step="any" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="prima_neta" className="mb-0">
                <Form.Label column {...config_label} >
                    Prima Neta {moneda.length === 0 ? '' : `- ${moneda[0].simbolo}`}<sup className="asterisco">*</sup>
                </Form.Label>
                <Col {...config_input}>
                    <Form.Control type="number" name="prima_neta" onChange={handleInputChange} size="sm" value={datos.prima_neta} required readOnly step="any" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="comision" className="mb-0">
                <Form.Label column {...config_label} >
                    Comisión {moneda.length === 0 ? '' : `- ${moneda[0].simbolo}`}<sup className="asterisco">*</sup>
                </Form.Label>
                <Col {...config_input}>
                    <Form.Control type="number" name="comision" onChange={handleInputChange} onBlur={CambiarComision} size="sm" value={datos.comision} required readOnly={id_empresa.length === 0 || id_producto.length === 0 || datos.id_subagente.length === 0 || id_ramo.length === 0 ? true : false} step="any" />
                    <Form.Text id="passwordHelpBlock" muted className="text-danger mb-3">
                        <InfoCircle /> Puede cambiar la comisión si en caso fuera necesario.
                    </Form.Text>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="porcentaje" className="mb-0">
                <Form.Label column {...config_label} >
                    Porcentaje {moneda.length === 0 ? '' : `- % `}<sup className="asterisco">*</sup>
                </Form.Label>
                <Col {...config_input}>
                    <Form.Control type="number" name="porcentaje" onChange={handleInputChange} size="sm" value={datos.porcentaje} required readOnly={id_empresa.length === 0 || id_producto.length === 0 || datos.id_subagente.length === 0 || id_ramo.length === 0 ? true : false} onBlur={CambiarPorcentaje} step="any" />
                    <Form.Text id="passwordHelpBlock" className="text-danger mb-3">
                        <InfoCircle /> Recuerde verificar si es el procentaje correcto.
                    </Form.Text>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="comision_subagente" className="mb-0">
                <Form.Label column {...config_label} >
                    Comisión Sub Agente {moneda.length === 0 ? '' : `- ${moneda[0].simbolo}`}<sup className="asterisco">*</sup>
                </Form.Label>
                <Col {...config_input}>
                    <Form.Control type="number" name="comision_subagente" onChange={handleInputChange} size="sm" value={datos.comision_subagente} required readOnly step="any" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="typeahead_tipo_documento_poliza" className="mb-0">
                <Form.Label column {...config_label} >
                    Tipo Documento<sup className="asterisco">*</sup>
                </Form.Label>
                <Col {...config_input}>
                    <Typeahead
                        id="typeahead_tipo_documento_poliza"
                        {...confiTypeahead}
                        selected={datos.tipo_documento_poliza}
                        clearButton
                        labelKey={option => `${option.nombre.toUpperCase()}`}
                        onChange={CambiarTipoDocumentoPoliza}
                        options={tipo_documento_poliza}
                        size="small"
                        inputProps={{ required: true }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="typeahead_tipo_pago" className="mb-0">
                <Form.Label column {...config_label} >
                    Tipo Pago<sup className="asterisco">*</sup>
                </Form.Label>
                <Col {...config_input}>
                    <Typeahead
                        id="typeahead_tipo_pago"
                        {...confiTypeahead}
                        selected={datos.tipo_pago}
                        clearButton
                        labelKey={option => `${option.nombre.toUpperCase()}`}
                        onChange={CambiarTipoPago}
                        options={tipo_pago}
                        size="small"
                        inputProps={{ required: true }}
                    />
                </Col>
            </Form.Group>
            {datos.tipo_pago.length === 0 ? (<></>) : datos.tipo_pago[0].id === "2" ? (
                <>
                    <AgregarCupones CambiarDatosCupones={CambiarDatosCupones} />
                </>
            ) : (<></>)}

            <Form.Group as={Row} controlId="nro_certificado" className="mb-0">
                <Form.Label column {...config_label} >
                    Nº Certificado<sup className="asterisco">*</sup><br />
                    <small className="text-danger"><b>(Físico)</b></small>
                </Form.Label>
                <Col {...config_input}>
                    <Form.Control type="text" name="nro_certificado" onChange={handleInputChange} size="sm" value={datos.nro_certificado} readOnly={id_ramo.length !== 0 && datos.id_subagente.length !== 0 && id_empresa.length !== 0 ? id_ramo[0].id === '66' ? false : true : true} />
                    {showVerificaCertificadoFisico.condicion ? (<>
                        <Alert variant={showVerificaCertificadoFisico.class} onClose={() => setshowVerificaPoliza(false)} className="my-1">
                            <h6>VERIFICACIÓN DOCUMENTO FÍSICO</h6>
                            Nº de Certificado <b>{datos.nro_certificado.toUpperCase()}</b> {showVerificaCertificadoFisico.nombre}.
                                        </Alert>
                    </>) : (<></>)}
                    {showVerificaCertificadoDatabase ? (<>
                        <Alert variant="danger" onClose={() => setshowVerificaCertificadoFisico(false)} className="my-1">
                            <h6>VERIFICACIÓN DOCUMENTO REGISTRADO</h6>
                            Nº de Certificado <b>{datos.nro_certificado}</b> ya se encuentra registrado.
                                        </Alert>
                    </>) : (<></>)}

                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="file" className="mb-0">
                <Form.Label column {...config_label} >
                    Documentos <Paperclip size={25} />
                </Form.Label>
                <Col {...config_input}>
                    <Form.File
                        id="custom-file"
                        label={nombre_archivos}
                        name="file"
                        onChange={CambiarArchivos}
                        custom
                        multiple
                        size="sm"
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                        <InfoCircle /> Recuerde subir los documentos necesarios si los tuviera.
                    </Form.Text>
                </Col>
            </Form.Group>
            {/* {JSON.stringify(datos)} */}
        </>
    )
});
export default AgregarDocumentos