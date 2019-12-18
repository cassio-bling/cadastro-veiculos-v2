<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once "src/classes/veiculoComponente.class.php";

$app->get('/veiculoComponentes/{id}', function (Request $request, Response $response) {
    $veiculoComponente = new VeiculoComponente();
    $result = $veiculoComponente->get($request->getAttribute('id'));    
    return $response->withJson($result, 200)->withHeader('Content-type', 'application/json');
});

$app->put('/veiculoComponentes/{id}', function (Request $request, Response $response) {
    $veiculoComponente = new VeiculoComponente();
    $result = $veiculoComponente->update($request->getAttribute('id'), $request->getParam("componentes"));
    return $response->withJson(array("message" => "Registro atualizado"), 200)->withHeader('Content-type', 'application/json');
});

$app->delete('/veiculoComponentes/{id}', function (Request $request, Response $response) {
    $veiculoComponente = new VeiculoComponente();
    $result = $veiculoComponente->delete($request->getAttribute('id'));
    return $response->withJson(array("message" => "Registro excluído"), 200)->withHeader('Content-type', 'application/json');
});