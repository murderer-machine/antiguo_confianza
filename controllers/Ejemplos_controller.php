<?php

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class Ejemplos_controller extends Controller {

    public function __construct() {
        parent::__construct();
    }

    public function EjemploVerifica($nombre_fichero) {
        $nombre_fichero = "recursos/documentos/$parametros[0]";
        if (file_exists($nombre_fichero)) {
            echo "El fichero $nombre_fichero existe";
        } else {
            mkdir($nombre_fichero, 0777);
            echo "El fichero $nombre_fichero no existe";
        }
    }

    public function Ejemplo() {
        $this->Verifica_POST();
        $output_dir_ = "recursos/documentos/" . $_POST['id_poliza'] . "/";
        $output_dir = "recursos/documentos/" . $_POST['id_poliza'] . "/" . $_POST['id_poliza_documento'] . "/";
        if (file_exists($output_dir_)) {
            
        } else {
            mkdir($output_dir_, 0777);
        }
        if (file_exists($output_dir)) {
            
        } else {
            mkdir($output_dir, 0777);
        }
        if (isset($_FILES["avatar"])) {
            $error = $_FILES["avatar"]["error"];
            if (!is_array($_FILES["avatar"]["name"])) {
                $fileName = $_FILES["avatar"]["name"];
                $imageFileType = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

                move_uploaded_file($_FILES["avatar"]["tmp_name"], $output_dir . uniqid() . '.' . $imageFileType);
            } else {
                $fileCount = count($_FILES["avatar"]["name"]);
                for ($i = 0; $i < $fileCount; $i++) {
                    $fileName = $_FILES["avatar"]["name"][$i];
                    $imageFileType = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
                    move_uploaded_file($_FILES["avatar"]["tmp_name"][$i], $output_dir . uniqid() . '.' . $imageFileType);
                }
            }
        }
        echo json_encode('aqui');
        //echo json_encode($_FILES['avatar']['name']);
    }

    public function Placas($placa) {
        $token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.MTQ0OQ.WuYizF54ZLJyu6oVj1r1dCEGhp2mE8KLQI6hpS0WMVE';
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://quertium.com/api/v1/apeseg/soat/$placa?token=$token",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 100,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {

            return 0;
        } else {
            return json_decode($response);
        }
    }

    public function Placas2() {
        $placa = $this->Placas('V3T961');
        print_r($placa);
    }

    public function Pamela() {
        $placas = ['V3T961', 'V5Q964', 'Z4K963', 'V9U968', 'VDF969', 'VAS953', 'V8N960', 'VEN953', 'VFT969', 'V4Y954', 'VBC959', 'V9Y952', 'V3E951', 'VDI954', 'VDI962', 'VBL955', 'V7W953', 'B8S959', 'VAN966', 'D3S345', 'VCP957', 'V1H967', 'VFH969', 'V8X394', 'VAQ954', 'V8E957', 'V9V953', 'V9A969', 'VBB956', 'VCJ958', 'VCH966', 'C3L951', 'V9M952'];
        $i = 0;
        foreach ($placas as $placa) {
            $placa = trim(strtolower($placa));
            $response = $this->Placas($placa);
            if ($response == 0) {
                $pamela = new Pamela(
                        null,
                        '',
                        '',
                        '',
                        $placa,
                        '',
                        '',
                        '',
                        '',
                        '',
                        ''
                );
                $resultado = $pamela->create();
            } else {
                $pamela = new Pamela(
                        null,
                        mb_strtoupper($response->NombreCompania),
                        mb_strtoupper($response->FechaInicio),
                        mb_strtoupper($response->FechaFin),
                        mb_strtoupper($response->Placa),
                        mb_strtoupper($response->NumeroPoliza),
                        mb_strtoupper($response->NombreUsoVehiculo),
                        mb_strtoupper($response->NombreClaseVehiculo),
                        mb_strtoupper($response->Estado),
                        mb_strtoupper($response->TipoCertificado),
                        mb_strtoupper($response->FechaCreacion)
                );
                $resultado = $pamela->create();
            }
            print_r($response);
            echo '<br/>' . $i++ . '<hr/>';
        }
    }

    public function EjemploB() {
        $polizas_documentos = PolizasDocumentos::select()->where([['id_subagente', 1]])->where_BETWEEN('fecha_emision', '2020-09-09', '2020-09-09', true)->run();
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

        $plantilla_body = '<table>';
        $plantilla_body_excel = array();
        foreach ($polizas_documentos as $value) {
            $tipo_emision = $value['nro_certificado'] == '' ? 'DIGITAL' : 'FÍSICO';
            $plantilla_body = $plantilla_body . '  
            <tr>
            <td>
            ' . $value['fecha_emision'] . '
            </td>
             <td>
            ' . $value['poliza'][0]['nro_poliza'] . '
            </td>
            <td>
            ' . $value['nro_certificado'] . '
            </td>
            <td>
            ' . mb_strtoupper($value['poliza'][0]['id_empresa'][0]['nombre']) . '
            </td>
            <td>
            ' . $value['poliza_vehiculo'][0]['placa'] . '
            </td>
              <td>
            ' . $value['prima_total'] . '
            </td>
               <td>
            ' . $value['prima_neta'] . '
            </td>
               <td>
            ' . $value['comision'] . '
            </td>
               <td>
            ' . $value['porcentaje'] . '
            </td>
               <td>
            ' . $value['comision_subagente'] . '
            </td>
            <td>          
            ' . mb_strtoupper($value['poliza'][0]['id_cliente'][0]['nombre']) . '
            </td>
            <td>            
            ' . mb_strtoupper($value['poliza_vehiculo'][0]['uso'][0]['nombre']) . '
             </td>
             <td>
            ' . $tipo_emision . '
            </td>
            </tr>';
            array_push($plantilla_body_excel, array(
                $value['fecha_emision'],
                $value['poliza'][0]['nro_poliza'],
                $value['nro_certificado'],
                mb_strtoupper($value['poliza'][0]['id_empresa'][0]['nombre']),
                $value['poliza_vehiculo'][0]['placa'],
                $value['prima_total'],
                $value['prima_neta'],
                $value['comision'],
                $value['porcentaje'],
                $value['comision_subagente'],
                mb_strtoupper($value['poliza'][0]['id_cliente'][0]['nombre']),
                mb_strtoupper($value['poliza_vehiculo'][0]['uso'][0]['nombre']),
                $tipo_emision,
            ));
        }
        $plantilla_body = $plantilla_body . '</table>';
        print_r($plantilla_body_excel);

        //$this->ExportPdf($plantilla_body);
        $this->ExportExcel($plantilla_body_excel);
    }

    public function ExportPdf($plantilla_body) {
        require(URLCOMPOSER_VENDOR . "autoload.php");
        ob_start();
        echo $plantilla_body;
        $plantilla = ob_get_contents();
        ob_end_clean();
        $mpdf = new \Mpdf\Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'orientation' => 'L',
            'margin_left' => 5,
            'margin_right' => 5,
            'margin_top' => 5,
            'margin_bottom' => 5,
        ]);

        $mpdf->WriteHTML($plantilla);
        $mpdf->Output();
    }

    public function ExportExcel($plantilla_body_excel) {
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
        $spreadsheet->getActiveSheet()->getStyle('A1:Z100')->applyFromArray($styleArray)->getFont()->setName('Cambria');
        $spreadsheet->getActiveSheet()->getStyle('B2:N2')->applyFromArray($styleArray_titulos);
        //$writer = new Xlsx($spreadsheet);
        //$writer->save('helloworld.xlsx');
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename="myfile.xlsx"');
        header('Cache-Control: max-age=0');

        $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
        ob_end_clean();

        $writer->save('php://output');
    }

    public function carlos() {
        $ejemplo = array(
            'nombres' => 'marco',
            'apellidos' => 'rodriguez',
        );
        print_r(array_values($ejemplo));
    }

    public function python() {
        $salida = array(); //recogerá los datos que nos muestre el script de Python
        $var1= "marcorodriguez.jpg";
        $var2= "variable2";
        $var3= "variable3"; 
        exec("python lector2.py '$var1' '$var2' '$var2'", $salida);
        print_r($salida);
    }

    

}
