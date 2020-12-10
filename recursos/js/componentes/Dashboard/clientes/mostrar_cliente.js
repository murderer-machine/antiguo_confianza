import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import { Button, PageItem, Accordion, Card } from 'react-bootstrap'
import TablePagination from '@material-ui/core/TablePagination';
import { Form, InputGroup, Alert } from 'react-bootstrap'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { esES } from '@material-ui/core/locale';
import { Container, Row, Col } from 'react-bootstrap'
import { Search } from 'react-bootstrap-icons';
import { TrashFill, Pencil, CardHeading, EmojiFrown, PersonFill, TelephoneFill, EnvelopeFill } from 'react-bootstrap-icons';
const theme = createMuiTheme({
    palette: {
        primary: { main: '#1976d2' },
    },
}, esES);
const AuthMostrarCliente = ({ datos, editar , eliminar }) => {
    const [filtrogeneral, setFiltrogeneral] = useState('');
    const [pagina_actual, setPagina_actual] = useState(0)
    const [elementos_por_pagina, setElementos_pagina] = useState(10)
    const datos_generales = datos.elementos.sort((a, b) => b['id'] - a['id']).filter(cliente => cliente.nombre.includes(filtrogeneral) || cliente.nrodoc.includes(filtrogeneral))
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
    return (
        <>
            <ThemeProvider theme={theme}>
                <Container>
                    <Row className="align-items-center">
                        <Col xs={12} lg={6} className="mb-2">
                            <InputGroup className="mb-2" size="sm">
                                <InputGroup.Prepend>
                                    <InputGroup.Text><Search /></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => { setFiltrogeneral(e.target.value.toLowerCase()) }}
                                    value={filtrogeneral}
                                    placeholder="búsqueda"
                                    className="text-lowercase"
                                    size="sm"
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={12} lg={6} className="mb-2">
                            <TablePagination
                                component="div"
                                count={CantidadPaginas}
                                page={pagina_actual}
                                onChangePage={handleChangePage}
                                rowsPerPage={elementos_por_pagina}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </Col>
                        <Col xs={12} className="mb-2">
                            <div className="table_confianza">
                                <div>
                                    <div style={{ width: '70%' }}>Cliente</div>
                                    <div style={{ width: '30%' }}>Acciones</div>
                                </div>
                                {datos_generales.slice(inicio, final).map((item, i) => (
                                    <div key={i} >
                                        {
                                            <div>
                                                <Accordion>
                                                    <div>
                                                        <Accordion.Toggle as="div" eventKey="0" className="cursor-pointer">
                                                            <b>{item.nombre.toUpperCase()}</b><br />
                                                            {item.id_tipodoc} : {item.nrodoc}
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            {item.contacto.length > 0 ? (
                                                                <small>
                                                                    <Alert variant="inicio">
                                                                        {item.contacto.map((item_, i_) => (
                                                                            <div key={i_}>
                                                                                <b><PersonFill /> </b>{item_.nombre.toUpperCase()} < br />
                                                                                <b><TelephoneFill /> </b>{item_.telefono} - {item_.celular} < br />
                                                                                <b><EnvelopeFill /> </b>{item_.correo} < br />
                                                                                {i_ === item.contacto.length - 1 ? (<></>) : <hr />}
                                                                            </div>
                                                                        ))}
                                                                    </Alert>
                                                                </small>
                                                            )
                                                                : (<></>)}
                                                        </Accordion.Collapse>
                                                    </div>
                                                </Accordion>
                                            </div>
                                        }
                                        <div className="text-center">
                                            <CardHeading color="#C7941C" size={23} onClick={() => { alert(datos_generales[i]['id']) }} className="mr-2 cursor-pointer" />
                                            <Pencil color="#277687" size={23} onClick={() => editar(datos_generales[i]['id'])} className="mr-2 cursor-pointer" />
                                            <TrashFill color="#656565" size={23} onClick={() => { eliminar(datos_generales[i]['id'],datos_generales[i]['nombre']) }} className="mr-2 cursor-pointer" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Col>
                        {datos_generales.length === 0 ? (<Col xs={12} className="mb-2 text-center"><EmojiFrown /> No se encontraron resultados</Col>) : ''}
                    </Row>
                </Container>
            </ThemeProvider>
        </>
    )
}
export default AuthMostrarCliente