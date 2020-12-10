<?php

class Clientes_controller extends Controller {

    public function __construct() {
        parent::__construct();
        $this->Verificar_Session();
    }

    public function Agregar() {
        $this->Verifica_POST();
        $resultado = $this->Verifica_JSON(file_get_contents("php://input"));
        $cliente = Clientes::select()->where([['nrodoc', $resultado->nrodoc]])->run();
        if (empty($cliente)) {
            $cliente = new Clientes(
                    null,
                    mb_strtolower($resultado->nombre),
                    (int) $resultado->id_tipodoc[0]->id,
                    $resultado->nrodoc,
                    isset($resultado->id_giro_negocio[0]->id) ? (int) $resultado->id_giro_negocio[0]->id : 0,
                    mb_strtolower($resultado->direccion),
                    mb_strtolower($resultado->referencia),
                    (int) $resultado->id_ubigeo[0]->id,
                    mb_strtolower($resultado->fecha_creacion),
                    Auth_controller::SessionId(),
                    0,
            );
            $respuesta = $cliente->create();
            if ($respuesta['error'] === 0) {
                $contacto = new ClientesContactos(
                        null,
                        $respuesta['getID'],
                        mb_strtolower($resultado->contacto->nombre),
                        mb_strtolower($resultado->contacto->telefono),
                        mb_strtolower($resultado->contacto->celular),
                        mb_strtolower($resultado->contacto->correo),
                        0,
                );
                $contacto->create();
            }
        } else {
            $respuesta['error'] = 2;
        }
        echo json_encode($respuesta['error'], JSON_PRETTY_PRINT);
    }

    public function Mostrar() {
        $this->Verifica_GET();
        $clientes = Clientes::select('id,nombre,nrodoc,id_tipodoc,eliminado_logico')->where([['eliminado_logico', 0]])->run();

        for ($i = 0; $i < count($clientes); $i++) {
            $contacto = ClientesContactos::select()->where([['id_cliente', $clientes[$i]['id']]])->run();
            $clientes[$i]['contacto'] = empty($contacto) ? array() : $contacto;
            $tipodoc = TipoDocumento::getById($clientes[$i]['id_tipodoc']);
            $clientes[$i]['id_tipodoc'] = $tipodoc->descripcion;
        }

        echo json_encode($clientes, JSON_PRETTY_PRINT);
    }

    public function MostrarId($parametros) {
        $this->Verifica_GET();
        $cliente = Clientes::getById($parametros[0]);
        $fecha_creacion = $cliente->fecha_creacion;
        $tipo_doc = TipoDocumento::select()->where([['id', $cliente->id_tipodoc]])->run();
        $cliente->id_tipodoc = $tipo_doc;
        $giro = ActividadEconomica::select()->where([['id', $cliente->id_giro_negocio]])->run();
        $cliente->id_giro_negocio = empty($giro) ? array() : $giro;
        $ubigeo = Ubigeo::select()->where([['id', $cliente->id_ubigeo]])->run();
        $cliente->id_ubigeo = $ubigeo;
        $subagente = SubAgentes::select()->where([['id', $cliente->id_subagente]])->run();
        $cliente->id_subagente = $subagente;
        $cliente->fecha_creacion = $cliente->fecha_creacion === "0000-00-00" ? '' : date(DATE_ISO8601, strtotime($cliente->fecha_creacion . ' 14:40:46'));
        $data_contacto = array(
            'id_cliente' => $cliente->id,
            'id_principal' => 0,
        );
        $contacto = ClientesContactos::select()->where([['id_cliente', $cliente->id]])->run();
        $cliente->contacto = empty($contacto[0]) ? (object) array(
                    'nombre' => '',
                    'telefono' => '',
                    'celular' => '',
                    'correo' => '',
                ) : $contacto[0];
        echo json_encode($cliente, JSON_PRETTY_PRINT);
    }

    public function Editar() {
        $this->Verifica_POST();
        $resultado = $this->Verifica_JSON(file_get_contents("php://input"));
        $cliente = Clientes::getById((int) $resultado->id_editar);
        $cliente->setNombre(mb_strtolower($resultado->datos->nombre));
        $cliente->setId_tipodoc((int) $resultado->datos->id_tipodoc[0]->id);
        $cliente->setNrodoc($resultado->datos->nrodoc);
        $cliente->setId_giro_negocio(isset($resultado->datos->id_giro_negocio[0]->id) ? (int) $resultado->datos->id_giro_negocio[0]->id : 0);
        $cliente->setDireccion(mb_strtolower($resultado->datos->direccion));
        $cliente->setReferencia(mb_strtolower($resultado->datos->referencia));
        $cliente->setId_ubigeo((int) $resultado->datos->id_ubigeo[0]->id);
        $cliente->setFecha_creacion(mb_strtolower($resultado->datos->fecha_creacion));
        $cliente->setId_subagente((int) $resultado->datos->id_subagente[0]->id);
        $respuesta = $cliente->update();
        if ($respuesta['error'] === 0) {
            $contacto = ClientesContactos::select()->where([['id_cliente', $resultado->id_editar], ['id_principal', 0]])->run();
            if (empty($contacto)) {
                $contacto = new ClientesContactos(
                        null,
                        $resultado->id_editar,
                        mb_strtolower($resultado->datos->contacto->nombre),
                        mb_strtolower($resultado->datos->contacto->telefono),
                        mb_strtolower($resultado->datos->contacto->celular),
                        mb_strtolower($resultado->datos->contacto->correo),
                        0,
                );
                $contacto->create();
            } else {
                $contacto_ = ClientesContactos::getById($contacto[0]['id']);
                $contacto_->setNombre(mb_strtolower($resultado->datos->contacto->nombre));
                $contacto_->setTelefono(mb_strtolower($resultado->datos->contacto->telefono));
                $contacto_->setCelular(mb_strtolower($resultado->datos->contacto->celular));
                $contacto_->setCorreo(mb_strtolower($resultado->datos->contacto->correo));
                $contacto_->update();
            }
        }
        echo json_encode($respuesta['error'], JSON_PRETTY_PRINT);
    }

    public function Eliminar() {
        $this->Verifica_POST();
        $resultado = $this->Verifica_JSON(file_get_contents("php://input"));
        $cliente = Clientes::getById($resultado->id);
        $cliente->setEliminado_logico(1);
        $respuesta = $cliente->update();
        echo json_encode($respuesta['error'], JSON_PRETTY_PRINT);
    }
    public function Ejemplo(){
        $usuario = Usuarios::select()->where([['dni', '45463902'], ['password', Hash::create(ALGORITMO, 'kassandra@2015', HASHKEY)]])->run();
        print_r($usuario);
    }
}
