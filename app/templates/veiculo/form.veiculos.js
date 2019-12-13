import VeiculoService from '../../services/veiculo.service.js';

var count = 0;

window.onload = function() {
    init();
    bindEvents();
}

function init() {
    createMenu("Master");
    getCount();
    getVeiculos();
    //buildFiltrosComponente();
    createPagination(5);
    getFilters();
}

function bindEvents() {
    $('#button-filter').on('click', function() {
        saveFilters()
    });

    $('#button-cleanFilters').on('click', function() {
        cleanFilters()
    });

    $('#button-create').on('click', function() {
        createVeiculo()
    });

    $('#button-report').on('click', function() {
        cleanFilters()
    });
}

function getCount() {

    var data = {
        idUsuario: 1,
    };

    $.ajax({
        url: apiAddress + "veiculos/count",
        type: "GET",
        data: data,
        datatype: "jsonp",
        success: function(response) {
            var obj = JSON.parse(response);
            $("#total").append(obj["total"]);
        },
        error: function(error) {
            alert("Erro na requisicao");
        }
    });
}

async function getVeiculos() {

    let params = {
        idUsuario: 1,
        list: true,
        limit: 5,
        offset: 3
    }

    await VeiculoService.getListVeiculos(params).then(response => buildTable(response));

}

function buildTable(veiculos) {
    console.log("LOG 2");
    veiculos.forEach(veiculo => {
        $("#lista_veiculos tbody").append(
            $("<tr>").append(
                $("<td >", { text: veiculo["descricao"], width: "40%" }),
                $("<td >", { text: veiculo["placa"], width: "15%" }),
                $("<td >", { text: veiculo["marca"], width: "15%" }),
                $("<td >", { width: "20%" }).append(
                    $("<input >", { type: "button", class: "edit", value: "Editar", id: veiculo["id"] }),
                    $("<input >", { type: "button", class: "delete", value: "Excluir", id: veiculo["id"] }),
                )
            )
        )
    });

    $('.edit').each(function() {
        $(this).on("click", function() {
            editVeiculo(this.id);
        });
    });

    $('.delete').each(function() {
        $(this).on("click", function() {
            editVeiculo(this.id);
        });
    });
}

function buildFiltrosComponente() {
    getComponentes().then(response => {
        obj = JSON.parse(response);
        obj.forEach(componente => {
            $("#componentes").append(
                $("<span>", { class: "block-quarter" }).append(
                    $("<input>", { type: "checkbox", class: "filtro-checkbox", name: "filtroComponentes[]", id: "filtroComponente:" + componente["id"], value: componente["id"] }),
                    $("<label>", { class: "label-checkbox", for: "filtroComponente:" + componente["id"], text: componente["descricao"] }),
                )
            )
        });
    });
}

async function getComponentes() {
    var data = {
        idUsuario: 1,
        list: true,
        limit: 5,
        offset: 3,
    };

    return new Promise((resolve, reject) => {
        $.ajax({
            url: apiAddress + "componentes",
            type: "GET",
            data: data,
            datatype: "jsonp",
            success: resolve,
            error: reject
        });
    });
};

function createVeiculo() {
    window.location.href = "veiculos-create";
}

function editVeiculo(index) {
    window.location.href = "veiculos/" + index;
}

function deleteVeiculo(index) {
    console.log(index);
}