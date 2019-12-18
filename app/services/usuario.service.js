// UsuarioService.js
import Fetch from './fetch.js';

async function get(params) {
    return await Fetch.get('/usuarios', params);
}

async function create(params) {
    return await Fetch.create('/usuarios', params);
}

export default {
    get,
    create
};