<?php

require_once "src/config/database.php";
require_once "query.php";

abstract class Base
{
    const TABELA = "";

    public function count()
    {
        return Database::select(new Query("SELECT COUNT(id) FROM " . static::TABELA));
    }

    public function get(int $id)
    {
        return Database::select(new Query("SELECT * FROM " . static::TABELA . " WHERE id = ?", "i", array($id)));
    }

    public function getAll()
    {
        return Database::select(new Query("SELECT * FROM " . static::TABELA), true);
    }

    public function delete(int $id)
    {
        return Database::execute(new Query("DELETE FROM " . static::TABELA . " WHERE id = ?", "i", array($id)));
    }

    protected function setUser(Query $query, $model)
    {
        if (array_key_exists("idUsuario", $model)) {
            $query->addSql(" AND idUsuario = ?");
            $query->addType("i");
            $query->addParam($model["idUsuario"]);
        }
    }

    protected function setOrderBy(Query $query)
    {
        $query->addSql(" ORDER BY id");
    }

    protected function setPagination(Query $query, $model)
    {
        if (array_key_exists("limit", $model)) {
            $query->addSql(" LIMIT ?");
            $query->addType("i");
            $query->addParam($model["limit"]);

            if (array_key_exists("offset", $model)) {
                $query->addSql(" OFFSET ?");
                $query->addType("i");
                $query->addParam($model["offset"]);
            }
        }
    }
}