<?php

class AuthNotas_controller extends Controller {

    public function __construct() {
        parent::__construct();
        $this->Verificar_Session();
    }

    public function Agregar() {
        $this->Verifica_POST();
        $resultado = $this->Verifica_JSON(file_get_contents("php://input"));
        $notas = new Notas(null, fecha, $resultado->fecha_final, $resultado->nota, $_SESSION['IDSistema'], 0);
        $respuesta = $notas->create();
        echo json_encode($respuesta['error']);
    }

    public function Mostrar() {
        $this->Verifica_GET();
        $data = array(
            'id_usuario' => $_SESSION['IDSistema'],
            'estado' => 0,
        );
        $notas = Notas::whereV($data, 'and', 'ORDER BY id DESC');
        echo json_encode($notas);
    }

    public function CambiarEstado() {
        $this->Verifica_POST();
        $resultado = $this->Verifica_JSON(file_get_contents("php://input"));
        $nota = Notas::getById($resultado->id);
        $nota->setEstado(1);
        $respuesta = $nota->update();
        echo json_encode($respuesta['error']);
    }

}
