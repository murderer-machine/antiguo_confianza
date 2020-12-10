<?php

class CertificadosFisicos extends Model {

    protected static $table = 't_certificados_fisicos';
    public $id;
    public $id_subagente;
    public $id_empresa_seguro;
    public $fecha_entrega;
    public $correlativo_inicio;
    public $correlativo_fin;
    public $fecha_ingreso_certificados;
    public $id_usuario_ingreso;

    function __construct($id = '', $id_subagente = '', $id_empresa_seguro = '', $fecha_entrega = '', $correlativo_inicio = '', $correlativo_fin = '', $fecha_ingreso_certificados = '', $id_usuario_ingreso = '') {
        $this->id = $id;
        $this->id_subagente = $id_subagente;
        $this->id_empresa_seguro = $id_empresa_seguro;
        $this->fecha_entrega = $fecha_entrega;
        $this->correlativo_inicio = $correlativo_inicio;
        $this->correlativo_fin = $correlativo_fin;
        $this->fecha_ingreso_certificados = $fecha_ingreso_certificados;
        $this->id_usuario_ingreso = $id_usuario_ingreso;
    }

    function getId() {
        return $this->id;
    }

    function getId_subagente() {
        return $this->id_subagente;
    }

    function getId_empresa_seguro() {
        return $this->id_empresa_seguro;
    }

    function getFecha_entrega() {
        return $this->fecha_entrega;
    }

    function getCorrelativo_inicio() {
        return $this->correlativo_inicio;
    }

    function getCorrelativo_fin() {
        return $this->correlativo_fin;
    }

    function getFecha_ingreso_certificados() {
        return $this->fecha_ingreso_certificados;
    }

    function getId_usuario_ingreso() {
        return $this->id_usuario_ingreso;
    }

    function setId($id): void {
        $this->id = $id;
    }

    function setId_subagente($id_subagente): void {
        $this->id_subagente = $id_subagente;
    }

    function setId_empresa_seguro($id_empresa_seguro): void {
        $this->id_empresa_seguro = $id_empresa_seguro;
    }

    function setFecha_entrega($fecha_entrega): void {
        $this->fecha_entrega = $fecha_entrega;
    }

    function setCorrelativo_inicio($correlativo_inicio): void {
        $this->correlativo_inicio = $correlativo_inicio;
    }

    function setCorrelativo_fin($correlativo_fin): void {
        $this->correlativo_fin = $correlativo_fin;
    }

    function setFecha_ingreso_certificados($fecha_ingreso_certificados): void {
        $this->fecha_ingreso_certificados = $fecha_ingreso_certificados;
    }

    function setId_usuario_ingreso($id_usuario_ingreso): void {
        $this->id_usuario_ingreso = $id_usuario_ingreso;
    }

    public function getMyVars() {
        return get_object_vars($this);
    }

}
