<?php

class SubAgentesComisiones extends Model {

    protected static $table = "t_subagentes_comisiones";
    public $id;
    public $id_subagente;
    public $id_empresa_seguro;
    public $id_producto_empresa_seguro;
    public $comision;

    function __construct($id = '', $id_subagente = '', $id_empresa_seguro = '', $id_producto_empresa_seguro = '', $comision = '') {
        $this->id = $id;
        $this->id_subagente = $id_subagente;
        $this->id_empresa_seguro = $id_empresa_seguro;
        $this->id_producto_empresa_seguro = $id_producto_empresa_seguro;
        $this->comision = $comision;
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

    function getId_producto_empresa_seguro() {
        return $this->id_producto_empresa_seguro;
    }

    function getComision() {
        return $this->comision;
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

    function setId_producto_empresa_seguro($id_producto_empresa_seguro): void {
        $this->id_producto_empresa_seguro = $id_producto_empresa_seguro;
    }

    function setComision($comision): void {
        $this->comision = $comision;
    }

    public function getMyVars() {
        return get_object_vars($this);
    }

}
