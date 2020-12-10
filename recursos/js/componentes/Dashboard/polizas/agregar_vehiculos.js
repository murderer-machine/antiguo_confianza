import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { URL } from '../../../Variables'
import { Typeahead } from 'react-bootstrap-typeahead'
const AgregarVehiculos = forwardRef(({ CambiarDatosVehiculos = () => { } }, ref) => {
    useImperativeHandle(ref, () => ({
        ResetCamposGeneral() {
            setDatos({
                ...datos,
                placa: '',
                clase: [],
                uso: [],
                categoria: [],
                marca: [],
                modelo: [],
                ano: [],
                nro_asientos: '',
                nro_pasajeros: '',
                nro_serie: '',
                motor: '',
                color: '',
                timon: '',
                combustible: '',
                carroceria: '',
            })
        }
    }))
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
    const [modelos, setmodelos] = useState([])
    const [marcas, setmarcas] = useState([])
    const [categorias_vehiculos, setcategorias_vehiculos] = useState([])
    const [clases_vehiculos, setclases_vehiculos] = useState([])
    const [usos_vehiculos, setusos_vehiculos] = useState([])
    const [datos, setDatos] = useState({
        placa: '',
        clase: [],
        uso: [],
        categoria: [],
        marca: [],
        modelo: [],
        ano: [],
        nro_asientos: '',
        nro_pasajeros: '',
        nro_serie: '',
        motor: '',
        color: '',
        timon: '',
        combustible: '',
        carroceria: '',
    })
    const years = []
    for (let number = 1960; number <= new Date().getFullYear(); number++) {
        years.push({
            ano: number
        });
    }
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }
    const CambiarMarca = (selectedOptions) => {
        setDatos({
            ...datos,
            marca: selectedOptions,
            modelo: [],
        })
    }
    const CambiarAno = (selectedOptions) => {
        setDatos({
            ...datos,
            ano: selectedOptions,
        })
    }
    const CambiarModelo = (selectedOptions) => {
        setDatos({
            ...datos,
            modelo: selectedOptions,
        })
    }
    const CambiarCategoria = (selectedOptions) => {
        setDatos({
            ...datos,
            categoria: selectedOptions,
        })
    }
    const CambiarClase = (selectedOptions) => {
        setDatos({
            ...datos,
            clase: selectedOptions,
        })
    }
    const CambiarUso = (selectedOptions) => {
        setDatos({
            ...datos,
            uso: selectedOptions,
        })
    }
    useEffect(() => {
        CambiarDatosVehiculos(datos)
    }, [datos])
    const CargarMarcas = () => {
        var url = `${URL}Generales/Marcas`;
        fetch(url)
            .then(res => res.json())
            .then(response => {
                setmarcas(response);
            });
    }
    const CargarModelos = () => {
        var url = `${URL}Generales/Modelos/${datos.marca.length === 0 ? '0' : datos.marca[0].id}`;
        fetch(url)
            .then(res => res.json())
            .then(response => {
                setmodelos(response);
            });
    }
    useEffect(() => {
        CargarModelos()
    }, [datos.marca])
    useEffect(() => {
        let isCancelled = false;

        const CargarCategorias = () => {
            var url = `${URL}Generales/CategoriasVehiculos`;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    setcategorias_vehiculos(response);
                });
        }
        const CargarClases = () => {
            var url = `${URL}Generales/ClasesVehiculos`;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    setclases_vehiculos(response);
                });
        }
        const CargarUsos = () => {
            var url = `${URL}Generales/UsosVehiculos`;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    setusos_vehiculos(response);
                });
        }
        CargarMarcas()
        CargarCategorias()
        CargarClases()
        CargarUsos()
        return () => {
            isCancelled = true;
        }
    }, [])
    return (
        <>
            <Form.Group as={Row} controlId="placa" className="mb-0">
                <Form.Label column {...config_label} >
                    Placa<sup className="asterisco">*</sup>
                </Form.Label>
                <Col {...config_input}>
                    <Form.Control type="text" name="placa" onChange={handleInputChange} size="sm" value={datos.placa} required />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="clase" className="mb-0">
                <Form.Label column {...config_label} >
                    Clase<sup className="asterisco">*</sup>
                </Form.Label>
                <Col {...config_input}>
                    <Typeahead
                        id="clase"
                        {...confiTypeahead}
                        selected={datos.clase}
                        clearButton
                        labelKey={option => `${option.nombre.toUpperCase()}`}
                        onChange={CambiarClase}
                        options={clases_vehiculos}
                        size="small"
                        inputProps={{ required: true }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="uso" className="mb-0">
                <Form.Label column {...config_label} >
                    Uso de Vehiculo<sup className="asterisco">*</sup>
                </Form.Label>
                <Col {...config_input}>
                    <Typeahead
                        id="uso"
                        {...confiTypeahead}
                        selected={datos.uso}
                        clearButton
                        labelKey={option => `${option.nombre.toUpperCase()}`}
                        onChange={CambiarUso}
                        options={usos_vehiculos}
                        size="small"
                        inputProps={{ required: true }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="categoria" className="mb-0">
                <Form.Label column {...config_label} >
                    Categoría<sup className="asterisco">*</sup>
                </Form.Label>
                <Col {...config_input}>
                    <Typeahead
                        id="categoria"
                        {...confiTypeahead}
                        selected={datos.categoria}
                        clearButton
                        labelKey={option => `${option.nombre.toUpperCase()}`}
                        onChange={CambiarCategoria}
                        options={categorias_vehiculos}
                        size="small"
                        inputProps={{ required: true }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="marca" className="mb-0">
                <Form.Label column {...config_label} >
                    Marca<sup className="asterisco">*</sup>
                </Form.Label>
                <Col {...config_input}>
                    <Typeahead
                        id="marca"
                        {...confiTypeahead}
                        selected={datos.marca}
                        clearButton
                        labelKey={option => `${option.marca.toUpperCase()}`}
                        onChange={CambiarMarca}
                        options={marcas}
                        size="small"
                        inputProps={{ required: true }}
                    />
                    <Button className="my-1" variant="inicio" size="sm"
                        onClick={() => {
                            CargarMarcas()
                            setDatos({
                                ...datos,
                                marca: [],
                            })
                        }}>Actualizar Marca</Button>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="modelo" className="mb-0">
                <Form.Label column {...config_label} >
                    Modelo<sup className="asterisco">*</sup>
                </Form.Label>
                <Col {...config_input}>
                    <Typeahead
                        id="modelo"
                        {...confiTypeahead}
                        selected={datos.modelo}
                        clearButton
                        labelKey={option => `${option.modelo.toUpperCase()}`}
                        onChange={CambiarModelo}
                        options={modelos}
                        size="small"
                        inputProps={{ required: true }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="ano" className="mb-0">
                <Form.Label column {...config_label} >
                    Año de Fabricación<sup className="asterisco">*</sup>
                </Form.Label>
                <Col {...config_input}>
                    <Typeahead
                        id="ano"
                        {...confiTypeahead}
                        selected={datos.ano}
                        clearButton
                        labelKey={option => `${option.ano}`}
                        onChange={CambiarAno}
                        options={years}
                        size="small"
                        inputProps={{ required: true }}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="nro_asientos" className="mb-0">
                <Form.Label column {...config_label} >
                    Nº de Asientos<sup className="asterisco">*</sup>
                </Form.Label>
                <Col {...config_input}>
                    <Form.Control type="number" name="nro_asientos" onChange={handleInputChange} size="sm" value={datos.nro_asientos} required />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="nro_pasajeros" className="mb-0">
                <Form.Label column {...config_label} >
                    Nº de Pasajeros
                </Form.Label>
                <Col {...config_input}>
                    <Form.Control type="number" name="nro_pasajeros" onChange={handleInputChange} size="sm" value={datos.nro_pasajeros} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="nro_serie" className="mb-0">
                <Form.Label column {...config_label} >
                    Nº de Serie<sup className="asterisco">*</sup>
                </Form.Label>
                <Col {...config_input}>
                    <Form.Control type="text" name="nro_serie" onChange={handleInputChange} size="sm" value={datos.nro_serie} required />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="motor" className="mb-0">
                <Form.Label column {...config_label} >
                    Motor
                </Form.Label>
                <Col {...config_input}>
                    <Form.Control type="text" name="motor" onChange={handleInputChange} size="sm" value={datos.motor} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="color" className="mb-0">
                <Form.Label column {...config_label} >
                    Color
                </Form.Label>
                <Col {...config_input}>
                    <Form.Control type="text" name="color" onChange={handleInputChange} size="sm" value={datos.color} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="timon" className="mb-0">
                <Form.Label column {...config_label} >
                    Timón
                </Form.Label>
                <Col {...config_input}>
                    <Form.Control type="text" name="timon" onChange={handleInputChange} size="sm" value={datos.timon} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="combustible" className="mb-0">
                <Form.Label column {...config_label} >
                    Combustible
                </Form.Label>
                <Col {...config_input}>
                    <Form.Control type="text" name="combustible" onChange={handleInputChange} size="sm" value={datos.combustible} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="carroceria" className="mb-0">
                <Form.Label column {...config_label} >
                    Carrocería
                </Form.Label>
                <Col {...config_input}>
                    <Form.Control type="text" name="carroceria" onChange={handleInputChange} size="sm" value={datos.carroceria} />
                </Col>
            </Form.Group>
            {/* {JSON.stringify(datos)} */}
        </>
    )
})
export default AgregarVehiculos
