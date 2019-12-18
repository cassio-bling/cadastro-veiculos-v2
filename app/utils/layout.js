// Layout.js
import Cookies from './cookies.js';

function createPagination(numberOfPages, paginationFunction) {
    const node = document.getElementById("pagination");
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }

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

    $('.pagination').on("click", function() {
        paginationFunction(this.value);
    });
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

export default {
    createPagination,
    createMenu
};