<?php

use \Slim\App as App;

require_once "src/controllers/usuario.controller.php";

$app->group('/usuarios', function (App $app) {
    $app->get('', \UsuarioController::class . ':get');
    $app->post('', \UsuarioController::class . ':post');
});
