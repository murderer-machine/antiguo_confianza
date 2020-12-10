import React, { useState, useEffect } from 'react'

import TablePagination from '@material-ui/core/TablePagination'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'

import { URL } from '../../../Variables'
import { Container, Row, Col } from 'react-bootstrap'

const AuthMostrarPolizas = ({ CambiarPreload }) => {
    const [filtros, setfiltros] = useState({
        id_cliente: {}
    })
    const [polizas, setpolizas] = useState([]);
    useEffect(() => {
        let UseEffectCondition = false
        const MostrarPolizas = async () => {
            var url = `${URL}Polizas/MostrarPolizasNoviembre`
            await fetch(url, {
                method: 'POST',
                body: JSON.stringify(filtros),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    alert(JSON.stringify(response))
                    setpolizas(response)
                });
        }
        MostrarPolizas()
        return () => {
            UseEffectCondition = true
        }
    }, [])

    //Filtros

    const [clientes, setclientes] = useState([])
    useEffect(() => {
        const CargarClientes = () => {
            var url = `${URL}Generales/Clientes`;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    setclientes(response);
                });
        }
        CargarClientes()
    }, [])
    // Paginacion
    const CantidadPaginas = parseInt(Math.ceil(Object.keys(polizas).length))
    const [pagina_actual, setPagina_actual] = useState(0)
    const [elementos_por_pagina, setElementos_pagina] = useState(10)
    const handleChangePage = (event, newPage) => {
        setPagina_actual(newPage)
    }
    const handleChangeRowsPerPage = (event) => {
        setElementos_pagina(parseInt(event.target.value, 10))
        setPagina_actual(0)
    }
    const final = (pagina_actual + 1) * elementos_por_pagina
    const inicio = final - elementos_por_pagina
    // Fin Paginacion
    return (
        <Container fluid>
            <Row>
                <Col xs={12} lg={3}>
                    <Autocomplete
                        options={clientes}
                        getOptionLabel={(option) => Object.keys(option).length === 0 ? '' : `${option.nombre.toUpperCase()} ${option.nrodoc.toUpperCase()}`}
                        value={filtros.cliente}
                        renderInput={(params) => <TextField {...params} label="Compañia" variant="outlined" />}
                        renderOption={(option) => {
                            return (
                                <div>
                                    {option.nombre.toUpperCase()} {option.nrodoc.toUpperCase()}
                                </div>
                            )
                        }}
                        onChange={(event, newValue) => {
                            if (newValue == null) {
                                setfiltros({
                                    ...filtros,
                                    cliente: {},
                                })
                                setPagina_actual(0)
                            } else {
                                setfiltros({
                                    ...filtros,
                                    cliente: newValue,
                                })
                                setPagina_actual(0)
                            }
                        }}
                    />
                </Col>
            </Row>
            {polizas.slice(inicio, final).map((poliza, i) => (
                <>
                    {poliza.nro_poliza}<br />
                </>
            ))}
            <TablePagination
                component="div"
                count={CantidadPaginas}
                page={pagina_actual}
                onChangePage={handleChangePage}
                rowsPerPage={elementos_por_pagina}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            {JSON.stringify(filtros)}
        </Container>
    )
}
export default AuthMostrarPolizas