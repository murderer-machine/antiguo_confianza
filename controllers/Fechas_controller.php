<?php

class Fechas_controller extends Controller {

    public function __construct() {
        parent::__construct();
        $this->Verificar_Session();
    }

    public function SumaMes($parametros) {
        $fecha = substr($parametros[0], 0, 10);
        $fecha = date("Y-m-d", strtotime($fecha));
        $texto = '+' . $parametros[1] . ' days';
        $nuevafecha = strtotime($texto, strtotime($fecha));
        $nuevafecha_ = date(DATE_ISO8601, $nuevafecha);
        echo json_encode($nuevafecha_, JSON_PRETTY_PRINT);
    }

    public function CambiarTipo($fecha) {
        $fecha = date("d/m/Y", strtotime($fecha));
        return $fecha;
    }

    public function CambiarTipoDB($fecha) {
        $str = $fecha;
        $date = DateTime::createFromFormat('d/m/Y', $str);
        return $date->format('Y-m-d');
    }

    public function CambiarTipoDB2($fecha) {
        $str = $fecha;
        $date = DateTime::createFromFormat('d/m/Y', $str);
        return $date->format('Y-m-d');
    }

    public function CambiarTipoDB3($fecha) {
        $str = $fecha;
        $date = DateTime::createFromFormat('Y-m-d', $str);
        return $date->format('d/m/Y');
    }

    public function CambiarTipo2($fecha) {
        $expire_time = $fecha;
        $expire_time = substr($expire_time, 0, strpos($expire_time, '('));
        return date('Y-m-d', strtotime($expire_time));
    }

    public function PrimerDia($fecha = fecha) {
        $fecha = new DateTime($fecha);
        $fecha->modify('first day of this month');
        return $fecha->format('Y-m-d');
    }

    public function UltimoDia($fecha = fecha) {
        $fecha = new DateTime($fecha);
        $fecha->modify('last day of this month');
        return $fecha->format('Y-m-d');
    }

    public function NombreDia($fecha = fecha) {

        $date = new Datetime($fecha);
        $dias = array("Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado", "Domingo");
        $meses = array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
        $dia_valor = strftime("%u", $date->getTimestamp());
        $dia_numero = strftime("%d", $date->getTimestamp());
        $mes_valor = strftime("%m", $date->getTimestamp());
        $datos = array(
            'dia_nombre' => $dias[$dia_valor - 1],
            'dia_numero' => $dia_numero,
            'mes_nombre' => $meses[$mes_valor - 1]
        );
        return $datos;
    }

    public function ContadorDias($fecha_1,$fecha_2) {
        $fecha1 = new DateTime($fecha_1);
        $fecha2 = new DateTime($fecha_2);
        $diff = $fecha1->diff($fecha2);
        return $diff->days . ' dias';
    }

}
