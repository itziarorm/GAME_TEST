<?php 
require_once (__DIR__."/../db/Conexion.php");

class ModelBase extends Conexion{

    //protected $conexion;
    protected $table_name;

    function __construct(){
        $this->dbh = parent::getInstance()->dbh;
    }
    
    //obtiene todos los elementos de la tabla
    public function getAll(){
        
        $query = "SELECT * FROM {$this->table_name}";
        
        $result = pg_query($this->dbh, $query); //$this->conexion->query($query);
        
        //creamos array sociativo
        $array = $this->createArray($result);
        
        pg_free_result($result); //$result->close();
        return $array;

    }

    function getAllByColumn($search_name,$search_value){
        
        $query = $this->selectDB($this->table_name, "*", $search_name, $search_value);
        $result = pg_query($this->dbh, $query); //$this->conexion->query($query);
        
        //creamos array sociativo
        $array = $this->createArray($result);
        
        pg_free_result($result);
        return $array;
    }

    function addNew($array){
        
        $query = $this->insertDB($this->table_name, $array);
        
        $result = pg_query($this->dbh, $query); //$this->conexion->query($query);
        
        return $result;
    }

    protected function createArray($data){
        
        while ($row = pg_fetch_assoc($data)){              //while($row = $data->fetch_array(MYSQLI_ASSOC)){
            
        //AÑADIR SIGUIENTE FILA
            $array[] = $row;
        }

        return $array;
    }

    protected function selectDB($table, $columns = "*", $name = "", $value = ""){
        
        $query = "SELECT $columns FROM $table";
        if($name != "" && $value != ""){

            $query .= " WHERE $name = '$value'";
        }

        return $query;
    }

    protected function insertDB($table, $array){
        
        foreach($array as $name => $value){

            $insert_name[] = $name;
            $insert_value[] = "'" . pg_escape_string($this->dbh, $value) . "'";
        }

        $query = "INSERT INTO $table (";

        $num_elem = count($insert_name);
        for($i = 0; $i < $num_elem; ++$i){
            
        $query .= "$insert_name[$i]";
            if($i != $num_elem - 1){

                $query .= ", ";

            }else{

                $query .= ") ";
            }
        }

        $query .= "VALUES (";
        for($i = 0; $i < $num_elem; ++$i){
            
            $query .= "$insert_value[$i]";
            if($i != $num_elem - 1){

                $query .= ", ";

            }else{

                $query .= ") ";
            }
        }

        return $query;
    }
}

?>