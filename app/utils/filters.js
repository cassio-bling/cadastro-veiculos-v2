// Filters.js
import Cookies from './cookies.js';

function get() {
    let filters = Array.from(document.getElementsByClassName("filtro"));

    filters.forEach(filter => {
        filter.value = Cookies.get(filter.name);
    })

    filters = Array.from(document.getElementsByClassName("filtro-checkbox"));

    filters.forEach(filter => {
        filter.checked = Cookies.get(filter.id) == "true";
    });
}

function set() {
    let filters = Array.from(document.getElementsByClassName("filtro"));

    filters.forEach(filter => {
        Cookies.set(filter.name, filter.value, 1);
    })

    filters = Array.from(document.getElementsByClassName("filtro-checkbox"));

    filters.forEach(filter => {
        Cookies.set(filter.id, filter.checked, 1);
    });
}

function clear() {
    let filters = Array.from(document.getElementsByClassName("filtro"));

    filters.forEach(filter => {
        filter.value = "";
        Cookies.set(filter.name, "", -1);
    })

    filters = Array.from(document.getElementsByClassName("filtro-checkbox"));

    filters.forEach(filter => {
        filter.checked = false;
        Cookies.set(filter.id, false, -1);
    });
}

export default {
    get,
    set,
    clear
};