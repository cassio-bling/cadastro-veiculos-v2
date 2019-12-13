var count = 0;

window.onload = function() {
    init();
    bindEvents();
}

function init() {
    createMenu("Master");
    checkMethod();
}

function bindEvents() {
    $('#button-save').on('click', function() {
        if (validateForm()) {
            var index = document.URL.split('/veiculos/')[1];
            saveVeiculo(index);
        }
    });

    $('#button-cancel').on('click', function() {
        window.location.href = "veiculos";
    });
}

function checkMethod() {
    var index = document.URL.split('/veiculos/')[1];
    if (index != "create") {
        loadVeiculo(index)
    } else {
        getComponentes().then(response => {
            componentes = JSON.parse(response);
            componentes.forEach(componente => {
                $("#componentes").append(
                    $("<span>", { class: "block-quarter" }).append(
                        $("<input>", { type: "checkbox", class: "filtro-checkbox", name: "componentes[]", id: "componente:" + componente["id"], value: componente["id"], checked: componente["checked"] == 1 }),
                        $("<label>", { class: "label-checkbox", for: "componente:" + componente["id"], text: componente["descricao"] }),
                    )
                )
            });
        });
    }
}

function loadVeiculo(index) {
    $.ajax({
        url: apiAddress + "veiculos/" + index,
        type: "GET",
        datatype: "jsonp",
        success: function(response) {
            var veiculo = JSON.parse(response);
            Object.keys(veiculo).forEach(function(key) {
                if (document.getElementById(key)) {
                    document.getElementById(key).value = veiculo[key];
                }
            });
            loadComponentes(index);
        },
        error: function(error) {
            alert("Erro na requisicao");
        }
    });
}

function loadComponentes(index) {
    $.ajax({
        url: apiAddress + "veiculoComponentes/" + index,
        type: "GET",
        datatype: "jsonp",
        success: function(response) {
            var componentes = JSON.parse(response);

            componentes.forEach(componente => {
                $("#componentes").append(
                    $("<span>", { class: "block-quarter" }).append(
                        $("<input>", { type: "checkbox", class: "filtro-checkbox", name: "componentes[]", id: "componente:" + componente["id"], value: componente["id"], checked: componente["checked"] == 1 }),
                        $("<label>", { class: "label-checkbox", for: "componente:" + componente["id"], text: componente["descricao"] }),
                    )
                )
            });
        },
        error: function(error) {
            alert("Erro na requisicao");
        }
    });
}

function saveVeiculo(index) {

    console.log($("#descricao").value);

    var data = {
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
        idUsuario: 1,
        id: $("#id").val(),
    };

    console.log(data);

    $.ajax({
        url: apiAddress + "veiculos/" + index,
        type: "PUT",
        data: data,
        datatype: "jsonp",
        success: function(response) {
            var result = response;
            window.location.href = " ";
        },
        error: function(error) {
            alert("Erro na requisicao");
        }
    });
}