<?php

class Motorizados_controller extends Controller {

    public function __construct() {
        parent::__construct();
        $this->Verificar_Session();
    }

    public function Agregar() {
        $this->Verifica_POST();
        $data = $this->Verifica_JSON(file_get_contents("php://input"));
        $motorizados = new Motorizados(
                $id = null,
                $fecha_salida = fecha_hora,
                $fecha_retorno = '',
                $observacion = $data->observacion,
                $observacion_retorno = '',
                $id_motorizado = $data->ejecutivo->id,
                $id_usuario = Auth_controller::SessionId(),
        );
        $respuesta = $motorizados->create();
        echo json_encode($respuesta['error']);
    }

    public function Mostrar() {
        $this->Verifica_GET();
        $primer_dia = new DateTime(Fechas_controller::PrimerDia());
        $ultimo_dia = new DateTime(fecha);
        $diff = $primer_dia->diff($ultimo_dia);
        $diff = $diff->days;
        $datos = array();
        for ($i = 0; $i <= $diff; $i++) {
            $data = array();
            $datetime = new DateTime(Fechas_controller::PrimerDia());
            $datetime->modify('+' . $i . ' day');
            $dia = $datetime->format('Y-m-d');
            $motorizados = Motorizados::select()->where_BETWEEN('fecha_salida', $dia, $dia, false)->run();
            foreach ($motorizados as $key => $value) {
                $id_motorizado = Usuarios::select('nombres,apellidos')->where([['id', $value['id_motorizado']]])->run();
                $id_usuario = Usuarios::select('nombres,apellidos')->where([['id', $value['id_usuario']]])->run();
                $salida = new DateTime($value['fecha_salida']);
                $retorno = new DateTime($value['fecha_retorno']);
                $diferencia_dia = $salida->diff($retorno);
                $info_hora = array(
                    'h' => $diferencia_dia->h,
                    'i' => $diferencia_dia->i,
                    's' => $diferencia_dia->s,
                );
                $fecha_salida = explode(' ', $value['fecha_salida']);
                $fecha_retorno = explode(' ', $value['fecha_retorno']);
                $motorizados[$key]['id_usuario'] = $id_usuario;
                $motorizados[$key]['id_motorizado'] = $id_motorizado;
                $motorizados[$key]['fecha_salida'] = $fecha_salida[1];
                $motorizados[$key]['fecha_retorno'] = $fecha_retorno[1];
                $motorizados[$key]['info_hora'] = $value['fecha_retorno'] !== '0000-00-00 00:00:00' ? $info_hora['h'] . ' horas ' . $info_hora['i'] . ' minutos ' . $info_hora['s'] . ' segundos.' : '';
            }
            if (!empty($motorizados)) {

                $data['datos_dia'] = Fechas_controller::NombreDia($dia);
                $data['registros'] = $motorizados;
                array_push($datos, $data);
            }
        }
        echo json_encode($datos, JSON_PRETTY_PRINT);
    }

    public function MarcarRetorno($parametros) {
        $this->Verifica_GET();
        $motorizados = Motorizados::getById($parametros[0]);
        $motorizados->setFecha_retorno(fecha_hora);
        $resultado = $motorizados->update();
        echo json_encode($resultado, JSON_PRETTY_PRINT);
    }

    public function MarcarRetornoAlmuerzo($parametros) {
        $this->Verifica_GET();
        $motorizados = Motorizados::getById($parametros[0]);
        $motorizados->setFecha_retorno(fecha_hora);
        $respuesta_motorizados = $motorizados->update();
        $asistencia = Asistencias::select()->where([['id_usuario', $motorizados->id_motorizado]])->where_BETWEEN('fecha_ingreso', fecha, fecha, true)->run();
        $asistencia_actualizar = Asistencias::getById($asistencia[0]['id']);
        switch ($asistencia[0]['condicion']) {
            case 1:
                $asistencia_actualizar->setFecha_salida(fecha_hora);
                $asistencia_actualizar->setCondicion(2);
                if (empty($asistencia_actualizar->getObservacion())) {
                    $asistencia_actualizar->setObservacion('Se marco desde el Módulo de motorizados , desde el usuario de ' . Auth_controller::SessionId());
                } else {
                    $asistencia_actualizar->setObservacion($asistencia_actualizar->getObservacion() . ', Se marco desde el Módulo de motorizados , desde el usuario de ' . Auth_controller::SessionId());
                }
                $respuesta_actualizar_asistencia = $asistencia_actualizar->update();
                break;
            default:
                $asistencia_actualizar->setFecha_salida(fecha_hora);
                $asistencia_actualizar->setCondicion(2);
                $respuesta_actualizar_asistencia = $asistencia_actualizar->update();
                break;
                break;
        }
        $respuesta_general = array(
            'respuesta_motorizados' => $respuesta_motorizados['error'],
            'respuesta_actualizar_asistencia' => $respuesta_actualizar_asistencia['error'],
        );
        echo json_encode($respuesta_general, JSON_PRETTY_PRINT);
    }

}
