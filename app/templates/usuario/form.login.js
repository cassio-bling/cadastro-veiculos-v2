import UsuarioService from '../../services/usuario.service.js';
import Cookies from '../../utils/cookies.js';
import Validation from '../../utils/validate.js';

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

    });
}

async function checkLogin() {
    let params = {
        email: $('#email').val(),
        senha: $('#senha').val()
    };

    let usuario = await UsuarioService.get(params);

    if (usuario) {
        Cookies.clear();
        Cookies.set("idUsuario", usuario["id"]);
        Cookies.set("nomeUsuario", usuario["nome"]);

        window.location.href = "veiculos";
    } else {
        alert("Login incorreto, tente novamente");
    }
}