<?php

use \Slim\App as App;

require_once "src/controllers/componente.controller.php";

$app->group('/componentes', function (App $app) {
    $app->get('', \ComponenteController::class . ':getAll');    
});
