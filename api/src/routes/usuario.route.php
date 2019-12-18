<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once "src/classes/usuario.class.php";

$app->get('/usuarios', function (Request $request, Response $response) {
    $email = $request->getParam("email");
    $senha = $request->getParam("senha");

    $usuario = new Usuario();
    $result = $usuario->login($email, $senha);

    return $response->withJson($result, 200)->withHeader('Content-type', 'application/json');
});

$app->post('/usuarios', function (Request $request, Response $response) {
    $usuario = new Usuario();
    $result = $usuario->insert($request->getParams());
    return $response->withJson($result, 200)->withHeader('Content-type', 'application/json');
});
