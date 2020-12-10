<?php

class Ubigeo extends Model {

    protected static $table = "t_ubigeo";
    private $id;
    private $ubi_departamento;
    private $ubi_provincia;
    private $ubi_distrito;

    function __construct($id = '', $ubi_departamento = '', $ubi_provincia = '', $ubi_distrito = '') {
        $this->id = $id;
        $this->ubi_departamento = $ubi_departamento;
        $this->ubi_provincia = $ubi_provincia;
        $this->ubi_distrito = $ubi_distrito;
    }

    function getId() {
        return $this->id;
    }

    function getUbi_departamento() {
        return $this->ubi_departamento;
    }

    function getUbi_provincia() {
        return $this->ubi_provincia;
    }

    function getUbi_distrito() {
        return $this->ubi_distrito;
    }

    function setId($id): void {
        $this->id = $id;
    }

    function setUbi_departamento($ubi_departamento): void {
        $this->ubi_departamento = $ubi_departamento;
    }

    function setUbi_provincia($ubi_provincia): void {
        $this->ubi_provincia = $ubi_provincia;
    }

    function setUbi_distrito($ubi_distrito): void {
        $this->ubi_distrito = $ubi_distrito;
    }

    public function getMyVars() {
        return get_object_vars($this);
    }

}
