<?php

require_once ROOT . "app/core/request.php";

class Dispatcher {
    private $__request;

    public function dispatch() {
        $this->request = new Request();

        switch ($this->request->url) {
        case "":
        case "login":
            require "app/templates/usuario/form.login.html";
            break;
        case "usuarios/create":
            require "app/templates/usuario/form.usuario.html";
            break;
        case "veiculos":
            require "app/templates/veiculo/form.veiculos.html";
            break;
        case "veiculos/create":
        case (preg_match('#' . WEBROOT . 'veiculos/[0-9]*$#', $_SERVER["REQUEST_URI"]) ? true : false):
            require "app/templates/veiculo/form.veiculo.html";
            break;
        case "veiculos/report":
            require "app/templates/veiculo/report.veiculos.html";
            break;
        default:
            break;
        }
    }

}
