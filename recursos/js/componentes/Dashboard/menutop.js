import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { URL, NOMBRE } from '../../Variables'
import './menutop.scss'
const AuthMenu = () => {
    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" className="authmenu_nav font_primario justify-content-between" fixed="top" >
            <Navbar.Brand href={`${URL}Dashboard/Inicio`}>{NOMBRE}</Navbar.Brand>
            <Nav>
                <Nav.Link href={`${URL}Auth/Salir`}>
                    Cerrar sesión
                    </Nav.Link>
            </Nav>
        </Navbar>
    )
}
export default AuthMenu
