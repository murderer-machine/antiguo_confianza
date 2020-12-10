<?php

class PolizasDocumentosComentarios extends Model {

    protected static $table = 't_polizas_documentos_comentarios';
    public $id;
    public $id_documento;
    public $comentario;
    public $fecha_hora;
    public $id_usuario;

    function __construct($id = '', $id_documento = '', $comentario = '', $fecha_hora = '', $id_usuario = '') {
        $this->id = $id;
        $this->id_documento = $id_documento;
        $this->comentario = $comentario;
        $this->fecha_hora = $fecha_hora;
        $this->id_usuario = $id_usuario;
    }

    function getId() {
        return $this->id;
    }

    function getId_documento() {
        return $this->id_documento;
    }

    function getComentario() {
        return $this->comentario;
    }

    function getFecha_hora() {
        return $this->fecha_hora;
    }

    function getId_usuario() {
        return $this->id_usuario;
    }

    function setId($id): void {
        $this->id = $id;
    }

    function setId_documento($id_documento): void {
        $this->id_documento = $id_documento;
    }

    function setComentario($comentario): void {
        $this->comentario = $comentario;
    }

    function setFecha_hora($fecha_hora): void {
        $this->fecha_hora = $fecha_hora;
    }

    function setId_usuario($id_usuario): void {
        $this->id_usuario = $id_usuario;
    }

    public
            function getMyVars() {
        return get_object_vars($this);
    }

}
