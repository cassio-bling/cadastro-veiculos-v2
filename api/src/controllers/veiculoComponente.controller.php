<?php

use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

require_once "src/classes/veiculoComponente.class.php";

class VeiculoComponenteController {
    private $veiculoComponente;

    public function __construct() {
        $this->veiculoComponente = new VeiculoComponente();
    }

    public function get(Request $request, Response $response) {
        $result = $this->veiculoComponente->get($request->getAttribute('id'));
        return $response->withJson($result, 200)->withHeader('Content-type', 'application/json');
    }

    public function put(Request $request, Response $response) {
        $this->veiculoComponente->update($request->getAttribute('id'), $request->getParam("componentes"));
        return $response->withJson(array("message" => "Registro atualizado"), 200)->withHeader('Content-type', 'application/json');
    }

    public function delete(Request $request, Response $response) {
        $this->veiculoComponente->delete($request->getAttribute('id'));
        return $response->withJson(array("message" => "Registro excluído"), 200)->withHeader('Content-type', 'application/json');
    }
}
