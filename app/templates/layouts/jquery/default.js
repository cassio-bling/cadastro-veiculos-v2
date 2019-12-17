var apiAddress = "http://localhost/cadastro-veiculos-v2/api/"

$(document).ready(function() {
    $(".placa").mask("SSS-9999", {
        "translation": {
            S: {
                pattern: /[A-Za-z]/,
                recursive: true
            }
        },
        onKeyPress: function(value, event) {
            event.currentTarget.value = value.toUpperCase();
        },
    });

    $('.dinheiro').mask("#.##0,00", {
        reverse: true
    });

    $('.renavam').mask("00000000000", {
        reverse: true
    });

    $('.km').mask("000000", {
        reverse: true
    });

    $('.ano').mask("0000", {
        "translation": {
            0: {
                pattern: /(0-9])/,
            },
        },
    });

    // $('.yearpicker').yearpicker({
    //     year: null,
    //     startYear: 1920,
    //     endYear: 2099,
    // });

    $('.collapsible').ready(function() {
        var coll = document.getElementsByClassName("collapsible");

        for (var i = 0; i < coll.length; i++) {
            //coll[i].nextElementSibling.style.display = (getCookie(String(coll[i].name)) == "true") ? "block" : "none";
            coll[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                    //setCookie(this.name, "", -1);
                } else {
                    content.style.display = "block";
                    //setCookie(this.name, "true", 1);
                }
            });
        }
    });

    $('.required').ready(function() {
        var col = document.getElementsByClassName("required");

        for (var i = 0; i < col.length; i++) {
            col[i].nextElementSibling.style.display = (getCookie(String(coll[i].name)) == "true") ? "block" : "none";
            col[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                    setCookie(this.name, "", -1);
                } else {
                    content.style.display = "block";
                    setCookie(this.name, "true", 1);
                }
            });
        }
    });
});

function validateForm() {
    var col = document.getElementById("form").querySelectorAll("[required]");
    var valid = true;

    for (var i = 0; i < col.length; i++) {
        valid &= validField(col[i].name);
    }

    return valid;
}

function validField(fieldName) {
    var field = document.getElementById(fieldName);
    if (!field.value) {
        field.classList.add("error");
        setTimeout(function() {
            field.classList.remove("error");
        }, 300);
        return false;
    } else {
        return true;
    }
}

function confirmDelete() {
    return confirm("Confirmar exclusão do registro?");
}

function setOffset() {
    setCookie("veiculoOffset", document.getElementById("offset").value, 1);
}

function getOffset() {
    document.getElementById("offset").value = getCookie("veiculoOffset");
}

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

function createMenu(user) {
    $("#menu").append(
        $("<div>", { class: "topnav" }).append(
            $("<label>", { text: "Sistema de veículos" }),
            $("<label>", { text: "Usuário: " + user }),
            $("<a>", { class: "active", text: "Log out", href: "login" }),
        ),
    );
}