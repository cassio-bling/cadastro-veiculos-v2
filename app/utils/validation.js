// Validation.js

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

export default {
    validateForm
};