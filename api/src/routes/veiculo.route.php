<?php

use \Psr\Http\Message\ServerRequestInterface as Request;

require_once "src/classes/veiculo.class.php";
require_once "routes.php";

$app->get('/veiculos/count', function (Request $request) {
    $veiculo = new Veiculo();
    $result = $veiculo->count($request->getParams());
    echo json_encode($result, JSON_PRETTY_PRINT);
    // echo '{"error": {"text": ' . $e->getMessage() . '}';
});

$app->get('/veiculos', function (Request $request) {
    $veiculo = new Veiculo();
    $result = $veiculo->getAll($request->getParams());
    echo json_encode($result, JSON_PRETTY_PRINT);
    // echo '{"error": {"text": ' . $e->getMessage() . '}';
});

$app->get('/veiculos/{id}', function (Request $request) {
    $veiculo = new Veiculo();
    $result = $veiculo->get($request->getAttribute('id'));
    echo json_encode($result, JSON_PRETTY_PRINT);
});

$app->post('/veiculos', function (Request $request) {
    $veiculo = new Veiculo();
    $result = $veiculo->insert($request->getParams());
    echo json_encode($result, JSON_PRETTY_PRINT);

    //     echo '{"notice": {"text": "Customer Added"}';
    // } catch (PDOException $e) {
    //     echo '{"error": {"text": ' . $e->getMessage() . '}';
    // }
});

$app->put('/veiculos/{id}', function (Request $request) {
    $veiculo = new Veiculo();
    $result = $veiculo->update($request->getAttribute('id'), $request->getParams());
    echo json_encode("Veiculo atualizado", JSON_PRETTY_PRINT);
    //     echo '{"notice": {"text": "Customer Updated"}';
    // } catch (PDOException $e) {
    //     echo '{"error": {"text": ' . $e->getMessage() . '}';
    // }
});

$app->delete('/veiculos/{id}', function (Request $request) {
    $veiculo = new Veiculo();
    $result = $veiculo->delete($request->getAttribute('id'));
    echo json_encode($result, JSON_PRETTY_PRINT);

    //     echo '{"notice": {"text": "Customer Deleted"}';
    // } catch (PDOException $e) {
    //     echo '{"error": {"text": ' . $e->getMessage() . '}';
    // }
});
