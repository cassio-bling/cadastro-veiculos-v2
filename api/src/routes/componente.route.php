<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once "src/classes/componente.class.php";

$app->get('/componentes', function (Request $request, Response $response) {
    $veiculo = new Componente();
    $result = $veiculo->getAll();
    return $response->withJson($result, 200)->withHeader('Content-type', 'application/json');
});
