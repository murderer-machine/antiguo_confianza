<?php

class CertificadosFisicos_controller extends Controller {

    public function __construct() {
        parent::__construct();
        $this->Verificar_Session();
    }

    public function Agregar() {
        $this->Verifica_GET();
        $certificado = new CertificadosFisicos(
                null,
                $id_subagente = 1,
                $id_empresa_seguro = 12,
                $fecha_entrega = fecha,
                $correlativo_inicio = 1625,
                $correlativo_fin = 1635,
                $fecha_ingreso_certificados = fecha,
                $id_usuario_ingreso = 1
        );
        $respuesta = $certificado->create();
        print_r($respuesta);
    }

    public function Pertenece($parametros) {
        $this->Verifica_GET();
        $nro_certificado = $parametros[2];
        $certificado = CertificadosFisicos::select()->where([['id_subagente', $parametros[0]], ['id_empresa_seguro', $parametros[1]]])->run();
        if (empty($certificado) || $nro_certificado === '0') {
            $respuesta = 2;
        } else {
            $certificado = (array_shift($certificado));
            if (($nro_certificado >= $certificado['correlativo_inicio']) && ($nro_certificado <= $certificado['correlativo_fin'])) {
                $respuesta = 0;
            } else {
                $respuesta = 1;
            }
        }
        echo json_encode($respuesta, JSON_PRETTY_PRINT);
    }

}
