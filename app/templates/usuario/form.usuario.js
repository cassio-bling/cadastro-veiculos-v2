import UsuarioService from '../../services/usuario.service.js';
import Cookies from '../../utils/cookies.js';
import Validation from '../../utils/validation.js';

window.onload = function() {
    bindEvents();
}

function bindEvents() {
    $('#save-button').on('click', function() {
        if (Validation.validateForm()) {
            saveUsuario();
        }
    });

    $('#cancel-button').on('click', function() {
        window.location.href = "../login";
    });
}

async function saveUsuario() {
    let email = $("#email").val();

    if (!validateEmail(email)) {
        alert("Informe um e-mail válido");
        return;
    }

    let data = {
        nome: $("#nome").val(),
        email: $("#email").val(),
        senha: $("#senha").val()
    };

    let response = await UsuarioService.create(data);

    if (response.status != "error") {
        alert("Usuário cadastrado com sucesso!");
        window.location.href = "../login";
    }
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}