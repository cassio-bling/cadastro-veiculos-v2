<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once "src/classes/veiculo.class.php";
require_once "src/models/veiculo.model.php";

$app->get('/veiculos/count', function (Request $request, Response $response) {
    $veiculo = new Veiculo();
    $result = $veiculo->count($request->getParams());    
    return $response->withJson($result, 200)->withHeader('Content-type', 'application/json');
});

$app->get('/veiculos', function (Request $request, Response $response) {
    $veiculo = new Veiculo();
    $result = $veiculo->getAll($request->getParams());
    return $response->withJson($result, 200)->withHeader('Content-type', 'application/json');
});

$app->get('/veiculos/{id}', function (Request $request, Response $response) {
    $veiculo = new Veiculo();
    $result = $veiculo->get($request->getAttribute('id'));
    return $response->withJson($result, 200)->withHeader('Content-type', 'application/json');
});

$app->post('/veiculos', function (Request $request, Response $response) {
    $veiculo = new Veiculo();
    $result = $veiculo->insert(map($request->getParams()));
    return $response->withJson(array("id" => $result))->withHeader('Content-type', 'application/json');
});

$app->put('/veiculos/{id}', function (Request $request, Response $response) {
    $veiculo = new Veiculo();
    $result = $veiculo->update($request->getAttribute('id'), map($request->getParams()));
    return $response->withJson(array("message" => "Veiculo atualizado"))->withHeader('Content-type', 'application/json');
});

$app->delete('/veiculos/{id}', function (Request $request, Response $response) {
    $veiculo = new Veiculo();
    $result = $veiculo->delete($request->getAttribute('id'));
    return $response->withJson(array("message" => "Registro excluído"))->withHeader('Content-type', 'application/json');    
});

function map($params)
{
    $model = new VeiculoModel();
    $model->setDescricao($params['descricao']);
    $model->setPlaca($params['placa']);
    $model->setCodigoRenavam($params['codigoRenavam']);
    $model->setAnoModelo($params['anoModelo']);
    $model->setAnoFabricacao($params['anoFabricacao']);
    $model->setCor($params['cor']);
    $model->setKm($params['km']);
    $model->setMarca($params['marca']);
    $model->setPreco($params['preco']);
    $model->setPrecoFipe($params['precoFipe']);
    $model->setIdUsuario($params['idUsuario']);

    return $model;
}
