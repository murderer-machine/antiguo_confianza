<?php

class ProductosEmpresasSeguros extends Model {

    protected static $table = "t_productos_empresas_seguros";
    public $id;
    public $nombre;
    public $id_empresas_seguro;
    public $id_ramo;
    public $comision;

    function __construct($id = '', $nombre = '', $id_empresas_seguro = '', $id_ramo = '', $comision = '') {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->id_empresas_seguro = $id_empresas_seguro;
        $this->id_ramo = $id_ramo;
        $this->comision = $comision;
    }

    function getId() {
        return $this->id;
    }

    function getNombre() {
        return $this->nombre;
    }

    function getId_empresas_seguro() {
        return $this->id_empresas_seguro;
    }

    function getId_ramo() {
        return $this->id_ramo;
    }

    function getComision() {
        return $this->comision;
    }

    function setId($id): void {
        $this->id = $id;
    }

    function setNombre($nombre): void {
        $this->nombre = $nombre;
    }

    function setId_empresas_seguro($id_empresas_seguro): void {
        $this->id_empresas_seguro = $id_empresas_seguro;
    }

    function setId_ramo($id_ramo): void {
        $this->id_ramo = $id_ramo;
    }

    function setComision($comision): void {
        $this->comision = $comision;
    }

    public function getMyVars() {
        return get_object_vars($this);
    }

}
