<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");

    require_once (__DIR__."/../controller/Controller.php");

    //test post route
    //$_POST['author'] = "James Cameron";
    //$_POST['title'] = "Aliens 2";
    ///$_POST['category'] = "Thriller";
    //$_POST['year'] = "1998";
    //$_POST['isbn'] = "2734535665790";


    if(isset($_POST['playerName']) && isset($_POST['highScore']) && isset($_POST['currentLevel'])) {

        $newScore['playerName'] = $_POST['playerName'];
        $newScore['highScore'] = $_POST['highScore'];
        $newScore['currentLevel'] = $_POST['currentLevel'];

        $returnValue = $score->addNew($newScore);

        if($returnValue == FALSE){

            echo "Error en nuevo elemento BD";

        }else{

            echo json_encode($newScore);
        }

    }else{

        die ("Missing data");
    }
?>