<?php

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class Polizas_controller extends Controller {

    public function __construct() {
        parent::__construct();
//$this->Verificar_Session();
    }

    function VerficarPoliza($parametros) {
        $poliza = Polizas::select()->where([['nro_poliza', $parametros[0]]])->run();
        if (empty($poliza)) {
            $respuesta = 1;
        } else {
            $respuesta = 0;
        }
        echo json_encode($respuesta);
    }

    function VerficarPolizaDocumento($parametros) {
        if (empty($parametros[0])) {
            $respuesta = 1;
        } else {
            $poliza = PolizasDocumentos::select()->where([['nro_certificado', $parametros[0]]])->run();
            if (empty($poliza)) {
                $respuesta = 1;
            } else {
                $respuesta = 0;
            }
        }

        echo json_encode($respuesta);
    }

    function Agregar() {
        $this->Verifica_POST();
        $data = $this->Verifica_JSON(file_get_contents("php://input"));
        $endoso_a_favor = count($data->endoso_a_favor) === 0 ? '' : $data->endoso_a_favor[0]->id;
        $poliza = new Polizas(
                null,
                mb_strtolower($data->nro_poliza),
                mb_strtolower($data->nro_poliza_corregido),
                $data->id_cliente[0]->id,
                $data->id_empresa[0]->id,
                $data->id_producto[0]->id,
                $data->id_ramo[0]->id,
                $data->moneda[0]->id,
                $data->descripcion,
                $endoso_a_favor,
                0,
                fecha_hora,
                Auth_controller::SessionId()
        );
        $respuesta_poliza = $poliza->create();

        $documento_poliza = new PolizasDocumentos(
                null,
                $id_poliza = $respuesta_poliza['getID'],
                $id_subagente = $data->datos_documento->id_subagente[0]->id,
                $fecha_emision = $data->datos_documento->fecha_emision,
                $tipo_vigencia = $data->datos_documento->tipo_vigencia[0]->id,
                $fecha_vigencia_inicio = $data->datos_documento->fecha_vigencia_inicio,
                $fecha_vigencia_fin = $data->datos_documento->fecha_vigencia_fin,
                $ejecutivo = $data->datos_documento->ejecutivo[0]->id,
                $nro_certificado = $data->datos_documento->nro_certificado,
                $id_garantia = 0,
                $id_cargo = 0,
                $pago_empresa = 0,
                $pago_sub_agente = 0,
                $prima_total = number_format($data->datos_documento->prima_total, 2, '.', ''),
                $prima_comercial = number_format($data->datos_documento->prima_comercial, 2, '.', ''),
                $prima_neta = number_format($data->datos_documento->prima_neta, 2, '.', ''),
                $comision = number_format($data->datos_documento->comision, 2, '.', ''),
                $porcentaje = number_format($data->datos_documento->porcentaje, 2, '.', ''),
                $comision_subagente = number_format($data->datos_documento->comision_subagente, 2, '.', ''),
                $tipo_documento_poliza = $data->datos_documento->tipo_documento_poliza[0]->id,
                $tipo_pago = $data->datos_documento->tipo_pago[0]->id,
                $cancelado = 0,
                $fecha_creado = fecha_hora,
                Auth_controller::SessionId()
        );
        $respuesta_documento_poliza = $documento_poliza->create();

        $vehiculo_poliza = new PolizasVehiculos(
                null,
                $id_poliza = $respuesta_poliza['getID'],
                $placa = mb_strtolower($data->datos_vehiculos->placa),
                $clase = $data->datos_vehiculos->clase[0]->id,
                $uso = $data->datos_vehiculos->uso[0]->id,
                $categoria = $data->datos_vehiculos->categoria[0]->id,
                $marca = $data->datos_vehiculos->marca[0]->id,
                $modelo = $data->datos_vehiculos->modelo[0]->id,
                $ano = $data->datos_vehiculos->ano[0]->ano,
                $nro_asientos = $data->datos_vehiculos->nro_asientos,
                $nro_pasajeros = $data->datos_vehiculos->nro_pasajeros,
                $nro_serie = mb_strtolower($data->datos_vehiculos->nro_serie),
                $motor = $data->datos_vehiculos->motor,
                $color = $data->datos_vehiculos->color,
                $timon = $data->datos_vehiculos->timon,
                $combustible = $data->datos_vehiculos->combustible,
                $carroceria = $data->datos_vehiculos->carroceria
        );
        $respuesta_vehiculo_poliza = $vehiculo_poliza->create();

        $nro_cupon_c = 0;
        foreach ($data->datos_documento->cupones as $value) {
            $nro_cupon_c++;
            $cupones = new TipoDocumentoPolizaCupon(
                    $id = null,
                    $id_documento = $respuesta_documento_poliza['getID'],
                    $nro_orden = $nro_cupon_c,
                    $nro_cuota = $value->nro_cuota,
                    $importe = $value->importe,
                    $fecha_obligacion = Fechas_controller::CambiarTipoDB(trim($value->fecha_obligacion)),
                    $fecha_limite = Fechas_controller::CambiarTipoDB(trim($value->fecha_limite)),
                    $situacion = 0,
                    $fecha_pago = null,
                    $observaciones = '',
                    $revisado_general = 0,
            );
            $cupones->create();
        }

        $respuestas = array(
            'id_poliza' => $respuesta_poliza['getID'],
            'id_poliza_documento' => $respuesta_documento_poliza['getID'],
            'respuesta_poliza' => $respuesta_poliza['error'],
            'respuesta_documento_poliza' => $respuesta_documento_poliza['error'],
            'respuesta_vehiculo_poliza' => $respuesta_vehiculo_poliza['error']
        );
        echo json_encode($respuestas, JSON_PRETTY_PRINT);
    }

    public function Mostrar() {
        $this->Verifica_GET();
        $polizas = Polizas::select()->run();
        foreach ($polizas as $key => $field) {
            $cliente = Clientes::select('id,nombre,nrodoc')->where([['id', $field['id_cliente']]])->run();
            $empresa = EmpresasSeguros::select('id,nombre,ruc,logo')->where([['id', $field['id_empresa']]])->run();
            $producto = ProductosEmpresasSeguros::select('id,nombre')->where([['id', $field['id_producto']]])->run();
            $ramo = Ramos::select('id,descripcion')->where([['id', $field['id_ramo']]])->run();
            $documentos_poliza = PolizasDocumentos::select()->where([['id_poliza', $field['id']]])->run();
            $vehiculos_poliza = PolizasVehiculos::select('placa,clase,uso,categoria,marca,modelo,ano,nro_asientos,nro_pasajeros,nro_serie')->where([['id_poliza', $field['id']]])->run();
            $moneda = Monedas::select('simbolo')->where([['id', $field['moneda']]])->run();
            $endoso = EmpresasBancarias::select('nombre')->where([['id', $field['endoso_a_favor']]])->run();
            $polizas[$key]['id_cliente'] = $cliente;
            $polizas[$key]['id_empresa'] = $empresa;
            $polizas[$key]['id_producto'] = $producto;
            $polizas[$key]['id_ramo'] = $ramo;
            $polizas[$key]['documentos_poliza'] = $documentos_poliza;
            $polizas[$key]['vehiculos_poliza'] = $vehiculos_poliza;

            $polizas[$key]['moneda'] = $moneda;
            $polizas[$key]['endoso_a_favor'] = $endoso;
            foreach ($polizas[$key]['documentos_poliza'] as $key_ => $field_) {
                $archivos = $this->ListarDocumentos($field['id'], $field_['id']);
                $tipo_pago = TipoPago::select('nombre')->where([['id', $field_['tipo_pago']]])->run();
                $sub_agente = SubAgentes::select('nombres,apellidos,abreviatura')->where([['id', $field_['id_subagente']]])->run();
                $ejecutivo = Usuarios::select('nombres,apellidos')->where([['id', $field_['ejecutivo']]])->run();
                $tipo_vigencia = TipoVigencia::select('nombre')->where([['id', $field_['tipo_vigencia']]])->run();
                $tipo_documento = TipoDocumentoPoliza::select()->where([['id', $field_['tipo_documento_poliza']]])->run();
                $polizas[$key]['documentos_poliza'][$key_]['tipo_pago'] = $tipo_pago;
                $polizas[$key]['documentos_poliza'][$key_]['id_subagente'] = $sub_agente;
                $polizas[$key]['documentos_poliza'][$key_]['fecha_emision'] = Fechas_controller::CambiarTipo($field_['fecha_emision']);
                $polizas[$key]['documentos_poliza'][$key_]['fecha_vigencia_inicio'] = Fechas_controller::CambiarTipo($field_['fecha_vigencia_inicio']);
                $polizas[$key]['documentos_poliza'][$key_]['fecha_vigencia_fin'] = Fechas_controller::CambiarTipo($field_['fecha_vigencia_fin']);
                $polizas[$key]['documentos_poliza'][$key_]['ejecutivo'] = $ejecutivo;
                $polizas[$key]['documentos_poliza'][$key_]['tipo_vigencia'] = $tipo_vigencia;
                $polizas[$key]['documentos_poliza'][$key_]['tipo_documento_poliza'] = $tipo_documento;
                $polizas[$key]['documentos_poliza'][$key_]['archivos'] = $archivos;
            }
            foreach ($polizas[$key]['vehiculos_poliza'] as $key_ => $field_v) {
                $clase = ClasesVehiculos::select('nombre')->where([['id', $field_v['clase']]])->run();
                $uso = UsosVehiculos::select('nombre')->where([['id', $field_v['uso']]])->run();
                $categoria = CategoriasVehiculos::select('nombre')->where([['id', $field_v['categoria']]])->run();
                $marca = Marcas::select('marca')->where([['id', $field_v['marca']]])->run();
                $modelo = Modelos::select('modelo')->where([['id', $field_v['modelo']]])->run();
                $polizas[$key]['vehiculos_poliza'][$key_]['clase'] = $clase;
                $polizas[$key]['vehiculos_poliza'][$key_]['uso'] = $uso;
                $polizas[$key]['vehiculos_poliza'][$key_]['categoria'] = $categoria;
                $polizas[$key]['vehiculos_poliza'][$key_]['marca'] = $marca;
                $polizas[$key]['vehiculos_poliza'][$key_]['modelo'] = $modelo;
            }
        }

        echo json_encode($polizas, JSON_PRETTY_PRINT);
    }

    public function MostrarActualizado() {
        $this->Verifica_POST();
        $data = $this->Verifica_JSON(file_get_contents("php://input"));

        $fecha_inicio = empty($data->fecha_emision_inicio) ? Fechas_controller::PrimerDia() : $data->fecha_emision_inicio;
        $fecha_fin = empty($data->fecha_emision_fin) ? Fechas_controller::UltimoDia() : $data->fecha_emision_fin;


        //$documentos_poliza = PolizasDocumentos::select()->where_BETWEEN('fecha_emision', $fecha_inicio, $fecha_fin)->run(false);
        $documentos_poliza = PolizasDocumentos::select()->run();
        foreach ($documentos_poliza as $key => $field) {
            $archivos = $this->ListarDocumentos($field['id'], $field['id']);
            $tipo_pago = TipoPago::select('nombre')->where([['id', $field['tipo_pago']]])->run();
            $sub_agente = SubAgentes::select('nombres,apellidos,abreviatura')->where([['id', $field['id_subagente']]])->run();
            $ejecutivo = Usuarios::select('nombres,apellidos')->where([['id', $field['ejecutivo']]])->run();
            $tipo_vigencia = TipoVigencia::select('nombre')->where([['id', $field['tipo_vigencia']]])->run();
            $tipo_documento = TipoDocumentoPoliza::select()->where([['id', $field['tipo_documento_poliza']]])->run();
            $poliza = Polizas::select()->where([['id', $field['id_poliza']]])->run();
            $vehiculos_poliza = PolizasVehiculos::select('placa,clase,uso,categoria,marca,modelo,ano,nro_asientos,nro_pasajeros,nro_serie')->where([['id_poliza', $field['id']]])->run();
            $cupones = TipoDocumentoPolizaCupon::select()->where([['id_documento', $field['id']]])->run();
            $documentos_poliza[$key]['tipo_pago'] = $tipo_pago;
            $documentos_poliza[$key]['id_subagente'] = $sub_agente;
            $documentos_poliza[$key]['fecha_emision'] = Fechas_controller::CambiarTipo($field['fecha_emision']);
            $documentos_poliza[$key]['fecha_vigencia_inicio'] = Fechas_controller::CambiarTipo($field['fecha_vigencia_inicio']);
            $documentos_poliza[$key]['fecha_vigencia_fin'] = Fechas_controller::CambiarTipo($field['fecha_vigencia_fin']);
            $documentos_poliza[$key]['ejecutivo'] = $ejecutivo;
            $documentos_poliza[$key]['tipo_vigencia'] = $tipo_vigencia;
            $documentos_poliza[$key]['tipo_documento_poliza'] = $tipo_documento;
            $documentos_poliza[$key]['archivos'] = $archivos;
            $documentos_poliza[$key]['poliza'] = $poliza;
            $documentos_poliza[$key]['vehiculos_poliza'] = $vehiculos_poliza;
            $documentos_poliza[$key]['cupones'] = $cupones;
            foreach ($documentos_poliza[$key]['poliza'] as $key_ => $field_) {
                $cliente = Clientes::select('nombre,nrodoc')->where([['id', $field_['id_cliente']]])->run();
                $empresa = EmpresasSeguros::select('id,nombre,ruc,logo')->where([['id', $field_['id_empresa']]])->run();
                $producto = ProductosEmpresasSeguros::select('id,id_ramo,nombre')->where([['id', $field_['id_producto']]])->run();
                $ramo = Ramos::select('id,descripcion')->where([['id', $field_['id_ramo']]])->run();
                $moneda = Monedas::select('simbolo')->where([['id', $field_['moneda']]])->run();
                $endoso = EmpresasBancarias::select('nombre')->where([['id', $field_['endoso_a_favor']]])->run();
                $documentos_poliza[$key]['poliza'][$key_]['id_cliente'] = $cliente;
                $documentos_poliza[$key]['poliza'][$key_]['id_empresa'] = $empresa;
                $documentos_poliza[$key]['poliza'][$key_]['id_producto'] = $producto;
                $documentos_poliza[$key]['poliza'][$key_]['id_ramo'] = $ramo;
                $documentos_poliza[$key]['poliza'][$key_]['moneda'] = $moneda;
                $documentos_poliza[$key]['poliza'][$key_]['endoso_a_favor'] = $endoso;
            }
            foreach ($documentos_poliza[$key]['vehiculos_poliza'] as $key_ => $field_v) {
                $clase = ClasesVehiculos::select('nombre')->where([['id', $field_v['clase']]])->run();
                $uso = UsosVehiculos::select('nombre')->where([['id', $field_v['uso']]])->run();
                $categoria = CategoriasVehiculos::select('nombre')->where([['id', $field_v['categoria']]])->run();
                $marca = Marcas::select('marca')->where([['id', $field_v['marca']]])->run();
                $modelo = Modelos::select('modelo')->where([['id', $field_v['modelo']]])->run();
                $documentos_poliza[$key]['vehiculos_poliza'][$key_]['clase'] = $clase;
                $documentos_poliza[$key]['vehiculos_poliza'][$key_]['uso'] = $uso;
                $documentos_poliza[$key]['vehiculos_poliza'][$key_]['categoria'] = $categoria;
                $documentos_poliza[$key]['vehiculos_poliza'][$key_]['marca'] = $marca;
                $documentos_poliza[$key]['vehiculos_poliza'][$key_]['modelo'] = $modelo;
            }
            foreach ($documentos_poliza[$key]['cupones'] as $key_cupon => $valor_cupon) {

                if ($valor_cupon['fecha_obligacion'] < fecha && $valor_cupon['situacion'] != 1) {
                    $documentos_poliza[$key]['cupones'][$key_cupon]['situacion'] = 2;
                }
                $documentos_poliza[$key]['cupones'][$key_cupon]['fecha_obligacion'] = Fechas_controller::CambiarTipoDB3($valor_cupon['fecha_obligacion']);
                $documentos_poliza[$key]['cupones'][$key_cupon]['fecha_limite'] = Fechas_controller::CambiarTipoDB3($valor_cupon['fecha_limite']);
            }
        }

        echo json_encode($documentos_poliza, JSON_PRETTY_PRINT);
    }

    public function MostrarPolizasNoviembre() {
        $this->Verifica_POST();
        $data = $this->Verifica_JSON(file_get_contents("php://input"));
        $polizas = Polizas::select()->run();
        foreach ($polizas as $key_p => $poliza) {
            $polizas[$key_p]['id_cliente'] = Clientes::getById($poliza['id_cliente'], 'nombre,nrodoc');
            $polizas[$key_p]['id_empresa'] = EmpresasSeguros::getById($poliza['id_empresa'], 'nombre,ruc,logo');
            $polizas[$key_p]['id_producto'] = ProductosEmpresasSeguros::getById($poliza['id_producto'], 'nombre');
            $polizas[$key_p]['id_ramo'] = Ramos::getById($poliza['id_ramo'], 'descripcion');
            $polizas[$key_p]['moneda'] = Monedas::getById($poliza['moneda'], 'nombre,simbolo');
        }

        echo json_encode($polizas, JSON_PRETTY_PRINT);
    }

    public function Probareste() {
        $this->Verifica_POST();
        $data = $this->Verifica_JSON(file_get_contents("php://input"));

        array_filter($data);
        print_r($data);

        //$clientes->where([['nrodoc','44936084']]);
        //print_r($clientes);
        //echo empty($data->cliente) ? 'vacio' : 'lleno';
    }

    public function ListarDocumentos($id, $id_documento) {
        $output_dir = "recursos/documentos/$id/$id_documento/";
        if (file_exists($output_dir)) {
            $files = array_slice(scandir($output_dir), 2);
            return $files;
        } else {
            return array();
        }
    }

    public function Reporte() {
        $this->Verifica_POST();
        $data = $this->Verifica_JSON(file_get_contents("php://input"));
        if (count($data->id_subagente) === 0) {
            $id_subagente = '';
        } else {
            $id_subagente = $data->id_subagente[0]->id;
        }
        if (empty($data->fecha_inicio) || empty($data->fecha_final)) {
            echo json_encode(array(), JSON_PRETTY_PRINT);
        } else {
            $this->ReporteLogica($data->fecha_inicio, $data->fecha_final, $id_subagente);
        }
    }

    public function ReporteExcel($parametros) {
        $parametros[0] = Fechas_controller::CambiarTipo2($parametros[0]);
        $parametros[1] = Fechas_controller::CambiarTipo2($parametros[1]);
        if (empty($parametros[0]) || empty($parametros[1])) {
            
        } else {
            $respuesta = $this->ReporteLogica($parametros[0], $parametros[1], $parametros[2], false);
            $this->ExportExcel(array_values($respuesta));
        }
    }

    public function ReporteLogica($fecha_inicio = '0000-00-00', $fecha_fin = '0000-00-00', $id_subagente = '', $modo = true) {
        if ($id_subagente === '') {
            $polizas_documentos = PolizasDocumentos::select()->where_BETWEEN('fecha_emision', $fecha_inicio, $fecha_fin, false)->run();
        } else {
            $polizas_documentos = PolizasDocumentos::select()->where([['id_subagente', (int) $id_subagente]])->where_BETWEEN('fecha_emision', $fecha_inicio, $fecha_fin, true)->run();
        }

        foreach ($polizas_documentos as $key => $field) {
            $poliza = Polizas::select()->where([['id', $field['id_poliza']]])->run();
            $poliza_vehiculos = PolizasVehiculos::select()->where([['id_poliza', $field['id_poliza']]])->run();
            $polizas_documentos[$key]['poliza'] = $poliza;
            $polizas_documentos[$key]['poliza_vehiculo'] = $poliza_vehiculos;
            foreach ($polizas_documentos[$key]['poliza'] as $key_ => $field_) {
                $empresa_seguro = EmpresasSeguros::select('nombre')->where([['id', $field_['id_empresa']]])->run();
                $cliente = Clientes::select('nombre')->where([['id', $field_['id_cliente']]])->run();
                $polizas_documentos[$key]['poliza'][$key_]['id_empresa'] = $empresa_seguro;
                $polizas_documentos[$key]['poliza'][$key_]['id_cliente'] = $cliente;
            }
            foreach ($polizas_documentos[$key]['poliza_vehiculo'] as $key_ => $field_) {
                $uso_vehiculos = UsosVehiculos::select('nombre')->where([['id', $field_['uso']]])->run();
                $polizas_documentos[$key]['poliza_vehiculo'][$key_]['uso'] = $uso_vehiculos;
            }
        }
        $valores = array();
//print_r($polizas_documentos);

        foreach ($polizas_documentos as $value) {
            $tipo_emision = $value['nro_certificado'] == '' ? 'DIGITAL' : 'FÍSICO';
            if ($value['poliza'][0]['id_ramo'] == '66') {
                array_push($valores, array(
                    'fecha_emision' => $value['fecha_emision'],
                    'nro_poliza' => $value['poliza'][0]['nro_poliza'],
                    'nro_certificado' => $value['nro_certificado'],
                    'empresa' => mb_strtoupper($value['poliza'][0]['id_empresa'][0]['nombre']),
                    'placa' => mb_strtoupper($value['poliza_vehiculo'][0]['placa']),
                    'prima_total' => $value['prima_total'],
                    'prima_neta' => $value['prima_neta'],
                    'comision' => $value['comision'],
                    'porcentaje' => $value['porcentaje'],
                    'comision_subagente' => $value['comision_subagente'],
                    'cliente' => mb_strtoupper($value['poliza'][0]['id_cliente'][0]['nombre']),
                    'nombre' => mb_strtoupper($value['poliza_vehiculo'][0]['uso'][0]['nombre']),
                    'tipo' => $tipo_emision,
                ));
            }
        }
        if ($modo) {
            echo json_encode($valores, JSON_PRETTY_PRINT);
        } else {
            return $valores;
        }
    }

    public function ExportExcel($plantilla_body_excel) {
        $contador = count($plantilla_body_excel);
        $plantilla_head_excel = [['FECHA VENTA', 'NRO DE PÓLIZA', 'CERTIFICADO', 'COMPAÑIA', 'PLACA', 'IMPORTE', 'PRIMA NETA', 'COMISIÓN', '%', 'COMISION AGENTE', 'DATOS DEL CLIENTE', 'USO', 'TIPO EMISIÓN']];

        require(URLCOMPOSER_VENDOR . "autoload.php");
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $styleArray_body = [
            'borders' => [
                'allBorders' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                    'color' => ['argb' => '000000'],
                ],
            ],
        ];

        foreach ($plantilla_head_excel as $key => $value) {
            $row = $key + 2;
            $spreadsheet->getActiveSheet()
                    ->fromArray(
                            $plantilla_head_excel[$key],
                            NULL,
                            'B' . $row
            );
        }
        foreach ($plantilla_body_excel as $key => $value) {
            $row = $key + 3;
            $spreadsheet->getActiveSheet()
                    ->fromArray(
                            $plantilla_body_excel[$key],
                            NULL,
                            'B' . $row
            );
            $spreadsheet->getActiveSheet()->getStyle('B' . $row . ':N' . $row)->applyFromArray($styleArray_body);
        }
        $letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
        foreach ($letras as $value) {
            $sheet->getColumnDimension($value)->setAutoSize(true);
        }
        $styleArray = [
            'alignment' => [
                'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
            ],
        ];
        $styleArray_titulos = [
            'font' => [
                'bold' => true,
            ],
            'fill' => [
                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_GRADIENT_LINEAR,
                'startColor' => [
                    'argb' => '07ACEE',
                ],
                'endColor' => [
                    'argb' => '07ACEE',
                ],
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_MEDIUM,
                    'color' => ['argb' => '000000'],
                ],
            ],
        ];
        $contador_listo = 'G3:I' . ($contador + 2);
        $spreadsheet->getActiveSheet()->getStyle('A1:Z100')->applyFromArray($styleArray)->getFont()->setName('Cambria');
        $spreadsheet->getActiveSheet()->getStyle('B2:N2')->applyFromArray($styleArray_titulos);
        $spreadsheet->getActiveSheet()->getStyle($contador_listo)->getNumberFormat()->setFormatCode(\PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1);
//$writer = new Xlsx($spreadsheet);
//$writer->save('helloworld.xlsx');
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename="' . uniqid() . '.xlsx"');
        header('Cache-Control: max-age=0');

        $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
        ob_end_clean();

        $writer->save('php://output');
    }

    function AgregarExcel($data) {
        $data = Controller::Verifica_JSON($data);
        $poliza = Polizas::select()->where([['nro_poliza_corregido', $data->nro_poliza_corregido]])->run();
        if (empty($poliza)) {
            $endoso_a_favor = count($data->endoso_a_favor) === 0 ? '' : $data->endoso_a_favor[0]->id;
            $poliza = new Polizas(
                    null,
                    mb_strtolower($data->nro_poliza),
                    mb_strtolower($data->nro_poliza_corregido),
                    $data->id_cliente[0]->id,
                    $data->id_empresa[0]->id,
                    $data->id_producto[0]->id,
                    $data->id_ramo[0]->id,
                    $data->moneda[0]->id,
                    $data->descripcion,
                    $endoso_a_favor,
                    0,
                    fecha_hora,
                    Auth_controller::SessionId()
            );
            $respuesta_poliza = $poliza->create();

            $documento_poliza = new PolizasDocumentos(
                    null,
                    $id_poliza = $respuesta_poliza['getID'],
                    $id_subagente = $data->datos_documento->id_subagente[0]->id,
                    $fecha_emision = $data->datos_documento->fecha_emision,
                    $tipo_vigencia = $data->datos_documento->tipo_vigencia[0]->id,
                    $fecha_vigencia_inicio = $data->datos_documento->fecha_vigencia_inicio,
                    $fecha_vigencia_fin = $data->datos_documento->fecha_vigencia_fin,
                    $ejecutivo = $data->datos_documento->ejecutivo[0]->id,
                    $nro_certificado = $data->datos_documento->nro_certificado,
                    $id_garantia = 0,
                    $id_cargo = 0,
                    $pago_empresa = 0,
                    $pago_sub_agente = 0,
                    $prima_total = number_format($data->datos_documento->prima_total, 2, '.', ''),
                    $prima_comercial = number_format($data->datos_documento->prima_comercial, 2, '.', ''),
                    $prima_neta = number_format($data->datos_documento->prima_neta, 2, '.', ''),
                    $comision = number_format($data->datos_documento->comision, 2, '.', ''),
                    $porcentaje = number_format($data->datos_documento->porcentaje, 2, '.', ''),
                    $comision_subagente = number_format($data->datos_documento->comision_subagente, 2, '.', ''),
                    $tipo_documento_poliza = $data->datos_documento->tipo_documento_poliza[0]->id,
                    $tipo_pago = $data->datos_documento->tipo_pago[0]->id,
                    $cancelado = 0,
                    $fecha_creado = fecha_hora,
                    Auth_controller::SessionId()
            );
            $respuesta_documento_poliza = $documento_poliza->create();

            $vehiculo_poliza = new PolizasVehiculos(
                    null,
                    $id_poliza = $respuesta_poliza['getID'],
                    $placa = mb_strtolower($data->datos_vehiculos->placa),
                    $clase = $data->datos_vehiculos->clase[0]->id,
                    $uso = $data->datos_vehiculos->uso[0]->id,
                    $categoria = $data->datos_vehiculos->categoria[0]->id,
                    $marca = $data->datos_vehiculos->marca[0]->id,
                    $modelo = $data->datos_vehiculos->modelo[0]->id,
                    $ano = $data->datos_vehiculos->ano[0]->ano,
                    $nro_asientos = $data->datos_vehiculos->nro_asientos,
                    $nro_pasajeros = $data->datos_vehiculos->nro_pasajeros,
                    $nro_serie = mb_strtolower($data->datos_vehiculos->nro_serie),
                    $motor = $data->datos_vehiculos->motor,
                    $color = $data->datos_vehiculos->color,
                    $timon = $data->datos_vehiculos->timon,
                    $combustible = $data->datos_vehiculos->combustible,
                    $carroceria = $data->datos_vehiculos->carroceria
            );
            $respuesta_vehiculo_poliza = $vehiculo_poliza->create();
            $respuestas = array(
                'id_poliza' => $respuesta_poliza['getID'],
                'id_poliza_documento' => $respuesta_documento_poliza['getID'],
                'respuesta_poliza' => $respuesta_poliza['error'],
                'respuesta_documento_poliza' => $respuesta_documento_poliza['error'],
                'respuesta_vehiculo_poliza' => $respuesta_vehiculo_poliza['error']
            );
        } else {

            return $data->nro_poliza_corregido;
        }
    }

    public function Ejemplo($excel, $subagente) {

        //fechas
        $f_e_g = explode(' ', $excel[9]);
        $f_i_g = explode(' ', $excel[10]);
        $f_f_g = explode(' ', $excel[11]);


        //
        $numero_poliza_general = $excel[0];
        $nro_certificado_general = $excel[1];
        $compania_general = explode('-', $excel[2]);
        $tipo_soat = $excel[3];
        $nombre_general = $excel[4];
        $nro_documento_g = $excel[5];
        $direccion_general = $excel[6];
        $ubigeo_general = $excel[7];
        $celular_general = $excel[8];
        //$fecha_emision_general = Fechas_controller::CambiarTipoDB($f_e_g[0]);
        //$fecha_inicio_general = Fechas_controller::CambiarTipoDB($f_i_g[0]);
        //$fecha_final_general = Fechas_controller::CambiarTipoDB($f_f_g[0]);

        $fecha_emision_general = $f_e_g[0];
        $fecha_inicio_general = $f_i_g[0];
        $fecha_final_general = $f_f_g[0];

        $placa_general = $excel[12];
        $clase_general = explode('-', $excel[13]);
        $uso_general = explode('-', $excel[14]);
        $categoria_general = explode('-', $excel[15]);
        $ano = $excel[16];
        $marca_general = $excel[17];
        $modelo_general = $excel[18];
        $numero_asientos = $excel[19];
        $numero_serie_general = $excel[20];
        $numero_motor_general = $excel[21];
        $total_general = floatval($excel[22]);
        $id_ubigeo_sistema = explode('-', $ubigeo_general);
        $id_subagente_general = $subagente;

        $marca = Marcas::select()->where([['marca', $marca_general]])->run();
        if (empty($marca)) {
            $marca_new = new Marcas($id = null, $marca = $marca_general);
            $respuesta_marca = $marca_new->create();
            $id_marca = $respuesta_marca['getID'];
        } else {
            $id_marca = $marca[0]['id'];
        }

        $modelo = Modelos::select()->where([['modelo', $modelo_general], ['id_marca', $id_marca]])->run();
        if (empty($modelo)) {
            $modelo_new = new Modelos($id = null, $modelo = $modelo_general, $id_marca = $id_marca);
            $respuesta_modelo = $modelo_new->create();
            $id_modelo = $respuesta_modelo['getID'];
        } else {
            $id_modelo = $modelo[0]['id'];
        }


        $clientes = Clientes::select()->where([['nrodoc', $nro_documento_g]])->run();
        if (empty($clientes)) {
            if (strlen($nro_documento_g) == 8) {
                $resultado = (object) array();
            } else {
                $resultado = Sunat_controller::Datos($nro_documento_g, 's');
            }




            if (count((array) $resultado) == 0) {
                $cliente = new Clientes(
                        $id = null,
                        $nombre = $nombre_general,
                        $id_tipodoc = strlen($nro_documento_g) == 8 ? '2' : '4',
                        $nrodoc = $nro_documento_g,
                        $id_giro_negocio = '',
                        $direccion = $direccion_general,
                        $referencia = '',
                        $id_ubigeo = $id_ubigeo_sistema[0],
                        $fecha_creacion = '',
                        $id_subagente = Auth_controller::SessionId(),
                        $eliminado_logico = 0,
                );
                $resultado_cliente = $cliente->create();
                $id_generado = $resultado_cliente['getID'];
                $cliente_contacto = new ClientesContactos(
                        $id = null,
                        $id_cliente = $id_generado,
                        $nombre = $nombre_general,
                        $telefono = '',
                        $celular = $celular_general,
                        $correo = 'soporte@confianzayvida',
                        $id_principal = 0,
                );
                $cliente_contacto->create();
            } else {
                $cliente = new Clientes(
                        $id = null,
                        $nombre = $resultado['result']['RazonSocial'],
                        $id_tipodoc = strlen($nro_documento_g) == 8 ? '2' : '4',
                        $nrodoc = $resultado['result']['RUC'],
                        $id_giro_negocio = '',
                        $direccion = empty($resultado['Direccion_corregida']) ? 'CALLE MANCO INCA Q-6 SAMEGUA' : $resultado['Direccion_corregida'],
                        $referencia = '',
                        $id_ubigeo = empty($resultado['id']) ? $id_ubigeo_sistema[0] : $resultado['id'],
                        $fecha_creacion = '',
                        $id_subagente = Auth_controller::SessionId(),
                        $eliminado_logico = 0,
                );

                $resultado_cliente = $cliente->create();
                $id_generado = $resultado_cliente['getID'];
                $cliente_contacto = new ClientesContactos(
                        $id = null,
                        $id_cliente = $id_generado,
                        $nombre = $resultado['result']['RazonSocial'],
                        $telefono = '',
                        $celular = $celular_general,
                        $correo = 'soporte@confianzayvida',
                        $id_principal = 0,
                );
                $cliente_contacto->create();
            }
        } else {
            $id_generado = $clientes[0]['id'];
        }

        $compania = EmpresasSeguros::select()->where([['id', $compania_general[0]]])->run();
        $producto_compania = ProductosEmpresasSeguros::select()->where([['nombre', "%$tipo_soat%", 'like'], ['id_ramo', 66], ['id_empresas_seguro', $compania_general[0]]])->run();
        $subagente_comision = SubAgentesComisiones::select()
                ->where([
                    ['id_subagente', $id_subagente_general],
                    ['id_empresa_seguro', $compania_general[0]],
                    ['id_producto_empresa_seguro', $producto_compania[0]['id']]
                ])
                ->run();

        $prima_total = $total_general;
        $prima_comercial = $total_general / 1.18;
        $factor = floatval($compania[0]['factor_soat']);
        $prima_neta = $prima_total / $factor;
        $gastos_e = floatval($compania[0]['gastos_emision_minimo_soat']);
        $prima_neta = $prima_comercial - $prima_neta;
        $prima_neta = $prima_neta > $gastos_e ? $prima_total / $factor : $prima_comercial - $gastos_e;
        $comision = $producto_compania[0]['comision'] === '0.00' ? 0 : $prima_neta * floatval($producto_compania[0]['comision']) / 100;
        $porcentaje = $comision * 100 / $prima_neta;
        $comision_subagente = $comision * $subagente_comision[0]['comision'] / 100;

        $prima_total = number_format($prima_total, 2, '.', ',');
        $prima_comercial = number_format($prima_comercial, 2, '.', ',');
        $factor = number_format($factor, 2, '.', ',');
        $prima_neta = number_format($prima_neta, 2, '.', ',');
        $comision = number_format($comision, 2, '.', ',');
        $porcentaje = number_format($porcentaje, 2, '.', ',');
        $comision_subagente = number_format($comision_subagente, 2, '.', ',');

        $data_documentos = array(
            'nro_poliza' => $numero_poliza_general,
            'nro_poliza_corregido' => $numero_poliza_general,
            'id_cliente' => [
                array(
                    'id' => $id_generado,
                ),
            ],
            'id_empresa' => [
                array(
                    'id' => $compania_general[0]
                )
            ],
            'id_producto' => [
                array(
                    'id' => $producto_compania[0]['id']
                )
            ],
            'id_ramo' => [
                array(
                    'id' => 66,
                )
            ],
            'moneda' => [
                array(
                    'id' => 1,
                )
            ],
            'descripcion' => '',
            'endoso_a_favor' => [],
            'datos_documento' => [
                'id_subagente' => [
                    array(
                        'id' => $id_subagente_general
                    )
                ],
                'fecha_emision' => $fecha_emision_general,
                'tipo_vigencia' => [
                    array(
                        'id' => 1,
                    )
                ],
                'fecha_vigencia_inicio' => $fecha_inicio_general,
                'fecha_vigencia_fin' => $fecha_final_general,
                'ejecutivo' => [
                    array(
                        'id' => 6,
                    )
                ],
                'nro_certificado' => $nro_certificado_general,
                'prima_total' => $prima_total,
                'prima_comercial' => $prima_comercial,
                'prima_neta' => $prima_neta,
                'comision' => $comision,
                'porcentaje' => $porcentaje,
                'comision_subagente' => $comision_subagente,
                'tipo_documento_poliza' => [
                    array(
                        'id' => 1,
                    )
                ],
                'tipo_pago' => [
                    array(
                        'id' => 1,
                    )
                ],
            ],
            'datos_vehiculos' => [
                'placa' => $placa_general,
                'clase' => [
                    array(
                        'id' => $clase_general[0],
                    )
                ],
                'uso' => [
                    array(
                        'id' => $uso_general[0],
                    )
                ],
                'categoria' => [
                    array(
                        'id' => $categoria_general[0],
                    )
                ],
                'marca' => [
                    array(
                        'id' => $id_marca,
                    )
                ],
                'modelo' => [
                    array(
                        'id' => $id_modelo,
                    )
                ],
                'ano' => [
                    array(
                        'ano' => $ano,
                    )
                ],
                'nro_asientos' => $numero_asientos,
                'nro_pasajeros' => '',
                'nro_serie' => $numero_serie_general,
                'motor' => $numero_motor_general,
                'color' => '',
                'timon' => '',
                'combustible' => '',
                'carroceria' => '',
            ],
        );
        $data_documentos = json_encode($data_documentos);
        return Polizas_controller::AgregarExcel($data_documentos);
    }

}
