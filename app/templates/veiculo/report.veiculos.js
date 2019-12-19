import VeiculoService from '../../services/veiculo.service.js';
import Cookies from '../../utils/cookies.js';

window.onload = function() {
    init();
    bindEvents();
}

function init() {
    setLabels();
    getVeiculos();
}

function setLabels() {
    $("#total").append(Cookies.get("totalVeiculos"));
    $("#usuario").append(Cookies.get("nomeUsuario"));
}

function bindEvents() {
    $('#print-button').on('click', function() {
        window.print();
    });

    $('#close-button').on('click', function() {
        window.location.replace("../veiculos");
    });
}

async function getVeiculos() {
    let params = {
        idUsuario: Cookies.get("idUsuario"),
    }

    if (Cookies.get("filtroDescricao")) {
        params.descricao = Cookies.get("filtroDescricao");

        $("#filer-description").append(
            $("<div>").append(
                $("<span>", { class: "block-quarter" }).append(
                    $("<label>", { text: "Descrição: " + params.descricao }),
                )
            )
        )
    }

    if (Cookies.get("filtroMarca")) {
        params.marca = Cookies.get("filtroMarca");

        $("#filer-description").append(
            $("<div>").append(
                $("<span>", { class: "block-quarter" }).append(
                    $("<label>", { text: "Marca: " + params.marca }),
                )
            )
        )
    }

    if (Cookies.get("filtroComponentes[]")) {
        let selectedValues = Cookies.get("filtroComponentes[]");
        params.componentes = selectedValues.split(",").map(Number);

        $("#filer-description").append(
            $("<label>", { text: "Componentes: " + selectedValues }),
        )
    }

    let response = await VeiculoService.list(params);

    if (response.status != "error") {
        switch (Cookies.get("reportType")) {
            case "marca":
                buildTabelaMarcas(response);
                break;
            case "ano":
                buildTabelaAnos(response);
                break;
            default:
                buildTabelaVeiculos(response);
                break;
        }

        applyMasks();
    }
}

function buildTabelaVeiculos(veiculos) {
    $("#lista_veiculos").html("");

    veiculos.sort(dynamicSort("descricao"));

    $("#lista_veiculos").append(
        $("<table>", { class: "table table-striped", id: "body-veiculos" }).append(
            $("<tbody>").append(
                $("<tr>").append(
                    $("<th>", { text: "Descrição", width: "25%" }),
                    $("<th>", { text: "Placa", width: "10%" }),
                    $("<th>", { text: "RENAVAM", width: "8%" }),
                    $("<th>", { text: "Modelo", width: "7%" }),
                    $("<th>", { text: "Fabricação", width: "7%" }),
                    $("<th>", { text: "Cor", width: "8%" }),
                    $("<th>", { text: "Km", width: "7%" }),
                    $("<th>", { text: "Marca", width: "9%" }),
                    $("<th>", { text: "Preco", width: "8%" }),
                    $("<th>", { text: "FIPE", width: "8%" }),
                ),
            )
        )
    );

    veiculos.forEach(veiculo => {
        $("#body-veiculos tbody").append(
            $("<tr>").append(
                $("<td>", { text: veiculo["descricao"] }),
                $("<td>", { text: veiculo["placa"], class: "placa" }),
                $("<td>", { text: veiculo["codigoRenavam"] }),
                $("<td>", { text: veiculo["anoModelo"] }),
                $("<td>", { text: veiculo["anoFabricacao"] }),
                $("<td>", { text: veiculo["cor"] }),
                $("<td>", { text: veiculo["km"] }),
                $("<td>", { text: veiculo["marca"] }),
                $("<td>", { text: veiculo["preco"], class: "dinheiro td-right" }),
                $("<td>", { text: veiculo["precoFipe"], class: "dinheiro td-right" })
            )
        )
    });
}

function buildTabelaMarcas(veiculos) {
    $("#lista_veiculos").html("");

    veiculos.sort(dynamicSort("descricao"));
    veiculos.sort(dynamicSort("marca"));

    let marca = "";

    veiculos.forEach(veiculo => {
        if (marca != veiculo["marca"]) {
            marca = veiculo["marca"];

            $("#lista_veiculos").append(
                $("<label>", { text: veiculo["marca"] }),
                $("<table>", { class: "table table-striped", id: marca }).append(
                    $("<tbody>").append(
                        $("<tr>").append(
                            $("<th>", { text: "Descrição", width: "25%" }),
                            $("<th>", { text: "Placa", width: "10%" }),
                            $("<th>", { text: "RENAVAM", width: "8%" }),
                            $("<th>", { text: "Modelo", width: "7%" }),
                            $("<th>", { text: "Fabricação", width: "7%" }),
                            $("<th>", { text: "Cor", width: "8%" }),
                            $("<th>", { text: "Km", width: "7%" }),
                            $("<th>", { text: "Preco", width: "8%" }),
                            $("<th>", { text: "FIPE", width: "8%" }),
                        ),
                    )
                )
            );
        }

        $("#" + marca + " tbody").append(
            $("<tr>").append(
                $("<td>", { text: veiculo["descricao"] }),
                $("<td>", { text: veiculo["placa"], class: "placa" }),
                $("<td>", { text: veiculo["codigoRenavam"] }),
                $("<td>", { text: veiculo["anoModelo"] }),
                $("<td>", { text: veiculo["anoFabricacao"] }),
                $("<td>", { text: veiculo["cor"] }),
                $("<td>", { text: veiculo["km"] }),
                $("<td>", { text: veiculo["preco"], class: "dinheiro td-right" }),
                $("<td>", { text: veiculo["precoFipe"], class: "dinheiro td-right" })
            )
        )
    });
}

function buildTabelaAnos(veiculos) {
    $("#lista_veiculos").html("");

    veiculos.sort(dynamicSort("descricao"));
    veiculos.sort(dynamicSort("anoModelo"));

    let anoModelo = "";

    veiculos.forEach(veiculo => {
        if (anoModelo != veiculo["anoModelo"]) {
            anoModelo = veiculo["anoModelo"];

            $("#lista_veiculos").append(
                $("<label>", { text: veiculo["anoModelo"] }),
                $("<table>", { class: "table table-striped", id: anoModelo }).append(
                    $("<tbody>").append(
                        $("<tr>").append(
                            $("<th>", { text: "Descrição", width: "25%" }),
                            $("<th>", { text: "Placa", width: "10%" }),
                            $("<th>", { text: "RENAVAM", width: "8%" }),
                            $("<th>", { text: "Fabricação", width: "7%" }),
                            $("<th>", { text: "Cor", width: "8%" }),
                            $("<th>", { text: "Km", width: "7%" }),
                            $("<th>", { text: "Marca", width: "9%" }),
                            $("<th>", { text: "Preco", width: "8%" }),
                            $("<th>", { text: "FIPE", width: "8%" }),
                        ),
                    )
                )
            );
        }

        $("#" + anoModelo + " tbody").append(
            $("<tr>").append(
                $("<td>", { text: veiculo["descricao"] }),
                $("<td>", { text: veiculo["placa"], class: "placa" }),
                $("<td>", { text: veiculo["codigoRenavam"] }),
                $("<td>", { text: veiculo["anoFabricacao"] }),
                $("<td>", { text: veiculo["cor"] }),
                $("<td>", { text: veiculo["km"] }),
                $("<td>", { text: veiculo["marca"] }),
                $("<td>", { text: veiculo["preco"], class: "dinheiro td-right" }),
                $("<td>", { text: veiculo["precoFipe"], class: "dinheiro td-right" })
            )
        )
    });
}

function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function(a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}