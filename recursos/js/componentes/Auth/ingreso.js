import React, { useState } from "react"
import ReactDOM from "react-dom"
import { Form, Container, Row, Col, Image, Badge } from 'react-bootstrap'
import { URL } from '../../Variables'
import { MDBNavbar, MDBNavbarBrand } from "mdbreact"

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { esES } from '@material-ui/core/locale'
import './ingreso.scss'
const theme = createMuiTheme({
    palette: {
        primary: { main: '#2A427B' },
        warning: { main: '#006262' },
    },
    props: {
        MuiTextField: {
            fullWidth: true,
            variant: 'outlined',
            size: 'small'
        },
    },
    overrides: {
        MuiOutlinedInput: {
            root: {
                position: 'relative',
                '& $notchedOutline': {
                    borderColor: '#2A427B',
                },
                '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
                    borderColor: '#2A427B',
                    // Reset on touch devices, it doesn't add specificity
                    '@media (hover: none)': {
                        borderColor: '#2A427B',
                    },
                },
                '&$focused $notchedOutline': {
                    borderColor: '#2A427B',
                    borderWidth: 1,
                },
            },
        },
        MuiInput: {
            underline: {
                "&&&&:before": {
                    borderBottom: "1px solid #2A427B"
                },
                "&&&&:hover:before": {
                    borderBottom: "1px solid #2A427B"
                }
            }
        },
        MuiInputLabel: {
            root: {
                color: "#2A427B",
                "&$focused": { // increase the specificity for the pseudo class
                    color: "#2A427B"
                }
            }
        }
    },

    notchedOutline: {
        borderWidth: "1px",
        borderColor: "yellow !important"
    }
}, esES);
const Ingreso = () => {
    const [datos, setDatos] = useState({
        dni: '',
        password: '',
    })
    const [variante, setVariante] = useState({
        style: '',
        mensaje: '',
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const enviarDatos = (event) => {
        event.preventDefault();
        var url = `${URL}Auth/Ingresar`;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if (response === 0) {
                    window.location.href = `${URL}Dashboard/Inicio`
                }
                if (response === 1) {
                    setVariante({
                        style: 'error',
                        mensaje: 'DNI de usuario o contraseña incorrecta',
                    })
                }
                if (response === 2) {
                    setVariante({
                        style: 'warning',
                        mensaje: 'Falta rellenar campos',
                    })
                }
            });
    }
    return (
        <>
            <ThemeProvider theme={theme}>
                <MDBNavbar className="ingreso_menu" transparent fixed="top">
                    <Container>
                        <MDBNavbarBrand >
                            <Image
                                className="logo_horizontal"
                                src={`${URL}recursos/img/logo_horizontal.svg`}
                                alt="logo_horizontal"
                            />
                        </MDBNavbarBrand>
                    </Container>
                </MDBNavbar>
                <Container fluid>
                    <Row className="ingreso_general">
                        <Col xs={12} lg={5} className="d-flex justify-content-center flex-column ingreso_derecho">
                            <h1>
                                Descubre el Nuevo
                        </h1>
                            <h1>
                                Portal de CONFIANZA & VIDA
                        </h1>
                            <p>Ahora podrás realizar todas tus operaciones y consultas en un solo lugar.</p>
                        </Col>
                        <Col xs={12} lg={2} className="d-none d-sm-none d-md-none d-lg-flex d-xl-flex justify-content-center flex-column  ingreso_centro hidden-md-down">
                            <Image
                                className="ingreso_ejecutivo"
                                src={`${URL}recursos/img/ejecutivo_.svg`}
                                alt="logo_horizontal"
                            />
                        </Col>
                        <Col xs={12} lg={5} className="d-flex justify-content-center flex-column ingreso_izquierdo">
                            <Form onSubmit={enviarDatos} id="formulario">
                                <Col xs={12} className="mb-3">
                                    <Alert severity={variante.style === '' ? 'info' : variante.style}>
                                        {variante.mensaje === '' ? (<>Sistema aún en desarrollo si encuentra un error capturar pantalla y enviar correo <b>marcorodriguez@confianzayvida.com</b></>) : variante.mensaje}
                                    </Alert>
                                </Col>
                                <Col xs={12} className="mb-3">
                                    <h3 className="d-inline">Inicia</h3> <h3 className="d-inline">sesión</h3>
                                </Col>
                                <Col xs={12} className="mb-3">
                                    <TextField
                                        label="Usuario"
                                        name="dni"
                                        value={datos.dni}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Col>
                                <Col xs={12} className="mb-3">
                                    <TextField
                                        label="Contraseña"
                                        name="password"
                                        value={datos.password}
                                        type="password"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Col>
                                <Col xs={12} className="mb-3">
                                    <Button variant="contained" color="primary" type="submit">Ingresar</Button>
                                </Col>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </ThemeProvider>
        </>
    );
}
export default Ingreso;
if (document.getElementById("ingreso")) {
    ReactDOM.render(<Ingreso />, document.getElementById("ingreso"));
}
