<?php

class Motorizados extends Model {

    protected static $table = "t_motorizados";
    public $id;
    public $fecha_salida;
    public $fecha_retorno;
    public $observacion;
    public $observacion_retorno;
    public $id_motorizado;
    public $id_usuario;

    function __construct($id = '', $fecha_salida = '', $fecha_retorno = '', $observacion = '', $observacion_retorno = '', $id_motorizado = '', $id_usuario = '') {
        $this->id = $id;
        $this->fecha_salida = $fecha_salida;
        $this->fecha_retorno = $fecha_retorno;
        $this->observacion = $observacion;
        $this->observacion_retorno = $observacion_retorno;
        $this->id_motorizado = $id_motorizado;
        $this->id_usuario = $id_usuario;
    }

    function getId() {
        return $this->id;
    }

    function getFecha_salida() {
        return $this->fecha_salida;
    }

    function getFecha_retorno() {
        return $this->fecha_retorno;
    }

    function getObservacion() {
        return $this->observacion;
    }

    function getObservacion_retorno() {
        return $this->observacion_retorno;
    }

    function getId_motorizado() {
        return $this->id_motorizado;
    }

    function getId_usuario() {
        return $this->id_usuario;
    }

    function setId($id): void {
        $this->id = $id;
    }

    function setFecha_salida($fecha_salida): void {
        $this->fecha_salida = $fecha_salida;
    }

    function setFecha_retorno($fecha_retorno): void {
        $this->fecha_retorno = $fecha_retorno;
    }

    function setObservacion($observacion): void {
        $this->observacion = $observacion;
    }

    function setObservacion_retorno($observacion_retorno): void {
        $this->observacion_retorno = $observacion_retorno;
    }

    function setId_motorizado($id_motorizado): void {
        $this->id_motorizado = $id_motorizado;
    }

    function setId_usuario($id_usuario): void {
        $this->id_usuario = $id_usuario;
    }

    public function getMyVars() {
        return get_object_vars($this);
    }

}
