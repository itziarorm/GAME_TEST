<?php

    require_once "ModelBase.php";

    class Score extends ModelBase{
        
        public function __construct(){
            
            //inicializar el nombre de la tabla
            $this->table_name = "game_scores";
            
            //llamar al constructor de la clase ModelBase
            parent::__construct();
            
        }
    }

?>