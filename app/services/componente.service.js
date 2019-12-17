// ComponenteService.js
import Fetch from './fetch.js';

async function get() {
    return await Fetch.get('/componentes', null);
}

export default {
    get
};