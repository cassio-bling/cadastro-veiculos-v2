<?php

class Query
{
    private $sql;
    private $types;
    private $params;

    function __construct($sql = "", $types = "", $params = array())
    {
        $this->sql = $sql;
        $this->types = $types;
        $this->params = $params;
    }

    public function setSql($sql)
    {
        $this->sql = $sql;
    }

    public function addSql($sql)
    {
        $this->sql .= $sql;
    }

    public function getSql()
    {
        return $this->sql;
    }

    public function setTypes($types)
    {
        $this->types = $types;
    }

    public function addType($types)
    {
        $this->types .= $types;
    }

    public function getTypes()
    {
        return $this->types;
    }

    public function setParams($params)
    {
        $this->params = $params;
    }

    public function addParam($param)
    {
        array_push($this->params, $param);
    }

    public function getParams()
    {
        return $this->params;
    }
}
