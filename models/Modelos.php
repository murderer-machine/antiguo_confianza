<?php

class Modelos extends Model {

    protected static $table = "car_models";
    public $id;
    public $modelo;
    private $id_marca;

    function __construct($id = '', $modelo = '', $id_marca = '') {
        $this->id = $id;
        $this->modelo = $modelo;
        $this->id_marca = $id_marca;
    }

    function getId() {
        return $this->id;
    }

    function getModelo() {
        return $this->modelo;
    }

    function getId_marca() {
        return $this->id_marca;
    }

    function setId($id): void {
        $this->id = $id;
    }

    function setModelo($modelo): void {
        $this->modelo = $modelo;
    }

    function setId_marca($id_marca): void {
        $this->id_marca = $id_marca;
    }

    public function getMyVars() {
        return get_object_vars($this);
    }

}
