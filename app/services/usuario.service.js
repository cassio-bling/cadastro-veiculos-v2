// UsuarioService.js
import Fetch from './fetch.js';

async function get(params) {
    return await Fetch.get('/usuarios', params);
}

export default {
    get
};