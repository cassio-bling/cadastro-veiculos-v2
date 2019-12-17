<?php

use \Psr\Http\Message\ServerRequestInterface as Request;

require_once "src/classes/veiculo.class.php";
require_once "src/models/veiculo.model.php";
require_once "routes.php";

$app->get('/veiculos/count', function (Request $request) {
    $veiculo = new Veiculo();
    $result = $veiculo->count($request->getParams());
    echo json_encode($result, JSON_PRETTY_PRINT);
});

$app->get('/veiculos', function (Request $request) {
    $veiculo = new Veiculo();
    $result = $veiculo->getAll($request->getParams());
    echo json_encode($result, JSON_PRETTY_PRINT);
});

$app->get('/veiculos/{id}', function (Request $request) {
    $veiculo = new Veiculo();
    $result = $veiculo->get($request->getAttribute('id'));
    echo json_encode($result, JSON_PRETTY_PRINT);
});

$app->post('/veiculos', function (Request $request) {
    $veiculo = new Veiculo();
    $result = $veiculo->insert(map($request->getParams()));
    echo json_encode(array("id" => $result), JSON_PRETTY_PRINT);
});

$app->put('/veiculos/{id}', function (Request $request) {
    $veiculo = new Veiculo();
    $result = $veiculo->update($request->getAttribute('id'), map($request->getParams()));
    echo json_encode("Veiculo atualizado", JSON_PRETTY_PRINT);
});

$app->delete('/veiculos/{id}', function (Request $request) {
    $veiculo = new Veiculo();
    $result = $veiculo->delete($request->getAttribute('id'));
    echo json_encode("registro excluído", JSON_PRETTY_PRINT);
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
