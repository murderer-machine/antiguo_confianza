import React, { useState, useEffect, useContext } from 'react'
import { Form, Button, Container, Row, Col, Badge, Spinner } from 'react-bootstrap'
import { URL } from '../../../Variables'
import { Paperclip } from 'react-bootstrap-icons'
import Alert from '@material-ui/lab/Alert'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import ImageUploader from 'react-images-upload'
const DocumentoSubAgente = () => {
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
        data: [],
    });
    const [procesando, setprocesando] = useState(false)
    const [nombre_archivos, setnombre_archivos] = useState('')
    const [subagentes, setsubagentes] = useState([])
    const [subagente, setsubagente] = useState({})
    const SubirDatos = (nombre) => {
        var url = `${URL}LeerExcel/SubirArchivoSubAgente/${nombre}/${subagente.id}`;
        fetch(url)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    setBadge_mensaje({
                        ...badge_mensaje,
                        style: 'error',
                        mensaje: 'Documento cargado correctamente, con algunas observaciones',
                        data: response,
                    })
                } else {
                    setBadge_mensaje({
                        ...badge_mensaje,
                        style: 'success',
                        mensaje: 'Documento cargado correctamente.',
                        data: [],
                    })
                }
                setprocesando(false)
            });
    }
    const EnviarImagen = () => {
        if (Object.keys(subagente).length === 0 || nombre_archivos === '') {
            setBadge_mensaje({
                ...badge_mensaje,
                style: 'error',
                mensaje: 'Falta completar campos.',
                data: [],
            })
        } else {
            setprocesando(true)
            var fileField = document.querySelector("input[type='file']")
            var formData = new FormData()
            for (const file of fileField.files) {
                formData.append('avatar', file, file.name)
            }
            var url = `${URL}LeerExcel/ExcelSubAgente`
            fetch(url, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    console.log(response)
                    SubirDatos(response)
                    fileField.value = null
                    setnombre_archivos('')
                });
        }
    }
    const CambiarArchivos = (e) => {
        e.target.files.length === 0 ? setnombre_archivos('') : setnombre_archivos(`${e.target.files.length} ${e.target.files.length === 1 ? 'archivo' : 'archivos'}`);
    }

    const CargarSubAgentes = () => {
        var url = `${URL}Generales/SubAgentesS`;
        fetch(url)
            .then(res => res.json())
            .then(response => {
                setsubagentes(response);
            });
    }
    useEffect(() => {
        CargarSubAgentes()
    }, [])



    return (
        <>
            <Row>
                <Col xs={12} lg={12}>
                    <div className="card_confianza">
                        <Row className="justify-content-center">
                            <Col xs={12} lg={8} style={{ display: procesando ? 'none' : 'block' }}>
                                <Form.Group>
                                    <Form.Label column {...config_label} style={{ textAlign: 'left' }}>
                                        Documento <Paperclip />
                                    </Form.Label>
                                    <Col {...config_input}>
                                        <Form.File
                                            id="custom-file"
                                            label={nombre_archivos}
                                            name="file"
                                            onChange={CambiarArchivos}
                                            custom
                                            size="sm"
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group>
                                    <Autocomplete
                                        options={subagentes}
                                        getOptionLabel={(option) => Object.keys(option).length === 0 ? '' : `${option.nombres.toUpperCase()}`}
                                        value={subagente}
                                        renderInput={(params) => <TextField {...params} label="Sub Agente" variant="outlined" />}
                                        renderOption={(option) => {
                                            return (
                                                <div>
                                                    {option.nombres.toUpperCase()}
                                                </div>
                                            )
                                        }}
                                        onChange={(event, newValue) => {
                                            if (newValue == null) {
                                                setsubagente({})
                                            } else {
                                                setsubagente(newValue)
                                            }
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Col xs={12} className="text-center">
                                        <Button className='my-1' variant="inicio" onClick={() => { EnviarImagen() }} size="sm" disabled={nombre_archivos === '' ? true : false}>
                                            Subir Documento Documento
                                        </Button>
                                    </Col>
                                </Form.Group>

                            </Col>
                            <Col xs={12} style={{ display: !procesando ? 'none' : 'block' }}>
                                <Alert severity="info">
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    {' '}Procesando documento ...
                                </Alert>
                            </Col>
                            <Col xs={12} className="text-left" style={{ display: procesando ? 'none' : 'block' }}>
                                <Alert severity={badge_mensaje.style === '' ? 'info' : badge_mensaje.style}>
                                    {badge_mensaje.mensaje === '' ? `Recuerde que es una version BETA cualquier incidente tomar captura de pantalla y enviarlo a marcorodriguez@confianzayvida.com` : badge_mensaje.mensaje}
                                    <br />
                                    {badge_mensaje.data.length > 0 ?
                                        (
                                            <>
                                                {badge_mensaje.data.map((data, i) => (<div key={i}>
                                                    {i + 1}.- <b>{data}</b> ya existe esa póliza.<br />
                                                </div>)
                                                )}
                                            </>
                                        ) : (<></>)
                                    }
                                </Alert>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
         
        </>
    )
}
export default DocumentoSubAgente

