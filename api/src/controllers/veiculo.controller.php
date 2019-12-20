<?php

require_once "src/classes/veiculo.class.php";
require_once "src/models/veiculo.model.php";

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class VeiculoController
{
    private $veiculo;

    public function __construct()
    {
        $this->veiculo = new Veiculo();
    }

    public function count(Request $request, Response $response)
    {
        $result = $this->veiculo->count($request->getParams());
        return $response->withJson($result, 200)->withHeader('Content-type', 'application/json');
    }

    public function getAll(Request $request, Response $response)
    {
        $result = $this->veiculo->getAll($request->getParams());
        return $response->withJson($result, 200)->withHeader('Content-type', 'application/json');
    }

    public function get(Request $request, Response $response)
    {
        $result = $this->veiculo->get($request->getAttribute('id'));
        return $response->withJson($result, 200)->withHeader('Content-type', 'application/json');
    }

    public function post(Request $request, Response $response)
    {
        $result = $this->veiculo->insert($this->map($request->getParams()));
        return $response->withJson(array("id" => $result))->withHeader('Content-type', 'application/json');
    }

    public function put(Request $request, Response $response)
    {
        $result = $this->veiculo->update($request->getAttribute('id'), $this->map($request->getParams()));
        return $response->withJson(array("message" => "Veiculo atualizado"))->withHeader('Content-type', 'application/json');
    }

    public function delete(Request $request, Response $response)
    {
        $result = $this->veiculo->delete($request->getAttribute('id'));
        return $response->withJson(array("message" => "Registro excluído"))->withHeader('Content-type', 'application/json');
    }

    private function map($params)
    {
        $model = new VeiculoModel();
        $model->setDescricao($params['descricao']);
        $model->setPlaca($params['placa']);
        $model->setCodigoRenavam($params['codigoRenavam']);
        $model->setAnoModelo($params['anoModelo']);
        $model->setAnoFabricacao($params['anoFabricacao']);
        $model->setCor($params['cor']);
        $model->setKm($params['km']);
        $model->setMarca($params['marca']);
        $model->setPreco($params['preco']);
        $model->setPrecoFipe($params['precoFipe']);
        $model->setIdUsuario($params['idUsuario']);

        return $model;
    }
}
