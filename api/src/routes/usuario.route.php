<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once "src/classes/usuario.class.php";
require_once "routes.php";

$app->get('/usuarios', function (Request $request) {    
    $email = $request->getParam("email");
    $senha = $request->getParam("senha");

    $usuario = new Usuario();
    $result = $usuario->login($email, $senha);

    echo json_encode($result, JSON_PRETTY_PRINT);
    // echo '{"error": {"text": ' . $e->getMessage() . '}';
});

$app->post('/usuarios', function (Request $request, Response $response) {
    $usuario = new Usuario();
    $result = $usuario->insert($request->getParams());
    echo json_encode($result, JSON_PRETTY_PRINT);

    //     echo '{"notice": {"text": "Customer Added"}';
    // } catch (PDOException $e) {
    //     echo '{"error": {"text": ' . $e->getMessage() . '}';
    // }
});