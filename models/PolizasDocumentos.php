<?php

class PolizasDocumentos extends Model {

    protected static $table = 't_polizas_documentos';
    public $id;
    public $id_poliza;
    public $id_subagente;
    public $fecha_emision;
    public $tipo_vigencia;
    public $fecha_vigencia_inicio;
    public $fecha_vigencia_fin;
    public $ejecutivo;
    public $nro_certificado;
    public $id_garantia;
    public $id_cargo;
    public $pago_empresa;
    public $pago_sub_agente;
    public $prima_total;
    public $prima_comercial;
    public $prima_neta;
    public $comision;
    public $porcentaje;
    public $comision_subagente;
    public $tipo_documento_poliza;
    public $tipo_pago;
    public $cancelado;
    public $fecha_creado;
    public $id_creado;

    function __construct($id = '', $id_poliza = '', $id_subagente = '', $fecha_emision = '', $tipo_vigencia = '', $fecha_vigencia_inicio = '', $fecha_vigencia_fin = '', $ejecutivo = '', $nro_certificado = '', $id_garantia = '', $id_cargo = '', $pago_empresa = '', $pago_sub_agente = '', $prima_total = '', $prima_comercial = '', $prima_neta = '', $comision = '', $porcentaje = '', $comision_subagente = '', $tipo_documento_poliza = '', $tipo_pago = '', $cancelado = '', $fecha_creado = '', $id_creado = '') {
        $this->id = $id;
        $this->id_poliza = $id_poliza;
        $this->id_subagente = $id_subagente;
        $this->fecha_emision = $fecha_emision;
        $this->tipo_vigencia = $tipo_vigencia;
        $this->fecha_vigencia_inicio = $fecha_vigencia_inicio;
        $this->fecha_vigencia_fin = $fecha_vigencia_fin;
        $this->ejecutivo = $ejecutivo;
        $this->nro_certificado = $nro_certificado;
        $this->id_garantia = $id_garantia;
        $this->id_cargo = $id_cargo;
        $this->pago_empresa = $pago_empresa;
        $this->pago_sub_agente = $pago_sub_agente;
        $this->prima_total = $prima_total;
        $this->prima_comercial = $prima_comercial;
        $this->prima_neta = $prima_neta;
        $this->comision = $comision;
        $this->porcentaje = $porcentaje;
        $this->comision_subagente = $comision_subagente;
        $this->tipo_documento_poliza = $tipo_documento_poliza;
        $this->tipo_pago = $tipo_pago;
        $this->cancelado = $cancelado;
        $this->fecha_creado = $fecha_creado;
        $this->id_creado = $id_creado;
    }

    function getId() {
        return $this->id;
    }

    function getId_poliza() {
        return $this->id_poliza;
    }

    function getId_subagente() {
        return $this->id_subagente;
    }

    function getFecha_emision() {
        return $this->fecha_emision;
    }

    function getTipo_vigencia() {
        return $this->tipo_vigencia;
    }

    function getFecha_vigencia_inicio() {
        return $this->fecha_vigencia_inicio;
    }

    function getFecha_vigencia_fin() {
        return $this->fecha_vigencia_fin;
    }

    function getEjecutivo() {
        return $this->ejecutivo;
    }

    function getNro_certificado() {
        return $this->nro_certificado;
    }

    function getId_garantia() {
        return $this->id_garantia;
    }

    function getId_cargo() {
        return $this->id_cargo;
    }

    function getPago_empresa() {
        return $this->pago_empresa;
    }

    function getPago_sub_agente() {
        return $this->pago_sub_agente;
    }

    function getPrima_total() {
        return $this->prima_total;
    }

    function getPrima_comercial() {
        return $this->prima_comercial;
    }

    function getPrima_neta() {
        return $this->prima_neta;
    }

    function getComision() {
        return $this->comision;
    }

    function getPorcentaje() {
        return $this->porcentaje;
    }

    function getComision_subagente() {
        return $this->comision_subagente;
    }

    function getTipo_documento_poliza() {
        return $this->tipo_documento_poliza;
    }

    function getTipo_pago() {
        return $this->tipo_pago;
    }

    function getCancelado() {
        return $this->cancelado;
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

    function setId_poliza($id_poliza): void {
        $this->id_poliza = $id_poliza;
    }

    function setId_subagente($id_subagente): void {
        $this->id_subagente = $id_subagente;
    }

    function setFecha_emision($fecha_emision): void {
        $this->fecha_emision = $fecha_emision;
    }

    function setTipo_vigencia($tipo_vigencia): void {
        $this->tipo_vigencia = $tipo_vigencia;
    }

    function setFecha_vigencia_inicio($fecha_vigencia_inicio): void {
        $this->fecha_vigencia_inicio = $fecha_vigencia_inicio;
    }

    function setFecha_vigencia_fin($fecha_vigencia_fin): void {
        $this->fecha_vigencia_fin = $fecha_vigencia_fin;
    }

    function setEjecutivo($ejecutivo): void {
        $this->ejecutivo = $ejecutivo;
    }

    function setNro_certificado($nro_certificado): void {
        $this->nro_certificado = $nro_certificado;
    }

    function setId_garantia($id_garantia): void {
        $this->id_garantia = $id_garantia;
    }

    function setId_cargo($id_cargo): void {
        $this->id_cargo = $id_cargo;
    }

    function setPago_empresa($pago_empresa): void {
        $this->pago_empresa = $pago_empresa;
    }

    function setPago_sub_agente($pago_sub_agente): void {
        $this->pago_sub_agente = $pago_sub_agente;
    }

    function setPrima_total($prima_total): void {
        $this->prima_total = $prima_total;
    }

    function setPrima_comercial($prima_comercial): void {
        $this->prima_comercial = $prima_comercial;
    }

    function setPrima_neta($prima_neta): void {
        $this->prima_neta = $prima_neta;
    }

    function setComision($comision): void {
        $this->comision = $comision;
    }

    function setPorcentaje($porcentaje): void {
        $this->porcentaje = $porcentaje;
    }

    function setComision_subagente($comision_subagente): void {
        $this->comision_subagente = $comision_subagente;
    }

    function setTipo_documento_poliza($tipo_documento_poliza): void {
        $this->tipo_documento_poliza = $tipo_documento_poliza;
    }

    function setTipo_pago($tipo_pago): void {
        $this->tipo_pago = $tipo_pago;
    }

    function setCancelado($cancelado): void {
        $this->cancelado = $cancelado;
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
