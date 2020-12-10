<?php

require './config.php';
require(URLCOMPOSER_VENDOR . "autoload.php");
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
 header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Credentials: true');
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept,application/json");
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
        header("Allow: GET, POST, OPTIONS, PUT, DELETE");
        header('Cache-Control: no-cache');
        header('Pragma: no-cache');
require './config_datos.php';
$url = (isset($_GET["url"])) ? $_GET["url"] : "Auth/Ingreso";
$url = explode("/", $url);
$controller = (isset($url[0])) ? $url[0] . "_controller" : "Index_controller";
$method = (isset($url[1])) ? $url[1] : "index";
$parametros = [];
for ($i = 2; $i < count($url); $i++) {
    array_push($parametros, $url[$i]);
}

spl_autoload_register(function ($class) {
    if (file_exists(LIBS . $class . ".php")) {
        require LIBS . $class . ".php";
    } elseif (file_exists(MODELS . $class . ".php")) {
        require MODELS . $class . ".php";
    }
});
$path = "./controllers/" . $controller . ".php";
if (file_exists($path)) {
    require $path;
    $controller = new $controller();
    if (method_exists($controller, $method)) {
        if (empty($parametros)) {
            $controller->{$method}();
        } else {

            $controller->{$method}($parametros);
        }
    } else {
        exit("No existe ningún método con ese nombre. " . $method);
    }
} else {
    exit("No existe ningún controlador con ese nombre. ". $controller);
}
