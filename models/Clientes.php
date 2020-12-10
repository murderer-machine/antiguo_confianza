<?php

class Clientes extends Model {

    protected static $table = "t_clientes";
    public $id;
    public $nombre;
    public $id_tipodoc;
    public $nrodoc;
    public $id_giro_negocio;
    public $direccion;
    public $referencia;
    public $id_ubigeo;
    public $fecha_creacion;
    public $id_subagente;
    public $eliminado_logico;

    function __construct(
            
            $id = '',
            $nombre = '',
            $id_tipodoc = '',
            $nrodoc = '',
            $id_giro_negocio = '',
            $direccion = '',
            $referencia = '',
            $id_ubigeo = '',
            $fecha_creacion = '',
            $id_subagente = '',
            $eliminado_logico = '') {

        $this->id = $id;
        $this->nombre = $nombre;
        $this->id_tipodoc = $id_tipodoc;
        $this->nrodoc = $nrodoc;
        $this->id_giro_negocio = $id_giro_negocio;
        $this->direccion = $direccion;
        $this->referencia = $referencia;
        $this->id_ubigeo = $id_ubigeo;
        $this->fecha_creacion = $fecha_creacion;
        $this->id_subagente = $id_subagente;
        $this->eliminado_logico = $eliminado_logico;
    }

    function getId() {
        return $this->id;
    }

    function getNombre() {
        return $this->nombre;
    }

    function getId_tipodoc() {
        return $this->id_tipodoc;
    }

    function getNrodoc() {
        return $this->nrodoc;
    }

    function getId_giro_negocio() {
        return $this->id_giro_negocio;
    }

    function getDireccion() {
        return $this->direccion;
    }

    function getReferencia() {
        return $this->referencia;
    }

    function getId_ubigeo() {
        return $this->id_ubigeo;
    }

    function getFecha_creacion() {
        return $this->fecha_creacion;
    }

    function getId_subagente() {
        return $this->id_subagente;
    }

    function getEliminado_logico() {
        return $this->eliminado_logico;
    }

    function setId($id): void {
        $this->id = $id;
    }

    function setNombre($nombre): void {
        $this->nombre = $nombre;
    }

    function setId_tipodoc($id_tipodoc): void {
        $this->id_tipodoc = $id_tipodoc;
    }

    function setNrodoc($nrodoc): void {
        $this->nrodoc = $nrodoc;
    }

    function setId_giro_negocio($id_giro_negocio): void {
        $this->id_giro_negocio = $id_giro_negocio;
    }

    function setDireccion($direccion): void {
        $this->direccion = $direccion;
    }

    function setReferencia($referencia): void {
        $this->referencia = $referencia;
    }

    function setId_ubigeo($id_ubigeo): void {
        $this->id_ubigeo = $id_ubigeo;
    }

    function setFecha_creacion($fecha_creacion): void {
        $this->fecha_creacion = $fecha_creacion;
    }

    function setId_subagente($id_subagente): void {
        $this->id_subagente = $id_subagente;
    }

    function setEliminado_logico($eliminado_logico): void {
        $this->eliminado_logico = $eliminado_logico;
    }

    public function getMyVars() {
        return get_object_vars($this);
    }

}
