import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import AgregarClientes from './agregar_cliente'
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle, ModalDialog } from 'react-bootstrap'
import { Badge, Button } from 'react-bootstrap'
import Preload from '../../General/preload'
import { URL } from '../../../Variables'
import MostrarClientes from './mostrar_cliente'

const AuthClientes = () => {
    const [ModalAgregar, setModalAgregar] = useState(false)
    const CerrarModalAgregar = () => setModalAgregar(false)
    const AbrirModalAgregar = () => setModalAgregar(true)

    const [ModalEliminar, setModalEliminar] = useState(false)
    const CerrarModalEliminar = () => setModalEliminar(false)
    const AbrirModalEliminar = (id, nombre) => {
        setid_eliminar({
            id: id,
            nombre: nombre,
        })
        setModalEliminar(true)
    }

    const [ModalEditar, setModalEditar] = useState(false)
    const CerrarModalEditar = () => setModalEditar(false)
    const AbrirModalEditar = (id) => {
        setid_editar(id)
        setModalEditar(true)
    }

    const [id_editar, setid_editar] = useState(0)
    const [id_eliminar, setid_eliminar] = useState({
        id: 0,
        nombre: '',
    })

    const [clientes, setClientes] = useState([]);
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
    useEffect(() => {
        let isCancellede = false;
        const MostrarClientes = () => {
            var url = `${URL}Clientes/Mostrar`;
            fetch(url)
                .then(res => res.json())
                .then(response => {
                    setClientes(response);
                });
        }
        MostrarClientes()
        return () => {
            isCancellede = true;
        }
    }, [ModalAgregar, ModalEditar, ModalEliminar])
    const TableDatos = {
        elementos: clientes,
    }
    const EliminarCliente = () => {
        CambiarPreload('eliminando', true)
        var url = `${URL}Clientes/Eliminar`;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(id_eliminar),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if (response === 0) {
                    setBadge_mensaje({
                        style: 'success',
                        mensaje: `Eliminado cliente ${id_eliminar.nombre.toUpperCase()} correctamente.`,
                    })
                    setTimeout(() => {
                        setBadge_mensaje({
                            style: '',
                            mensaje: '',
                        })
                    }, 5000)
                }
                if (response === 1) {
                    setBadge_mensaje({
                        style: 'danger',
                        mensaje: 'Ocurrió un error.',
                    })
                    setTimeout(() => {
                        setBadge_mensaje({
                            style: '',
                            mensaje: '',
                        })
                    }, 5000)
                }
                CambiarPreload('', false)
                CerrarModalEliminar()
            })
    }
    const [badge_mensaje, setBadge_mensaje] = useState({
        style: '',
        mensaje: '',
    });

    return (
        <>

            <Preload texto={preload.texto} visible={preload.visible}></Preload>
            <Container>
                <Row className="my-2">
                    <Col xs={12} className="card_confianza">
                        <Button variant="inicio" onClick={AbrirModalAgregar} size="sm">
                            Agregar Cliente
                                </Button>{' '}
                        <Badge pill variant={badge_mensaje.style}>
                            {badge_mensaje.mensaje}
                        </Badge>
                    </Col>
                    <Col xs={12} className="card_confianza">
                        <MostrarClientes datos={TableDatos} editar={AbrirModalEditar} eliminar={AbrirModalEliminar} />
                    </Col>
                </Row>
            </Container>
            <Modal show={ModalAgregar} onHide={CerrarModalAgregar} size="xl" centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        <Card.Title>Datos Contratante</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Aquí podra agregar datos del contratante.</Card.Subtitle>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AgregarClientes CambiarPreload={CambiarPreload} />
                </Modal.Body>
            </Modal>
            <Modal show={ModalEditar} onHide={CerrarModalEditar} size="xl" centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        <Card.Title>Datos Contratante</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Aquí podra modificar datos del contratante.</Card.Subtitle>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AgregarClientes CambiarPreload={CambiarPreload} id_editar={id_editar} />
                </Modal.Body>
            </Modal>
            <Modal show={ModalEliminar} onHide={CerrarModalEliminar} size="sm" centered>
                <Modal.Body>
                    ¿Estas seguro de eliminar el cliente <b>{id_eliminar.nombre.toUpperCase()}</b>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CerrarModalEliminar} size="sm">Cancelar</Button>
                    <Button variant="inicio" onClick={EliminarCliente} size="sm">Eliminar</Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}
export default AuthClientes
