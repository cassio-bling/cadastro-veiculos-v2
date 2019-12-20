<?php

class Request {
    public $url;

    public function __construct() {
        $this->url = str_replace(WEBROOT, "", $_SERVER["REQUEST_URI"]);
    }
}
