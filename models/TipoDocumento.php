<?php

class TipoDocumento extends Model {

    protected static $table = "t_tipo_documento";
    public $id;
    public $descripcion;

    function __construct($id ='', $descripcion='') {
        $this->id = $id;
        $this->descripcion = $descripcion;
    }

    function getId() {
        return $this->id;
    }

    function getDescripcion() {
        return $this->descripcion;
    }

    function setId($id): void {
        $this->id = $id;
    }

    function setDescripcion($descripcion): void {
        $this->descripcion = $descripcion;
    }

    public function getMyVars() {
        return get_object_vars($this);
    }

}
