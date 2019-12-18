<?php

require '../vendor/autoload.php';

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
    
    
    
    // if ($req->get )
    // $req->getHeader("HTTP_AUTHORIZATION")[0];
    
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
