<?php

class Controller {

    function __construct() {
  
        @Session::init(NOMBRE_SESSION);
        $this->view = new View();
        $this->Cabeceras();
    }

    public function CabeceraSession() {
        print_r($_SESSION) . '<br/>';
        print_r($_COOKIE) . '<br/>';
    }

    public function Verificar_Session() {
        if (Session::exist()) {
            
        } else {
            $this->redirect(URL . 'Auth/Ingreso');
            exit;
        }
        /* $now = time();
          if (isset($_SESSION['expire'])) {
          if ($now > $_SESSION['expire']) {
          Session::destroy();
          $this->redirect(URL . 'Auth/Ingreso');
          } else {
          if (Session::exist()) {

          } else {
          $this->redirect(URL . 'Auth/Ingreso');
          exit;
          }
          }
          } else {
          Session::exist();
          $this->redirect(URL . 'Auth/Ingreso');
          } */
    }

    public function Verificar_Session_Auth() {
        if (Session::exist()) {
            $this->redirect(URL . 'Dashboard/Inicio');
            exit;
        } else {
            
        }
        /* $now = time();
          if (isset($_SESSION['expire'])) {
          if ($now > $_SESSION['expire']) {
          Session::destroy();
          $this->redirect(URL . 'Auth/Ingreso');
          } else {
          if (Session::exist()) {
          $this->redirect(URL . 'Dashboard/Inicio');
          exit;
          } else {

          }
          }
          } */
    }

    public function redirect($url) {
        echo'<script type="text/javascript">window.location.href="' . $url . '";</script>';
    }

    public function Cabeceras() {
        /*header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Credentials: true');
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept,application/json");
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
        header("Allow: GET, POST, OPTIONS, PUT, DELETE");
        header('Cache-Control: no-cache');
        header('Pragma: no-cache');*/
    }

    public function Verifica_POST() {
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            $resultado['respuesta'] = 'La petici�n debe ser POST';
            echo json_encode($resultado);
            exit;
        }
    }

    public function Verifica_GET() {
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            $resultado['respuesta'] = 'La petici�n debe ser GET';
            echo json_encode($resultado);
            exit;
        }
    }

    public function ValidarJson($str) {
        json_decode($str);
        return json_last_error() == JSON_ERROR_NONE;
    }

    public function Verifica_JSON($json_parametros) {
        if (strlen($json_parametros) > 0 && Controller::ValidarJson($json_parametros)) {
            $parametrosJSON = json_decode($json_parametros);
            return $parametrosJSON;
        } else {
            $resultado['respuesta'] = 'JSON inv�lido';
            return $resultado;
            exit;
        }
    }

}

spl_autoload_register(function ($class) {
    if (file_exists("./controllers/" . $class . ".php")) {
        require "./controllers/" . $class . ".php";
    }
});
