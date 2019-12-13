<?php

require '../vendor/autoload.php';

$app = new \Slim\App;

require 'src/routes/veiculo.route.php';
require 'src/routes/usuario.route.php';
require 'src/routes/componente.route.php';
require 'src/routes/veiculoComponente.route.php';

$app->run();
