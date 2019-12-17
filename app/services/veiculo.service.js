// VeiculoService.js
import Fetch from './fetch.js';

async function list(params) {
    return await Fetch.get('/veiculos', params);
}

async function count(params) {
    return await Fetch.get('/veiculos/count', params);
}

async function get(id) {
    return await Fetch.get('/veiculos', id);
}

async function create(params) {
    return await Fetch.create('/veiculos', params);
}

async function update(params) {
    return await Fetch.update('/veiculos', params);
}

async function remove(id) {
    return await Fetch.remove('/veiculos', id);
}

export default {
    list,
    count,
    get,
    create,
    update,
    remove
};

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}