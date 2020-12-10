<?php

class TipoDocumentoPolizaCupon extends Model {

    protected static $table = "t_polizas_documentos_cupones";
    public $id;
    public $id_documento;
    public $nro_orden;
    public $nro_cuota;
    public $importe;
    public $fecha_obligacion;
    public $fecha_limite;
    public $situacion;
    public $fecha_pago;
    public $observaciones;
    public $revisado_general;

    function __construct($id = '', $id_documento = '', $nro_orden = '', $nro_cuota = '', $importe = '', $fecha_obligacion = '', $fecha_limite = '', $situacion = '', $fecha_pago = '', $observaciones = '', $revisado_general = '') {
        $this->id = $id;
        $this->id_documento = $id_documento;
        $this->nro_orden = $nro_orden;
        $this->nro_cuota = $nro_cuota;
        $this->importe = $importe;
        $this->fecha_obligacion = $fecha_obligacion;
        $this->fecha_limite = $fecha_limite;
        $this->situacion = $situacion;
        $this->fecha_pago = $fecha_pago;
        $this->observaciones = $observaciones;
        $this->revisado_general = $revisado_general;
    }

    function getRevisado_general() {
        return $this->revisado_general;
    }

    function setRevisado_general($revisado_general): void {
        $this->revisado_general = $revisado_general;
    }

    function getId() {
        return $this->id;
    }

    function getId_documento() {
        return $this->id_documento;
    }

    function getNro_orden() {
        return $this->nro_orden;
    }

    function getNro_cuota() {
        return $this->nro_cuota;
    }

    function getImporte() {
        return $this->importe;
    }

    function getFecha_obligacion() {
        return $this->fecha_obligacion;
    }

    function getFecha_limite() {
        return $this->fecha_limite;
    }

    function getSituacion() {
        return $this->situacion;
    }

    function getFecha_pago() {
        return $this->fecha_pago;
    }

    function getObservaciones() {
        return $this->observaciones;
    }

    function setId($id): void {
        $this->id = $id;
    }

    function setId_documento($id_documento): void {
        $this->id_documento = $id_documento;
    }

    function setNro_orden($nro_orden): void {
        $this->nro_orden = $nro_orden;
    }

    function setNro_cuota($nro_cuota): void {
        $this->nro_cuota = $nro_cuota;
    }

    function setImporte($importe): void {
        $this->importe = $importe;
    }

    function setFecha_obligacion($fecha_obligacion): void {
        $this->fecha_obligacion = $fecha_obligacion;
    }

    function setFecha_limite($fecha_limite): void {
        $this->fecha_limite = $fecha_limite;
    }

    function setSituacion($situacion): void {
        $this->situacion = $situacion;
    }

    function setFecha_pago($fecha_pago): void {
        $this->fecha_pago = $fecha_pago;
    }

    function setObservaciones($observaciones): void {
        $this->observaciones = $observaciones;
    }

    public function getMyVars() {
        return get_object_vars($this);
    }

}
