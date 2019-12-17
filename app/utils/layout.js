// Layout.js
import Cookies from './cookies.js';

function createPagination(numberOfPages) {
    $("#pagination").append(
        $("<input>", { type: "button", value: "<<", id: "first", class: "pagination" }),
        $("<input>", { type: "button", value: "<", id: "prior", class: "pagination" })
    );

    for (var i = 1; i <= numberOfPages; i++) {
        $("#pagination").append(
            $("<input>", { type: "button", value: i, id: "page", class: "pagination" })
        );
    }

    $("#pagination").append(
        $("<input>", { type: "button", value: ">", id: "next", class: "pagination" }),
        $("<input>", { type: "button", value: ">>", id: "last", class: "pagination" }),
    );
}

function createMenu() {
    $("#menu").append(
        $("<div>", { class: "topnav" }).append(
            $("<label>", { text: "Sistema de veículos" }),
            $("<label>", { text: "Usuário: " + Cookies.get("nomeUsuario") }),
            $("<a>", { class: "active", text: "Log out", href: "login" }),
        ),
    );
}

function setOffset() {
    setCookie("veiculoOffset", document.getElementById("offset").value, 1);
}

function getOffset() {
    document.getElementById("offset").value = getCookie("veiculoOffset");
}

export default {
    createPagination,
    createMenu
};