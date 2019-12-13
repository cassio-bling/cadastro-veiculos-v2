window.onload = function() {
    bindEvents();
}

function bindEvents() {

    $('#login').on('click', function() {
        if (!validateForm()) {
            return;
        }

        removeCookies();

        verificarLogin();
    });
}

function verificarLogin() {

    var data = {
        email: $('#email').val(),
        senha: $('#senha').val()
    };

    $.ajax({
        url: apiAddress + "usuarios",
        type: "GET",
        data: data,
        datatype: "jsonp",
        success: function(result) {
            var obj = JSON.parse(result);
            console.log(obj["nome"]);
            if (obj["nome"] != null) {
                window.location.href = "veiculos";
            }
        },
        error: function(error) {
            alert("Erro na requisicao");
        }
    });
}