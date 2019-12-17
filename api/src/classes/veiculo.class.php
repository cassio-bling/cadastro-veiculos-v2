<?php

require_once "base.class.php";

class Veiculo extends Base
{
    const TABELA = "veiculo";

    public function count($model = null)
    {
        $query = new Query("SELECT COUNT(id) as total FROM " . static::TABELA);

        $this->checkFilters($query, $model);

        return Database::select($query);
    }

    public function getAll($model = null)
    {
        $query = new Query($model);

        if ($model != null && array_key_exists("list", $model) && $model["list"] == true) {
            unset($model["list"]);
            $query->setSql("SELECT id, descricao, placa, marca FROM " . static::TABELA);
        } else {
            $query->setSql("SELECT * FROM " . static::TABELA);
        }

        $this->checkFilters($query, $model);
        $this->setOrderBy($query);
        $this->setPagination($query, $model);

        return Database::select($query, true);
    }

    public function insert($model)
    {
        $query = new Query("INSERT INTO " . self::TABELA . " (descricao, placa, codigoRenavam, anoModelo, anoFabricacao, cor, km, marca, preco, precoFipe, idUsuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $query->setTypes("sssiisisddi");
        $query->setParams($model);

        return Database::execute($query)->inserted_id;
    }

    public function update(int $id, $model)
    {
        $query = new Query("UPDATE " . self::TABELA . " SET descricao = ?, placa = ?, codigoRenavam = ?, anoModelo = ?, anoFabricacao = ?, cor = ?, km = ?, marca = ?, preco = ?, precoFipe = ?, idUsuario = ? WHERE id = ?");
        $query->setTypes("sssiisisddii");
        $query->setParams($this->parse($model));
        $query->addParam($id);

        return Database::execute($query);
    }

    private function checkFilters(Query $query, $model)
    {
        if ($model == null) {
            return;
        }

        $query->addSql(" WHERE true");

        $this->setUser($query, $model);
        $this->setModelFilters($query, $model);
    }

    private function setModelFilters(Query $query, $model)
    {
        if (array_key_exists("descricao", $model)) {
            $query->addSql(" AND descricao LIKE ?");
            $query->addType("s");
            $query->addParam('%' . $model["descricao"] . '%');
        }

        if (array_key_exists("marca", $model)) {
            $query->addSql(" AND marca = ?");
            $query->addType("s");
            $query->addParam($model["marca"]);
        }

        if (array_key_exists("componentes", $model)) {
            $componentes = array_map('intval', explode(',', $model["componentes"]));

            $in = str_repeat("?,", count($componentes) - 1) . "?";
            $query->addSql(" AND (SELECT COUNT(idVeiculo) FROM veiculo_componente WHERE idComponente IN ($in) AND id = idVeiculo) = ?");
            $query->addType(str_repeat("i", count($componentes)) . "i");

            foreach ($componentes as $componente) {
                $query->addParam($componente);
            }

            $query->addParam(count($componentes));
        }
    }

    private function parse($model)
    {
        $data = array(
            $model["descricao"],
            $model["placa"],
            $model["codigoRenavam"],
            $model["anoModelo"],
            $model["anoFabricacao"],
            $model["cor"],
            $model["km"],
            $model["marca"],
            $model["preco"],
            $model["precoFipe"],
            $model["idUsuario"]
        );

        return $data;
    }
}