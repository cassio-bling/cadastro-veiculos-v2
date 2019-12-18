// Filters.js
import Cookies from './cookies.js';

function get() {
    let filters = Array.from(document.getElementsByClassName("filtro"));

    filters.forEach(filter => {
        filter.value = Cookies.get(filter.name);
    })

    filters = Array.from(document.getElementsByClassName("filtro-checkbox"));

    let arr = Cookies.get(filters[0].name);

    filters.forEach(filter => {
        filter.checked = arr.includes(filter.value);
    });
}

function set() {
    let filters = Array.from(document.getElementsByClassName("filtro"));

    filters.forEach(filter => {
        if (filter.value) {
            Cookies.set(filter.name, filter.value);
        } else {
            filter.value = "";
            Cookies.set(filter.name, "", -1);
        }
    })

    filters = Array.from(document.getElementsByClassName("filtro-checkbox"));

    let arr = Array();

    filters.forEach(filter => {
        if (filter.checked) {
            arr.push(filter.value);
        }
    });

    if (arr.length > 0) {
        Cookies.set(filters[0].name, arr);
    } else {
        Cookies.set(filters[0].name, "", -1);
    }
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

    });

    Cookies.set(filters[0].name, "", -1);
}

export default {
    get,
    set,
    clear
};