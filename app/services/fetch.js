// Fetch.js
import Cookies from '../utils/cookies.js';

const _apiHost = 'http://localhost/cadastro-veiculos-v2/api';

async function request(url, params, method = 'GET') {

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (params) {
        if (method === 'GET' || method === 'DELETE') {
            url += '?' + objectToQueryString(params);
        } else {
            options.body = JSON.stringify(params);
        }
    }

    if (Cookies.get("token") != null) {
        options.headers["Authorization"] = Cookies.get("token");
    }

    const response = await fetch(_apiHost + url, options);

    if (response.status !== 200) {
        alert('O servidor retornou um status inexperado.');
        return generateErrorResponse('O servidor retornou um status inexperado.');
    }

    const result = await response.json();

    return result;
}

function objectToQueryString(obj) {
    return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
}

function generateErrorResponse(message) {
    return {
        status: 'error',
        message
    };
}

function get(url, params) {
    return request(url, params, 'GET');
}

function create(url, params) {
    return request(url, params, 'POST');
}

function update(url, params) {
    return request(url, params, 'PUT');
}

function remove(url, params) {
    return request(url, params, 'DELETE');
}

export default {
    get,
    create,
    update,
    remove
};