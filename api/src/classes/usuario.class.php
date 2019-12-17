<?php

require_once "base.class.php";

class Usuario extends Base
{
    const TABELA = "usuario";

    public function checkEmail($email)
    {
        return Database::select(new Query("SELECT COUNT(id) AS result FROM " . self::TABELA . " WHERE email = ?", "s"), $email);
    }

    public function login($email, $senha)
    {
        $query = new Query("SELECT * FROM " . self::TABELA . " WHERE email = ? and senha = ?", "ss", array($email, $senha));

        return Database::select($query);
    }

    public function insert($model)
    {
        $query = new Query("INSERT INTO " . self::TABELA . " (nome, email, senha) VALUES (?, ?, ?)", "sss", $model);

        return Database::execute($query)->inserted_id;
    }

    public function update($model)
    {
        $query = new Query("UPDATE " . self::TABELA . " SET nome = ?, email = ?, senha = ?");
        $query->setTypes("sss");
        $query->setParams($model);

        return Database::execute($query);
    }
}