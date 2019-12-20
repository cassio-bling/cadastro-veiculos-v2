<?php

use \Slim\App as App;

require_once "src/controllers/veiculoComponente.controller.php";

$app->group('/veiculoComponentes', function (App $app) {
    $app->get('/{id}', \VeiculoComponenteController::class . ':get');
    $app->put('/{id}', \VeiculoComponenteController::class . ':put');
    $app->delete('/{id}', \VeiculoComponenteController::class . ':delete');
});
