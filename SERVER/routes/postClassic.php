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


    if(isset($_POST['position']) && isset($_POST['name']) && isset($_POST['stage']) && isset($_POST['score'])) {

        $newScore['author'] = $_POST['author'];
        $newScore['title'] = $_POST['title'];
        $newScore['category'] = $_POST['category'];
        $newScore['year'] = $_POST['year'];
        $newScore['isbn'] = $_POST['isbn'];

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