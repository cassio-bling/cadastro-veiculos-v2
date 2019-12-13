<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once "src/classes/componente.class.php";
require_once "routes.php";

$app->get('/componentes', function (Request $request) {
    $veiculo = new Componente();
    $result = $veiculo->getAll();
    echo json_encode($result, JSON_PRETTY_PRINT);
    // echo '{"error": {"text": ' . $e->getMessage() . '}';
});