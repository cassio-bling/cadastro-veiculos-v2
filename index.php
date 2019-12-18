<?php
define("WEBROOT", str_replace("index.php", "", $_SERVER["SCRIPT_NAME"]));
define("ROOT", str_replace("index.php", "", $_SERVER["SCRIPT_FILENAME"]));
define("APPNAME", str_replace("index.php", "", $_SERVER["SCRIPT_FILENAME"]));

switch ($_SERVER["REQUEST_URI"]) {
    case WEBROOT:
    case WEBROOT . "login":
        require "app/templates/usuario/form.login.html";
        break;
    case WEBROOT . "usuarios/create":
        require "app/templates/usuario/form.usuario.html";
        break;
    case WEBROOT . "veiculos":
        require "app/templates/veiculo/form.veiculos.html";
        break;
    case WEBROOT . "veiculos/create":
    case (preg_match('#' . WEBROOT . 'veiculos/[0-9]*$#', $_SERVER["REQUEST_URI"]) ? true : false):
        require "app/templates/veiculo/form.veiculo.html";
        break;
    case WEBROOT . "veiculos/report":
        require "app/templates/veiculo/report.veiculos.html";
        break;
    default:
        break;
}

// require(ROOT . "app/core/dispatcher.php");

// $dispatch = new Dispatcher();
// $dispatch->dispatch();
