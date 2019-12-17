// VeiculoComponenteService.js
import Fetch from './fetch.js';

async function get(id) {
    return await Fetch.get('/veiculoComponentes/' + id);
}

async function update(id, params) {
    return await Fetch.update('/veiculoComponentes/' + id, params);
}

async function remove(id) {
    return await Fetch.remove('/veiculoComponentes/' + id);
}

export default {
    get,
    update,
    remove
};