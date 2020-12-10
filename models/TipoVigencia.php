<?php

class TipoVigencia extends Model {

    protected static $table = 't_tipo_vigencia';
    public $id;
    public $nombre;
    public $dias;

    function __construct($id = '', $nombre = '', $dias = '') {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->dias = $dias;
    }

    function getId() {
        return $this->id;
    }

    function getNombre() {
        return $this->nombre;
    }

    function getDias() {
        return $this->dias;
    }

    function setId($id): void {
        $this->id = $id;
    }

    function setNombre($nombre): void {
        $this->nombre = $nombre;
    }

    function setDias($dias): void {
        $this->dias = $dias;
    }

    public function getMyVars() {
        return get_object_vars($this);
    }

}
