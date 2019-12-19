<?php

require '../vendor/autoload.php';
require_once "src/config/token.php";

$app = new \Slim\App();

$container = $app->getContainer();

$container['errorHandler'] = function ($c) {
    return function ($request, $response, $exception) use ($c) {
        error_log($exception);
        return $c['response']->withStatus(500)
            ->withHeader('Content-Type', 'text/html')
            ->write($exception->getMessage());
    };
};

$container['phpErrorHandler'] = function ($c) {
    return function ($request, $response, $error) use ($c) {
        error_log($error);
        return $c['response']->withStatus(500)
            ->withHeader('Content-Type', 'text/html')
            ->write($error->getMessage());
    };
};

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {

    if ($req->getUri()->getPath() != "usuarios") {
        if (!$req->getHeader("HTTP_AUTHORIZATION") || !$req->getHeader("HTTP_AUTHORIZATION")[0]) {
            throw new Exception("Token not found");
        } else {
            $token = $req->getHeader("HTTP_AUTHORIZATION")[0];
            if (!Token::validate($token)) {
                throw new Exception("The token is invalid token or expirated");
            }
        }
    }

    $response = $next($req, $res);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

require 'src/routes/veiculo.route.php';
require 'src/routes/usuario.route.php';
require 'src/routes/componente.route.php';
require 'src/routes/veiculoComponente.route.php';

$app->run();
