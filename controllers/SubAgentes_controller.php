<?php

class SubAgentes_controller extends Controller {

    public function __construct() {
        parent::__construct();
    }

    public function Agregar() {
        $subagente = new SubAgentes(
                null,
                'marco antonio',
                'rodriguez salinas',
                'pepito',
                'marcorodriguez2013@outlook.com',
                '959304050',
                18.30,
                'peptito.jpg');
        $resultado = $subagente->create();
        print_r($resultado);
    }

    public function Mostrar() {
        $this->Verifica_GET();
        $subagentes = SubAgentes::getAll();
        echo json_encode($subagentes, JSON_PRETTY_PRINT);
    }

}
