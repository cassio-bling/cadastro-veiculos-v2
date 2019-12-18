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

    if (Cookies.get("filtroMarca")) {
        params.marca = Cookies.get("filtroMarca");
    }

    if (Cookies.get("filtroDescricao")) {
        params.descricao = Cookies.get("filtroDescricao");
    }

    if (Cookies.get("filtroComponentes[]")) {
        let selectedValues = Cookies.get("filtroComponentes[]");
        params.componentes = selectedValues.split(",").map(Number);
    }

    let response = await VeiculoService.list(params);

    if (response.status != "error") {
        buildTabelaVeiculos(response);
        applyMasks();
    }
}

function buildTabelaVeiculos(veiculos) {
    $("#lista_veiculos tbody").html("");

    veiculos.forEach(veiculo => {
        $("#lista_veiculos tbody").append(
            $("<tr>").append(
                $("<td>", { text: veiculo["descricao"], width: "25%" }),
                $("<td>", { text: veiculo["placa"], width: "10%", class: "placa" }),
                $("<td>", { text: veiculo["codigoRenavam"], width: "8%" }),
                $("<td>", { text: veiculo["anoModelo"], width: "7%" }),
                $("<td>", { text: veiculo["anoFabricacao"], width: "7%" }),
                $("<td>", { text: veiculo["cor"], width: "8%" }),
                $("<td>", { text: veiculo["km"], width: "7%" }),
                $("<td>", { text: veiculo["marca"], width: "9%" }),
                $("<td>", { text: veiculo["preco"], width: "8%", class: "dinheiro td-right" }),
                $("<td>", { text: veiculo["precoFipe"], width: "8%", class: "dinheiro td-right" })
            )
        )
    });
}