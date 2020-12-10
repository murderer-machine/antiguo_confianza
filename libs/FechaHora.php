<?php
class FechaHora
{
    public function ObtenerDia($fecha)
    {
        $fecha = new DateTime($fecha);
        $dia = strftime("%u", $fecha->getTimestamp());
        return $dia;
    }
    public function dia($index)
    {
        $dias = array("Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado", "Domingo");
        return $dias[$index];
    }
    public function mes($index)
    {
        $meses = array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
        return $meses[$index];
    }
    public function Convertir12Horas($hora)
    {
        $date = $hora;
        return date('h:i a', strtotime($date));
    }
}
