import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle, ModalDialog } from 'react-bootstrap'
import { Badge, Card } from 'react-bootstrap'
import Preload from '../../General/preload'
import { URL } from '../../../Variables'
import AgregarPolizas from './agregar_poliza'
import MostrarPolizasC from './mostrar_poliza'
import Button from '@material-ui/core/Button';
import './polizas.scss'
const AuthPolizas = () => {
    const [ModalAgregar, setModalAgregar] = useState(false)
    const CerrarModalAgregar = () => setModalAgregar(false)
    const AbrirModalAgregar = () => setModalAgregar(true)
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
    const [badge_mensaje, setBadge_mensaje] = useState({
        style: '',
        mensaje: '',
    });

    return (
        <>
            <Preload texto={preload.texto} visible={preload.visible}></Preload>
            <Row className="my-2">
                <Col xs={12} className="card_confianza">
                    <Button variant="contained" color="primary" onClick={AbrirModalAgregar}>
                        Agregar Póliza
                                </Button>{' '}
                    <Badge pill variant={badge_mensaje.style}>
                        {badge_mensaje.mensaje}
                    </Badge>
                </Col>
                <Col xs={12} className="card_confianza">
                    <MostrarPolizasC  CambiarPreload={CambiarPreload}  />
                </Col>
            </Row>
            <Modal show={ModalAgregar} onHide={CerrarModalAgregar} dialogClassName="modal_confianza" backdrop="static" centered size="xl">
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        <Card.Title>Datos Póliza                         </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Aquí podra agregar datos de la póliza nueva.</Card.Subtitle>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-0">
                    <AgregarPolizas CambiarPreload={CambiarPreload} />
                </Modal.Body>
            </Modal>
        </>
    )
}
export default AuthPolizas
