import Fetch from './fetch.js';

async function getListVeiculos(params) {
    await sleep(5000);
    return await Fetch.get('/veiculos', params);
}

// function alpha() {
//     return "a";
// }

export default {
    getListVeiculos
    //alpha
};

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}