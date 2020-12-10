<?php

class ClientesContactos extends Model {

    protected static $table = "t_clientes_contactos";
    public $id;
    public $id_cliente;
    public $nombre;
    public $telefono;
    public $celular;
    public $correo;
    public $id_principal;

    function __construct($id = '', $id_cliente = '', $nombre = '', $telefono = '', $celular = '', $correo = '', $id_principal = '') {
        $this->id = $id;
        $this->id_cliente = $id_cliente;
        $this->nombre = $nombre;
        $this->telefono = $telefono;
        $this->celular = $celular;
        $this->correo = $correo;
        $this->id_principal = $id_principal;
    }

    function getId() {
        return $this->id;
    }

    function getId_cliente() {
        return $this->id_cliente;
    }

    function getNombre() {
        return $this->nombre;
    }

    function getTelefono() {
        return $this->telefono;
    }

    function getCelular() {
        return $this->celular;
    }

    function getCorreo() {
        return $this->correo;
    }

    function getId_principal() {
        return $this->id_principal;
    }

    function setId($id): void {
        $this->id = $id;
    }

    function setId_cliente($id_cliente): void {
        $this->id_cliente = $id_cliente;
    }

    function setNombre($nombre): void {
        $this->nombre = $nombre;
    }

    function setTelefono($telefono): void {
        $this->telefono = $telefono;
    }

    function setCelular($celular): void {
        $this->celular = $celular;
    }

    function setCorreo($correo): void {
        $this->correo = $correo;
    }

    function setId_principal($id_principal): void {
        $this->id_principal = $id_principal;
    }

    public function getMyVars() {
        return get_object_vars($this);
    }

}
