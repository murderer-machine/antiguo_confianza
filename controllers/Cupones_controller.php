<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Class Cupones_controller
 *
 * @author Marco Antonio Rodriguez Salinas <alekas_oficial@hotmail.com>
 */
class Cupones_controller extends Controller {

    public function __construct() {
        parent::__construct();
    }

    public function Mostrar() {
        $datos = [];
        $documentos = PolizasDocumentos::select()->where([['cancelado', 0]])->OrderBy([['fecha_emision', 'ASC']], true)->run();

        foreach ($documentos as $key_documento => $documento) {
            $cupones = TipoDocumentoPolizaCupon::select()->where([['id_documento', $documento['id']], ['situacion', 0], ['fecha_obligacion', fecha, '<='], ['revisado_general', 1, '!=']])->run();
            //$cupones = TipoDocumentoPolizaCupon::select()->where([['id_documento', $documento['id']], ['situacion', 0], ['revisado_general', 1, '!=']])->run();
            foreach ($cupones as $key_cupon => $valor_cupon) {

                if ($valor_cupon['fecha_obligacion'] <= fecha && $valor_cupon['situacion'] != 1) {
                    $cupones[$key_cupon]['situacion'] = 2;
                }
                $cupones[$key_cupon]['fecha_obligacion'] = Fechas_controller::CambiarTipoDB3($valor_cupon['fecha_obligacion']);
                $cupones[$key_cupon]['fecha_limite'] = Fechas_controller::CambiarTipoDB3($valor_cupon['fecha_limite']);
                $cupones[$key_cupon]['contador_dias'] = Fechas_controller::ContadorDias(Fechas_controller::CambiarTipoDB($cupones[$key_cupon]['fecha_obligacion']), fecha);
            }
            if (!empty($cupones)) {
                $poliza = Polizas::select()->where([['id', $documento['id_poliza']]])->run();
                $cliente = Clientes::select()->where([['id', $poliza[0]['id_cliente']]])->run();
                $contacto_clientes = ClientesContactos::select()->where([['id_cliente', $cliente[0]['id']]])->run();
                $documentos_comentarios = PolizasDocumentosComentarios::select()->where([['id_documento', $documento['id']]])->run();
                foreach ($poliza as $key_poliza => $value_poliza) {
                    $moneda = Monedas::select()->where([['id', $value_poliza['moneda']]])->run();
                    $producto = ProductosEmpresasSeguros::select('nombre')->where([['id', $value_poliza['id_producto']]])->run();
                    $ramo = Ramos::select('descripcion')->where([['id', $value_poliza['id_ramo']]])->run();
                    $empresa = EmpresasSeguros::select()->where([['id', $value_poliza['id_empresa']]])->run();
                    $vehiculo = PolizasVehiculos::select()->where([['id_poliza', $value_poliza['id']]])->run();
                    $poliza[$key_poliza]['moneda'] = $moneda[0];
                    $poliza[$key_poliza]['id_producto'] = $producto[0];
                    $poliza[$key_poliza]['id_ramo'] = $ramo[0];
                    $poliza[$key_poliza]['id_empresa'] = $empresa[0];
                    if (empty($vehiculo)) {
                        $poliza[$key_poliza]['vehiculo'] = (object) array();
                    } else {
                        $poliza[$key_poliza]['vehiculo'] = $vehiculo[0];
                    }
                }
                array_push($datos, array(
                    'cliente' => $cliente[0],
                    'contacto_clientes' => $contacto_clientes,
                    'poliza' => $poliza[0],
                    'cupones' => $cupones,
                    'documento' => $documentos[$key_documento],
                    'documento_comentarios' => $documentos_comentarios,
                ));
            }
        }
        //$cupones = TipoDocumentoPolizaCupon::select()->wherecFechaComapracion([['fecha_obligacion', fecha, '<=']])->wherec([['situacion', 0]],true)->run(true);
        echo json_encode($datos, JSON_PRETTY_PRINT);
    }

    public function AplicarPago() {
        $this->Verifica_POST();
        $data = $this->Verifica_JSON(file_get_contents("php://input"));
        $cupones = TipoDocumentoPolizaCupon::getById($data->id_cupon);
        $cupones->setFecha_pago(Fechas_controller::CambiarTipoDB($data->fecha_pago));
        $cupones->setSituacion(1);
        $cupones->setObservaciones($data->observaciones);
        $resultado = $cupones->update();
        echo json_encode($resultado['error'], JSON_PRETTY_PRINT);
    }

    public function AplicarRevisado($parametros) {
        $cupones = TipoDocumentoPolizaCupon::getById($parametros[0]);
        $cupones->setRevisado_general(1);
        $cupones->update();
    }

    public function AgregarComentario($parametros) {
        $this->Verifica_POST();
        $data = $this->Verifica_JSON(file_get_contents("php://input"));
        $comentario = new PolizasDocumentosComentarios(null, $parametros[0], $data->comentario, fecha_hora, Auth_controller::SessionId());
        $respuesta = $comentario->create();
        echo json_encode($data);
    }

    static function Ejemplo() {
        $data = array();
        $clientes = Clientes::select()->run();
        foreach ($clientes as $key_cliente => $value_cliente) {
            $polizas = Polizas::select()->where([['id_cliente', $value_cliente['id']]])->run();
            foreach ($polizas as $key_poliza => $value_poliza) {
                $documentos = PolizasDocumentos::select()->where([['id_poliza', $value_poliza['id']]])->run();
                $vehiculos_poliza = PolizasVehiculos::select()->where([['id_poliza', $value_poliza['id']]])->run();
                $polizas[$key_poliza]['documentos'] = $documentos;
                $polizas[$key_poliza]['vehiculos'] = $vehiculos_poliza;
                foreach ($polizas[$key_poliza]['documentos'] as $key_documentos => $value_documentos) {
                    $cupones = TipoDocumentoPolizaCupon::select()->where([['id_documento', $value_documentos['id']]])->run();
                    $comentarios = PolizasDocumentosComentarios::select()->where([['id_documento', $value_documentos['id']]])->run();
                    $polizas[$key_poliza]['documentos'][$key_documentos]['cupones'] = $cupones;
                    $polizas[$key_poliza]['documentos'][$key_documentos]['comentarios'] = $comentarios;
                }
            }
            if (in_array($clientes[$key_cliente], $data)) {
                
            } else {
                array_push($data, array(
                    'cliente' => $clientes[$key_cliente],
                    'polizas' => $polizas,
                        )
                );
            }
        }
        return $data;
    }

    public function Ejemplo1() {
        $data = $this->Ejemplo();
        $data_filtro = array();

        foreach ($data as $key => $value_data) {
            foreach ($value_data['polizas'] as $value_polizas) {
                foreach ($value_polizas['documentos'] as $value_documentos) {
                    foreach ($value_documentos['cupones'] as $value_cupones) {
                        if (count($value_cupones) > 0) {

                            array_push($data_filtro, $value_data);
                        }
                    }
                }
            }
        }

        $i = 0;
        foreach ($data_filtro as $key => $value_data) {
            foreach ($value_data['polizas'] as $value_polizas) {
                foreach ($value_polizas['documentos'] as $key_documentos => $value_documentos) {
                    foreach ($value_documentos['cupones'] as $key_cupones => $value_cupones) {

                        echo $value_cupones['nro_cuota'] . '<br/>';
                    }
                }
            }
        }



        //echo json_encode($data_filtro, JSON_PRETTY_PRINT);
    }

}
