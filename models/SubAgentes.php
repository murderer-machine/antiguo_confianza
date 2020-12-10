<?php

class SubAgentes extends Model {

    protected static $table = "t_subagentes";
    public $id;
    public $nombres;
    public $apellidos;
    public $abreviatura;
    public $correo;
    public $celular;
    public $avatar;

    function __construct($id = '', $nombres = '', $apellidos = '', $abreviatura = '', $correo = '', $celular = '', $avatar = '') {
        $this->id = $id;
        $this->nombres = $nombres;
        $this->apellidos = $apellidos;
        $this->abreviatura = $abreviatura;
        $this->correo = $correo;
        $this->celular = $celular;
        $this->avatar = $avatar;
    }

    function getId() {
        return $this->id;
    }

    function getNombres() {
        return $this->nombres;
    }

    function getApellidos() {
        return $this->apellidos;
    }

    function getAbreviatura() {
        return $this->abreviatura;
    }

    function getCorreo() {
        return $this->correo;
    }

    function getCelular() {
        return $this->celular;
    }

    function getAvatar() {
        return $this->avatar;
    }

    function setId($id): void {
        $this->id = $id;
    }

    function setNombres($nombres): void {
        $this->nombres = $nombres;
    }

    function setApellidos($apellidos): void {
        $this->apellidos = $apellidos;
    }

    function setAbreviatura($abreviatura): void {
        $this->abreviatura = $abreviatura;
    }

    function setCorreo($correo): void {
        $this->correo = $correo;
    }

    function setCelular($celular): void {
        $this->celular = $celular;
    }

    function setAvatar($avatar): void {
        $this->avatar = $avatar;
    }

    public function getMyVars() {
        return get_object_vars($this);
    }

}
