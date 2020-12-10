import React, { createContext, useState, useEffect } from 'react'
import { URL } from '../../Variables'
export const GeneralContext = createContext()
const GeneralContextProvider = ({ children }) => {
    const [datos_user, setdatos_user] = useState({
        nombres: '',
        apellidos: ''
    })
    useEffect(() => {
        const url = `${URL}Auth/Datos/true`
        fetch(url)
            .then(res => res.json())
            .then(response => {
                setdatos_user({
                    nombres: response[0].nombres,
                    apellidos: response[0].apellidos
                })
            });
    }, [])
    return (
        <GeneralContext.Provider value={{ datos_user }}>
            {children}
        </GeneralContext.Provider>
    )
}

export default GeneralContextProvider

