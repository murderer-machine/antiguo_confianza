<?php

class Auth_controller extends Controller {

    public function __construct() {
        parent::__construct();
    }

    public function Registro() {
        $this->view->render('Auth/registro', 'registro');
    }

    public function Ingreso() {
        $this->Verificar_Session_Auth();
        $this->view->render('Auth/ingreso', 'ingreso');
    }

    public function Ingresar() {
        $this->Verifica_POST();
        $resultado = $this->Verifica_JSON(file_get_contents("php://input"));
        if (empty($resultado->dni) || empty($resultado->password)) {
            $respuesta['error'] = 2;
        } else {
            $usuario = Usuarios::select()->where([['dni', $resultado->dni], ['password', Hash::create(ALGORITMO, $resultado->password, HASHKEY)]])->run();
            if (empty($usuario)) {
                $respuesta['error'] = 1;
            } else {
                $generar = new GenerarToken();
                $id = $generar->Encriptar($usuario[0]['id']);
                $this->Iniciar($id);

                $respuesta['error'] = 0;
            }
        }
        echo json_encode($respuesta['error']);
    }

    public function Registrar() {
        $this->Verifica_POST();
        $resultado = $this->Verifica_JSON(file_get_contents("php://input"));
        $usuario = Usuarios::select()->where([['dni', $resultado->dni]])->run();
        if (empty($usuario)) {
            $usuario = new Usuarios(
                    null,
                    $resultado->dni,
                    $resultado->nombres,
                    $resultado->apellidos,
                    $resultado->correo,
                    Hash::create(ALGORITMO, $resultado->password, HASHKEY),
                    fecha_hora
            );
            $respuesta = $usuario->create();
            echo json_encode($respuesta['error']);
        } else {
            $respuesta['error'] = 3;
            echo json_encode($respuesta['error']);
        }
    }

    public function Iniciar($id) {
        Session::setValue('ID' . NOMBRE_SESSION, $id);
        Session::setValue('start', time());
        Session::setValue('expire', Session::getValue('start') + (720 * 60));
    }

    public function Salir() {
        Session::destroy();
        $this->redirect(URL . 'Auth/Ingreso');
    }

    public function Datos($condicion = '') {
        $id = Auth_controller::SessionId();
        $usuarios = Usuarios::select('id,nombres,apellidos')->wherec([['id', $id]])->run();
        foreach ($usuarios as $key => $field) {
            $generar = new GenerarToken();
            $id = $generar->Encriptar($field['id']);
            $usuarios[$key]['id'] = $id;
        }
        if (!empty($condicion)) {
            echo json_encode($usuarios, JSON_PRETTY_PRINT);
        } else {
            return $usuarios;
        }
    }

    public function SessionId() {
        $generar = new GenerarToken();
        $id = $generar->Desencriptar(Session::getValue('ID' . NOMBRE_SESSION));
        return $id;
    }

}
