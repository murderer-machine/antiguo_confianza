<?php

class Dashboard_controller extends Controller {

    public function __construct() {
        parent::__construct();
        $this->Verificar_Session();
    }

    public function Notas() {
        $usuario = Usuarios::getById($_SESSION['IDSistema']);
        $this->view->render('Dashboard/notas', '', $usuario);
    }

    public function Clientes() {
        $this->view->render('Dashboard/clientes');
    }

    public function Polizas() {
        $this->view->render('Dashboard/polizas');
    }

    public function ReportePolizas() {
        $this->view->render('Dashboard/reportepolizas');
    }

    public function Inicio() {
        $this->view->render('Dashboard/inicio');
    }

    public function Motorizados() {
        $this->view->render('Dashboard/motorizados');
    }

    public function DocumentosSubAgente() {
        $this->view->render('Dashboard/documentosubagente');
    }

    public function Cobranzas() {
        $this->view->render('Dashboard/cobranzas');
    }

}
