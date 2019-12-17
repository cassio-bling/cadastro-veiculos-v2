<?php

class Dispatcher
{
    private $request;

    public function dispatch()
    {
        $this->request = new Request();

        $this->parse($this->request->url, $this->request);

        $controller = $this->loadController();

        call_user_func_array([$controller, $this->request->action], $this->request->params);
    }

    public function loadController()
    {
        $name = $this->request->controller . ".controller";
        $file = ROOT . 'controllers/' . $name . '.php';
        require($file);
        $class = $this->request->controller . "Controller";
        $controller = new $class();
        return $controller;
    }

    static public function parse($url, $request)
    {
        $url = trim($url);

        if ($url == WEBROOT) {
            require "app/templates/usuario/form.login.html";
            return header("Location: " . WEBROOT . "veiculo/index");
            
        } else {
            $explode_url = explode('/', $url);
            $explode_url = array_slice($explode_url, 2);

            $request->controller = $explode_url[0];
            $request->action = $explode_url[1];
            $request->params = array_slice($explode_url, 2);
        }
    }

}
