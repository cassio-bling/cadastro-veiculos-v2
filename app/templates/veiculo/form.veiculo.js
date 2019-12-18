import VeiculoService from '../../services/veiculo.service.js';
import VeiculoComponenteService from '../../services/veiculoComponente.service.js';
import ComponenteService from '../../services/componente.service.js';
import Cookies from '../../utils/cookies.js';
import Validation from '../../utils/validation.js';
import Layout from '../../utils/layout.js';

window.onload = function() {
    init();
    bindEvents();
}

function init() {
    Layout.createMenu();
    checkMethod();
}

function bindEvents() {
    $('#save-button').on('click', function() {
        if (Validation.validateForm()) {
            let index = document.URL.split('/veiculos/')[1];
            saveVeiculo(index);
        }
    });

    $('#cancel-button').on('click', function() {
        window.location.replace("../veiculos");
    });
}

function checkMethod() {
    let index = document.URL.split('/veiculos/')[1];
    if (index != "create") {
        loadVeiculo(index)
    } else {
        loadComponentes();
        applyMasks();
    }
}

async function loadVeiculo(index) {
    let response = await VeiculoService.get(index);

    if (response.status != "error") {
        Object.keys(response).forEach(function(key) {
            if (document.getElementById(key)) {
                document.getElementById(key).value = response[key];
            }
        });

        loadVeiculoComponentes(index);
        applyMasks();
    }
}

async function loadComponentes() {
    let response = await ComponenteService.get();

    if (response.status != "error") {
        response.forEach(componente => {
            $("#componentes").append(
                $("<span>", { class: "block-quarter" }).append(
                    $("<input>", { type: "checkbox", class: "filtro-checkbox", name: "componentes[]", id: "componente:" + componente["id"], value: componente["id"], checked: componente["checked"] == 1 }),
                    $("<label>", { class: "label-checkbox", for: "componente:" + componente["id"], text: componente["descricao"] }),
                )
            )
        });
    }
}

async function loadVeiculoComponentes(index) {
    let response = await VeiculoComponenteService.get(index);

    if (response.status != "error") {
        response.forEach(componente => {
            $("#componentes").append(
                $("<span>", { class: "block-quarter" }).append(
                    $("<input>", { type: "checkbox", class: "filtro-checkbox", name: "componentes[]", id: "componente:" + componente["id"], value: componente["id"], checked: componente["checked"] == 1 }),
                    $("<label>", { class: "label-checkbox", for: "componente:" + componente["id"], text: componente["descricao"] }),
                )
            )
        });
    }
}

async function saveVeiculo(index) {
    let data = {
        descricao: $("#descricao").val(),
        placa: $("#placa").val(),
        codigoRenavam: $("#codigoRenavam").val(),
        anoModelo: $("#anoModelo").val(),
        anoFabricacao: $("#anoFabricacao").val(),
        cor: $("#cor").val(),
        km: $("#km").val(),
        marca: $("#marca").val(),
        preco: $("#preco").val(),
        precoFipe: $("#precoFipe").val(),
        idUsuario: Cookies.get("idUsuario"),
    };

    if (index == "create") {
        var create = true;
        var response = await VeiculoService.create(data);
        if (response.status != "error") {
            index = response["id"];
        }
    } else {
        var response = await VeiculoService.update(index, data);
    }

    if (response.status != "error") {
        response = await updateVeiculoComponentes(index);

        if (response.status != "error") {
            if (create) {
                alert("Veículo cadastrado com sucesso!");
            } else {
                alert("Veículo atualizaddo com sucesso!");
            }
            //window.location.replace("../veiculos");
        }
    }
}

async function updateVeiculoComponentes(idVeiculo) {
    let arr = Array();

    document.getElementsByName("componentes[]").forEach(element => {
        if (element.checked) {
            arr.push(Number(element.value))
        }
    });

    let data = {
        componentes: arr
    }

    let response = await VeiculoComponenteService.update(idVeiculo, data);

    if (response.status != "error") {
        window.location.replace("../veiculos");
    }
}