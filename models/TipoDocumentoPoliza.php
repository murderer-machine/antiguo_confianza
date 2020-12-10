<?php

class TipoDocumentoPoliza extends Model {

    protected static $table = "t_tipo_documento_poliza";
    public $id;
    public $nombre;

    function __construct($id = '', $nombre = '') {
        $this->id = $id;
        $this->nombre = $nombre;
    }

    function getId() {
        return $this->id;
    }

    function getNombre() {
        return $this->nombre;
    }

    function setId($id): void {
        $this->id = $id;
    }

    function setNombre($nombre): void {
        $this->nombre = $nombre;
    }

    public function getMyVars() {
        return get_object_vars($this);
    }

}
