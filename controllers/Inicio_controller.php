<?php

class Inicio_controller extends Controller {

    public function __construct() {
        parent::__construct();
        $this->Verificar_Session();
    }

    public function CargaInicial() {
        $this->Verifica_GET();
        $primer_dia = new DateTime(Fechas_controller::PrimerDia());
        $ultimo_dia = new DateTime(fecha);
        $diff = $primer_dia->diff($ultimo_dia);
        $diff = $diff->days;
        $datos = array();
        for ($i = 0; $i <= $diff; $i++) {
            $datetime = new DateTime(Fechas_controller::PrimerDia());
            $datetime->modify('+' . $i . ' day');
            $dia = $datetime->format('Y-m-d');
            if (Auth_controller::SessionId() === "1" || Auth_controller::SessionId() === "5") {
                $asistencia = Asistencias::select('id_usuario,fecha_ingreso,fecha_salida,fecha_ingreso2,fecha_salida2,observacion,condicion')->where_BETWEEN('fecha_ingreso', $dia, $dia, false)->run();
            } else {
                $asistencia = Asistencias::select('id_usuario,fecha_ingreso,fecha_salida,fecha_ingreso2,fecha_salida2,observacion,condicion')->where([['id_usuario', Auth_controller::SessionId()]])->where_BETWEEN('fecha_ingreso', $dia, $dia, true)->run();
            }
            foreach ($asistencia as $key => $value) {
                $usuario = Usuarios::select('nombres,apellidos')->where([['id', $value['id_usuario']]])->run();

                $turno_dia_ingreso = new DateTime($value['fecha_ingreso']);
                $turno_dia_salida = new DateTime($value['fecha_salida']);
                $diferencia_dia = $turno_dia_ingreso->diff($turno_dia_salida);

                $turno_tarde_ingreso = new DateTime($value['fecha_ingreso2']);
                $turno_tarde_salida = new DateTime($value['fecha_salida2']);
                $diferencia_tarde = $turno_tarde_ingreso->diff($turno_tarde_salida);

                $e = new DateTime('00:00');
                $f = clone $e;
                $e->add($diferencia_dia);
                $e->add($diferencia_tarde);
                $dif_ultimo = $f->diff($e);

                $info_hora = array(
                    'h' => $dif_ultimo->h,
                    'i' => $dif_ultimo->i,
                    's' => $dif_ultimo->s,
                );

                $fecha_ingreso = explode(' ', $value['fecha_ingreso']);
                $fecha_salida = explode(' ', $value['fecha_salida']);
                $fecha_ingreso2 = explode(' ', $value['fecha_ingreso2']);
                $fecha_salida2 = explode(' ', $value['fecha_salida2']);

                $asistencia[$key]['usuario'] = $usuario;
                $asistencia[$key]['fecha_ingreso'] = $fecha_ingreso[1];
                $asistencia[$key]['fecha_salida'] = $fecha_salida[1];
                $asistencia[$key]['fecha_ingreso2'] = $fecha_ingreso2[1];
                $asistencia[$key]['fecha_salida2'] = $fecha_salida2[1];
                $asistencia[$key]['info_hora'] = $value['condicion'] == 4 ? $info_hora['h'] . ' horas ' . $info_hora['i'] . ' minutos ' . $info_hora['s'] . ' segundos.' : '';
            }
            $datos[$i]['datos_dia'] = Fechas_controller::NombreDia($dia);
            $datos[$i]['registros'] = $asistencia;
        }
        //print_r($datos);
        echo json_encode($datos, JSON_PRETTY_PRINT);
    }

    public function Marcar() {
        $this->Verifica_GET();
        if (Utilidades::IpCliente() !== (string) $_ENV['REAL_IP']) {
            $id = Auth_controller::SessionId();
            $data_enviada = array();
            $asistencia = Asistencias::select()->where([['id_usuario', $id]])->where_BETWEEN('fecha_ingreso', fecha, fecha, true)->run();
            if (empty($asistencia)) {
                $asistencia = new Asistencias(
                        null,
                        $id_usuario = $id,
                        $fecha_ingreso = fecha_hora,
                        $fecha_salida = '',
                        $fecha_ingreso2 = '',
                        $fecha_salida2 = '',
                        $condicion = 1,
                        $observacion = ''
                );
                $respuesta = $asistencia->create();
                $data_enviada['mensaje'] = 1;
                $data_enviada['respuesta'] = $respuesta['error'];
            } else {
                $asistencia_actualizar = Asistencias::getById($asistencia[0]['id']);
                switch ($asistencia[0]['condicion']) {
                    case 1:
                        $asistencia_actualizar->setFecha_salida(fecha_hora);
                        $asistencia_actualizar->setCondicion(2);
                        $respuesta = $asistencia_actualizar->update();
                        $data_enviada['respuesta'] = $respuesta['error'];
                        $data_enviada['mensaje'] = 2;
                        break;
                    case 2:
                        $asistencia_actualizar->setFecha_ingreso2(fecha_hora);
                        $asistencia_actualizar->setCondicion(3);
                        $respuesta = $asistencia_actualizar->update();
                        $data_enviada['respuesta'] = $respuesta['error'];
                        $data_enviada['mensaje'] = 3;
                        break;
                    case 3:
                        $asistencia_actualizar->setFecha_salida2(fecha_hora);
                        $asistencia_actualizar->setCondicion(4);
                        $respuesta = $asistencia_actualizar->update();
                        $data_enviada['respuesta'] = $respuesta['error'];
                        $data_enviada['mensaje'] = 4;
                        break;
                    case 4:
                        $data_enviada['respuesta'] = 2;
                        $data_enviada['mensaje'] = 5;
                        break;
                    default:
                        break;
                }
            }
            echo json_encode($data_enviada, JSON_PRETTY_PRINT);
        } else {
            $data_enviada = array(
                'mensaje' => 'ip',
                'respuesta' => 'ip',
            );
            echo json_encode($data_enviada, JSON_PRETTY_PRINT);
        }
    }

    public function ejemplo() {
        print_r(Fechas_controller::NombreDia());
    }

}
