<?php

class Generales_controller extends Controller {

    public function __construct() {
        parent::__construct();
        $this->Verificar_Session();
    }

    public function Ubigeo() {
        $this->Verifica_GET();
        $ubigeos = Ubigeo::select()->run();
        echo json_encode($ubigeos, JSON_PRETTY_PRINT);
    }

    public function TipoDocumento() {
        $this->Verifica_GET();
        $tipodoc = TipoDocumento::select()->run();
        echo json_encode($tipodoc, JSON_PRETTY_PRINT);
    }

    public function GiroNegocios() {
        $this->Verifica_GET();
        $gironegocios = ActividadEconomica::select()->run();
        echo json_encode($gironegocios, JSON_PRETTY_PRINT);
    }

    public function Clientes() {
        $this->Verifica_GET();
        $clientes = Clientes::select('id,nombre,nrodoc')->run();
        echo json_encode($clientes, JSON_PRETTY_PRINT);
    }

    public function SubAgentes($parametros) {
        $this->Verifica_GET();
        $subagentes = SubAgentes::select('id,nombres,apellidos,abreviatura')->run();
        foreach ($subagentes as $key => $field) {
            $subagentescomisiones = SubAgentesComisiones::select()
                    ->where([
                        ['id_subagente', $field['id']],
                        ['id_empresa_seguro', $parametros[0]],
                        ['id_producto_empresa_seguro', $parametros[1]],
                    ])
                    ->run();

            $subagentes[$key]['comisiones'] = $subagentescomisiones;
        }
        echo json_encode($subagentes, JSON_PRETTY_PRINT);
    }

    public function SubAgentesS() {
        $this->Verifica_GET();
        $subagentes = SubAgentes::select('id,nombres,apellidos,abreviatura')->run();
        echo json_encode($subagentes, JSON_PRETTY_PRINT);
    }

    public function Ramos() {
        $this->Verifica_GET();
        $ramos = Ramos::select()->run();
        echo json_encode($ramos, JSON_PRETTY_PRINT);
    }

    public function EmpresaasSeguro() {
        $this->Verifica_GET();
        $empresas = EmpresasSeguros::select()->where([['activo', 1]])->run();
        echo json_encode($empresas, JSON_PRETTY_PRINT);
    }

    public function ProductosSeguro($parametros) {
        $this->Verifica_GET();
        $productos = ProductosEmpresasSeguros::select()->where([['id_empresas_seguro', (int) $parametros[0]]])->run();
        echo json_encode($productos, JSON_PRETTY_PRINT);
    }

    public function Monedas() {
        $this->Verifica_GET();
        $monedas = Monedas::select()->run();
        echo json_encode($monedas, JSON_PRETTY_PRINT);
    }

    public function Ejecutivos() {
        $this->Verifica_GET();
        $ejecutivos = Usuarios::select('id,nombres,apellidos')->run();
        $id_activo = Usuarios::select('id,nombres,apellidos')->where([['id', Auth_controller::SessionId()]])->run();
        $datos = array(
            'ejecutivos' => $ejecutivos,
            'id_activo' => $id_activo,
        );
        echo json_encode($datos, JSON_PRETTY_PRINT);
    }

    public function EmpresasBancarias() {
        $this->Verifica_GET();
        $empresas_bancarias = EmpresasBancarias::select()->run();
        echo json_encode($empresas_bancarias, JSON_PRETTY_PRINT);
    }

    public function TipoDocumentoPoliza() {
        $this->Verifica_GET();
        $tipodocumentopoliza = TipoDocumentoPoliza::select()->run();
        echo json_encode($tipodocumentopoliza, JSON_PRETTY_PRINT);
    }

    public function TipoVigencia() {
        $this->Verifica_GET();
        $tipovigencia = TipoVigencia::select()->run();
        echo json_encode($tipovigencia, JSON_PRETTY_PRINT);
    }

    public function TipoPago() {
        $this->Verifica_GET();
        $respuesta = TipoPago::select()->run();
        echo json_encode($respuesta, JSON_PRETTY_PRINT);
    }

    public function Marcas() {
        $this->Verifica_GET();
        $respuesta = Marcas::select()->run();
        echo json_encode($respuesta, JSON_PRETTY_PRINT);
    }

    public function Modelos($parametros) {
        $this->Verifica_GET();
        $respuesta = Modelos::select()->where([['id_marca', $parametros[0]]])->run();
        echo json_encode($respuesta, JSON_PRETTY_PRINT);
    }

    public function CategoriasVehiculos() {
        $this->Verifica_GET();
        $respuesta = CategoriasVehiculos::select()->run();
        echo json_encode($respuesta, JSON_PRETTY_PRINT);
    }

    public function ClasesVehiculos() {
        $this->Verifica_GET();
        $respuesta = ClasesVehiculos::select()->run();
        echo json_encode($respuesta, JSON_PRETTY_PRINT);
    }

    public function UsosVehiculos() {
        $this->Verifica_GET();
        $respuesta = UsosVehiculos::select()->run();
        echo json_encode($respuesta, JSON_PRETTY_PRINT);
    }

}
