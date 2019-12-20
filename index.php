<?php

define("WEBROOT", str_replace("index.php", "", $_SERVER["SCRIPT_NAME"]));
define("ROOT", str_replace("index.php", "", $_SERVER["SCRIPT_FILENAME"]));
define("APPNAME", str_replace("index.php", "", $_SERVER["SCRIPT_FILENAME"]));

require_once ROOT . "app/core/dispatcher.php";

$dispatch = new Dispatcher();
$dispatch->dispatch();
