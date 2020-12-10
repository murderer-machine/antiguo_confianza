<?php

class Marcas extends Model {

    protected static $table = "car_makes";
    public $id;
    public $marca;

    function __construct($id = '', $marca = '') {
        $this->id = $id;
        $this->marca = $marca;
    }

    function getId() {
        return $this->id;
    }

    function getMarca() {
        return $this->marca;
    }

    function setId($id): void {
        $this->id = $id;
    }

    function setMarca($marca): void {
        $this->marca = $marca;
    }

    public function getMyVars() {
        return get_object_vars($this);
    }

}
