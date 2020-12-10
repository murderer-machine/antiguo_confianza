<?php

use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;

class LeerExcel_controller extends Controller {

    public function __construct() {
        parent::__construct();
    }

    public function Mapfre() {

        require(URLCOMPOSER_VENDOR . "autoload.php");
        $file = URL_DOC_EXCEL . 'mapfre.xlsx';
        if ($xlsx = SimpleXLSX::parse($file)) {
            $total = 0;
            //print_r($xlsx->rows());
            echo '<table border=1>';
            foreach ($xlsx->rows() as $value) {
                $total = $total + floatval($value[10]);
                $poliza = Polizas::select()->where([['nro_poliza', '%' . $value[1] . '%', 'LIKE']])->run();
                $fecha = explode(' ', $value[6]);
                $fecha_cambio = Fechas_controller::CambiarTipoDB($fecha[1]);
                if (!empty($poliza)) {
                    $poliza_doc = PolizasDocumentos::select()->where([['id_poliza', $poliza[0]['id']], ['fecha_emision', $fecha_cambio]])->run();
                    //print_r($poliza_doc);
                    $nro_poliza = strpos((string) $poliza[0]['nro_poliza'], (string) $value[1]) !== false ? '<b>' . $value[1] . '</b>' : $value[1];

                    if (empty($poliza_doc)) {
                        $fechaComparacion = (string) $fecha_cambio;
                        $prima_neta = (string) $value[8];
                        $porcentaje = (string) $value[9];
                        $comision = (string) $value[10];
                    } else {
                        $fechaComparacion = $fecha_cambio == $poliza_doc[0]['fecha_emision'] ? '<b>' . $fecha_cambio . '</b>' : $fecha_cambio;
                        $prima_neta = $value[8] == $poliza_doc[0]['prima_neta'] ? '<b>' . $value[8] . '</b>' : $value[8];
                        $porcentaje = number_format(substr($value[9], 0, -1), 2, '.', ',') == $poliza_doc[0]['porcentaje'] ? '<b>' . $value[9] . '</b>' : $value[9];
                        $comision = $value[10] == $poliza_doc[0]['comision'] ? '<b>' . @$value[10] . '</b>' : $value[10];
                    }

                    echo '
                    <tr style="border:1px solid red">    
                    <td>' . $nro_poliza . '<br/>' . $poliza[0]['nro_poliza'] . '<br/>' . $value[1] . '</td>
                    <td>' . $fechaComparacion . '</td>
                    <td>' . $prima_neta . '</td>
                    <td>' . $porcentaje . '</td>
                    <td>' . $comision . '</td>
                    </tr>
                    ';
                } else {
                    echo '
                    <tr>    
                    <td>' . $value[1] . '</td>
                    <td>' . $fecha[1] . '</td>
                    <td>' . $value[8] . '</td>
                    <td>' . $value[9] . '</td>
                    <td>' . $value[10] . '</td>
                    </tr>
                    ';
                }
            }
            echo '</table>';
        } else {
            echo SimpleXLSX::parseError();
        }
    }

    public function SubirArchivoSubAgente($parametros = []) {
        require(URLCOMPOSER_VENDOR . "autoload.php");
        $file = URL_DOC_EXCEL . "subagentes/$parametros[0]";
        $data = [];
        if ($xlsx = SimpleXLSX::parse($file)) {
            $datos = $xlsx->rows();
            foreach ($datos as $dato) {
                if ($dato !== reset($datos)) {
                    $data_respuesta = Polizas_controller::Ejemplo($dato, $parametros[1]);
                    if (!is_null($data_respuesta)) {
                        array_push($data, $data_respuesta);
                    }
                }
            }
        } else {
            echo SimpleXLSX::parseError();
        }
        echo json_encode($data, JSON_PRETTY_PRINT);
    }

    public function ExcelSubAgente() {
        $this->Verifica_POST();
        $output_dir = URL_DOC_EXCEL . "subagentes/";
        if (file_exists($output_dir)) {
            
        } else {
            mkdir($output_dir, 0777);
        }

        if (isset($_FILES["avatar"])) {
            $error = $_FILES["avatar"]["error"];
            if (!is_array($_FILES["avatar"]["name"])) {
                $fileName = $_FILES["avatar"]["name"];
                $imageFileType = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
                $nombre_archivo = Auth_controller::SessionId() . '_' . fecha . '_' . uniqid() . '.' . $imageFileType;
                move_uploaded_file($_FILES["avatar"]["tmp_name"], $output_dir . $nombre_archivo);
                echo json_encode($nombre_archivo, JSON_PRETTY_PRINT);
            } else {
                $fileCount = count($_FILES["avatar"]["name"]);
                for ($i = 0; $i < $fileCount; $i++) {
                    $fileName = $_FILES["avatar"]["name"][$i];
                    $imageFileType = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
                    move_uploaded_file($_FILES["avatar"]["tmp_name"][$i], $output_dir . Auth_controller::SessionId() . '_' . fecha . '_' . uniqid() . '.' . $imageFileType);
                }
            }
        }
    }
  

}
