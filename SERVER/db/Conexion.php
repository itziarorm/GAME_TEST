<?php 
require_once "login_data.php";

class Conexion{
    
    private static $_singleton = null;
    protected $dbh;
    private $errno;
    private $num_rows;
    protected $conexion;
    

    public static function getInstance(){
        
        if (is_null(self::$_singleton)) {

            self::$_singleton = new self();
        }

        return self::$_singleton;
    }
    
    private function __clone() {
        // Evitar la clonación del objeto
        trigger_error("La clonación de este objeto no está permitida.", E_USER_ERROR);
    }
    
    public function __wakeup() {
        // Evitar la deserialización del objeto
        trigger_error("No puede deserializar una instancia de " . get_class($this) . " class.", E_USER_ERROR);
    }
    
    private function __construct(){
        
        global $cfg;
        
        $db = $cfg['nombre_bd'];
        $host = $cfg['servidor'];
        $port = $cfg['puerto'];
        $user = $cfg['usuario'];
        $pass = $cfg['password'];

        //$this->dbh = new mysqli($host, $user, $pass, $db, $port);

        $this->conexion = "host=$host port=$port dbname=$db user=$user password=$pass";
        $this->dbh = pg_connect($this->conexion);
        
        if (!$this->dbh) {                      //if ($this->dbh->connect_error)
            die("Error de conexión con BD");
        }
        //else
        //desconectar para pruebas.
        // echo "Connectiom OK <br>";
    }

    public function getConnection() {
    
        return self::$_singleton;
    }

    public function close(){
        
        if ($this->dbh) {
            pg_close($this->dbh);
        }
    }

    protected function query($sql){
        
        $result = pg_query($this->dbh, $sql);
        
        if (!$result) {

            echo "Error: " . $sql . "<br>" . pg_last_error($this->dbh);
            die("Fatal error query");
        }

        return $result;
    }
}

?>