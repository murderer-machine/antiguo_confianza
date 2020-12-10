<?php

class Pamela extends Model {

    protected static $table = "t_pamela";
    public $id;
    public $compania;
    public $vigencia_inicio;
    public $vigencia_fin;
    public $placa;
    public $poliza;
    public $uso;
    public $clase;
    public $estado;
    public $tipo;
    public $creacion;

    function __construct($id = '', $compania = '', $vigencia_inicio = '', $vigencia_fin = '', $placa = '', $poliza = '', $uso = '', $clase = '', $estado = '', $tipo = '', $creacion = '') {
        $this->id = $id;
        $this->compania = $compania;
        $this->vigencia_inicio = $vigencia_inicio;
        $this->vigencia_fin = $vigencia_fin;
        $this->placa = $placa;
        $this->poliza = $poliza;
        $this->uso = $uso;
        $this->clase = $clase;
        $this->estado = $estado;
        $this->tipo = $tipo;
        $this->creacion = $creacion;
    }

    static function getTable() {
        return self::$table;
    }

    function getId() {
        return $this->id;
    }

    function getCompania() {
        return $this->compania;
    }

    function getVigencia_inicio() {
        return $this->vigencia_inicio;
    }

    function getVigencia_fin() {
        return $this->vigencia_fin;
    }

    function getPlaca() {
        return $this->placa;
    }

    function getPoliza() {
        return $this->poliza;
    }

    function getUso() {
        return $this->uso;
    }

    function getClase() {
        return $this->clase;
    }

    function getEstado() {
        return $this->estado;
    }

    function getTipo() {
        return $this->tipo;
    }

    function getCreacion() {
        return $this->creacion;
    }

    static function setTable($table): void {
        self::$table = $table;
    }

    function setId($id): void {
        $this->id = $id;
    }

    function setCompania($compania): void {
        $this->compania = $compania;
    }

    function setVigencia_inicio($vigencia_inicio): void {
        $this->vigencia_inicio = $vigencia_inicio;
    }

    function setVigencia_fin($vigencia_fin): void {
        $this->vigencia_fin = $vigencia_fin;
    }

    function setPlaca($placa): void {
        $this->placa = $placa;
    }

    function setPoliza($poliza): void {
        $this->poliza = $poliza;
    }

    function setUso($uso): void {
        $this->uso = $uso;
    }

    function setClase($clase): void {
        $this->clase = $clase;
    }

    function setEstado($estado): void {
        $this->estado = $estado;
    }

    function setTipo($tipo): void {
        $this->tipo = $tipo;
    }

    function setCreacion($creacion): void {
        $this->creacion = $creacion;
    }

    public function getMyVars() {
        return get_object_vars($this);
    }

}
