<?php

class EmpresasSeguros extends Model {

    protected static $table = "t_empresas_seguro";
    public $id;
    public $nombre;
    public $ruc;
    public $factor_general;
    public $factor_soat;
    public $gastos_emision;
    public $gastos_emision_minimo;
    public $gastos_emision_minimo_soat;
    public $activo;
    public $logo;

    function __construct($id = '', $nombre = '', $ruc = '', $factor_general = '', $factor_soat = '', $gastos_emision = '', $gastos_emision_minimo = '', $gastos_emision_minimo_soat = '', $activo = '', $logo = '') {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->ruc = $ruc;
        $this->factor_general = $factor_general;
        $this->factor_soat = $factor_soat;
        $this->gastos_emision = $gastos_emision;
        $this->gastos_emision_minimo = $gastos_emision_minimo;
        $this->gastos_emision_minimo_soat = $gastos_emision_minimo_soat;
        $this->activo = $activo;
        $this->logo = $logo;
    }

    function getId() {
        return $this->id;
    }

    function getNombre() {
        return $this->nombre;
    }

    function getRuc() {
        return $this->ruc;
    }

    function getFactor_general() {
        return $this->factor_general;
    }

    function getFactor_soat() {
        return $this->factor_soat;
    }

    function getGastos_emision() {
        return $this->gastos_emision;
    }

    function getGastos_emision_minimo() {
        return $this->gastos_emision_minimo;
    }

    function getGastos_emision_minimo_soat() {
        return $this->gastos_emision_minimo_soat;
    }

    function getActivo() {
        return $this->activo;
    }

    function getLogo() {
        return $this->logo;
    }

    function setId($id): void {
        $this->id = $id;
    }

    function setNombre($nombre): void {
        $this->nombre = $nombre;
    }

    function setRuc($ruc): void {
        $this->ruc = $ruc;
    }

    function setFactor_general($factor_general): void {
        $this->factor_general = $factor_general;
    }

    function setFactor_soat($factor_soat): void {
        $this->factor_soat = $factor_soat;
    }

    function setGastos_emision($gastos_emision): void {
        $this->gastos_emision = $gastos_emision;
    }

    function setGastos_emision_minimo($gastos_emision_minimo): void {
        $this->gastos_emision_minimo = $gastos_emision_minimo;
    }

    function setGastos_emision_minimo_soat($gastos_emision_minimo_soat): void {
        $this->gastos_emision_minimo_soat = $gastos_emision_minimo_soat;
    }

    function setActivo($activo): void {
        $this->activo = $activo;
    }

    function setLogo($logo): void {
        $this->logo = $logo;
    }

    public function getMyVars() {
        return get_object_vars($this);
    }

}
