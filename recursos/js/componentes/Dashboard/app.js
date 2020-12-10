import React, { useState, useEffect, useContext } from "react"
import ReactDOM from "react-dom"
import { slide as Menu } from "react-burger-menu"
import { Container, Row, Col, Image } from 'react-bootstrap'
import Inicio from '../Dashboard/inicio/inicio'
import './app.scss'
import GeneralContextProvider from '../Context/GeneralContext'
import MenuTop from './menutop'
import Clientes from './clientes/clientes'
import Polizas from './polizas/polizas'
import ReportePolizas from './reportes_polizas/reporte_polizas'
import Motorizados from './motorizados/motorizados'
import DocumentosSubAgente from './documentos_sub_agentes/documento_sub_agente'
import { URL, NOMBRE } from '../../Variables'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { esES } from '@material-ui/core/locale'
import AgregarCupones from './cupones/agregar_cupones'
import Cobranzas from './cobranzas/cobranzas'
const theme = createMuiTheme({
    palette: {
        primary: { main: '#2A427B' },

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
const App = ({ modulo }) => {
    return (
        <>
            <GeneralContextProvider>
                <ThemeProvider theme={theme}>
                    <MenuTop />
                    <div id="outer-container">
                        <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} itemListElement="div">
                            <a className={`menu-item ${modulo === 'clientes' ? `btm-item-activo` : ``}`} href={`${URL}Dashboard/Clientes`}>Clientes</a>
                            <a className={`menu-item ${modulo === 'polizas' ? `btm-item-activo` : ``}`} href={`${URL}Dashboard/Polizas`}>Ver Pólizas</a>
                            <a className={`menu-item ${modulo === 'reporte_polizas' ? `btm-item-activo` : ``}`} href={`${URL}Dashboard/ReportePolizas`}>Generar Reporte</a>
                            <a className={`menu-item ${modulo === 'motorizados' ? `btm-item-activo` : ``}`} href={`${URL}Dashboard/Motorizados`}>Motorizados</a>
                            <a className={`menu-item ${modulo === 'documentosubagente' ? `btm-item-activo` : ``}`} href={`${URL}Dashboard/DocumentosSubAgente`}>Documentos SubAgentes</a>
                            <a className={`menu-item ${modulo === 'cobranzas' ? `btm-item-activo` : ``}`} href={`${URL}Dashboard/Cobranzas`}>Cobranzas</a>

                        </Menu>
                        <div id="page-wrap" style={{ marginTop: '61px' }}>
                            <Container>
                                <Row>
                                    <Col xs={12} lg={12} className="p-0">
                                        {
                                            {
                                                'inicio': <Inicio />,
                                                'clientes': <Clientes />,
                                                'polizas': <Polizas />,
                                                'reporte_polizas': <ReportePolizas />,
                                                'motorizados': <Motorizados />,
                                                'documentosubagente': <DocumentosSubAgente />,
                                                'cobranzas': <Cobranzas />,
                                            }[modulo]
                                        }
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                </ThemeProvider>
            </GeneralContextProvider>
        </>
    )
}
export default App
if (document.getElementById("app")) {
    const element = document.getElementById('app')
    const props = Object.assign({}, element.dataset)
    ReactDOM.render(<App {...props} />, element)

}