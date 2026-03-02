<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");
    header("Access-Control-Allow-Methods: GET, POST");

    require_once (__DIR__."/../controller/Controller.php");

    $result = $score->getAll();
    echo json_encode($result);
?>