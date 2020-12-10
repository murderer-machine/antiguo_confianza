<?php

class Model {

    private static $db;
    protected static $table;
    private static $consulta;
    private static $array_pdo;

    private static function getConnection() {
        if (!isset(self::$db)) {
            self::$db = new Database(_DB_TYPE, _DB_HOST, _DB_NAME, _DB_USER, _DB_PASS);
            self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
    }

    public function getRelationship($t) {
        self::getConnection();
        return self::$db->getRelationship($t);
    }

    public static function setTable($table) {
        self::$table = $table;
    }

    public static function getUltimo($data) {
        self::getConnection();
        $sql = "SELECT * FROM " . static::$table . " ORDER BY " . $data . "  DESC LIMIT 1;";
        return $results = self::$db->select($sql);
    }

    public static function getPrimero($data) {
        self::getConnection();
        $sql = "SELECT * FROM " . static::$table . " ORDER BY " . $data . "  ASC LIMIT 1;";
        return $results = self::$db->select($sql);
    }

    public static function getMenor($campo1, $campo2, $valor) {
        self::getConnection();
        $sql = "SELECT min(" . $campo1 . ") FROM " . static::$table . " WHERE " . $campo2 . "=" . $valor;
        //echo $sql;

        return $results = self::$db->select($sql);
    }

    public static function getAllDist($data) {
        self::getConnection();
        $sql = "SELECT DISTINCT " . $data . " FROM " . static::$table . ";";
        return $results = self::$db->select($sql);
    }

    public static function getAllDistAll($data) {
        self::getConnection();
        $sql = "SELECT * FROM " . static::$table . " GROUP BY " . $data . " ORDER BY " . $data . " ASC";
        return $results = self::$db->select($sql);
    }

    public static function getAll($campos = '*') {
        self::getConnection();
        $sql = "SELECT " . $campos . " FROM " . static::$table . ";";
        return $results = self::$db->select($sql);
    }

    public static function getAllNull($field) {
        self::getConnection();
        $sql = "SELECT * FROM " . static::$table . " WHERE " . $field . " IS NULL;";
        return $results = self::$db->select($sql);
    }

    public static function getAllFullJoin($selector, $table) {
        self::getConnection();
        $sql = "SELECT * FROM " . static::$table . " INNER JOIN " . $table . ' ON ' . static::$table . "." . $selector . " = " . $table . '.id ';
        return $results = self::$db->select($sql);
    }

    public static function select($campos = '*') {
        self::$array_pdo = array();
        self::$consulta = '';
        self::$consulta = "SELECT " . $campos . " FROM " . static::$table;
        return new static();
    }

    public static function run($sql = false) {
        self::getConnection();
        $resultado = self::$db->select(self::$consulta, self::$array_pdo);
        echo $sql ? self::$consulta . '<br/>' : '';
        print_r($sql ? self::$array_pdo : '');
        echo $sql ? '<hr/>' : '';
        return $resultado;
    }

    public static function where($datos) {
        self::$consulta = self::$consulta . " WHERE ";
        $consulta = '';
        foreach ($datos as $dato) {
            $logica = count($dato) === 2 ? '=' : $dato[2];
            if ($dato === end($datos)) {
                $consulta = $consulta . $dato[0] . ' ' . $logica . ' :where_' . $dato[0];
            } else {
                $consulta = $consulta . $dato[0] . ' ' . $logica . ' :where_' . $dato[0] . ' ' . ' AND ' . ' ';
            }

            self::$array_pdo[":where_" . $dato[0]] = $dato[1];
        }
        self::$consulta = self::$consulta . $consulta;
        return new static();
    }

    public static function wherec($datos, $concatenar = false) {
        self::$consulta = self::$consulta;
        $consulta = '';
        foreach ($datos as $dato) {
            $logica = count($dato) === 2 ? '=' : $dato[2];
            $var = $concatenar ? " AND " : " WHERE ";
            if ($dato === end($datos)) {
                $consulta = $consulta . $var . $dato[0] . ' ' . $logica . ' :where_' . $dato[0];
            } else {
                $consulta = $consulta . $var . $dato[0] . ' ' . $logica . ' :where_' . $dato[0] . ' ' . ' AND ' . ' ';
            }
            self::$array_pdo[":where_" . $dato[0]] = $dato[1];
        }
        self::$consulta = self::$consulta . $consulta;
        return new static();
    }

    public static function wherecFechaComapracion($datos, $concatenar = false) {
        self::$consulta = self::$consulta;
        $consulta = '';
        foreach ($datos as $dato) {
            $logica = count($dato) === 2 ? '=' : $dato[2];
            $var = $concatenar ? " AND " : " WHERE ";
            if ($dato === end($datos)) {
                $consulta = $consulta . $var . 'DATE(' . $dato[0] . ') ' . $logica . ' DATE(:where_' . $dato[0] . ')';
            } else {
                $consulta = $consulta . $var . 'DATE(' . $dato[0] . ') ' . $logica . ' DATE(:where_' . $dato[0] . ') ' . ' AND ' . ' ';
            }
            self::$array_pdo[":where_" . $dato[0]] = $dato[1];
        }
        self::$consulta = self::$consulta . $consulta;
        echo self::$consulta;
        return new static();
    }

    public static function where_BETWEEN($campo, $fecha_inicio, $fecha_fin, $concatenar = false) {
        if ($concatenar) {
            $consulta = " AND date($campo) BETWEEN date('$fecha_inicio') AND date('$fecha_fin')";
        } else {
            $consulta = " WHERE date($campo) BETWEEN date('$fecha_inicio') AND date('$fecha_fin')";
        }
        self::$consulta = self::$consulta . $consulta;
        return new static();
    }

    public function Limit($numero) {
        $limit = ' LIMIT ' . $numero;
        self::$consulta = self::$consulta . $limit;
        return new static();
    }

    public function OrderBy($datos, $format = false) {

        $order = '';
        foreach ($datos as $dato) {

            if ($dato === end($datos)) {
                if (!$format) {
                    $order = $order . $dato[0] . " " . $dato[1];
                } else {
                    $order = $order . "DATE(" . $dato[0] . ") " . $dato[1];
                }
            } else {
                if (!$format) {
                    $order = $order . $dato[0] . " " . $dato[1] . ",";
                } else {
                    $order = $order . "DATE(" . $dato[0] . ") " . $dato[1] . ",";
                }
            }
        }

        $consulta = " ORDER BY " . $order . ";";
        self::$consulta = self::$consulta . $consulta;
        return new static();
    }

    public static function whereConsulta($sql1) {
        self::getConnection();

        $sql = $sql1;

        $results = self::$db->select($sql);

        return $results;
    }

    public static function whereBetween($fecha, $value, $value1) {
        self::getConnection();
        $sql = "SELECT * FROM " . static::$table . " WHERE " . $fecha . " between '" . $value . "' and '" . $value1 . "'";
        $results = self::$db->select($sql, array());
        return $results;
    }

    public static function whereBetweenAnd($data, $condicion, $fecha, $value1, $value2, $sql = '') {
        self::getConnection();
        $c = count($data);
        $i = "";
        $where = '';
        foreach ($data as $key => $value) {
            $i++;
            if ($i == $c) {
                $where = $where . $key . '="' . $value . '"';
            } else {
                $where = $where . $key . '="' . $value . '" ' . $condicion . ' ';
            }
        }
        $sql = "SELECT * FROM " . static::$table . " WHERE " . $where . " and (" . $fecha . " between '" . $value1 . "' and '" . $value2 . "') " . $sql;
//echo $sql.'<hr>';
        $results = self::$db->select($sql, array());
        return $results;
    }

    public static function where_caracter($field, $caracter) {
        self::getConnection();
        $sql = "SELECT * FROM " . static::$table . " WHERE CHARACTER_LENGTH(" . $field . ")=" . $caracter;
        $results = self::$db->select($sql, array(
            ":" . $field => $value,
        ));
        return $results;
    }

    public static function whereVNull($data, $condicion, $field, $distinct = '') {
        self::getConnection();
        $c = count($data);
        $i = "";
        $where = '';
        foreach ($data as $key => $value) {
            $i++;
            if ($i == $c) {
                $where = $where . $key . '="' . $value . '"';
            } else {
                $where = $where . $key . '="' . $value . '" ' . $condicion . ' ';
            }
        }
        if ($distinct == '') {
            $sql = "SELECT * FROM " . static::$table . " WHERE " . $where . " " . $condicion . " " . $field . " IS NULL";
        } else {
            $sql = "SELECT * FROM " . static::$table . " WHERE " . $where . " " . $condicion . " " . $field . " IS NULL GROUP BY " . $distinct;
        };
        $results = self::$db->select($sql, array());
        return $results;
    }

    function obtener_datos($db, $table) {
        self::getConnection();
        $sql = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name='" . $table . "' and table_schema='" . $db . "'";

        $results = self::$db->select($sql, array());
        return $results;
    }

    function obtener_tablas($db) {
        self::getConnection();
        $sql = "SHOW FULL TABLES FROM " . $db;
        $results = self::$db->select($sql, array());
        return $results;
    }

    public static function getUltimo_v($data, $condicion, $orderbyfield) {
        self::getConnection();
        $c = count($data);
        $i = "";
        $where = '';
        foreach ($data as $key => $value) {
            $i++;
            if ($i == $c) {
                $where = $where . $key . '="' . $value . '"';
            } else {
                $where = $where . $key . '="' . $value . '" ' . $condicion . ' ';
            }
        }
        $sql = "SELECT * FROM " . static::$table . " WHERE " . $where . " ORDER BY " . $orderbyfield . "  DESC LIMIT 1;";
        ;


        $results = self::$db->select($sql, array());
        return $results;
    }

    public static function whereR($attr, $field, $value, $tableR) {
        self::getConnection();
        $sql = "SELECT " . $attr . " FROM " . $tableR . " WHERE " . $field . " = :" . $field;
        $results = self::$db->select($sql, array(
            ":" . $field => $value
        ));
        return $results;
    }

    public static function whereN($attr, $field, $tableR) {
        self::getConnection();
        $sql = "SELECT " . $attr . " FROM " . $tableR . " WHERE " . $field . " IS NULL";
        $results = self::$db->select($sql);
        return $results;
    }

    public function create() {
        self::getConnection();
        $values = $this->getMyVars($this);
        $has_many = self::checkRelationship("has_many", $values);
        self::checkRelationship("has_one", $values);
        self::checkRelationship("known_as", $values);
        $result = self::$db->insert(static::$table, $values);
        if ($result === true) {
            $response = array(
                'error' => 0,
                'getID' => self::$db->lastInsertId(),
                'msg' => get_class($this) . ' Created'
            );
            $this->setId($response["getID"]);
        } else {
            $response = array(
                'error' => 1,
                'msg' => 'Error ' . $result
            );
        }
        if ($has_many) {
            $rStatus = self::saveRelationships($has_many);
            if ($rStatus["error"]) {
                
            }
        }
        return $response;
    }

    public function update($field = "id", $value = null) {
        self::getConnection();
        $values = $this->getMyVars($this);
        $has_many = self::checkRelationship("has_many", $values);
        self::checkRelationship("has_one", $values);
        self::checkRelationship("known_as", $values);
        $value = ($value == null) ? $values["id"] : $value;
        $result = self::$db->update(static::$table, $values, $field . " = " . $value);
        if ($result) {
            $response = array(
                'error' => 0,
                'msg' => get_class($this) . ' Updated'
            );
        } else {
            $response = array(
                'error' => 1,
                'msg' => 'Error ' . $result
            );
        }
        if ($has_many) {
            $rStatus = self::saveRelationships($has_many);
            if ($rStatus["error"]) {
                
            }
        }
        return $response;
    }

    public function saveRelationships($relationships) {
        $log = array(
            "error" => 0,
            "trace" => array()
        );
        foreach ($relationships as $name => $rules) {
            if (isset($rules['relationships'])) {
                foreach ($rules['relationships'] as $key => $relacion) {
                    $table = $rules["join_table"];
                    $result = self::$db->insert($table, $relacion);
                }
            }
        }
        return $log;
    }

    public function has_many($rName, $obj) {
        $has_many = $this->getHas_many();
        if ($has_many[$rName] != null) {
            $rule = $has_many[$rName];
            $rule['my_key'] = ucfirst($rule['my_key']);
            $rule['other_key'] = ucfirst($rule['other_key']);
            if (get_class($obj) == $rule["class"]) {
                if ($this->{"get" . $rule['my_key']}() != null && $obj->{"get" . $rule['other_key']}() != null) {
                    $rule['relationships'][] = array(
                        $rule['join_self_as'] => $this->{"get" . $rule['my_key']}(),
                        $rule['join_other_as'] => $obj->{"get" . $rule['other_key']}()
                    );
                    $has_many[$rName] = $rule;
                    $this->setHas_many($has_many);
                } else {
                    print("Se requieren llaves primarias para la relaciÃ³n");
                }
            } else {
                print("No se cumple con el tipo de objeto");
            }
        } else {
            print("No existe este tipo de relaciÃ³n");
        }
    }

    public function has_one($rName, $obj) {
        $relacion = $this->getHas_one();
        if (isset($relacion[$rName])) {
            $rule = $relacion[$rName];
            if (get_class($obj) == $rule["class"]) {
                $this->{"set" . ucfirst($rule["join_as"])}($obj->{"get" . ucfirst($rule["join_with"])}());
            } else {
                print("No se cumple con el tipo de objeto");
            }
        } else {
            print("No existe este tipo de relaciÃ³n");
        }
    }

    public function known_as($rName, $obj, $update = true) {
        $relacion = $this->getKnown_as();
        if (isset($relacion[$rName])) {
            $rule = $relacion[$rName];
            if (get_class($obj) == $rule["class"]) {
                print_r("set" . ucfirst($rule["join_with"]));
                $obj->{"set" . ucfirst($rule["join_with"])}($this->{"get" . ucfirst($rule["join_as"])}());
                $obj->update();
            } else {
                print("No se cumple con el tipo de objeto");
            }
        } else {
            print("No existe este tipo de relaciÃ³n");
        }
    }

    public function set($attr, $value) {
        $this->{$attr} = $value;
    }

    public function checkRelationship($rType, &$data) {
        if (isset($data[$rType])) {
            $relationship = $data[$rType];
            unset($data[$rType]);
            return $relationship;
        } else {
            return false;
        }
    }

    public function delete() {
        self::getConnection();
        $result = self::$db->delete(static::$table, "id = " . $this->getId());
        if ($result) {
            $result = array(
                'error' => 0,
                'message' => 'Objeto Eliminado'
            );
        } else {
            $result = array(
                'error' => 1,
                'message' => self::$db->getError()
            );
        }
        return $result;
    }

    public function getAttrTable($table) {
        self::getConnection();
        $attr = self::$db->getAttr($table);
        return $attr;
    }

    public static function instanciate($args) {
        if (count($args) > 1) {
            $refMethod = new ReflectionMethod(get_called_class(), '__construct');
            $params = $refMethod->getParameters();
            $re_args = array();
            foreach ($params as $key => $param) {
                if ($param->isPassedByReference()) {
                    $re_args[$param->getName()] = &$args[$param->getName()];
                } else {
                    $re_args[$param->getName()] = $args[$param->getName()];
                }
            }
            $refClass = new ReflectionClass(get_called_class());
            return $refClass->newInstanceArgs((array) $re_args);
        }
    }

    public static function getKeys() {
        $refMethod = new ReflectionMethod(get_called_class(), '__construct');
        $params = $refMethod->getParameters();
        $keys = [];
        foreach ($params as $key => $param) {
            $keys[$key] = $param->getName();
        }
        return $keys;
    }

    public static function getById($id, $campos = '*') {
        $whereReturn = self::select($campos)->where([['id', $id]])->run();
        $data = array_shift($whereReturn);
        if ($campos === '*') {
            $result = self::instanciate($data);
            return $result;
        } else {
            return $data;
        }
    }

}
