<?php

class Polizas extends Model {

    protected static $table = 't_polizas';
    public $id;
    public $nro_poliza;
    public $nro_poliza_corregido;
    public $id_cliente;
    public $id_empresa;
    public $id_producto;
    public $id_ramo;
    public $moneda;
    public $descripcion;
    public $endoso_a_favor;
    public $anulada;
    public $fecha_creado;
    public $id_creado;

    function __construct($id = '', $nro_poliza = '', $nro_poliza_corregido = '', $id_cliente = '', $id_empresa = '', $id_producto = '', $id_ramo = '', $moneda = '', $descripcion = '', $endoso_a_favor = '', $anulada = '', $fecha_creado = '', $id_creado = '') {
        $this->id = $id;
        $this->nro_poliza = $nro_poliza;
        $this->nro_poliza_corregido = $nro_poliza_corregido;
        $this->id_cliente = $id_cliente;
        $this->id_empresa = $id_empresa;
        $this->id_producto = $id_producto;
        $this->id_ramo = $id_ramo;
        $this->moneda = $moneda;
        $this->descripcion = $descripcion;
        $this->endoso_a_favor = $endoso_a_favor;
        $this->anulada = $anulada;
        $this->fecha_creado = $fecha_creado;
        $this->id_creado = $id_creado;
    }

    function getId() {
        return $this->id;
    }

    function getNro_poliza() {
        return $this->nro_poliza;
    }

    function getNro_poliza_corregido() {
        return $this->nro_poliza_corregido;
    }

    function getId_cliente() {
        return $this->id_cliente;
    }

    function getId_empresa() {
        return $this->id_empresa;
    }

    function getId_producto() {
        return $this->id_producto;
    }

    function getId_ramo() {
        return $this->id_ramo;
    }

    function getMoneda() {
        return $this->moneda;
    }

    function getDescripcion() {
        return $this->descripcion;
    }

    function getEndoso_a_favor() {
        return $this->endoso_a_favor;
    }

    function getAnulada() {
        return $this->anulada;
    }

    function getFecha_creado() {
        return $this->fecha_creado;
    }

    function getId_creado() {
        return $this->id_creado;
    }

    function setId($id): void {
        $this->id = $id;
    }

    function setNro_poliza($nro_poliza): void {
        $this->nro_poliza = $nro_poliza;
    }

    function setNro_poliza_corregido($nro_poliza_corregido): void {
        $this->nro_poliza_corregido = $nro_poliza_corregido;
    }

    function setId_cliente($id_cliente): void {
        $this->id_cliente = $id_cliente;
    }

    function setId_empresa($id_empresa): void {
        $this->id_empresa = $id_empresa;
    }

    function setId_producto($id_producto): void {
        $this->id_producto = $id_producto;
    }

    function setId_ramo($id_ramo): void {
        $this->id_ramo = $id_ramo;
    }

    function setMoneda($moneda): void {
        $this->moneda = $moneda;
    }

    function setDescripcion($descripcion): void {
        $this->descripcion = $descripcion;
    }

    function setEndoso_a_favor($endoso_a_favor): void {
        $this->endoso_a_favor = $endoso_a_favor;
    }

    function setAnulada($anulada): void {
        $this->anulada = $anulada;
    }

    function setFecha_creado($fecha_creado): void {
        $this->fecha_creado = $fecha_creado;
    }

    function setId_creado($id_creado): void {
        $this->id_creado = $id_creado;
    }

    public function getMyVars() {
        return get_object_vars($this);
    }

}
