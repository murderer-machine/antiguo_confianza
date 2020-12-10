<?php
class Usuarios_controller extends Controller
{
    function __construct()
    {
        parent::__construct();
        $this->Verificar_Session();
    }
    public function Index()
    {     
        $this->view->render('usuarios', 'usuarios');
    }
}
