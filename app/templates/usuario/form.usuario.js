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