<?php

class Usuarios extends Model {

    protected static $table = "t_usuarios";
    public $id;
    public $dni;
    public $nombres;
    public $apellidos;
    public $correo;
    public $password;
    public $fecha_creacion;

    function __construct($id = '', $dni = '', $nombres = '', $apellidos = '', $correo = '', $password = '', $fecha_creacion = '') {
        $this->id = $id;
        $this->dni = $dni;
        $this->nombres = $nombres;
        $this->apellidos = $apellidos;
        $this->correo = $correo;
        $this->password = $password;
        $this->fecha_creacion = $fecha_creacion;
    }

    function getId() {
        return $this->id;
    }

    function getDni() {
        return $this->dni;
    }

    function getNombres() {
        return $this->nombres;
    }

    function getApellidos() {
        return $this->apellidos;
    }

    function getCorreo() {
        return $this->correo;
    }

    function getPassword() {
        return $this->password;
    }

    function getFecha_creacion() {
        return $this->fecha_creacion;
    }

    function setId($id): void {
        $this->id = $id;
    }

    function setDni($dni): void {
        $this->dni = $dni;
    }

    function setNombres($nombres): void {
        $this->nombres = $nombres;
    }

    function setApellidos($apellidos): void {
        $this->apellidos = $apellidos;
    }

    function setCorreo($correo): void {
        $this->correo = $correo;
    }

    function setPassword($password): void {
        $this->password = $password;
    }

    function setFecha_creacion($fecha_creacion): void {
        $this->fecha_creacion = $fecha_creacion;
    }

    public function getMyVars() {
        return get_object_vars($this);
    }

}
