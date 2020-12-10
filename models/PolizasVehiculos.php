<?php

class PolizasVehiculos extends Model {

    protected static $table = "t_polizas_vehiculos";
    public $id;
    public $id_poliza;
    public $placa;
    public $clase;
    public $uso;
    public $categoria;
    public $marca;
    public $modelo;
    public $ano;
    public $nro_asientos;
    public $nro_pasajeros;
    public $nro_serie;
    public $motor;
    public $color;
    public $timon;
    public $combustible;
    public $carroceria;

    function __construct($id = '', $id_poliza = '', $placa = '', $clase = '', $uso = '', $categoria = '', $marca = '', $modelo = '', $ano = '', $nro_asientos = '', $nro_pasajeros = '', $nro_serie = '', $motor='', $color = '', $timon = '', $combustible = '', $carroceria = '') {
        $this->id = $id;
        $this->id_poliza = $id_poliza;
        $this->placa = $placa;
        $this->clase = $clase;
        $this->uso = $uso;
        $this->categoria = $categoria;
        $this->marca = $marca;
        $this->modelo = $modelo;
        $this->ano = $ano;
        $this->nro_asientos = $nro_asientos;
        $this->nro_pasajeros = $nro_pasajeros;
        $this->nro_serie = $nro_serie;
        $this->motor = $motor;
        $this->color = $color;
        $this->timon = $timon;
        $this->combustible = $combustible;
        $this->carroceria = $carroceria;
    }

    function getId() {
        return $this->id;
    }

    function getId_poliza() {
        return $this->id_poliza;
    }

    function getPlaca() {
        return $this->placa;
    }

    function getClase() {
        return $this->clase;
    }

    function getUso() {
        return $this->uso;
    }

    function getCategoria() {
        return $this->categoria;
    }

    function getMarca() {
        return $this->marca;
    }

    function getModelo() {
        return $this->modelo;
    }

    function getAno() {
        return $this->ano;
    }

    function getNro_asientos() {
        return $this->nro_asientos;
    }

    function getNro_pasajeros() {
        return $this->nro_pasajeros;
    }

    function getNro_serie() {
        return $this->nro_serie;
    }

    function getMotor() {
        return $this->motor;
    }

    function getColor() {
        return $this->color;
    }

    function getTimon() {
        return $this->timon;
    }

    function getCombustible() {
        return $this->combustible;
    }

    function getCarroceria() {
        return $this->carroceria;
    }

    function setId($id): void {
        $this->id = $id;
    }

    function setId_poliza($id_poliza): void {
        $this->id_poliza = $id_poliza;
    }

    function setPlaca($placa): void {
        $this->placa = $placa;
    }

    function setClase($clase): void {
        $this->clase = $clase;
    }

    function setUso($uso): void {
        $this->uso = $uso;
    }

    function setCategoria($categoria): void {
        $this->categoria = $categoria;
    }

    function setMarca($marca): void {
        $this->marca = $marca;
    }

    function setModelo($modelo): void {
        $this->modelo = $modelo;
    }

    function setAno($ano): void {
        $this->ano = $ano;
    }

    function setNro_asientos($nro_asientos): void {
        $this->nro_asientos = $nro_asientos;
    }

    function setNro_pasajeros($nro_pasajeros): void {
        $this->nro_pasajeros = $nro_pasajeros;
    }

    function setNro_serie($nro_serie): void {
        $this->nro_serie = $nro_serie;
    }

    function setMotor($motor): void {
        $this->motor = $motor;
    }

    function setColor($color): void {
        $this->color = $color;
    }

    function setTimon($timon): void {
        $this->timon = $timon;
    }

    function setCombustible($combustible): void {
        $this->combustible = $combustible;
    }

    function setCarroceria($carroceria): void {
        $this->carroceria = $carroceria;
    }

    public function getMyVars() {
        return get_object_vars($this);
    }

}
