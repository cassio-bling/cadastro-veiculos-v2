<?php

class VeiculoComponente extends Base
{
    public function get(int $idVeiculo)
    {
        $query = new Query();
        $query->setSql("SELECT A.id, A.descricao, CASE WHEN B.idComponente IS NOT NULL THEN 1 ELSE 0 END AS checked
            FROM componente AS A
            LEFT JOIN veiculo_componente AS B ON A.id = B.idComponente AND B.idVeiculo = ?
            ORDER BY A.id");
        $query->setTypes("i");
        $query->addParam($idVeiculo);
        return Database::select($query, true);
    }

    public function update(int $idVeiculo, $componentes)
    {
        $this->delete($idVeiculo);

        $in = str_repeat("?,", count($componentes) - 1) . "?";
        $types = str_repeat("i", count($componentes));

        $query = new Query();
        $query->setSql("INSERT INTO veiculo_componente (idVeiculo, idComponente) SELECT ?, id FROM componente WHERE id IN ($in)");
        $query->setTypes("i" . $types);
        $query->addParam($idVeiculo);
        $query->addParam($componentes);
        return Database::execute($query);
    }

    public function delete(int $idVeiculo)
    {
        $query = new Query();
        $query->setSql("DELETE FROM veiculo_componente WHERE idVeiculo = ?");
        $query->setTypes("i");
        $query->addParam($idVeiculo);
        Database::execute($query);
    }
}