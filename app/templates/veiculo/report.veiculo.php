<!DOCTYPE html>
<html lang="pt-br">

<head>
    <title>Relatório de veículos</title>
    <link rel="stylesheet" type="text/css" href=<?php echo WEBROOT . "templates/layouts/styles/print.css" ?>>
</head>

<body>
    <form method="post">
        <div>
            <span class="block-full">
                <h3 class="page-header">Relatório de veículos</h3>
                <label class="label-right">Total de registros: <?php echo $_SESSION["count"] ?></label>
                <label>Usuário: <?php echo $_SESSION["nomeUsuario"] ?></label>
            </span>
        </div>
        <div <?php if (empty($_SESSION["filtros"]->getDescricao())) echo 'hidden' ?>>
            <span class="block-quarter">
                <label>Descrição: <?php echo $_SESSION["filtros"]->getDescricao(); ?> </label>
            </span>
        </div>
        <div <?php if (empty($_SESSION["filtros"]->getMarca())) echo 'hidden' ?>>
            <span class="block-quarter">
                <label>Marca: <?php echo $_SESSION["filtros"]->getMarca(); ?> </label>
            </span>
        </div>
        <table class="table table-striped">
            <thead>
                <th>Descrição</th>
                <th>Placa</th>
                <th>RENAVAM</th>
                <th>Modelo</th>
                <th>Fabricação</th>
                <th>Cor</th>
                <th>KM</th>
                <th>Marca</th>
                <th>Preço</th>
                <th>FIPE</th>
            </thead>
            <?php foreach ($veiculos as $veiculo) : ?>
                <tr>
                    <td width="25%"><?php echo $veiculo["descricao"] ?></td>
                    <td class="placa" width="10%"><?php echo $veiculo["placa"] ?></td>
                    <td width="8%"><?php echo $veiculo["codigoRenavam"] ?></td>
                    <td class="td-center" width="7%"><?php echo $veiculo["anoModelo"] ?></td>
                    <td class="td-center" width="7%"><?php echo $veiculo["anoFabricacao"] ?></td>
                    <td width="8%"><?php echo $veiculo["cor"] ?></td>
                    <td width="7%"><?php echo $veiculo["km"] ?></td>
                    <td width="9%"><?php echo $veiculo["marca"] ?></td>
                    <td class="dinheiro td-right" width="8%"><?php echo $veiculo["preco"] ?></td>
                    <td class="dinheiro td-right" width="8%"><?php echo $veiculo["precoFipe"] ?></td>
                </tr>
            <?php endforeach ?>
        </table>
        <p>
            <div>
                <span class="block-half">
                    <input type="button" class="print" value="Imprimir" name="print" onclick="javascript:window.print()">
                    <input type="button" class="cancel" value="Fechar" name="cancel" formnovalidate onclick="window.location.href = '<?php echo WEBROOT . 'veiculo/index'; ?>'">
                </span>
            </div>
        </p>
    </form>
</body>

</html>