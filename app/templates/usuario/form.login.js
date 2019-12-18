import UsuarioService from '../../services/usuario.service.js';
import Cookies from '../../utils/cookies.js';
import Validation from '../../utils/validation.js';

window.onload = function() {
    bindEvents();
}

function bindEvents() {
    $('#login-button').on('click', function() {
        if (Validation.validateForm()) {
            checkLogin();
        }
    });

    $('#create-button').on('click', function() {
        window.location.href = "usuarios/create";
    });
}

async function checkLogin() {
    let params = {
        email: $('#email').val(),
        senha: $('#senha').val()
    };

    let usuario = await UsuarioService.get(params);

    if (usuario.status != "error") {
        if (usuario["id"]) {
            Cookies.clear();
            Cookies.set("idUsuario", usuario["id"]);
            Cookies.set("nomeUsuario", usuario["nome"]);
            Cookies.set("token", usuario["token"]);

            window.location.href = "veiculos";
        } else {
            alert("Login incorreto, tente novamente");
        }
    }
}