<?php

use \Psr\Http\Message\ServerRequestInterface as Request;

require_once "src/classes/veiculoComponente.class.php";
require_once "routes.php";

$app->get('/veiculoComponentes/{id}', function (Request $request) {
    $veiculoComponente = new VeiculoComponente();
    $result = $veiculoComponente->get($request->getAttribute('id'));
    echo json_encode($result, JSON_PRETTY_PRINT);
    // echo '{"error": {"text": ' . $e->getMessage() . '}';
});

$app->put('/veiculoComponentes/{id}', function (Request $request) {
    $veiculoComponente = new VeiculoComponente();
    $result = $veiculoComponente->update($request->getAttribute('id'), $request->getParam("componentes"));
    echo json_encode("Registro atualizado", JSON_PRETTY_PRINT);
    // echo '{"error": {"text": ' . $e->getMessage() . '}';
});

$app->delete('/veiculoComponentes/{id}', function (Request $request) {
    $veiculoComponente = new VeiculoComponente();
    $result = $veiculoComponente->delete($request->getAttribute('id'));
    echo json_encode("Registro excluído", JSON_PRETTY_PRINT);
    // echo '{"error": {"text": ' . $e->getMessage() . '}';
});