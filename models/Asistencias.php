<?php

class Asistencias extends Model {

    protected static $table = "t_asistencias";
    public $id;
    public $id_usuario;
    public $fecha_ingreso;
    public $fecha_salida;
    public $fecha_ingreso2;
    public $fecha_salida2;
    public $condicion;
    public $observacion;

    function __construct($id = '', $id_usuario = '', $fecha_ingreso = '', $fecha_salida = '', $fecha_ingreso2 = '', $fecha_salida2 = '', $condicion = '', $observacion = '') {
        $this->id = $id;
        $this->id_usuario = $id_usuario;
        $this->fecha_ingreso = $fecha_ingreso;
        $this->fecha_salida = $fecha_salida;
        $this->fecha_ingreso2 = $fecha_ingreso2;
        $this->fecha_salida2 = $fecha_salida2;
        $this->condicion = $condicion;
        $this->observacion = $observacion;
    }

    function getId() {
        return $this->id;
    }

    function getId_usuario() {
        return $this->id_usuario;
    }

    function getFecha_ingreso() {
        return $this->fecha_ingreso;
    }

    function getFecha_salida() {
        return $this->fecha_salida;
    }

    function getFecha_ingreso2() {
        return $this->fecha_ingreso2;
    }

    function getFecha_salida2() {
        return $this->fecha_salida2;
    }

    function getCondicion() {
        return $this->condicion;
    }

    function getObservacion() {
        return $this->observacion;
    }

    function setId($id): void {
        $this->id = $id;
    }

    function setId_usuario($id_usuario): void {
        $this->id_usuario = $id_usuario;
    }

    function setFecha_ingreso($fecha_ingreso): void {
        $this->fecha_ingreso = $fecha_ingreso;
    }

    function setFecha_salida($fecha_salida): void {
        $this->fecha_salida = $fecha_salida;
    }

    function setFecha_ingreso2($fecha_ingreso2): void {
        $this->fecha_ingreso2 = $fecha_ingreso2;
    }

    function setFecha_salida2($fecha_salida2): void {
        $this->fecha_salida2 = $fecha_salida2;
    }

    function setCondicion($condicion): void {
        $this->condicion = $condicion;
    }

    function setObservacion($observacion): void {
        $this->observacion = $observacion;
    }

    public function getMyVars() {
        return get_object_vars($this);
    }

}
