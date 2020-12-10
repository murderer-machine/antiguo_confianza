<?php

class Monedas extends Model {

    protected static $table = "t_monedas";
    public $id;
    public $nombre;
    public $simbolo;

    function __construct($id = '', $nombre = '', $simbolo = '') {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->simbolo = $simbolo;
    }

    function getId() {
        return $this->id;
    }

    function getNombre() {
        return $this->nombre;
    }

    function getSimbolo() {
        return $this->simbolo;
    }

    function setId($id): void {
        $this->id = $id;
    }

    function setNombre($nombre): void {
        $this->nombre = $nombre;
    }

    function setSimbolo($simbolo): void {
        $this->simbolo = $simbolo;
    }

    public function getMyVars() {
        return get_object_vars($this);
    }

}
