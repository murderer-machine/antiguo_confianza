import React, { useState } from 'react'
import { Form, Button, Container, Row, Col, Badge } from 'react-bootstrap'
import { URL } from '../../../Variables'
import {Paperclip} from 'react-bootstrap-icons'
const AgregarAdjuntoDocumento = ({ data_id_poliza, data_id_poliza_documento, CambiarPreload, Actualizar }) => {
    const config_label = {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12,
    }
    const config_input = {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12,
    }
    const [badge_mensaje, setBadge_mensaje] = useState({
        style: '',
        mensaje: '',
    });
    const [nombre_archivos, setnombre_archivos] = useState('')
    const EnviarImagen = (id_poliza, id_poliza_documento) => {
        if (id_poliza !== 0 && id_poliza_documento !== 0) {
            CambiarPreload('Subiendo Documentos', true)
            var fileField = document.querySelector("input[type='file']")
            var formData = new FormData()
            for (const file of fileField.files) {
                formData.append('avatar[]', file, file.name)
            }
            formData.append('id_poliza', id_poliza)
            formData.append('id_poliza_documento', id_poliza_documento)
            var url = `${URL}Ejemplos/Ejemplo`
            fetch(url, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    CambiarPreload('', false)
                    setBadge_mensaje({
                        style: 'success',
                        mensaje: 'Documento Cargado Correctamente.',
                    })
                    fileField.value = null
                    setnombre_archivos('')
                    Actualizar()
                });
        }
    }
    const CambiarArchivos = (e) => {
        e.target.files.length === 0 ? setnombre_archivos('') : setnombre_archivos(`${e.target.files.length} ${e.target.files.length === 1 ? 'archivo' : 'archivos'}`);
    }
    return (
        <>
            <Container fluid>
                <Form.Group as={Row} controlId="file" className="mb-0">
                    <Form.Label column {...config_label} style={{ textAlign: 'left' }}>
                        Documentos <Paperclip />
                    </Form.Label>
                    <Col {...config_input}>
                        <Form.File
                            id="custom-file"
                            label={nombre_archivos}
                            name="file"
                            onChange={CambiarArchivos}
                            custom
                            multiple
                            size="sm"
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-0">
                    <Col xs={12} className="text-center">
                        <Button className='my-1' variant="inicio" onClick={() => { EnviarImagen(data_id_poliza, data_id_poliza_documento) }} size="sm" disabled={nombre_archivos === '' ? true : false}>
                            Agregar Documento
                    </Button>
                    </Col>
                    <Col xs={12}>
                        <Badge pill variant={badge_mensaje.style}>
                            {badge_mensaje.mensaje}
                        </Badge>
                    </Col>
                </Form.Group>
            </Container>

        </>
    )
}
export default AgregarAdjuntoDocumento