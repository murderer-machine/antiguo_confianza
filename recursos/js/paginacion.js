import React, { useState, useEffect } from 'react'
import TablePagination from '@material-ui/core/TablePagination'
import { URL } from '../../../Variables'
const AuthMostrarPolizas = ({ CambiarPreload }) => {
    const [datos_filtro, setdatos_filtro] = useState({})
    const [polizas, setpolizas] = useState([]);
    useEffect(() => {
        let UseEffectCondition = false
        const MostrarPolizas = async () => {
            var url = `${URL}Polizas/MostrarPolizasNoviembre`
            await fetch(url, {
                method: 'POST',
                body: JSON.stringify(datos_filtro),
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
        MostrarPolizas()
        return () => {
            UseEffectCondition = true
        }
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
        <>
            
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
        </>
    )
}
export default AuthMostrarPolizas