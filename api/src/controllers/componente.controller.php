<?php

use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

require_once "src/classes/componente.class.php";

class ComponenteController {
    private $componente;

    public function __construct() {
        $this->componente = new Componente();
    }

    public function getAll(Request $request, Response $response) {
        $result = $this->componente->getAll();
        return $response->withJson($result, 200)->withHeader('Content-type', 'application/json');
    }
}
