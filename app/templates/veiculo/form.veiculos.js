import VeiculoService from '../../services/veiculo.service.js';
import VeiculoComponenteService from '../../services/veiculoComponente.service.js';
import ComponenteService from '../../services/componente.service.js';
import Filters from '../../utils/filters.js';
import Cookies from '../../utils/cookies.js';
import Layout from '../../utils/layout.js';

const LIMIT = 10;

window.onload = function() {
    init();
    bindEvents();
}

async function init() {
    Layout.createMenu();
    buildFiltroComponentes();
    Layout.initPage();
    refresh();
}

function bindEvents() {
    $('#filter-button').on('click', function() {
        Filters.set();
        Cookies.set("page", 1);
        refresh();
    });

    $('#cleanFilters-button').on('click', function() {
        Filters.clear();
        Cookies.set("page", 1);
        refresh();
    });

    $('#create-button').on('click', function() {
        createVeiculo()
    });

    $('#report-button').on('click', function() {
        reportVeiculo()
    });
}

function refresh() {
    getCount();
    getVeiculos();
}

async function getCount() {
    let params = {
        idUsuario: Cookies.get("idUsuario")
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

    let response = await VeiculoService.count(params);

    if (response.status != "error") {
        document.getElementById('total').innerHTML = response["total"];
        Cookies.set("totalVeiculos", response["total"]);
        Layout.createPagination(Math.ceil(response["total"] / LIMIT), setPage);
    }
}

function setPage(index) {
    switch (index) {
        case "<<":
            {
                Cookies.set("page", 1);
                break;
            }
        case "<":
            {
                let p = Number(Cookies.get("page")) - 1;
                Cookies.set("page", p < 1 ? 1 : p);
                break;
            }
        case ">":
            {
                let p = Number(Cookies.get("page")) + 1;
                let lastP = Math.ceil(Cookies.get("totalVeiculos") / LIMIT);
                Cookies.set("page", p > lastP ? lastP : p);
                break;
            }
        case ">>":
            {
                Cookies.set("page", Math.ceil(Cookies.get("totalVeiculos") / LIMIT));
                break;
            }
        default:
            {
                Cookies.set("page", index);
                break;
            }
    }

    Layout.manageSelectedPage();
    getVeiculos();
}

async function getVeiculos() {
    let params = {
        idUsuario: Cookies.get("idUsuario"),
        list: true,
        limit: LIMIT,
        offset: (Cookies.get("page") - 1) * LIMIT,
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
                    $("<input> ", { type: "button", class: "edit", value: "Editar", id: veiculo["id"] }),
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

    if (componentes.status != "error") {
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
        let response = await VeiculoComponenteService.remove(index);
        if (response.status != "error") {
            response = await VeiculoService.remove(index);
            if (response.status != "error") {
                refresh();
            }
        }
    }
}