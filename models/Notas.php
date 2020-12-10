<?php

class Notas extends Model {

    protected static $table = "t_notas";
    public $id;
    public $fecha_creacion;
    public $fecha_final;
    public $nota;
    public $id_usuario;
    public $estado;

    function __construct($id, $fecha_creacion, $fecha_final, $nota, $id_usuario, $estado) {
        $this->id = $id;
        $this->fecha_creacion = $fecha_creacion;
        $this->fecha_final = $fecha_final;
        $this->nota = $nota;
        $this->id_usuario = $id_usuario;
        $this->estado = $estado;
    }

    function getId() {
        return $this->id;
    }

    function getFecha_creacion() {
        return $this->fecha_creacion;
    }

    function getFecha_final() {
        return $this->fecha_final;
    }

    function getNota() {
        return $this->nota;
    }

    function getId_usuario() {
        return $this->id_usuario;
    }

    function getEstado() {
        return $this->estado;
    }

    function setId($id): void {
        $this->id = $id;
    }

    function setFecha_creacion($fecha_creacion): void {
        $this->fecha_creacion = $fecha_creacion;
    }

    function setFecha_final($fecha_final): void {
        $this->fecha_final = $fecha_final;
    }

    function setNota($nota): void {
        $this->nota = $nota;
    }

    function setId_usuario($id_usuario): void {
        $this->id_usuario = $id_usuario;
    }

    function setEstado($estado): void {
        $this->estado = $estado;
    }

    public function getMyVars() {
        return get_object_vars($this);
    }

}
