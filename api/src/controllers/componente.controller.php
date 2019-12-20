<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once "src/classes/componente.class.php";

class ComponenteController
{
    private $componente;

    function __construct()
    {
        $this->componente = new Componente();
    }

    function getAll(Request $request, Response $response)
    {
        $result = $this->componente->getAll();
        return $response->withJson($result, 200)->withHeader('Content-type', 'application/json');
    }
}
