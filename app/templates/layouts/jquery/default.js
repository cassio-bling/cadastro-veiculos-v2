$(document).ready(function() {
    $('.collapsible').ready(function() {
        var coll = document.getElementsByClassName("collapsible");

        for (var i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";

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

function applyMasks() {
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
}