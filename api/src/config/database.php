<?php

define('BD_SERVIDOR', 'localhost');
define('BD_USUARIO', 'root');
define('BD_SENHA', 'root');
define('BD_BANCO', 'treinamento');

class Database
{
    public function __construct()
    {
        die('Init function is not allowed');
    }

    private static $connection = null;

    public static function connect()
    {
        if (null == self::$connection) {
            try {
                self::$connection = new mysqli(BD_SERVIDOR, BD_USUARIO, BD_SENHA, BD_BANCO);
                self::$connection->set_charset("utf8");
            } catch (error $e) {
                die($e->getMessage());
            }
        }

        return self::$connection;
    }

    public static function disconnect()
    {
        self::$connection = null;
    }

    public static function select(Query $query, $collection = false)
    {
        try {
            $connection = Database::connect();
            $statment = $connection->prepare($query->getSql());

            $query->getParams();

            if ($query->getParams() != null) {
                $statment->bind_param($query->getTypes(), ...$query->getParams());
            }

            $statment->execute();

            if ($statment->error != null)
                error_log($statment->error);

            if ($collection) {
                return $statment->get_result()->fetch_all(MYSQLI_ASSOC);
            } else {
                return $statment->get_result()->fetch_assoc();
            }
        } catch (error $e) {
            error_log($e->getMessage());
        } finally {
            Database::disconnect();
        }
    }

    public static function execute(Query $query)
    {
        try {
            $connection = Database::connect();
            $statment = $connection->prepare($query->getSql());

            if ($query->getParams() != null) {
                $statment->bind_param($query->getTypes(), ...$query->getParams());
            }

            $statment->execute();

            if ($statment->error != null)
                error_log($statment->error);
                    
            return $statment->insert_id;
        } catch (Exception $e) {
            error_log($e->getMessage());
            return $e;
        } finally {
            Database::disconnect();
        }
    }
}
