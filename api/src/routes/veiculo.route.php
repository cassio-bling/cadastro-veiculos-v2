<?php

use \Slim\App as App;

require_once "src/controllers/veiculo.controller.php";

$app->group('/veiculos', function (App $app) {
    $app->get('/count', \VeiculoController::class . ':count');
    $app->get('', \VeiculoController::class . ':getAll');
    $app->get('/{id}', \VeiculoController::class . ':get');
    $app->post('', \VeiculoController::class . ':post');
    $app->put('/{id}', \VeiculoController::class . ':put');
    $app->delete('/{id}', \VeiculoController::class . ':delete');
});
