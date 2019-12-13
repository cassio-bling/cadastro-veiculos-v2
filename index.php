<?php

define("WEBROOT", str_replace("index.php", "", $_SERVER["SCRIPT_NAME"]));
define("ROOT", str_replace("index.php", "", $_SERVER["SCRIPT_FILENAME"]));
define("APPNAME", str_replace("index.php", "", $_SERVER["SCRIPT_FILENAME"]));

switch ($_SERVER["REQUEST_URI"]) {
    case WEBROOT:
    case WEBROOT . "login":
        require "app/templates/usuario/login.html";
        break;
    case WEBROOT . "veiculos":
        require "app/templates/veiculo/form.veiculos.html";
        break;
    case WEBROOT . "veiculos/create":
    case (preg_match('#' . WEBROOT . 'veiculos/[0-9]*$#', $_SERVER["REQUEST_URI"]) ? true : false):
        require "app/templates/veiculo/form.veiculo.html";
        break;
    default:
        break;
}
