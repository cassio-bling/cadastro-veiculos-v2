import VeiculoService from '../../services/veiculo.service.js';
import VeiculoComponenteService from '../../services/veiculoComponente.service.js';
import ComponenteService from '../../services/componente.service.js';
import Filters from '../../utils/filters.js';
import Cookies from '../../utils/cookies.js';
import Layout from '../../utils/layout.js';

window.onload = function() {
    init();
    bindEvents();
}

function init() {
    Layout.createMenu();
    Layout.createPagination(5);
    getCount();
    getVeiculos();
    buildFiltroComponentes();
}

function bindEvents() {
    $('#button-filter').on('click', function() {
        Filters.set();
        getVeiculos();
    });

    $('#button-cleanFilters').on('click', function() {
        Filters.clear();
        getVeiculos();
    });

    $('#button-create').on('click', function() {
        createVeiculo()
    });

    $('#button-report').on('click', function() {
        reportVeiculo()
    });
}

async function getCount() {
    let params = {
        idUsuario: Cookies.get("idUsuario")
    }

    let response = await VeiculoService.count(params);

    if (response.status != "error") {
        $("#total").append(response["total"]);
        Cookies.set("totalVeiculos", response["total"]);
    }
}

async function getVeiculos() {
    if (!Cookies.get("offset")) {
        Cookies.set("offset", 0);
    }

    let params = {
        idUsuario: Cookies.get("idUsuario"),
        list: true,
        limit: 10,
        offset: Cookies.get("offset"),
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
                $("<td>", { text: veiculo["descricao"], width: "40%" }),
                $("<td>", { text: veiculo["placa"], width: "15%", class: "placa" }),
                $("<td>", { text: veiculo["marca"], width: "15%" }),
                $("<td>", { width: "20%" }).append(
                    $("<input>", { type: "button", class: "edit", value: "Editar", id: veiculo["id"] }),
                    $("<input>", { type: "button", class: "delete", value: "Excluir", id: veiculo["id"] }),
                )
            )
        )
    });

    $('.edit').on("click", function() {
        editVeiculo(this.id);
    });

    $('.delete').on("click", function() {
        deleteVeiculo(this.id);
    });
}

async function buildFiltroComponentes() {
    let componentes = await ComponenteService.get();

    componentes.forEach(componente => {
        $("#componentes").append(
            $("<span>", { class: "block-quarter" }).append(
                $("<input>", { type: "checkbox", class: "filtro-checkbox", name: "filtroComponentes[]", id: "filtroComponente:" + componente["id"], value: componente["id"] }),
                $("<label>", { class: "label-checkbox", for: "filtroComponente:" + componente["id"], text: componente["descricao"] }),
            )
        )
    });

    Filters.get();
}

function createVeiculo() {
    window.location.href = "veiculos/create";
}

function reportVeiculo() {
    window.location.href = "veiculos/report";
}

function editVeiculo(index) {
    window.location.href = "veiculos/" + index;
}

async function deleteVeiculo(index) {
    if (confirm("Confirmar exclusão do registro?")) {
        await VeiculoComponenteService.remove(index);
        await VeiculoService.remove(index);
        getVeiculos();
    }
}