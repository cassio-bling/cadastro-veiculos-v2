<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once "src/classes/usuario.class.php";
require_once "src/config/token.php";

class UsuarioController
{
    private $usuario;

    function __construct()
    {
        $this->usuario = new Usuario();
    }

    function get(Request $request, Response $response)
    {
        $email = $request->getParam("email");
        $senha = $request->getParam("senha");

        $result = $this->usuario->login($email, $senha);

        if ($result != null) {
            $token = Token::generate($result["id"]);
            $result["token"] = $token;
            unset($result["senha"]);
        } else {
            $result = array("usuario" => "");
        }

        return $response->withJson($result, 200)->withHeader('Content-type', 'application/json');
    }

    function post(Request $request, Response $response)
    {
        $result = $this->usuario->insert($request->getParams());
        return $response->withJson($result, 200)->withHeader('Content-type', 'application/json');
    }
}
